/**
 * HEXA 核心升級資料
 * 包含四種核心類型：技能核心、精通核心、強化核心、共通核心
 * 每種核心等級上限 30 級
 * 升級材料：艾爾達氣息 (Sol Erda) 和 艾爾達碎片 (Sol Erda Fragment)
 * 現在使用圖示顯示材料類型
 */

const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || '';
export const HEXAStat1Icon = `${CDN_URL}/images/hexa/hexa-stat1.png`;
export const HEXAStat2Icon = `${CDN_URL}/images/hexa/hexa-stat2.png`;
export const HEXAStat3Icon = `${CDN_URL}/images/hexa/hexa-stat3.png`;
const SolErdaIcon = `${CDN_URL}/images/items/icons/SolErda_icon.png`;
const SolErdaFragmentIcon = `${CDN_URL}/images/items/icons/SolErdaFragment_icon.png`;

// 核心類型
export type CoreType = 'skill' | 'mastery' | 'reinforced' | 'common';

// 核心類型與名稱對照
export const CORE_TYPES: Record<CoreType, string> = {
  skill: '技能核心',
  mastery: '精通核心',
  reinforced: '強化核心',
  common: '共通核心'
};

// 材料介面
export interface Material {
  name: string;
  icon: string;
  shortName: string;
}

// 升級材料 - 包含圖示和名稱
export const MATERIALS: {
  solErda: Material;
  solErdaFragment: Material;
} = {
  solErda: {
    name: '艾爾達氣息',
    icon: SolErdaIcon,
    shortName: '氣息'
  },
  solErdaFragment: {
    name: '艾爾達碎片', 
    icon: SolErdaFragmentIcon,
    shortName: '碎片'
  }
};

// 升級費用介面
export interface UpgradeCost {
  level: number;
  solErda: number;
  solErdaFragment: number;
}

// 材料費用介面
export interface MaterialCost {
  solErda: number;
  solErdaFragment: number;
}

