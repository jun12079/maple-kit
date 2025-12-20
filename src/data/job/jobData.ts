import { StaticImageData } from 'next/image';
import fighterImg from '@/assets/images/union/champion/fighter.png';
import wizardImg from '@/assets/images/union/champion/wizard.png';
import archerImg from '@/assets/images/union/champion/archer.png';
import thiefImg from '@/assets/images/union/champion/thief.png';
import pirateImg from '@/assets/images/union/champion/pirate.png';

/**
 * 職業關鍵字對應
 * 用於根據職業名稱判斷職業類型
 */
export const JOB_KEYWORDS: Record<string, string[]> = {
  warrior: ['戰士', '劍士', '英雄', '聖騎士', '黑騎士', '聖魂', '米哈逸', '狂狼', '爆拳', '惡魔', '凱撒', '阿戴爾', '劍豪', '神之子'],
  magician: ['法師', '火毒', '冰雷', '主教', '烈焰', '龍魔', '夜光', '煉獄', '凱內', '琳恩', '陰陽師', '拉拉', '伊利恩'],
  bowman: ['弓箭手', '箭神', '神射手', '開拓者', '破風', '精靈', '狂豹', '該隱'],
  thief: ['盜賊', '夜使者', '暗影', '影武者', '暗夜', '幻影', '卡莉', '虎影', '卡德娜'],
  pirate: ['海盜', '拳霸', '槍神', '重砲', '閃雷', '隱月', '機甲', '天使', '亞克', '墨玄'],
  hybrid: ['傑諾'],
};

/**
 * 職業類型的中文名稱
 */
export const JOB_TYPE_NAMES: Record<string, string> = {
  warrior: '戰士',
  magician: '法師',
  bowman: '弓箭手',
  thief: '盜賊',
  pirate: '海盜',
  hybrid: '混合',
};

/**
 * 聯盟職業圖片類型
 */
export type ChampionType = 'fighter' | 'wizard' | 'archer' | 'thief' | 'pirate';

/**
 * 聯盟職業圖片路徑對應
 */
export const CHAMPION_IMAGES: Record<ChampionType, StaticImageData> = {
  fighter: fighterImg,
  wizard: wizardImg,
  archer: archerImg,
  thief: thiefImg,
  pirate: pirateImg,
};

/**
 * 職業類型對應到公會職業圖片
 */
export const JOB_TYPE_TO_CHAMPION: Record<string, ChampionType> = {
  warrior: 'fighter',
  magician: 'wizard',
  bowman: 'archer',
  thief: 'thief',
  pirate: 'pirate',
  hybrid: 'thief', // 混合職業預設使用盜賊圖
};

/**
 * 根據職業名稱獲取職業類型
 * @param jobClass 職業名稱
 * @returns 職業類型 key
 */
export const getJobTypeByName = (jobClass: string): string => {
  if (!jobClass) return 'default';
  
  for (const [type, keywords] of Object.entries(JOB_KEYWORDS)) {
    if (keywords.some(keyword => jobClass.includes(keyword))) {
      return type;
    }
  }
  
  return 'default';
};

/**
 * 根據職業名稱獲取公會職業圖片類型
 * @param jobClass 職業名稱
 * @returns 公會職業圖片類型
 */
export const getChampionTypeByJobName = (jobClass: string): ChampionType => {
  const jobType = getJobTypeByName(jobClass);
  return JOB_TYPE_TO_CHAMPION[jobType] || 'fighter';
};

/**
 * 獲取公會職業圖片
 * @param championType 公會職業類型
 * @returns 圖片資料
 */
export const getChampionImage = (championType: ChampionType): StaticImageData => {
  return CHAMPION_IMAGES[championType];
};
