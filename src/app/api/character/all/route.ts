import { NextRequest, NextResponse } from 'next/server'
import { makeNexonAPIRequest, validateRequiredParams } from '@/services/nexonAPI'

export const runtime = 'nodejs'

// GET /api/character/all?ocid=xxx&date=yyyy-MM-dd
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const ocid = searchParams.get('ocid')
  const date = searchParams.get('date')

  const validationError = validateRequiredParams({ ocid })
  if (validationError) return validationError

  // 定義所有需要查詢的 API 端點
  const endpoints = [
    '/character/basic',
    '/character/popularity',
    '/character/stat',
    '/character/hyper-stat',
    '/character/ability',
    '/character/item-equipment',
    '/character/dojang',
    '/character/symbol-equipment',
    '/character/skill', // hexaMatrix (grade 6)
    '/character/hexamatrix-stat',
    '/character/skill', // vMatrix (grade 5)
    '/character/link-skill',
    '/user/union',
    '/user/union-raider',
    '/user/union-artifact',
    '/user/union-champion',
    '/character/pet-equipment'
  ]

  // 準備並行請求
  // 注意：有些請求需要額外參數
  const requests = [
    makeNexonAPIRequest('/character/basic', { ocid, date }),
    makeNexonAPIRequest('/character/popularity', { ocid, date }),
    makeNexonAPIRequest('/character/stat', { ocid, date }),
    makeNexonAPIRequest('/character/hyper-stat', { ocid, date }),
    makeNexonAPIRequest('/character/ability', { ocid, date }),
    makeNexonAPIRequest('/character/item-equipment', { ocid, date }),
    makeNexonAPIRequest('/character/dojang', { ocid, date }),
    makeNexonAPIRequest('/character/symbol-equipment', { ocid, date }),
    makeNexonAPIRequest('/character/skill', { ocid, date, character_skill_grade: '6' }), // Hexa
    makeNexonAPIRequest('/character/hexamatrix-stat', { ocid, date }),
    makeNexonAPIRequest('/character/skill', { ocid, date, character_skill_grade: '5' }), // V
    makeNexonAPIRequest('/character/link-skill', { ocid, date }),
    makeNexonAPIRequest('/user/union', { ocid, date }),
    makeNexonAPIRequest('/user/union-raider', { ocid, date }),
    makeNexonAPIRequest('/user/union-artifact', { ocid, date }),
    makeNexonAPIRequest('/user/union-champion', { ocid, date }),
    makeNexonAPIRequest('/character/pet-equipment', { ocid, date })
  ]

  // 準備過去 6 天的經驗值請求
  const todayDate = date ? new Date(date) : new Date();
  const expRequests = [];
  for (let i = 6; i >= 1; i--) {
    const d = new Date(todayDate);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    expRequests.push(makeNexonAPIRequest('/character/basic', { ocid, date: dateStr }));
  }

  try {
    // 等待所有請求完成
    const [responses, expResponses] = await Promise.all([
      Promise.all(requests),
      Promise.all(expRequests)
    ])
    
    // 解析所有 JSON
    const results = await Promise.all(responses.map(res => res.json()))
    const expResults = await Promise.all(expResponses.map(res => res.json()))

    // 組合回傳資料
    const data = {
      basic: results[0],
      popularity: results[1],
      stat: results[2],
      hyperStat: results[3],
      ability: results[4],
      equipment: results[5],
      dojang: results[6],
      symbol: results[7],
      hexaMatrix: results[8],
      hexaMatrixStat: results[9],
      vMatrix: results[10],
      linkSkill: results[11],
      union: results[12],
      unionRaider: results[13],
      unionArtifact: results[14],
      unionChampion: results[15],
      pet: results[16],
      expHistory: expResults
    }

    // 設定快取 Header (10分鐘)
    const response = NextResponse.json(data)
    response.headers.set(
      'Cache-Control', 
      'public, max-age=600, s-maxage=600, stale-while-revalidate=300'
    )
    
    return response

  } catch (error: any) {
    return NextResponse.json(
      { error: `Failed to fetch character data: ${error.message}` },
      { status: 500 }
    )
  }
}
