import vonLeonIcon from "@/assets/images/bosses/icons/VonLeon_icon.png";
import arkariumIcon from "@/assets/images/bosses/icons/Arkarium_icon.png";
import magnusIcon from "@/assets/images/bosses/icons/Magnus_icon.png";
import lotusIcon from "@/assets/images/bosses/icons/Lotus_icon.png";
import damienIcon from "@/assets/images/bosses/icons/Damien_icon.png";
import willIcon from "@/assets/images/bosses/icons/Will_icon.png";
import lucidIcon from "@/assets/images/bosses/icons/Lucid_icon.png";
import verusHillaIcon from "@/assets/images/bosses/icons/VerusHilla_icon.png";
import gloomIcon from "@/assets/images/bosses/icons/Gloom_icon.png";
import darknellIcon from "@/assets/images/bosses/icons/Darknell_icon.png";
import blackMageIcon from "@/assets/images/bosses/icons/BlackMage_icon.png";

export const genesisBossData = {
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

export const genesisBossIcon = {
  lotus: lotusIcon,
  damien: damienIcon,
  lucid: lucidIcon,
  will: willIcon,
  gloom: gloomIcon,
  darknell: darknellIcon,
  verusHilla: verusHillaIcon,
  blackMage: blackMageIcon
};

export const genesisStageIcon = {
  vonLeon: vonLeonIcon,
  arkarium: arkariumIcon,
  magnus: magnusIcon,
  lotus: lotusIcon,
  damien: damienIcon,
  lucid: lucidIcon,
  will: willIcon,
  verusHilla: verusHillaIcon,
};

export const genesisStageCumulative = [500, 1000, 1500, 2500, 3500, 4500, 5500, 6500];