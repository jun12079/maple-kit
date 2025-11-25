import { StaticImageData } from 'next/image';

// 一般物品
import absoLabArmorBoxIcon from '@/assets/images/items/icons/AbsoLabArmorBox_icon.png';
import absoLabWeaponBoxIcon from '@/assets/images/items/icons/AbsoLabWeaponBox_icon.png';
import arcaneUmbraArmorBoxIcon from '@/assets/images/items/icons/ArcaneUmbraArmorBox_icon.png';
import arcaneUmbraWeaponBoxIcon from '@/assets/images/items/icons/ArcaneUmbraWeaponBox_icon.png';
import cursedKaiseriumIcon from '@/assets/images/items/icons/CursedKaiserium_icon.png';
import desiredEthernalArmorBoxIcon from '@/assets/images/items/icons/DesiredEthernalArmorBox_icon.png';
import distortedDesiresCrystalIcon from '@/assets/images/items/icons/DistortedDesiresCrystal_icon.png';
import divineEternalArmorBoxIcon from '@/assets/images/items/icons/DivineEternalArmorBox_icon.png';
import ferociousBeastEntanglementRingIcon from '@/assets/images/items/icons/FerociousBeastEntanglementRing_icon.png';
import ferociousBeastEternalArmorBoxIcon from '@/assets/images/items/icons/FerociousBeastEternalArmorBox_icon.png';
import ferociousEntanglementRingFragmentIcon from '@/assets/images/items/icons/FerociousEntanglementRingFragment_icon.png';
import golluxCoinIcon from '@/assets/images/items/icons/GolluxCoin_icon.png';
import greenStoneIcon from '@/assets/images/items/icons/GreenStone_icon.png';
import grindstoneOfFaithIcon from '@/assets/images/items/icons/GrindstoneOfFaith_icon.png';
import grindstoneOfLifeIcon from '@/assets/images/items/icons/GrindstoneOfLife_icon.png';
import kalossResidualDeterminationIcon from '@/assets/images/items/icons/KalossResidualDetermination_icon.png';
import kalossResidualDeterminationFragmentIcon from '@/assets/images/items/icons/KalossResidualDeterminationFragment_icon.png';
import mirrorWorldNodestoneIcon from '@/assets/images/items/icons/MirrorWorldNodestone_icon.png';
import mitrasNodestoneIcon from '@/assets/images/items/icons/MitrasNodestone_icon.png';
import oathswornEthernalArmorBoxIcon from '@/assets/images/items/icons/OathswornEthernalArmorBox_icon.png';
import princessNoEffectCouponIcon from '@/assets/images/items/icons/PrincessNoEffectCoupon_icon.png';
import redStoneIcon from '@/assets/images/items/icons/RedStone_icon.png';
import ruinForceShieldIcon from '@/assets/images/items/icons/RuinForceShield_icon.png';
import superiorEngravedGolluxBeltIcon from '@/assets/images/items/icons/SuperiorEngravedGolluxBelt_icon.png';
import superiorGolluxEarringsIcon from '@/assets/images/items/icons/SuperiorGolluxEarrings_icon.png';
import traceOfEternalLoyaltyIcon from '@/assets/images/items/icons/TraceOfEternalLoyalty_icon.png';
import MalitiaDrops2Icon from '@/assets/images/items/icons/MalitiaDrops2_icon.png';
import MalitiaDrops3Icon from '@/assets/images/items/icons/MalitiaDrops3_icon.png';
import MaliciousEternalArmorBoxIcon from '@/assets/images/items/icons/MaliciousEternalArmorBox_icon.png';
import MalitiaSoulIcon from '@/assets/images/items/icons/MalitiaSoul_icon.png';

// 機器人
import annihilationWeaponLotusroidIcon from '@/assets/images/items/icons/robot/AnnihilationWeaponLotusroid_icon.png';
import baldrixroidIcon from '@/assets/images/items/icons/robot/Baldrixroid_icon.png';
import damienroidIcon from '@/assets/images/items/icons/robot/Damienroid_icon.png';
import kalingroidIcon from '@/assets/images/items/icons/robot/Kalingroid_icon.png';
import limboroidIcon from '@/assets/images/items/icons/robot/Limboroid_icon.png';
import lotusroidIcon from '@/assets/images/items/icons/robot/Lotusroid_icon.png';
import lucidroidIcon from '@/assets/images/items/icons/robot/Lucidroid_icon.png';
import malitiaroidIcon from '@/assets/images/items/icons/robot/Malitiaroid_icon.png';
import nickyroidIcon from '@/assets/images/items/icons/robot/Nickyroid_icon.png';

