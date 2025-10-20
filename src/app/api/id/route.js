import { NextResponse } from 'next/server'

const BASE_URL = 'https://open.api.nexon.com'
const API_VERSION = 'maplestorytw/v1'

// 安全的服務端 API Key 存取
const getAPIKey = () => {
  return process.env.MAPLE_API_KEY // 注意：沒有 NEXT_PUBLIC_ 前綴
}

// 通用 API 請求函數
async function makeMapleAPIRequest(endpoint, params = {}) {
  const apiKey = getAPIKey()
  
  if (!apiKey) {
    return NextResponse.json(
      { error: 'API Key not configured' },
      { status: 500 }
    )
  }

  const url = new URL(`${BASE_URL}/${API_VERSION}${endpoint}`)
  
  // 添加查詢參數
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      url.searchParams.append(key, value)
    }
  })

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'x-nxopen-api-key': apiKey,
  }

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json(
        { 
          error: errorData.message || `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
          code: errorData.error?.name 
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: `Network error: ${error.message}` },
      { status: 500 }
    )
  }
}

// GET /api/character/search - 角色 OCID 查詢
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const characterName = searchParams.get('character_name')
  const worldName = searchParams.get('world_name')

  if (!characterName) {
    return NextResponse.json(
      { error: 'Character name is required' },
      { status: 400 }
    )
  }

  return makeMapleAPIRequest('/id', {
    character_name: characterName,
    world_name: worldName
  })
}