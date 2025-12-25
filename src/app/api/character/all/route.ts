import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3001'

/**
 * GET /api/character/all - 查詢角色所有資料
 * 轉發請求到後端 API server
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const ocid = searchParams.get('ocid')
  const date = searchParams.get('date')

  // 驗證必填參數
  if (!ocid) {
    return NextResponse.json(
      { error: '缺少必要參數: ocid' },
      { status: 400 }
    )
  }

  try {
    const url = new URL(`${BACKEND_API_URL}/api/maple/character/all`)
    url.searchParams.set('ocid', ocid)
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

    // 設定快取：角色資料快取 15 分鐘
    const nextResponse = NextResponse.json(data)
    nextResponse.headers.set(
      'Cache-Control',
      'public, max-age=900, s-maxage=900, stale-while-revalidate=450'
    )

    return nextResponse
  } catch (error: any) {
    return NextResponse.json(
      { error: `網路錯誤: ${error.message}` },
      { status: 500 }
    )
  }
}