// 漆黑BOSS套裝
import berserkedIcon from '@/assets/images/items/icons/pitched-boss-set/Berserked_icon.png';
import commandingForceEarringIcon from '@/assets/images/items/icons/pitched-boss-set/CommandingForceEarring_icon.png';
import damagedBlackHeartIcon from '@/assets/images/items/icons/pitched-boss-set/DamagedBlackHeart_icon.png';
import dreamyBeltIcon from '@/assets/images/items/icons/pitched-boss-set/DreamyBelt_icon.png';
import endlessTerrorIcon from '@/assets/images/items/icons/pitched-boss-set/EndlessTerror_icon.png';
import genesisBadgeIcon from '@/assets/images/items/icons/pitched-boss-set/GenesisBadge_icon.png';
import magicEyepatchIcon from '@/assets/images/items/icons/pitched-boss-set/MagicEyepatch_icon.png';
import mitrasRageSelectionBoxIcon from '@/assets/images/items/icons/pitched-boss-set/MitrasRageSelectionBox_icon.png';
import sourceOfSufferingIcon from '@/assets/images/items/icons/pitched-boss-set/SourceOfSuffering_icon.png';
import totalControlIcon from '@/assets/images/items/icons/pitched-boss-set/TotalControl_icon.png';
import willsCursedSpellbookSelectionBoxIcon from '@/assets/images/items/icons/pitched-boss-set/WillsCursedSpellbookSelectionBox_icon.png';

// 光輝BOSS套裝
import oathOfDeathIcon from '@/assets/images/items/icons/brilliant-boss-set/OathOfDeath_icon.png';
import whisperOfTheSourceIcon from '@/assets/images/items/icons/brilliant-boss-set/WhisperOfTheSource_icon.png';

// 黎明BOSS套裝
import dawnGuardianAngelRingIcon from '@/assets/images/items/icons/dawn-boss-set/DawnGuardianAngelRing_icon.png';
import daybreakPendantIcon from '@/assets/images/items/icons/dawn-boss-set/DaybreakPendant_icon.png';
import estellaEarringsIcon from '@/assets/images/items/icons/dawn-boss-set/EstellaEarrings_icon.png';
import twilightMarkIcon from '@/assets/images/items/icons/dawn-boss-set/TwilightMark_icon.png';

// 卓越鐵鎚
import exceptionalHammerBeltIcon from '@/assets/images/items/icons/exceptional-hammer/ExceptionalHammerBelt_icon.png';
import exceptionalHammerEarringsIcon from '@/assets/images/items/icons/exceptional-hammer/ExceptionalHammerEarrings_icon.png';
import exceptionalHammerEyeAccIcon from '@/assets/images/items/icons/exceptional-hammer/ExceptionalHammerEyeAcc_icon.png';
import exceptionalHammerFaceAccIcon from '@/assets/images/items/icons/exceptional-hammer/ExceptionalHammerFaceAcc_icon.png';

// BOSS戒指箱
import blackJadeBossRingBoxIcon from '@/assets/images/items/icons/jade-boss-ring-box/BlackJadeBossRingBox_icon.png';
import greenJadeBossRingBoxIcon from '@/assets/images/items/icons/jade-boss-ring-box/GreenJadeBossRingBox_icon.png';
import lifeJadeBossRingBoxIcon from '@/assets/images/items/icons/jade-boss-ring-box/LifeJadeBossRingBox_icon.png';
import redJadeBossRingBoxIcon from '@/assets/images/items/icons/jade-boss-ring-box/RedJadeBossRingBox_icon.png';
import whiteJadeBossRingBoxIcon from '@/assets/images/items/icons/jade-boss-ring-box/WhiteJadeBossRingBox_icon.png';

export interface ItemData {
  name: string;
  image: StaticImageData | null;
}

