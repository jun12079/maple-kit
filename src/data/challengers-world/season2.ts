// 匯入挑戰者世界圖示
const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || '';
const level260Icon = `${CDN_URL}/images/challengers-world/icons/challenger-level-260.png`;
const level270Icon = `${CDN_URL}/images/challengers-world/icons/challenger-level-270.png`;
const level275Icon = `${CDN_URL}/images/challengers-world/icons/challenger-level-275.png`;
const level280Icon = `${CDN_URL}/images/challengers-world/icons/challenger-level-280.png`;
const level285Icon = `${CDN_URL}/images/challengers-world/icons/challenger-level-285.png`;
const bronzeMedal = `${CDN_URL}/images/challengers-world/icons/challenger-s2-bronze-medal.png`;
const silverMedal = `${CDN_URL}/images/challengers-world/icons/challenger-s2-silver-medal.png`;
const goldMedal = `${CDN_URL}/images/challengers-world/icons/challenger-s2-gold-medal.png`;
const platinumMedal = `${CDN_URL}/images/challengers-world/icons/challenger-s2-platinum-medal.png`;
const emeraldMedal = `${CDN_URL}/images/challengers-world/icons/challenger-s2-emerald-medal.png`;
const diamondMedal = `${CDN_URL}/images/challengers-world/icons/challenger-s2-diamond-medal.png`;
const masterMedal = `${CDN_URL}/images/challengers-world/icons/challenger-s2-master-medal.png`;
const challengerMedal = `${CDN_URL}/images/challengers-world/icons/challenger-s2-challenger-medal.png`;

const braveChallengerTotemCoupon = `${CDN_URL}/images/challengers-world/icons/brave-challenger-totem-coupon.png`;
const braveChallengerTotemEnhancementScroll = `${CDN_URL}/images/challengers-world/icons/brave-challenger-totem-enhancement-scroll.png`;
const challengerWorldSeason2ChallengerFurniture = `${CDN_URL}/images/challengers-world/icons/challenger-world-season2-challenger-furniture.png`;
const challengersLevel4SpecialSkillRingSelectionCoupon = `${CDN_URL}/images/challengers-world/icons/challengers-level4-special-skill-ring-selection-coupon.png`;
const ultmateUnionGrowthPotion = `${CDN_URL}/images/challengers-world/icons/ultmate-union-growth-potion.png`;
const valkyrieOnTheBattlefieldSetCoupon = `${CDN_URL}/images/challengers-world/icons/valkyrie-on-the-battlefield-set-coupon.png`;
const karmaLegendaryPotentialScroll = `${CDN_URL}/images/items/icons/karma-legendary-potential-scroll.png`;
const karmaAdditionalUniquePotentialScroll = `${CDN_URL}/images/items/icons/karma-additional-unique-potential-scroll.png`;
const karmaChoiceCube = `${CDN_URL}/images/items/icons/karma-choice-cube.png`;
const karmaChoiceAdditionalCube = `${CDN_URL}/images/items/icons/karma-choice-additional-cube.png`;
const solErdaFragmentIcon = `${CDN_URL}/images/items/icons/SolErdaFragment_icon.png`;
const solErdaIcon = `${CDN_URL}/images/items/icons/SolErda_icon.png`;

export interface ChallengerReward {
  name: string;
  image: string;
  count: number;
}

export interface ChallengerRank {
  name: string;
  points: number;
  icon: string;
  rewards: ChallengerReward[];
}

export const DAILY_MISSION_POINTS = 100;
export const DAILY_MISSION_COINS = 300;
export const EVENT_START_DATE = new Date("2025-12-03T00:00:00");
export const EVENT_END_DATE = new Date("2026-04-07T23:59:59");

export const LEVELS = [260, 270, 275, 280, 285];
export const LEVEL_ICONS: Record<number, string> = {
  260: level260Icon,
  270: level270Icon,
  275: level275Icon,
  280: level280Icon,
  285: level285Icon,
};

