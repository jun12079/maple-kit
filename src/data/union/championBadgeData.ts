import { StaticImageData } from 'next/image';
import allImg from '@/assets/images/union/champion/all.png';
import attackImg from '@/assets/images/union/champion/attack.png';
import bossImg from '@/assets/images/union/champion/boss.png';
import cdmgImg from '@/assets/images/union/champion/cdmg.png';
import iedImg from '@/assets/images/union/champion/ied.png';

/**
 * 冠軍能力徽章類型
 */
export type BadgeType = 'all' | 'attack' | 'boss' | 'cdmg' | 'ied';

/**
 * 冠軍能力徽章圖片對應
 */
export const BADGE_IMAGES: Record<BadgeType, StaticImageData> = {
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
export const getBadgeImage = (badgeType: BadgeType): StaticImageData => {
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