export const itemDatabase: Record<string, ItemData> = {
  // 漆黑BOSS套裝
  [berserkedIcon.src]: { name: '口紅控制器標誌', image: berserkedIcon },
  [commandingForceEarringIcon.src]: { name: '指揮官力量耳環', image: commandingForceEarringIcon },
  [damagedBlackHeartIcon.src]: { name: '受損的黑心臟', image: damagedBlackHeartIcon },
  [dreamyBeltIcon.src]: { name: '夢幻的腰帶', image: dreamyBeltIcon },
  [endlessTerrorIcon.src]: { name: '巨大的恐怖', image: endlessTerrorIcon },
  [genesisBadgeIcon.src]: { name: '創世胸章', image: genesisBadgeIcon },
  [magicEyepatchIcon.src]: { name: '附有魔力的眼罩', image: magicEyepatchIcon },
  [mitrasRageSelectionBoxIcon.src]: { name: '米特拉的憤怒選擇箱', image: mitrasRageSelectionBoxIcon },
  [sourceOfSufferingIcon.src]: { name: '苦痛的根源', image: sourceOfSufferingIcon },
  [totalControlIcon.src]: { name: '全面控制核心', image: totalControlIcon },
  [willsCursedSpellbookSelectionBoxIcon.src]: { name: '受詛咒的魔導書選擇箱', image: willsCursedSpellbookSelectionBoxIcon },

  // 光輝BOSS套裝
  [oathOfDeathIcon.src]: { name: '死亡之誓', image: oathOfDeathIcon },
  [whisperOfTheSourceIcon.src]: { name: '根源的耳語', image: whisperOfTheSourceIcon },

  // 黎明BOSS套裝
  [dawnGuardianAngelRingIcon.src]: { name: '守護者天使戒指', image: dawnGuardianAngelRingIcon },
  [daybreakPendantIcon.src]: { name: '破曉墜飾', image: daybreakPendantIcon },
  [estellaEarringsIcon.src]: { name: '星耀耳環', image: estellaEarringsIcon },
  [twilightMarkIcon.src]: { name: '暮光印記', image: twilightMarkIcon },

  // 基礎道具
  [grindstoneOfFaithIcon.src]: { name: '信念研磨石', image: grindstoneOfFaithIcon },
  [grindstoneOfLifeIcon.src]: { name: '生命研磨石', image: grindstoneOfLifeIcon },
  [greenStoneIcon.src]: { name: '祈禱精髓(楓幣減免)', image: greenStoneIcon },
  [redStoneIcon.src]: { name: '祈禱精髓(固定潛能)', image: redStoneIcon },

  // BOSS戒指箱
  [blackJadeBossRingBoxIcon.src]: { name: '黑玉的BOSS戒指箱子', image: blackJadeBossRingBoxIcon },
  [greenJadeBossRingBoxIcon.src]: { name: '綠玉的BOSS戒指箱子', image: greenJadeBossRingBoxIcon },
  [lifeJadeBossRingBoxIcon.src]: { name: '生命的BOSS戒指箱子', image: lifeJadeBossRingBoxIcon },
  [redJadeBossRingBoxIcon.src]: { name: '紅玉的BOSS戒指箱子', image: redJadeBossRingBoxIcon },
  [whiteJadeBossRingBoxIcon.src]: { name: '白玉的BOSS戒指箱子', image: whiteJadeBossRingBoxIcon },

  // 機器人
  [annihilationWeaponLotusroidIcon.src]: { name: '殲滅武器史烏機器人', image: annihilationWeaponLotusroidIcon },
  [baldrixroidIcon.src]: { name: '巴德利斯機器人', image: baldrixroidIcon },
  [damienroidIcon.src]: { name: '戴米安機器人', image: damienroidIcon },
  [kalingroidIcon.src]: { name: '咖凌機器人', image: kalingroidIcon },
  [limboroidIcon.src]: { name: '林波機器人', image: limboroidIcon },
  [lotusroidIcon.src]: { name: '史烏機器人', image: lotusroidIcon },
  [lucidroidIcon.src]: { name: '露希妲機器人', image: lucidroidIcon },
  [malitiaroidIcon.src]: { name: '瑪麗西亞機器人', image: malitiaroidIcon },
  [nickyroidIcon.src]: { name: '尼基機器人', image: nickyroidIcon },

  // 卓越鐵鎚
  [exceptionalHammerBeltIcon.src]: { name: '卓越鐵鎚(腰帶)', image: exceptionalHammerBeltIcon },
  [exceptionalHammerEarringsIcon.src]: { name: '卓越鐵鎚(耳環)', image: exceptionalHammerEarringsIcon },
  [exceptionalHammerEyeAccIcon.src]: { name: '卓越鐵鎚(眼飾)', image: exceptionalHammerEyeAccIcon },
  [exceptionalHammerFaceAccIcon.src]: { name: '卓越鐵鎚(臉飾)', image: exceptionalHammerFaceAccIcon },

  // 其他掉落物
  [absoLabArmorBoxIcon.src]: { name: '航海師防具箱', image: absoLabArmorBoxIcon },
  [absoLabWeaponBoxIcon.src]: { name: '航海師武器箱', image: absoLabWeaponBoxIcon },
  [arcaneUmbraArmorBoxIcon.src]: { name: '神秘冥界幽靈防具箱', image: arcaneUmbraArmorBoxIcon },
  [arcaneUmbraWeaponBoxIcon.src]: { name: '神秘冥界幽靈武器箱', image: arcaneUmbraWeaponBoxIcon },
  [cursedKaiseriumIcon.src]: { name: '被詛咒的凱撒利恩', image: cursedKaiseriumIcon },
  [desiredEthernalArmorBoxIcon.src]: { name: '慾望的永恆防具箱', image: desiredEthernalArmorBoxIcon },
  [distortedDesiresCrystalIcon.src]: { name: '扭曲的慾望結晶', image: distortedDesiresCrystalIcon },
  [divineEternalArmorBoxIcon.src]: { name: '意志的永恆防具箱', image: divineEternalArmorBoxIcon },
  [ferociousBeastEntanglementRingIcon.src]: { name: '交織的凶獸之環', image: ferociousBeastEntanglementRingIcon },
  [ferociousBeastEternalArmorBoxIcon.src]: { name: '兇獸的永恆防具箱', image: ferociousBeastEternalArmorBoxIcon },
  [ferociousEntanglementRingFragmentIcon.src]: { name: '交織的凶獸之環碎片', image: ferociousEntanglementRingFragmentIcon },
  [golluxCoinIcon.src]: { name: '培羅德硬幣', image: golluxCoinIcon },
  [kalossResidualDeterminationIcon.src]: { name: '遺留的卡洛斯意志', image: kalossResidualDeterminationIcon },
  [kalossResidualDeterminationFragmentIcon.src]: { name: '遺留的卡洛斯的意志碎片', image: kalossResidualDeterminationFragmentIcon },
  [mirrorWorldNodestoneIcon.src]: { name: '鏡子世界的核心寶石', image: mirrorWorldNodestoneIcon },
  [mitrasNodestoneIcon.src]: { name: '米特拉的核心寶石', image: mitrasNodestoneIcon },
  [oathswornEthernalArmorBoxIcon.src]: { name: '誓言的永恆防具箱', image: oathswornEthernalArmorBoxIcon },
  [princessNoEffectCouponIcon.src]: { name: '濃姬特效交換券', image: princessNoEffectCouponIcon },
  [ruinForceShieldIcon.src]: { name: '毀滅力量盾牌', image: ruinForceShieldIcon },
  [superiorEngravedGolluxBeltIcon.src]: { name: '頂級培羅德烙印腰帶', image: superiorEngravedGolluxBeltIcon },
  [superiorGolluxEarringsIcon.src]: { name: '頂級培羅德耳環', image: superiorGolluxEarringsIcon },
  [traceOfEternalLoyaltyIcon.src]: { name: '永遠忠誠的痕跡', image: traceOfEternalLoyaltyIcon },
  [MalitiaDrops2Icon.src]: { name: '月之淚', image: MalitiaDrops2Icon },
  [MalitiaDrops3Icon.src]: { name: '月亮的意志', image: MalitiaDrops3Icon },
  [MaliciousEternalArmorBoxIcon.src]: { name: '惡意的永恆防具箱', image: MaliciousEternalArmorBoxIcon },
  [MalitiaSoulIcon.src]: { name: '瑪麗西亞靈魂寶珠', image: MalitiaSoulIcon }
};

