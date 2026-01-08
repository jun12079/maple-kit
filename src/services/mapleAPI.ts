/**
 * 透過 Next.js API Routes 轉發到後端 API Server
 * 後端 API Server 負責呼叫 Nexon Open API
 */

import { MapleAPIErrorResponse, APIRequestParams, AllCharacterData, CharacterId } from '@/types/mapleAPI';

export class MapleAPIError extends Error {
  status: number;
  code?: string | number;

  constructor(message: string, status: number, code?: string | number) {
    super(message);
    this.name = 'MapleAPIError';
    this.status = status;
    this.code = code;
  }
}

export class MapleAPI {
  private baseUrl: string;

  constructor() {
    // 呼叫 Next.js 內部 API Routes，它們會轉發到後端 API Server
    this.baseUrl = '/api';
  }

  /**
   * 通用內部 API 請求方法
   */
  async request<T>(endpoint: string, params: APIRequestParams = {}): Promise<T> {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const url = new URL(`${this.baseUrl}${endpoint}`, origin);

    // 添加查詢參數
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        const errorData = data as MapleAPIErrorResponse;
        if (errorData?.error?.message) {
          throw new MapleAPIError(
            errorData.error.message,
            response.status,
            errorData.error.name
          );
        }

        throw new MapleAPIError(
          data.error || `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          data.code
        );
      }

      return data;
    } catch (error) {
      // 如果已經是 MapleAPIError，直接向上拋出
      if (error instanceof MapleAPIError) {
        throw error;
      }
      
      // 處理標準 Error 物件
      if (error instanceof Error) {
        throw new MapleAPIError(`Network error: ${error.message}`, 0);
      }
      
      // 處理其他類型的錯誤（字串、數字等）
      throw new MapleAPIError(`Network error: ${String(error)}`, 0);
    }
  }

  /**
   * 檢視角色辨識器 (OCID)
   * @param characterName 角色名稱
   */
  async getCharacterOCID(characterName: string): Promise<CharacterId> {
    return this.request<CharacterId>('/id', {
      character_name: characterName
    });
  }

  /**
   * 一次獲取所有角色相關資料
   * @param ocid 角色辨識器
   * @param date 要搜尋的日期 (TST，YYYY-MM-DD)
   */
  async getAllCharacterData(ocid: string, date: string | null = null): Promise<AllCharacterData> {
    return this.request<AllCharacterData>('/character/all', { ocid, date });
  }
}

// 匯出單例和類別
export const mapleAPI = new MapleAPI();
export default MapleAPI;

