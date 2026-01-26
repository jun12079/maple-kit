import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3001'

/**
 * GET /api/character - 查詢角色資料（合併 OCID + 所有資料）
 * 轉發請求到後端 API server
 * 後端會先取得 OCID，再獲取所有角色資料
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const characterName = searchParams.get('character_name')
  const date = searchParams.get('date')

  // 驗證必填參數
  if (!characterName) {
    return NextResponse.json(
      { error: '缺少必要參數: character_name' },
      { status: 400 }
    )
  }

  try {
    const url = new URL(`${BACKEND_API_URL}/api/maple/character`)
    url.searchParams.set('character_name', characterName)
    if (date) {
      url.searchParams.set('date', date)
    }

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
        { error: data.error || '取得角色資料失敗' },
        { status: response.status }
      )
    }

    // 設定快取：瀏覽器快取 15 分鐘，CDN 不快取（讓 Redis 處理跨用戶快取）
    const nextResponse = NextResponse.json(data)
    nextResponse.headers.set(
      'Cache-Control',
      'private, max-age=900'
    )

    return nextResponse
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : '未知錯誤'
    return NextResponse.json(
      { error: `網路錯誤: ${errorMessage}` },
      { status: 500 }
    )
  }
}
