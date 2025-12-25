import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3001'

/**
 * GET /api/id - 查詢角色 OCID
 * 轉發請求到後端 API server
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const characterName = searchParams.get('character_name')

  // 驗證必填參數
  if (!characterName) {
    return NextResponse.json(
      { error: '缺少必要參數: character_name' },
      { status: 400 }
    )
  }

  try {
    const url = new URL(`${BACKEND_API_URL}/api/maple/id`)
    url.searchParams.set('character_name', characterName)

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || '取得角色 OCID 失敗' },
        { status: response.status }
      )
    }

    // 設定快取：OCID 可以快取較長時間 (24 小時)
    const nextResponse = NextResponse.json(data)
    nextResponse.headers.set(
      'Cache-Control',
      'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200'
    )

    return nextResponse
  } catch (error: any) {
    return NextResponse.json(
      { error: `網路錯誤: ${error.message}` },
      { status: 500 }
    )
  }
}