// 篩選選單中要顯示的物品
export const filterableItems: ItemData[] = [
  { name: '信念研磨石', image: grindstoneOfFaithIcon },
  { name: '生命研磨石', image: grindstoneOfLifeIcon },
  { name: '生命的BOSS戒指箱子', image: lifeJadeBossRingBoxIcon },
  { name: '白玉的BOSS戒指箱子', image: whiteJadeBossRingBoxIcon },
  { name: '黑玉的BOSS戒指箱子', image: blackJadeBossRingBoxIcon },
  { name: '紅玉的BOSS戒指箱子', image: redJadeBossRingBoxIcon },
  { name: '綠玉的BOSS戒指箱子', image: greenJadeBossRingBoxIcon },
  { name: '祈禱精髓(楓幣減免)', image: greenStoneIcon },
  { name: '祈禱精髓(固定潛能)', image: redStoneIcon }
];

// 根據圖片找到掉落物資訊
export const getDropInfo = (imagePath: string | StaticImageData): ItemData => {
  // imagePath 可能是物件（包含 .src）或字串
  const key = typeof imagePath === 'string' ? imagePath : imagePath.src;
  return itemDatabase[key] || {
    name: '未知掉落物',
    image: null
  };
};

export {
  // BOSS戒指箱
  blackJadeBossRingBoxIcon,
  greenJadeBossRingBoxIcon,
  lifeJadeBossRingBoxIcon,
  redJadeBossRingBoxIcon,
  whiteJadeBossRingBoxIcon,

  // 漆黑BOSS套裝
  berserkedIcon,
  commandingForceEarringIcon,
  damagedBlackHeartIcon,
  dreamyBeltIcon,
  endlessTerrorIcon,
  genesisBadgeIcon,
  magicEyepatchIcon,
  mitrasRageSelectionBoxIcon,
  sourceOfSufferingIcon,
  totalControlIcon,
  willsCursedSpellbookSelectionBoxIcon,

  // 光輝BOSS套裝
  oathOfDeathIcon,
  whisperOfTheSourceIcon,

  // 黎明BOSS套裝
  dawnGuardianAngelRingIcon,
  daybreakPendantIcon,
  estellaEarringsIcon,
  twilightMarkIcon,

  // 機器人
  annihilationWeaponLotusroidIcon,
  baldrixroidIcon,
  damienroidIcon,
  kalingroidIcon,
  limboroidIcon,
  lotusroidIcon,
  lucidroidIcon,
  malitiaroidIcon,
  nickyroidIcon,

  // 卓越鐵鎚
  exceptionalHammerBeltIcon,
  exceptionalHammerEarringsIcon,
  exceptionalHammerEyeAccIcon,
  exceptionalHammerFaceAccIcon,

  // 其他掉落物
  greenStoneIcon,
  redStoneIcon,
  grindstoneOfFaithIcon,
  grindstoneOfLifeIcon,
  absoLabArmorBoxIcon,
  absoLabWeaponBoxIcon,
  arcaneUmbraArmorBoxIcon,
  arcaneUmbraWeaponBoxIcon,
  cursedKaiseriumIcon,
  desiredEthernalArmorBoxIcon,
  distortedDesiresCrystalIcon,
  divineEternalArmorBoxIcon,
  ferociousBeastEntanglementRingIcon,
  ferociousBeastEternalArmorBoxIcon,
  ferociousEntanglementRingFragmentIcon,
  golluxCoinIcon,
  kalossResidualDeterminationIcon,
  kalossResidualDeterminationFragmentIcon,
  mirrorWorldNodestoneIcon,
  mitrasNodestoneIcon,
  oathswornEthernalArmorBoxIcon,
  princessNoEffectCouponIcon,
  ruinForceShieldIcon,
  superiorEngravedGolluxBeltIcon,
  superiorGolluxEarringsIcon,
  traceOfEternalLoyaltyIcon,
  MalitiaDrops2Icon,
  MalitiaDrops3Icon,
  MaliciousEternalArmorBoxIcon,
  MalitiaSoulIcon
};