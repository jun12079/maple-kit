const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || '';
const allImg = `${CDN_URL}/images/union/champion/all.png`;
const attackImg = `${CDN_URL}/images/union/champion/attack.png`;
const bossImg = `${CDN_URL}/images/union/champion/boss.png`;
const cdmgImg = `${CDN_URL}/images/union/champion/cdmg.png`;
const iedImg = `${CDN_URL}/images/union/champion/ied.png`;

/**
 * 冠軍能力徽章類型
 */
export type BadgeType = 'all' | 'attack' | 'boss' | 'cdmg' | 'ied';

/**
 * 冠軍能力徽章圖片對應
 */
export const BADGE_IMAGES: Record<BadgeType, string> = {
  all: allImg,
  attack: attackImg,
  boss: bossImg,
  cdmg: cdmgImg,
  ied: iedImg,
};

/**
 * 冠軍能力徽章名稱
 */
export const BADGE_NAMES: Record<BadgeType, string> = {
  all: '全屬性',
  attack: '攻擊力',
  boss: 'Boss傷害',
  cdmg: '爆擊傷害',
  ied: '無視防禦',
};

/**
 * 冠軍能力徽章順序（固定）
 */
export const BADGE_ORDER: BadgeType[] = ['all', 'attack', 'boss', 'cdmg', 'ied'];

/**
 * 獲取冠軍能力徽章圖片
 * @param badgeType 徽章類型
 * @returns 圖片資料
 */
export const getBadgeImage = (badgeType: BadgeType): string => {
  return BADGE_IMAGES[badgeType];
};

/**
 * 獲取冠軍能力徽章名稱
 * @param badgeType 徽章類型
 * @returns 徽章名稱
 */
export const getBadgeName = (badgeType: BadgeType): string => {
  return BADGE_NAMES[badgeType];
};
