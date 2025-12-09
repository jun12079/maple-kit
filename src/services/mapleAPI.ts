/**
 * MapleStory Taiwan Open API Service
 * 官方 API 文檔：https://openapi.maplestory.nexon.com
 * 透過內部 API Routes 調用，避免暴露 API Key
 */

import {
  CharacterBasic,
  CharacterPopularity,
  CharacterStat,
  CharacterHyperStat,
  CharacterAbility,
  CharacterItemEquipment,
  CharacterSymbolEquipment,
  CharacterDojang,
  CharacterPropensity,
  CharacterCashItemEquipment,
  CharacterSetEffect,
  CharacterBeautyEquipment,
  CharacterAndroidEquipment,
  CharacterPetEquipment,
  CharacterSkill,
  CharacterLinkSkill,
  CharacterVMatrix,
  CharacterHexaMatrix,
  CharacterHexaMatrixStat,
  CharacterUnion,
  CharacterUnionRaider,
  CharacterUnionArtifact,
  MapleAPIErrorResponse
} from '@/types/mapleAPI';

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
    // 不再需要 API Key，因為使用內部 API Routes
    this.baseUrl = '/api';
  }

  /**
   * 通用內部 API 請求方法
   */
  async request<T = any>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
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
    } catch (error: any) {
      if (error instanceof MapleAPIError) {
        throw error;
      }
      throw new MapleAPIError(`Network error: ${error.message}`, 0);
    }
  }

  /**
   * 檢視角色辨識器 (OCID)
   * @param characterName 角色名稱
   */
  async getCharacterOCID(characterName: string): Promise<{ ocid: string }> {
    return this.request<{ ocid: string }>('/id', {
      character_name: characterName
    });
  }

  /**
   * 檢視基本資訊
   * @param ocid 角色辨識器
   * @param date 要搜尋的日期 (TST，YYYY-MM-DD)
   */
  async getCharacterBasic(ocid: string, date: string | null = null): Promise<CharacterBasic> {
    return this.request<CharacterBasic>('/character/basic', { ocid, date });
  }

  /**
   * 檢視名聲資訊
   * @param ocid 角色辨識器
   * @param date 要搜尋的日期 (TST，YYYY-MM-DD)
   */
  async getCharacterPopularity(ocid: string, date: string | null = null): Promise<CharacterPopularity> {
    return this.request<CharacterPopularity>('/character/popularity', { ocid, date });
  }

  /**
   * 檢視綜合能力值資訊
   * @param ocid 角色辨識器
   * @param date 要搜尋的日期 (TST，YYYY-MM-DD)
   */
  async getCharacterStat(ocid: string, date: string | null = null): Promise<CharacterStat> {
    return this.request<CharacterStat>('/character/stat', { ocid, date });
  }

  /**
   * 檢視極限屬性資訊
   * @param ocid 角色辨識器
   * @param date 要搜尋的日期 (TST，YYYY-MM-DD)
   */
  async getCharacterHyperStat(ocid: string, date: string | null = null): Promise<CharacterHyperStat> {
    return this.request<CharacterHyperStat>('/character/hyper-stat', { ocid, date });
  }

  /**
   * 檢視性向資訊
   * @param ocid 角色辨識器
   * @param date 要搜尋的日期 (TST，YYYY-MM-DD)
   */
  async getCharacterPropensity(ocid: string, date: string | null = null): Promise<CharacterPropensity> {
    return this.request<CharacterPropensity>('/character/propensity', { ocid, date });
  }

  /**
   * 檢視能力資訊
   * @param ocid 角色辨識器
   * @param date 要搜尋的日期 (TST，YYYY-MM-DD)
   */
  async getCharacterAbility(ocid: string, date: string | null = null): Promise<CharacterAbility> {
    return this.request<CharacterAbility>('/character/ability', { ocid, date });
  }

  /**
   * 檢視已裝備道具資訊 (不含現金道具)
   * @param ocid 角色辨識器
   * @param date 要搜尋的日期 (TST，YYYY-MM-DD)
   */
  async getCharacterItemEquipment(ocid: string, date: string | null = null): Promise<CharacterItemEquipment> {
    return this.request<CharacterItemEquipment>('/character/item-equipment', { ocid, date });
  }

  /**
   * 檢視已裝備現金道具資訊
   * @param ocid 角色辨識器
   * @param date 要搜尋的日期 (TST，YYYY-MM-DD)
   */
  async getCharacterCashItemEquipment(ocid: string, date: string | null = null): Promise<CharacterCashItemEquipment> {
    return this.request<CharacterCashItemEquipment>('/character/cashitem-equipment', { ocid, date });
  }

  /**
   * 檢視已裝備符文資訊
   * @param ocid 角色辨識器
   * @param date 要搜尋的日期 (TST，YYYY-MM-DD)
   */
  async getCharacterSymbolEquipment(ocid: string, date: string | null = null): Promise<CharacterSymbolEquipment> {
    return this.request<CharacterSymbolEquipment>('/character/symbol-equipment', { ocid, date });
  }

  /**
   * 檢視已套用的套裝效果資訊
   * @param ocid 角色辨識器
   * @param date 要搜尋的日期 (TST，YYYY-MM-DD)
   */
  async getCharacterSetEffect(ocid: string, date: string | null = null): Promise<CharacterSetEffect> {
    return this.request<CharacterSetEffect>('/character/set-effect', { ocid, date });
  }

  /**
   * 檢視已裝備的髮型、臉型與膚色資訊
   * @param ocid 角色辨識器
   * @param date 要搜尋的日期 (TST，YYYY-MM-DD)
   */
  async getCharacterBeautyEquipment(ocid: string, date: string | null = null): Promise<CharacterBeautyEquipment> {
    return this.request<CharacterBeautyEquipment>('/character/beauty-equipment', { ocid, date });
  }

  /**
   * 檢視已裝備機器人資訊
   * @param ocid 角色辨識器
   * @param date 要搜尋的日期 (TST，YYYY-MM-DD)
   */
  async getCharacterAndroidEquipment(ocid: string, date: string | null = null): Promise<CharacterAndroidEquipment> {
    return this.request<CharacterAndroidEquipment>('/character/android-equipment', { ocid, date });
  }

  /**
   * 檢視已裝備寵物資訊
   * @param ocid 角色辨識器
   * @param date 要搜尋的日期 (TST，YYYY-MM-DD)
   */
  async getCharacterPetEquipment(ocid: string, date: string | null = null): Promise<CharacterPetEquipment> {
    return this.request<CharacterPetEquipment>('/character/pet-equipment', { ocid, date });
  }

  /**
   * 檢視技能資訊
   * @param ocid 角色辨識器
   * @param date 要搜尋的日期 (TST，YYYY-MM-DD)
   * @param characterSkillGrade 技能等級 (0: 0차, 1: 1차, 2: 2차, 3: 3차, 4: 4차, hyperpassive: 하이퍼 패시브, hyperactive: 하이퍼 액티브, 5: 5차, 6: 6차)
   */
  async getCharacterSkill(ocid: string, date: string | null = null, characterSkillGrade: string = '6'): Promise<CharacterSkill> {
    return this.request<CharacterSkill>('/character/skill', { ocid, date, character_skill_grade: characterSkillGrade });
  }

  /**
   * 檢視已裝備連結技能資訊
   * @param ocid 角色辨識器
   * @param date 要搜尋的日期 (TST，YYYY-MM-DD)
   */
  async getCharacterLinkSkill(ocid: string, date: string | null = null): Promise<CharacterLinkSkill> {
    return this.request<CharacterLinkSkill>('/character/link-skill', { ocid, date });
  }

  /**
   * 檢視 V 矩陣資訊 (使用技能 API 獲取 5 等技能資料)
   * @param ocid 角色辨識器
   * @param date 要搜尋的日期 (TST，YYYY-MM-DD)
   */
  async getCharacterVMatrix(ocid: string, date: string | null = null): Promise<CharacterVMatrix> {
    return this.request<CharacterVMatrix>('/character/skill', { ocid, date, character_skill_grade: '5' });
  }

  /**
   * 檢視 HEXA 核心資訊 (使用技能 API 獲取 6 等技能資料)
   * @param ocid 角色辨識器
   * @param date 要搜尋的日期 (TST，YYYY-MM-DD)
   */
  async getCharacterHexaMatrix(ocid: string, date: string | null = null): Promise<CharacterHexaMatrix> {
    return this.request<CharacterHexaMatrix>('/character/skill', { ocid, date, character_skill_grade: '6' });
  }

  /**
   * 檢視在 HEXA 矩陣中設定的 HEXA 屬性資訊
   * @param ocid 角色辨識器
   * @param date 要搜尋的日期 (TST，YYYY-MM-DD)
   */
  async getCharacterHexaMatrixStat(ocid: string, date: string | null = null): Promise<CharacterHexaMatrixStat> {
    return this.request<CharacterHexaMatrixStat>('/character/hexamatrix-stat', { ocid, date });
  }

  /**
   * 檢視武陵道場最高紀錄資訊
   * @param ocid 角色辨識器
   * @param date 要搜尋的日期 (TST，YYYY-MM-DD)
   */
  async getCharacterDojang(ocid: string, date: string | null = null): Promise<CharacterDojang> {
    return this.request<CharacterDojang>('/character/dojang', { ocid, date });
  }

  /**
   * 檢視戰地資訊
   * @param ocid 角色辨識器
   * @param date 要搜尋的日期 (TST，YYYY-MM-DD)
   */
  async getUnion(ocid: string, date: string | null = null): Promise<CharacterUnion> {
    return this.request<CharacterUnion>('/user/union', { ocid, date });
  }

  /**
   * 檢視戰地攻擊隊資訊
   * @param ocid 角色辨識器
   * @param date 要搜尋的日期 (TST，YYYY-MM-DD)
   */
  async getUnionRaider(ocid: string, date: string | null = null): Promise<CharacterUnionRaider> {
    return this.request<CharacterUnionRaider>('/user/union-raider', { ocid, date });
  }

  /**
   * 檢視戰地神器資訊
   * @param ocid 角色辨識器
   * @param date 要搜尋的日期 (TST，YYYY-MM-DD)
   */
  async getUnionArtifact(ocid: string, date: string | null = null): Promise<CharacterUnionArtifact> {
    return this.request<CharacterUnionArtifact>('/user/union-artifact', { ocid, date });
  }
}

// 匯出單例和類別
export const mapleAPI = new MapleAPI();
export default MapleAPI;
