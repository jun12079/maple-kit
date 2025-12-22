/**
 * Nexon API 通用請求工具
 * 提供統一的 API 調用邏輯給所有 API Routes 使用
 */

import { NextResponse } from 'next/server';

const BASE_URL = 'https://open.api.nexon.com';
const API_VERSION = 'maplestorytw/v1';

/**
 * 取得服務端 API Key
 */
function getAPIKey(): string | undefined {
  return process.env.MAPLE_API_KEY;
}

/**
 * 通用 Nexon API 請求函數
 * @param endpoint API 端點路徑 (例如: '/id', '/character/basic')
 * @param params 查詢參數
 * @param cacheSeconds 快取時間（秒），預設 900 秒 (15分鐘)
 * @returns NextResponse
 */
export async function makeNexonAPIRequest(
  endpoint: string, 
  params: Record<string, any> = {},
  cacheSeconds: number = 900
): Promise<NextResponse> {
  const apiKey = getAPIKey();

  if (!apiKey) {
    return NextResponse.json(
      { error: 'API Key not configured' },
      { status: 500 }
    );
  }

  const url = new URL(`${BASE_URL}/${API_VERSION}${endpoint}`);

  // 添加查詢參數
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      url.searchParams.append(key, String(value));
    }
  });

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'x-nxopen-api-key': apiKey,
  };

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers,
      // 確保後端 fetch 不會被 Next.js 預設快取影響，我們自己控制回應的 Cache-Control
      cache: 'no-store' 
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {
          error: errorData.message || `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
          code: errorData.error?.name,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // 設定 Cache-Control header
    // public: 可被瀏覽器和 CDN 快取
    // max-age: 瀏覽器快取時間
    // s-maxage: CDN (Vercel Edge) 快取時間
    // stale-while-revalidate: 過期後多久內可使用舊資料並背景更新
    const nextResponse = NextResponse.json(data);
    nextResponse.headers.set(
      'Cache-Control', 
      `public, max-age=${cacheSeconds}, s-maxage=${cacheSeconds}, stale-while-revalidate=${Math.floor(cacheSeconds / 2)}`
    );
    
    return nextResponse;
  } catch (error: any) {
    return NextResponse.json(
      { error: `Network error: ${error.message}` },
      { status: 500 }
    );
  }
}

/**
 * 驗證必填參數
 * @param params 參數對象，鍵為參數名，值為參數值
 * @returns NextResponse | null - 如果驗證失敗返回錯誤響應，成功返回 null
 */
export function validateRequiredParams(params: Record<string, any>): NextResponse | null {
  for (const [key, value] of Object.entries(params)) {
    if (!value) {
      return NextResponse.json(
        { error: `${key} is required` },
        { status: 400 }
      );
    }
  }
  return null;
}
