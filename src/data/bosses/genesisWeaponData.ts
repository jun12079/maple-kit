const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || '';
const vonLeonIcon = `${CDN_URL}/images/bosses/icons/VonLeon_icon.png`;
const arkariumIcon = `${CDN_URL}/images/bosses/icons/Arkarium_icon.png`;
const magnusIcon = `${CDN_URL}/images/bosses/icons/Magnus_icon.png`;
const lotusIcon = `${CDN_URL}/images/bosses/icons/Lotus_icon.png`;
const damienIcon = `${CDN_URL}/images/bosses/icons/Damien_icon.png`;
const willIcon = `${CDN_URL}/images/bosses/icons/Will_icon.png`;
const lucidIcon = `${CDN_URL}/images/bosses/icons/Lucid_icon.png`;
const verusHillaIcon = `${CDN_URL}/images/bosses/icons/VerusHilla_icon.png`;
const gloomIcon = `${CDN_URL}/images/bosses/icons/Gloom_icon.png`;
const darknellIcon = `${CDN_URL}/images/bosses/icons/Darknell_icon.png`;
const blackMageIcon = `${CDN_URL}/images/bosses/icons/BlackMage_icon.png`;
const tracesOfDarkness = `${CDN_URL}/images/items/icons/traces-of-darkness.png`;
const genesisPass = `${CDN_URL}/images/items/icons/genesis-pass.png`;

export interface Difficulty {
  name: string;
  energy: number;
}

export interface BossInfo {
  name: string;
  players: number;
  difficulties: Record<string, Difficulty>;
}

export const genesisBossData: Record<string, BossInfo> = {
  lotus: {
    name: '史烏',
    players: 6,
    difficulties: {
      normal: { name: '普通', energy: 10 },
      hard: { name: '困難', energy: 50 },
      extreme: { name: '極限', energy: 50 }
    }
  },
  damien: {
    name: '戴米安',
    players: 6,
    difficulties: {
      normal: { name: '普通', energy: 10 },
      hard: { name: '困難', energy: 50 },
    }
  },
  lucid: {
    name: '露希妲',
    players: 6,
    difficulties: {
      normal: { name: '普通', energy: 20 },
      hard: { name: '困難', energy: 65 },
    }
  },
  will: {
    name: '威爾',
    players: 6,
    difficulties: {
      easy: { name: '簡單', energy: 15 },
      normal: { name: '普通', energy: 25 },
      hard: { name: '困難', energy: 75 }
    }
  },
  gloom: {
    name: '戴斯克',
    players: 6,
    difficulties: {
      normal: { name: '普通', energy: 20 },
      hard: { name: '困難', energy: 65 }
    }
  },
  darknell: {
    name: '頓凱爾',
    players: 6,
    difficulties: {
      normal: { name: '普通', energy: 25 },
      hard: { name: '困難', energy: 75 }
    }
  },
  verusHilla: {
    name: '真希拉',
    players: 6,
    difficulties: {
      normal: { name: '普通', energy: 45 },
      hard: { name: '困難', energy: 90 }
    }
  },
  blackMage: {
    name: '黑魔法師',
    players: 6,
    difficulties: {
      hard: { name: '困難', energy: 600 },
      extreme: { name: '極限', energy: 600 }
    }
  }
};

export const genesisItemIcon: Record<string, string> = {
  tracesOfDarkness: tracesOfDarkness,
  genesisPass: genesisPass
};

export const genesisBossIcon: Record<string, string> = {
  lotus: lotusIcon,
  damien: damienIcon,
  lucid: lucidIcon,
  will: willIcon,
  gloom: gloomIcon,
  darknell: darknellIcon,
  verusHilla: verusHillaIcon,
  blackMage: blackMageIcon
};

export const genesisStageIcon: Record<string, string> = {
  vonLeon: vonLeonIcon,
  arkarium: arkariumIcon,
  magnus: magnusIcon,
  lotus: lotusIcon,
  damien: damienIcon,
  will: willIcon,
  lucid: lucidIcon,
  verusHilla: verusHillaIcon,
};

export const genesisStageEnergy: number[] = [500, 500, 500, 1000, 1000, 1000, 1000, 1000];
export const genesisStageCumulative: number[] = [500, 1000, 1500, 2500, 3500, 4500, 5500, 6500];

export const MAX_ENERGY = 6500;
export const WEEKLY_BOSSES = ['lotus', 'damien', 'lucid', 'will', 'gloom', 'darknell', 'verusHilla'];
export const MONTHLY_BOSSES = ['blackMage'];
