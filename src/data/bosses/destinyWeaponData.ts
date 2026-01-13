const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || '';
const serenIcon = `${CDN_URL}/images/bosses/icons/Seren_icon.png`;
const kalosIcon = `${CDN_URL}/images/bosses/icons/Kalos_icon.png`;
const firstAdversaryIcon = `${CDN_URL}/images/bosses/icons/FirstAdversary_icon.png`;
const kalingIcon = `${CDN_URL}/images/bosses/icons/Kaling_icon.png`;
const limboIcon = `${CDN_URL}/images/bosses/icons/Limbo_icon.png`;
const baldrixIcon = `${CDN_URL}/images/bosses/icons/Baldrix_icon.png`;
const adversarysDetermination = `${CDN_URL}/images/items/icons/adversary's-determination.png`;

export interface Difficulty {
  name: string;
  energy: number;
}

export interface BossInfo {
  name: string;
  players: number;
  difficulties: {
    [key: string]: Difficulty;
  };
}

export interface DestinyBossData {
  [key: string]: BossInfo;
}

export const destinyBossData: DestinyBossData = {
  seren: {
    name: '賽連',
    players: 6,
    difficulties: {
      hard: { name: '困難', energy: 6 },
      extreme: { name: '極限', energy: 80 }
    }
  },
  kalos: {
    name: '卡洛斯',
    players: 6,
    difficulties: {
      normal: { name: '普通', energy: 10 },
      hard: { name: '困難', energy: 70 },
      extreme: { name: '極限', energy: 400 }
    }
  },
  firstAdversary: {
    name: '最初的敵對者',
    players: 3,
    difficulties: {
      normal: { name: '普通', energy: 20 },
      hard: { name: '困難', energy: 120 },
      extreme: { name: '極限', energy: 500 }
    }
  },
  kaling: {
    name: '咖凌',
    players: 6,
    difficulties: {
      normal: { name: '普通', energy: 20 },
      hard: { name: '困難', energy: 160 },
      extreme: { name: '極限', energy: 1200 }
    }
  },
  limbo: {
    name: '林波',
    players: 3,
    difficulties: {
      normal: { name: '普通', energy: 120 },
      hard: { name: '困難', energy: 360 }
    }
  },
  baldrix: {
    name: '巴德利斯',
    players: 3,
    difficulties: {
      normal: { name: '普通', energy: 150 },
      hard: { name: '困難', energy: 450 }
    }
  }
};

export const destinyItemIcon: Record<string, string> = {
  adversarysDetermination: adversarysDetermination
};

export const destinyBossIcon: Record<string, string> = {
  seren: serenIcon,
  serenReset: serenIcon,
  kalos: kalosIcon,
  kalosReset: kalosIcon,
  firstAdversary: firstAdversaryIcon,
  kaling: kalingIcon,
  limbo: limboIcon,
  baldrix: baldrixIcon
};

export const destinyStageEnergy: number[] = [2000, 2500, 3000];
export const destinyStageCumulative: number[] = [2000, 4500, 7500];

export const MAX_ENERGY: number = 7500;
