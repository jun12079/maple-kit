import serenIcon from "@/assets/images/bosses/icons/Seren_icon.png";
import kalosIcon from "@/assets/images/bosses/icons/Kalos_icon.png";
import kalingIcon from "@/assets/images/bosses/icons/Kaling_icon.png";
import limboIcon from "@/assets/images/bosses/icons/Limbo_icon.png";
import baldrixIcon from "@/assets/images/bosses/icons/Baldrix_icon.png";

export const destinyBossData = {
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
  kaling: {
    name: '卡凌',
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

export const destinyBossIcon = {
  seren: serenIcon,
  serenReset: serenIcon,
  kalos: kalosIcon,
  kalosReset: kalosIcon,
  kaling: kalingIcon,
  limbo: limboIcon,
  baldrix: baldrixIcon
};

export const destinyStageEnergy = [2000, 2500, 3000];
export const destinyStageCumulative = [2000, 4500, 7500];