// HEXA 核心升級費用表 (等級 1-30)
export const HEXA_UPGRADE_COSTS: Record<CoreType, UpgradeCost[]> = {
  // 技能核心 (Skill Core)
  skill: [
    { level: 1, solErda: 5, solErdaFragment: 100 },
    { level: 2, solErda: 1, solErdaFragment: 30 },
    { level: 3, solErda: 1, solErdaFragment: 35 },
    { level: 4, solErda: 1, solErdaFragment: 40 },
    { level: 5, solErda: 2, solErdaFragment: 45 },
    { level: 6, solErda: 2, solErdaFragment: 50 },
    { level: 7, solErda: 2, solErdaFragment: 55 },
    { level: 8, solErda: 3, solErdaFragment: 60 },
    { level: 9, solErda: 3, solErdaFragment: 65 },
    { level: 10, solErda: 10, solErdaFragment: 200 },
    { level: 11, solErda: 3, solErdaFragment: 80 },
    { level: 12, solErda: 3, solErdaFragment: 90 },
    { level: 13, solErda: 4, solErdaFragment: 100 },
    { level: 14, solErda: 4, solErdaFragment: 110 },
    { level: 15, solErda: 4, solErdaFragment: 120 },
    { level: 16, solErda: 4, solErdaFragment: 130 },
    { level: 17, solErda: 4, solErdaFragment: 140 },
    { level: 18, solErda: 4, solErdaFragment: 150 },
    { level: 19, solErda: 5, solErdaFragment: 160 },
    { level: 20, solErda: 15, solErdaFragment: 350 },
    { level: 21, solErda: 5, solErdaFragment: 170 },
    { level: 22, solErda: 5, solErdaFragment: 180 },
    { level: 23, solErda: 5, solErdaFragment: 190 },
    { level: 24, solErda: 5, solErdaFragment: 200 },
    { level: 25, solErda: 5, solErdaFragment: 210 },
    { level: 26, solErda: 6, solErdaFragment: 220 },
    { level: 27, solErda: 6, solErdaFragment: 230 },
    { level: 28, solErda: 6, solErdaFragment: 240 },
    { level: 29, solErda: 7, solErdaFragment: 250 },
    { level: 30, solErda: 20, solErdaFragment: 500 }
  ],

  // 精通核心 (Mastery Core)
  mastery: [
    { level: 1, solErda: 3, solErdaFragment: 50 },
    { level: 2, solErda: 1, solErdaFragment: 15 },
    { level: 3, solErda: 1, solErdaFragment: 18 },
    { level: 4, solErda: 1, solErdaFragment: 20 },
    { level: 5, solErda: 1, solErdaFragment: 23 },
    { level: 6, solErda: 1, solErdaFragment: 25 },
    { level: 7, solErda: 1, solErdaFragment: 28 },
    { level: 8, solErda: 2, solErdaFragment: 30 },
    { level: 9, solErda: 2, solErdaFragment: 33 },
    { level: 10, solErda: 5, solErdaFragment: 100 },
    { level: 11, solErda: 2, solErdaFragment: 40 },
    { level: 12, solErda: 2, solErdaFragment: 45 },
    { level: 13, solErda: 2, solErdaFragment: 50 },
    { level: 14, solErda: 2, solErdaFragment: 55 },
    { level: 15, solErda: 2, solErdaFragment: 60 },
    { level: 16, solErda: 2, solErdaFragment: 65 },
    { level: 17, solErda: 2, solErdaFragment: 70 },
    { level: 18, solErda: 2, solErdaFragment: 75 },
    { level: 19, solErda: 3, solErdaFragment: 80 },
    { level: 20, solErda: 8, solErdaFragment: 175 },
    { level: 21, solErda: 3, solErdaFragment: 85 },
    { level: 22, solErda: 3, solErdaFragment: 90 },
    { level: 23, solErda: 3, solErdaFragment: 95 },
    { level: 24, solErda: 3, solErdaFragment: 100 },
    { level: 25, solErda: 3, solErdaFragment: 105 },
    { level: 26, solErda: 3, solErdaFragment: 110 },
    { level: 27, solErda: 3, solErdaFragment: 115 },
    { level: 28, solErda: 3, solErdaFragment: 120 },
    { level: 29, solErda: 4, solErdaFragment: 125 },
    { level: 30, solErda: 10, solErdaFragment: 250 }
  ],

  // 強化核心 (Reinforced Core)
  reinforced: [
    { level: 1, solErda: 4, solErdaFragment: 75 },
    { level: 2, solErda: 1, solErdaFragment: 23 },
    { level: 3, solErda: 1, solErdaFragment: 27 },
    { level: 4, solErda: 1, solErdaFragment: 30 },
    { level: 5, solErda: 2, solErdaFragment: 34 },
    { level: 6, solErda: 2, solErdaFragment: 38 },
    { level: 7, solErda: 2, solErdaFragment: 42 },
    { level: 8, solErda: 3, solErdaFragment: 45 },
    { level: 9, solErda: 3, solErdaFragment: 49 },
    { level: 10, solErda: 8, solErdaFragment: 150 },
    { level: 11, solErda: 3, solErdaFragment: 60 },
    { level: 12, solErda: 3, solErdaFragment: 68 },
    { level: 13, solErda: 3, solErdaFragment: 75 },
    { level: 14, solErda: 3, solErdaFragment: 83 },
    { level: 15, solErda: 3, solErdaFragment: 90 },
    { level: 16, solErda: 3, solErdaFragment: 98 },
    { level: 17, solErda: 3, solErdaFragment: 105 },
    { level: 18, solErda: 3, solErdaFragment: 113 },
    { level: 19, solErda: 4, solErdaFragment: 120 },
    { level: 20, solErda: 12, solErdaFragment: 263 },
    { level: 21, solErda: 4, solErdaFragment: 128 },
    { level: 22, solErda: 4, solErdaFragment: 135 },
    { level: 23, solErda: 4, solErdaFragment: 143 },
    { level: 24, solErda: 4, solErdaFragment: 150 },
    { level: 25, solErda: 4, solErdaFragment: 158 },
    { level: 26, solErda: 5, solErdaFragment: 165 },
    { level: 27, solErda: 5, solErdaFragment: 173 },
    { level: 28, solErda: 5, solErdaFragment: 180 },
    { level: 29, solErda: 6, solErdaFragment: 188 },
    { level: 30, solErda: 15, solErdaFragment: 375 }
  ],

  // 共通核心 (Common Core)
  common: [
    { level: 1, solErda: 7, solErdaFragment: 125 },
    { level: 2, solErda: 2, solErdaFragment: 38 },
    { level: 3, solErda: 2, solErdaFragment: 44 },
    { level: 4, solErda: 2, solErdaFragment: 50 },
    { level: 5, solErda: 3, solErdaFragment: 57 },
    { level: 6, solErda: 3, solErdaFragment: 63 },
    { level: 7, solErda: 3, solErdaFragment: 69 },
    { level: 8, solErda: 5, solErdaFragment: 75 },
    { level: 9, solErda: 5, solErdaFragment: 82 },
    { level: 10, solErda: 14, solErdaFragment: 300 },
    { level: 11, solErda: 5, solErdaFragment: 110 },
    { level: 12, solErda: 5, solErdaFragment: 124 },
    { level: 13, solErda: 6, solErdaFragment: 138 },
    { level: 14, solErda: 6, solErdaFragment: 152 },
    { level: 15, solErda: 6, solErdaFragment: 165 },
    { level: 16, solErda: 6, solErdaFragment: 179 },
    { level: 17, solErda: 6, solErdaFragment: 193 },
    { level: 18, solErda: 6, solErdaFragment: 207 },
    { level: 19, solErda: 7, solErdaFragment: 220 },
    { level: 20, solErda: 17, solErdaFragment: 525 },
    { level: 21, solErda: 7, solErdaFragment: 234 },
    { level: 22, solErda: 7, solErdaFragment: 248 },
    { level: 23, solErda: 7, solErdaFragment: 262 },
    { level: 24, solErda: 7, solErdaFragment: 275 },
    { level: 25, solErda: 7, solErdaFragment: 289 },
    { level: 26, solErda: 9, solErdaFragment: 303 },
    { level: 27, solErda: 9, solErdaFragment: 317 },
    { level: 28, solErda: 9, solErdaFragment: 330 },
    { level: 29, solErda: 10, solErdaFragment: 344 },
    { level: 30, solErda: 20, solErdaFragment: 750 }
  ]
};

