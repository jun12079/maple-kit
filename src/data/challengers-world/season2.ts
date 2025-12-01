import { StaticImageData } from "next/image";

// 匯入挑戰者世界圖示
import level260Icon from "@/assets/images/challengers-world/icons/challenger-level-260.png";
import level270Icon from "@/assets/images/challengers-world/icons/challenger-level-270.png";
import level275Icon from "@/assets/images/challengers-world/icons/challenger-level-275.png";
import level280Icon from "@/assets/images/challengers-world/icons/challenger-level-280.png";
import level285Icon from "@/assets/images/challengers-world/icons/challenger-level-285.png";

import bronzeMedal from "@/assets/images/challengers-world/icons/bronze-medal.png";
import silverMedal from "@/assets/images/challengers-world/icons/silver-medal.png";
import goldMedal from "@/assets/images/challengers-world/icons/gold-medal.png";
import platinumMedal from "@/assets/images/challengers-world/icons/platinum-medal.png";
import emeraldMedal from "@/assets/images/challengers-world/icons/emerald-medal.png";
import diamondMedal from "@/assets/images/challengers-world/icons/diamond-medal.png";
import masterMedal from "@/assets/images/challengers-world/icons/master-medal.png";
import challengerMedal from "@/assets/images/challengers-world/icons/challenger-medal.png";

export const DAILY_MISSION_POINTS = 100;
export const DAILY_MISSION_COINS = 300;
export const EVENT_START_DATE = new Date("2025-12-03T00:00:00");
export const EVENT_END_DATE = new Date("2026-04-07T23:59:59");

export const LEVELS = [260, 270, 275, 280, 285];
export const LEVEL_ICONS: Record<number, StaticImageData> = {
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

export const RANKS = [
  { name: "青銅", points: 5000, icon: bronzeMedal },
  { name: "白銀", points: 10000, icon: silverMedal },
  { name: "黃金", points: 15000, icon: goldMedal },
  { name: "白金", points: 20000, icon: platinumMedal },
  { name: "翡翠", points: 30000, icon: emeraldMedal },
  { name: "鑽石", points: 40000, icon: diamondMedal },
  { name: "大師", points: 60000, icon: masterMedal },
  { name: "挑戰者", points: 75000, icon: challengerMedal },
];

export const BOSS_ORDER = [
  "cygnus", "hilla", "pinkBean", "zakum", "pierre", "vonBon", "crimsonQueen", "magnus",
  "vellum", "princessNo", "papulatus", "lotus", "damien", "guardianAngelSlime", "lucid", "will", "gloom",
  "verusHilla", "darknell", "blackMage", "seren", "kalos", "kaling"
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
};