export const LEVEL_REWARDS = {
  260: { points: 3000, coins: 3000 },
  270: { points: 3000, coins: 3000 },
  275: { points: 5000, coins: 4000 },
  280: { points: 7000, coins: 5000 },
  285: { points: 9000, coins: 7000 },
};

export const RANKS: ChallengerRank[] = [
  {
    name: "青銅",
    points: 5000,
    icon: bronzeMedal,
    rewards: [
      { name: "挑戰者S2青銅勳章", image: bronzeMedal, count: 1 },
      { name: "靈魂艾爾達碎片", image: solErdaFragmentIcon, count: 100 },
      { name: "靈魂艾爾達", image: solErdaIcon, count: 3 },
    ]
  },
  {
    name: "白銀",
    points: 10000,
    icon: silverMedal,
    rewards: [
      { name: "挑戰者S2白銀勳章", image: silverMedal, count: 1 },
      { name: "挑戰者4級特殊技能戒指選擇券", image: challengersLevel4SpecialSkillRingSelectionCoupon, count: 1 },
    ]
  },
  {
    name: "黃金",
    points: 15000,
    icon: goldMedal,
    rewards: [
      { name: "挑戰者S2黃金勳章", image: goldMedal, count: 1 },
      { name: "靈魂艾爾達碎片", image: solErdaFragmentIcon, count: 200 },
      { name: "靈魂艾爾達", image: solErdaIcon, count: 5 },
      { name: "勇敢挑戰者的圖騰交換券", image: braveChallengerTotemCoupon, count: 1 },
    ]
  },
  {
    name: "白金",
    points: 20000,
    icon: platinumMedal,
    rewards: [
      { name: "挑戰者S2白金勳章", image: platinumMedal, count: 1 },
      { name: "靈魂艾爾達碎片", image: solErdaFragmentIcon, count: 300 },
      { name: "靈魂艾爾達", image: solErdaIcon, count: 5 },
      { name: "勇敢挑戰者的圖騰強化卷軸", image: braveChallengerTotemEnhancementScroll, count: 1 },
    ]
  },
  {
    name: "翡翠",
    points: 30000,
    icon: emeraldMedal,
    rewards: [
      { name: "挑戰者S2翡翠勳章", image: emeraldMedal, count: 1 },
      { name: "卡勒馬傳說潛在能力賦予卷軸", image: karmaLegendaryPotentialScroll, count: 1 },
      { name: "究極聯盟成長秘藥", image: ultmateUnionGrowthPotion, count: 20 },
      { name: "卡勒馬恢復方塊交換券", image: karmaChoiceCube, count: 30 },
      { name: "勇敢挑戰者的圖騰強化卷軸", image: braveChallengerTotemEnhancementScroll, count: 1 },
    ]
  },
  {
    name: "鑽石",
    points: 40000,
    icon: diamondMedal,
    rewards: [
      { name: "挑戰者S2鑽石勳章", image: diamondMedal, count: 1 },
      { name: "靈魂艾爾達碎片", image: solErdaFragmentIcon, count: 100 },
      { name: "靈魂艾爾達", image: solErdaIcon, count: 3 },
      { name: "卡勒馬附加罕見潛在能力賦予卷軸", image: karmaAdditionalUniquePotentialScroll, count: 1 },
      { name: "卡勒馬傳說潛在能力賦予卷軸", image: karmaLegendaryPotentialScroll, count: 1 },
      { name: "卡勒馬珍貴附加方塊交換券", image: karmaChoiceAdditionalCube, count: 30 },
      { name: "戰場女武神套裝交換券", image: valkyrieOnTheBattlefieldSetCoupon, count: 1 },
      { name: "勇敢挑戰者的圖騰強化卷軸", image: braveChallengerTotemEnhancementScroll, count: 1 },
    ]
  },
  {
    name: "大師",
    points: 60000,
    icon: masterMedal,
    rewards: [
      { name: "挑戰者S2大師勳章", image: masterMedal, count: 1 },
      { name: "卡勒馬恢復方塊交換券", image: karmaChoiceCube, count: 30 },
      { name: "卡勒馬珍貴附加方塊交換券", image: karmaChoiceAdditionalCube, count: 30 },
    ]
  },
  {
    name: "挑戰者",
    points: 75000,
    icon: challengerMedal,
    rewards: [
      { name: "挑戰者S2挑戰者勳章", image: challengerMedal, count: 1 },
      { name: "挑戰者世界S2挑戰者家具", image: challengerWorldSeason2ChallengerFurniture, count: 1 },
    ]
  },
];