// 每種核心類型升級到滿等 (30級) 所需的總材料數量
export const TOTAL_UPGRADE_COSTS: Record<CoreType, MaterialCost> = {
  skill: {
    solErda: 150,
    solErdaFragment: 4500
  },
  mastery: {
    solErda: 83,
    solErdaFragment: 2252
  },
  reinforced: {
    solErda: 123,
    solErdaFragment: 3383
  },
  common: {
    solErda: 208,
    solErdaFragment: 6268
  }
};

/**
 * 計算從當前等級升級到目標等級所需的材料
 * @param coreType - 核心類型
 * @param currentLevel - 當前等級 (0-29)
 * @param targetLevel - 目標等級 (1-30)
 * @returns 包含所需 solErda 和 solErdaFragment 數量的物件
 */
export const calculateUpgradeCost = (
  coreType: CoreType,
  currentLevel: number,
  targetLevel: number
): MaterialCost => {
  if (!HEXA_UPGRADE_COSTS[coreType]) {
    throw new Error(`未知的核心類型: ${coreType}`);
  }

  if (currentLevel < 0 || currentLevel >= 30 || targetLevel < 1 || targetLevel > 30) {
    throw new Error('等級範圍無效');
  }

  if (currentLevel >= targetLevel) {
    return { solErda: 0, solErdaFragment: 0 };
  }

  const costs = HEXA_UPGRADE_COSTS[coreType];
  let totalSolErda = 0;
  let totalSolErdaFragment = 0;

  // 從 currentLevel + 1 升級到 targetLevel
  for (let level = currentLevel + 1; level <= targetLevel; level++) {
    const cost = costs.find(c => c.level === level);
    if (cost) {
      totalSolErda += cost.solErda;
      totalSolErdaFragment += cost.solErdaFragment;
    }
  }

  return {
    solErda: totalSolErda,
    solErdaFragment: totalSolErdaFragment
  };
};

/**
 * 取得特定等級的升級費用
 * @param coreType - 核心類型
 * @param level - 等級 (1-30)
 * @returns 該等級的升級費用
 */
export const getUpgradeCostForLevel = (coreType: CoreType, level: number): UpgradeCost => {
  if (!HEXA_UPGRADE_COSTS[coreType]) {
    throw new Error(`未知的核心類型: ${coreType}`);
  }

  const cost = HEXA_UPGRADE_COSTS[coreType].find(c => c.level === level);
  if (!cost) {
    throw new Error(`找不到等級 ${level} 的升級費用`);
  }

  return {
    level: cost.level,
    solErda: cost.solErda,
    solErdaFragment: cost.solErdaFragment
  };
};

// 核心資料介面
export interface CoreData {
  type: CoreType;
  currentLevel: number;
  targetLevel: number;
}

/**
 * 計算多個核心的總升級費用
 * @param cores - 核心陣列，每個元素包含 { type, currentLevel, targetLevel }
 * @returns 總升級費用
 */
export const calculateMultipleCoresCost = (cores: CoreData[]): MaterialCost => {
  let totalSolErda = 0;
  let totalSolErdaFragment = 0;

  cores.forEach(core => {
    const cost = calculateUpgradeCost(core.type, core.currentLevel, core.targetLevel);
    totalSolErda += cost.solErda;
    totalSolErdaFragment += cost.solErdaFragment;
  });

  return {
    solErda: totalSolErda,
    solErdaFragment: totalSolErdaFragment
  };
};
