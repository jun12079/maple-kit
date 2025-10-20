/**
 * MapleStory Taiwan Open API Service
 * 官方 API 文檔：https://openapi.maplestory.nexon.com
 * 透過內部 API Routes 調用，避免暴露 API Key
 */

class MapleAPIError extends Error {
  constructor(message, status, code) {
    super(message);
    this.name = 'MapleAPIError';
    this.status = status;
    this.code = code;
  }
}

class MapleAPI {
  constructor() {
    // 不再需要 API Key，因為使用內部 API Routes
    this.baseUrl = '/api';
  }

  /**
   * 通用內部 API 請求方法
   */
  async request(endpoint, params = {}) {
    const url = new URL(`${this.baseUrl}${endpoint}`, window.location.origin);

    // 添加查詢參數
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        url.searchParams.append(key, value);
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
        throw new MapleAPIError(
          data.error || `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          data.code
        );
      }

      return data;
    } catch (error) {
      if (error instanceof MapleAPIError) {
        throw error;
      }
      throw new MapleAPIError(`Network error: ${error.message}`, 0);
    }
  }

  /**
   * 檢視角色辨識器 (OCID)
   * @param {string} characterName 角色名稱
   * @returns {Promise<{ocid: string}>}
   */
  async getCharacterOCID(characterName) {
    return this.request('/id', {
      character_name: characterName
    });
  }

  /**
   * 檢視基本資訊
   * @param {string} ocid 角色辨識器
   * @param {string} date 要搜尋的日期 (TST，YYYY-MM-DD)
   * @returns {Promise<Object>} 角色基本資訊
   */
  async getCharacterBasic(ocid, date = null) {
    return this.request('/character/basic', { ocid, date });
  }

  /**
   * 檢視名聲資訊
   * @param {string} ocid 角色辨識器
   * @param {string} date 要搜尋的日期 (TST，YYYY-MM-DD)
   * @returns {Promise<Object>} 角色名聲資訊
   */
  async getCharacterPopularity(ocid, date = null) {
    return this.request('/character/popularity', { ocid, date });
  }

  /**
   * 檢視綜合能力值資訊
   * @param {string} ocid 角色辨識器
   * @param {string} date 要搜尋的日期 (TST，YYYY-MM-DD)
   * @returns {Promise<Object>} 角色能力值資訊
   */
  async getCharacterStat(ocid, date = null) {
    return this.request('/character/stat', { ocid, date });
  }

  /**
   * 檢視極限屬性資訊
   * @param {string} ocid 角色辨識器
   * @param {string} date 要搜尋的日期 (TST，YYYY-MM-DD)
   * @returns {Promise<Object>} 角色極限屬性資訊
   */
  async getCharacterHyperStat(ocid, date = null) {
    return this.request('/character/hyper-stat', { ocid, date });
  }

  /**
   * 檢視性向資訊
   * @param {string} ocid 角色辨識器
   * @param {string} date 要搜尋的日期 (TST，YYYY-MM-DD)
   * @returns {Promise<Object>} 角色性向資訊
   */
  async getCharacterPropensity(ocid, date = null) {
    return this.request('/character/propensity', { ocid, date });
  }

  /**
   * 檢視能力資訊
   * @param {string} ocid 角色辨識器
   * @param {string} date 要搜尋的日期 (TST，YYYY-MM-DD)
   * @returns {Promise<Object>} 角色能力資訊
   */
  async getCharacterAbility(ocid, date = null) {
    return this.request('/character/ability', { ocid, date });
  }

  /**
   * 檢視已裝備道具資訊 (不含現金道具)
   * @param {string} ocid 角色辨識器
   * @param {string} date 要搜尋的日期 (TST，YYYY-MM-DD)
   * @returns {Promise<Object>} 已裝備道具資訊
   */
  async getCharacterItemEquipment(ocid, date = null) {
    return this.request('/character/item-equipment', { ocid, date });
  }

  /**
   * 檢視已裝備現金道具資訊
   * @param {string} ocid 角色辨識器
   * @param {string} date 要搜尋的日期 (TST，YYYY-MM-DD)
   * @returns {Promise<Object>} 已裝備現金道具資訊
   */
  async getCharacterCashItemEquipment(ocid, date = null) {
    return this.request('/character/cashitem-equipment', { ocid, date });
  }

  /**
   * 檢視已裝備符文資訊
   * @param {string} ocid 角色辨識器
   * @param {string} date 要搜尋的日期 (TST，YYYY-MM-DD)
   * @returns {Promise<Object>} 已裝備符文資訊
   */
  async getCharacterSymbolEquipment(ocid, date = null) {
    return this.request('/character/symbol-equipment', { ocid, date });
  }

  /**
   * 檢視已套用的套裝效果資訊
   * @param {string} ocid 角色辨識器
   * @param {string} date 要搜尋的日期 (TST，YYYY-MM-DD)
   * @returns {Promise<Object>} 套裝效果資訊
   */
  async getCharacterSetEffect(ocid, date = null) {
    return this.request('/character/set-effect', { ocid, date });
  }

  /**
   * 檢視已裝備的髮型、臉型與膚色資訊
   * @param {string} ocid 角色辨識器
   * @param {string} date 要搜尋的日期 (TST，YYYY-MM-DD)
   * @returns {Promise<Object>} 髮型、臉型與膚色資訊
   */
  async getCharacterBeautyEquipment(ocid, date = null) {
    return this.request('/character/beauty-equipment', { ocid, date });
  }

  /**
   * 檢視已裝備機器人資訊
   * @param {string} ocid 角色辨識器
   * @param {string} date 要搜尋的日期 (TST，YYYY-MM-DD)
   * @returns {Promise<Object>} 已裝備機器人資訊
   */
  async getCharacterAndroidEquipment(ocid, date = null) {
    return this.request('/character/android-equipment', { ocid, date });
  }

  /**
   * 檢視已裝備寵物資訊
   * @param {string} ocid 角色辨識器
   * @param {string} date 要搜尋的日期 (TST，YYYY-MM-DD)
   * @returns {Promise<Object>} 已裝備寵物資訊
   */
  async getCharacterPetEquipment(ocid, date = null) {
    return this.request('/character/pet-equipment', { ocid, date });
  }

  /**
   * 檢視技能資訊
   * @param {string} ocid 角色辨識器
   * @param {string} date 要搜尋的日期 (TST，YYYY-MM-DD)
   * @param {string} characterSkillGrade 技能等級 (0: 0차, 1: 1차, 2: 2차, 3: 3차, 4: 4차, hyperpassive: 하이퍼 패시브, hyperactive: 하이퍼 액티브, 5: 5차, 6: 6차)
   * @returns {Promise<Object>} 技能資訊
   */
  async getCharacterSkill(ocid, date = null, characterSkillGrade = '6') {
    return this.request('/character/skill', { ocid, date, character_skill_grade: characterSkillGrade });
  }

  /**
   * 檢視已裝備連結技能資訊
   * @param {string} ocid 角色辨識器
   * @param {string} date 要搜尋的日期 (TST，YYYY-MM-DD)
   * @returns {Promise<Object>} 已裝備連結技能資訊
   */
  async getCharacterLinkSkill(ocid, date = null) {
    return this.request('/character/link-skill', { ocid, date });
  }

  /**
   * 檢視 V 矩陣資訊 (使用技能 API 獲取 5 等技能資料)
   * @param {string} ocid 角色辨識器
   * @param {string} date 要搜尋的日期 (TST，YYYY-MM-DD)
   * @returns {Promise<Object>} V 矩陣資訊
   */
  async getCharacterVMatrix(ocid, date = null) {
    return this.request('/character/skill', { ocid, date, character_skill_grade: '5' });
  }

  /**
   * 檢視 HEXA 核心資訊 (使用技能 API 獲取 6 等技能資料)
   * @param {string} ocid 角色辨識器
   * @param {string} date 要搜尋的日期 (TST，YYYY-MM-DD)
   * @returns {Promise<Object>} HEXA 核心資訊
   */
  async getCharacterHexaMatrix(ocid, date = null) {
    return this.request('/character/skill', { ocid, date, character_skill_grade: '6' });
  }

  /**
   * 檢視在 HEXA 矩陣中設定的 HEXA 屬性資訊
   * @param {string} ocid 角色辨識器
   * @param {string} date 要搜尋的日期 (TST，YYYY-MM-DD)
   * @returns {Promise<Object>} HEXA 屬性資訊
   */
  async getCharacterHexaMatrixStat(ocid, date = null) {
    return this.request('/character/hexamatrix-stat', { ocid, date });
  }

  /**
   * 檢視武陵道場最高紀錄資訊
   * @param {string} ocid 角色辨識器
   * @param {string} date 要搜尋的日期 (TST，YYYY-MM-DD)
   * @returns {Promise<Object>} 武陵道場最高紀錄資訊
   */
  async getCharacterDojang(ocid, date = null) {
    return this.request('/character/dojang', { ocid, date });
  }

  /**
   * 檢視戰地資訊
   * @param {string} ocid 角色辨識器
   * @param {string} date 要搜尋的日期 (TST，YYYY-MM-DD)
   * @returns {Promise<Object>} 戰地資訊
   */
  async getUnion(ocid, date = null) {
    return this.request('/user/union', { ocid, date });
  }

  /**
   * 檢視戰地攻擊隊資訊
   * @param {string} ocid 角色辨識器
   * @param {string} date 要搜尋的日期 (TST，YYYY-MM-DD)
   * @returns {Promise<Object>} 戰地攻擊隊資訊
   */
  async getUnionRaider(ocid, date = null) {
    return this.request('/user/union-raider', { ocid, date });
  }

  /**
   * 檢視戰地神器資訊
   * @param {string} ocid 角色辨識器
   * @param {string} date 要搜尋的日期 (TST，YYYY-MM-DD)
   * @returns {Promise<Object>} 戰地神器資訊
   */
  async getUnionArtifact(ocid, date = null) {
    return this.request('/user/union-artifact', { ocid, date });
  }
}

// 匯出單例和類別
export const mapleAPI = new MapleAPI();
export { MapleAPI, MapleAPIError };
export default MapleAPI;