export const BOSS_ORDER = [
  "cygnus", "hilla", "pinkBean", "zakum", "pierre", "vonBon", "crimsonQueen", "magnus",
  "vellum", "princessNo", "papulatus", "lotus", "damien", "guardianAngelSlime", "lucid", "will", "gloom",
  "verusHilla", "darknell", "blackMage", "seren", "kalos", "kaling", "firstAdversary"
];

export const DIFFICULTY_ORDER = ["easy", "normal", "hard", "chaos", "extreme"];

export const BOSS_REWARDS_DATA: Record<string, Record<string, { points: number; coins: number; advancedCoins?: number }>> = {
  cygnus: {
    easy: { points: 50, coins: 50 },
    normal: { points: 100, coins: 100 },
  },
  hilla: {
    normal: { points: 50, coins: 50 },
  },
  pinkBean: {
    chaos: { points: 100, coins: 100 },
  },
  zakum: {
    chaos: { points: 100, coins: 100 },
  },
  pierre: {
    chaos: { points: 100, coins: 100 },
  },
  vonBon: {
    chaos: { points: 100, coins: 100 },
  },
  crimsonQueen: {
    chaos: { points: 100, coins: 100 },
  },
  magnus: {
    hard: { points: 200, coins: 100 },
  },
  vellum: {
    chaos: { points: 200, coins: 100 },
  },
  princessNo: {
    hard: { points: 1000, coins: 1000 },
  },
  papulatus: {
    chaos: { points: 250, coins: 100 },
  },
  lotus: {
    normal: { points: 350, coins: 100 },
    hard: { points: 1500, coins: 400 },
  },
  damien: {
    normal: { points: 350, coins: 100 },
    hard: { points: 1500, coins: 400 },
  },
  guardianAngelSlime: {
    normal: { points: 500, coins: 100 },
    chaos: { points: 2500, coins: 600 },
  },
  lucid: {
    easy: { points: 500, coins: 100 },
    normal: { points: 1000, coins: 200 },
    hard: { points: 2000, coins: 600 },
  },
  will: {
    easy: { points: 500, coins: 100 },
    normal: { points: 1000, coins: 200 },
    hard: { points: 2500, coins: 600 },
  },
  gloom: {
    normal: { points: 1000, coins: 200 },
    chaos: { points: 2500, coins: 600 },
  },
  verusHilla: {
    normal: { points: 2000, coins: 600 },
    hard: { points: 3000, coins: 1000 },
  },
  darknell: {
    normal: { points: 1000, coins: 200 },
    hard: { points: 3000, coins: 1000 },
  },
  blackMage: {
    hard: { points: 5000, coins: 1400, advancedCoins: 20 },
  },
  seren: {
    normal: { points: 5000, coins: 1400, advancedCoins: 20 },
    hard: { points: 7000, coins: 2000, advancedCoins: 30 },
  },
  kalos: {
    easy: { points: 7000, coins: 2000, advancedCoins: 30 },
    normal: { points: 9000, coins: 3000, advancedCoins: 60 },
  },
  kaling: {
    easy: { points: 9000, coins: 3000, advancedCoins: 60 },
  },
  firstAdversary: {
    easy: { points: 0, coins: 2000, advancedCoins: 30 },
  },
};
