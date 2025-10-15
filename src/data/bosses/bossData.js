import zakumIcon from '@/assets/images/bosses/icons/Zakum_icon.png';
import horntailIcon from '@/assets/images/bosses/icons/Horntail_icon.png';
import hillaIcon from '@/assets/images/bosses/icons/Hilla_icon.png';
import pierreIcon from '@/assets/images/bosses/icons/Pierre_icon.png';
import vonBonIcon from '@/assets/images/bosses/icons/VonBon_icon.png';
import crimsonQueenIcon from '@/assets/images/bosses/icons/CrimsonQueen_icon.png';
import vellumIcon from '@/assets/images/bosses/icons/Vellum_icon.png';
import vonLeonIcon from '@/assets/images/bosses/icons/VonLeon_icon.png';
import arkariumIcon from '@/assets/images/bosses/icons/Arkarium_icon.png';
import magnusIcon from '@/assets/images/bosses/icons/Magnus_icon.png';
import pinkBeanIcon from '@/assets/images/bosses/icons/PinkBean_icon.png';
import cygnusIcon from '@/assets/images/bosses/icons/Cygnus_icon.png';
import lotusIcon from '@/assets/images/bosses/icons/Lotus_icon.png';
import damienIcon from '@/assets/images/bosses/icons/Damien_icon.png';
import golluxIcon from '@/assets/images/bosses/icons/Gollux_icon.png';
import moriRanmaruIcon from '@/assets/images/bosses/icons/MoriRanmaru_icon.png';
import princessNoIcon from '@/assets/images/bosses/icons/PrincessNo_icon.png';
import lucidIcon from '@/assets/images/bosses/icons/Lucid_icon.png';
import omniclnIcon from '@/assets/images/bosses/icons/OMNICLN_icon.png';
import papulatusIcon from '@/assets/images/bosses/icons/Papulatus_icon.png';
import willIcon from '@/assets/images/bosses/icons/Will_icon.png';
import verusHillaIcon from '@/assets/images/bosses/icons/VerusHilla_icon.png';
import blackMageIcon from '@/assets/images/bosses/icons/BlackMage_icon.png';
import gloomIcon from '@/assets/images/bosses/icons/Gloom_icon.png';
import darknellIcon from '@/assets/images/bosses/icons/Darknell_icon.png';
import serenIcon from '@/assets/images/bosses/icons/Seren_icon.png';
import guardianAngelSlimeIcon from '@/assets/images/bosses/icons/GuardianAngelSlime_icon.png';
import kalosIcon from '@/assets/images/bosses/icons/Kalos_icon.png';
import kalingIcon from '@/assets/images/bosses/icons/Kaling_icon.png';
import limboIcon from '@/assets/images/bosses/icons/Limbo_icon.png';
import baldrixIcon from '@/assets/images/bosses/icons/Baldrix_icon.png';

// 從itemDatabase導入圖片
import {
  absoLabArmorBoxIcon,
  absoLabWeaponBoxIcon,
  arcaneUmbraArmorBoxIcon,
  arcaneUmbraWeaponBoxIcon,
  desiredEthernalArmorBoxIcon,
  distortedDesiresCrystalIcon,
  divineEternalArmorBoxIcon,
  ferociousBeastEntanglementRingIcon,
  ferociousBeastEternalArmorBoxIcon,
  ferociousEntanglementRingFragmentIcon,
  golluxCoinIcon,
  greenStoneIcon,
  grindstoneOfFaithIcon,
  grindstoneOfLifeIcon,
  kalossResidualDeterminationIcon,
  kalossResidualDeterminationFragmentIcon,
  mirrorWorldNodestoneIcon,
  mitrasNodestoneIcon,
  oathswornEthernalArmorBoxIcon,
  princessNoEffectCouponIcon,
  redStoneIcon,
  ruinForceShieldIcon,
  superiorEngravedGolluxBeltIcon,
  superiorGolluxEarringsIcon,
  traceOfEternalLoyaltyIcon,
  annihilationWeaponLotusroidIcon,
  baldrixroidIcon,
  damienroidIcon,
  kalingroidIcon,
  limboroidIcon,
  lotusroidIcon,
  lucidroidIcon,
  nickyroidIcon,
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
  oathOfDeathIcon,
  whisperOfTheSourceIcon,
  dawnGuardianAngelRingIcon,
  daybreakPendantIcon,
  estellaEarringsIcon,
  twilightMarkIcon,
  exceptionalHammerBeltIcon,
  exceptionalHammerEarringsIcon,
  exceptionalHammerEyeAccIcon,
  exceptionalHammerFaceAccIcon,
  blackJadeBossRingBoxIcon,
  greenJadeBossRingBoxIcon,
  lifeJadeBossRingBoxIcon,
  redJadeBossRingBoxIcon,
  whiteJadeBossRingBoxIcon
} from '@/data/items/itemDatabase';

export const bossData = {
  zakum: {
    name: '殘暴炎魔',
    image: zakumIcon,
    players: 6,
    difficulties: {
      easy: {
        level: 50,
        health: [2200000],
        defense: 30,
        symbol: null,
        reset: 'daily',
        drops: [greenStoneIcon, redStoneIcon],
        solErda: null,
        mesos: 115800
      },
      normal: {
        level: 110,
        health: [7000000],
        defense: 40,
        symbol: null,
        reset: 'daily',
        drops: [greenStoneIcon, redStoneIcon],
        solErda: null,
        mesos: 354800
      },
      chaos: {
        level: 180,
        health: [84000000000],
        defense: 100,
        symbol: null,
        reset: 'weekly',
        drops: [greenStoneIcon, redStoneIcon],
        solErda: null,
        mesos: 7059750
      }
    }
  },
  horntail: {
    name: '闇黑龍王',
    image: horntailIcon,
    players: 6,
    difficulties: {
      easy: {
        level: 130,
        health: [100000000, 100000000, 817600000],
        defense: 40,
        symbol: null,
        reset: 'daily',
        drops: [greenStoneIcon, redStoneIcon],
        solErda: null,
        mesos: 511000
      },
      normal: {
        level: 160,
        health: [330000000, 330000000, 2090000000],
        defense: 40,
        symbol: null,
        reset: 'daily',
        drops: [greenStoneIcon, redStoneIcon],
        solErda: null,
        mesos: 586600
      },
      chaos: {
        level: 160,
        health: [3300000000, 3300000000, 20000000000],
        defense: 50,
        symbol: null,
        reset: 'daily',
        drops: [greenStoneIcon, redStoneIcon],
        solErda: null,
        mesos: 783300
      }
    }
  },
  hilla: {
    name: '希拉',
    image: hillaIcon,
    players: 6,
    difficulties: {
      normal: {
        level: 110,
        health: [500000000],
        defense: 50,
        symbol: null,
        reset: 'daily',
        drops: [greenStoneIcon, redStoneIcon],
        solErda: null,
        mesos: 463500
      },
      hard: {
        level: 190,
        health: [16800000000],
        defense: 100,
        symbol: null,
        reset: 'weekly',
        drops: [greenStoneIcon, redStoneIcon],
        solErda: null,
        mesos: 6677700
      }
    }
  },
  pierre: {
    name: '比艾樂',
    image: pierreIcon,
    players: 6,
    difficulties: {
      normal: {
        level: 120,
        health: [315000000],
        defense: 50,
        symbol: null,
        reset: 'daily',
        drops: [greenStoneIcon, redStoneIcon],
        solErda: null,
        mesos: 560800
      },
      chaos: {
        level: 190,
        health: [80000000000],
        defense: 80,
        symbol: null,
        reset: 'weekly',
        drops: [greenStoneIcon, redStoneIcon],
        solErda: null,
        mesos: 7313306
      }
    }
  },
  vonBon: {
    name: '斑斑',
    image: vonBonIcon,
    players: 6,
    difficulties: {
      normal: {
        level: 120,
        health: [315000000],
        defense: 50,
        symbol: null,
        reset: 'daily',
        drops: [greenStoneIcon, redStoneIcon],
        solErda: null,
        mesos: 560800
      },
      chaos: {
        level: 190,
        health: [100000000000],
        defense: 100,
        symbol: null,
        reset: 'weekly',
        drops: [greenStoneIcon, redStoneIcon],
        solErda: null,
        mesos: 7693781
      }
    }
  },
  crimsonQueen: {
    name: '血腥皇后',
    image: crimsonQueenIcon,
    players: 6,
    difficulties: {
      normal: {
        level: 120,
        health: [315000000],
        defense: 50,
        symbol: null,
        reset: 'daily',
        drops: [greenStoneIcon, redStoneIcon],
        solErda: null,
        mesos: 560800
      },
      chaos: {
        level: 190,
        health: [140000000000],
        defense: 120,
        symbol: null,
        reset: 'weekly',
        drops: [greenStoneIcon, redStoneIcon],
        solErda: null,
        mesos: 7682035
      }
    }
  },
  vellum: {
    name: '貝倫',
    image: vellumIcon,
    players: 6,
    difficulties: {
      normal: {
        level: 130,
        health: [550000000],
        defense: 55,
        symbol: null,
        reset: 'daily',
        drops: [greenStoneIcon, redStoneIcon],
        solErda: null,
        mesos: 560800
      },
      chaos: {
        level: 190,
        health: [200000000000],
        defense: 200,
        symbol: null,
        reset: 'weekly',
        drops: [greenStoneIcon, redStoneIcon],
        solErda: null,
        mesos: 9070003
      }
    }
  },
  vonLeon: {
    name: '凡雷恩',
    image: vonLeonIcon,
    players: 6,
    difficulties: {
      easy: {
        level: 120,
        health: [700000000],
        defense: 50,
        symbol: null,
        reset: 'daily',
        drops: [greenStoneIcon, redStoneIcon],
        solErda: null,
        mesos: 612900
      },
      normal: {
        level: 120,
        health: [6300000000],
        defense: 80,
        symbol: null,
        reset: 'daily',
        drops: [greenStoneIcon, redStoneIcon],
        solErda: null,
        mesos: 844700
      },
      hard: {
        level: 120,
        health: [10500000000],
        defense: 90,
        symbol: null,
        reset: 'daily',
        drops: [greenStoneIcon, redStoneIcon],
        solErda: null,
        mesos: 1419500
      }
    }
  },
  arkarium: {
    name: '阿卡伊農',
    image: arkariumIcon,
    players: 6,
    difficulties: {
      easy: {
        level: 130,
        health: [2100000000],
        defense: 60,
        symbol: null,
        reset: 'daily',
        drops: [greenStoneIcon, redStoneIcon],
        solErda: null,
        mesos: 667400
      },
      normal: {
        level: 170,
        health: [12600000000],
        defense: 90,
        symbol: null,
        reset: 'daily',
        drops: [greenStoneIcon, redStoneIcon],
        solErda: null,
        mesos: 1460300
      }
    }
  },
  magnus: {
    name: '梅格耐斯',
    image: magnusIcon,
    players: 6,
    difficulties: {
      easy: {
        level: 110,
        health: [400000000],
        defense: 50,
        symbol: null,
        reset: 'daily',
        drops: [greenStoneIcon, redStoneIcon],
        solErda: null,
        mesos: 418300
      },
      normal: {
        level: 130,
        health: [6000000000],
        defense: 80,
        symbol: null,
        reset: 'daily',
        drops: [greenStoneIcon, redStoneIcon],
        solErda: null,
        mesos: 1501700
      },
      hard: {
        level: 190,
        health: [120000000000],
        defense: 90,
        symbol: null,
        reset: 'weekly',
        drops: [greenStoneIcon, redStoneIcon],
        solErda: null,
        mesos: 8819007
      }
    }
  },
  pinkBean: {
    name: '粉豆',
    image: pinkBeanIcon,
    players: 6,
    difficulties: {
      normal: {
        level: 180,
        health: [2100000000],
        defense: 70,
        symbol: null,
        reset: 'daily',
        drops: [greenStoneIcon, redStoneIcon],
        solErda: null,
        mesos: 813700
      },
      chaos: {
        level: 190,
        health: [69300000000],
        defense: 180,
        symbol: null,
        reset: 'weekly',
        drops: [greenStoneIcon, redStoneIcon],
        solErda: null,
        mesos: 7630700
      }
    }
  },
  cygnus: {
    name: '西格諾斯',
    image: cygnusIcon,
    players: 6,
    difficulties: {
      easy: {
        level: 140,
        health: [10500000000],
        defense: 100,
        symbol: null,
        reset: 'weekly',
        drops: [greenStoneIcon, redStoneIcon],
        solErda: null,
        mesos: 5307400
      },
      normal: {
        level: 190,
        health: [63000000000],
        defense: 100,
        symbol: null,
        reset: 'weekly',
        drops: [greenStoneIcon, redStoneIcon],
        solErda: null,
        mesos: 8709400
      }
    }
  },
  lotus: {
    name: '史烏',
    image: lotusIcon,
    players: 2,
    difficulties: {
      normal: {
        level: 210,
        health: [472500000000, 472500000000, 630000000000],
        defense: 300,
        symbol: null,
        reset: 'weekly',
        drops: [greenJadeBossRingBoxIcon],
        solErda: 50,
        mesos: 27207040
      },
      hard: {
        level: 210,
        health: [10000000000000, 10000000000000, 13700000000000],
        defense: 300,
        symbol: null,
        reset: 'weekly',
        drops: [redJadeBossRingBoxIcon, lotusroidIcon, damagedBlackHeartIcon, berserkedIcon, absoLabArmorBoxIcon, absoLabWeaponBoxIcon],
        solErda: 50,
        mesos: 91900000
      },
      extreme: {
        level: 285,
        health: [540000000000000, 540000000000000, 720000000000000],
        defense: 380,
        symbol: null,
        reset: 'weekly',
        drops: [whiteJadeBossRingBoxIcon, annihilationWeaponLotusroidIcon, damagedBlackHeartIcon, berserkedIcon, absoLabArmorBoxIcon, absoLabWeaponBoxIcon, totalControlIcon],
        solErda: 50,
        mesos: 323500000
      }
    }
  },
  damien: {
    name: '戴米安',
    image: damienIcon,
    players: 6,
    difficulties: {
      normal: {
        level: 210,
        health: [840000000000, 360000000000],
        defense: 300,
        symbol: null,
        reset: 'weekly',
        drops: [ruinForceShieldIcon, greenJadeBossRingBoxIcon],
        solErda: 50,
        mesos: 28843452
      },
      hard: {
        level: 210,
        health: [25200000000000, 10800000000000],
        defense: 210,
        symbol: null,
        reset: 'weekly',
        drops: [ruinForceShieldIcon, redJadeBossRingBoxIcon, absoLabArmorBoxIcon, absoLabWeaponBoxIcon, damienroidIcon, magicEyepatchIcon],
        solErda: 50,
        mesos: 85700000
      }
    }
  },
  gollux: {
    name: '培羅德',
    image: golluxIcon,
    players: 6,
    difficulties: {
      easy: {
        level: 170,
        health: [50000000, 50000000, 10000000],
        defense: 10,
        symbol: null,
        reset: 'daily',
        drops: [null],
        solErda: null,
        mesos: null
      },
      normal: {
        level: 180,
        health: [3000000000, 3000000000, 600000000],
        defense: 15,
        symbol: null,
        reset: 'daily',
        drops: [null],
        solErda: null,
        mesos: null
      },
      hard: {
        level: 190,
        health: [75000000000, 75000000000, 15000000000],
        defense: 150,
        symbol: null,
        reset: 'daily',
        drops: [null],
        solErda: null,
        mesos: null
      },
      chaos: {
        level: 200,
        health: [350000000000, 350000000000, 70000000000],
        defense: 250,
        symbol: null,
        reset: 'daily',
        drops: [golluxCoinIcon, superiorGolluxEarringsIcon, superiorEngravedGolluxBeltIcon],
        solErda: null,
        mesos: null
      }
    }
  },
  moriRanmaru: {
    name: '森蘭丸',
    image: moriRanmaruIcon,
    players: 6,
    difficulties: {
      normal: {
        level: 129,
        health: [1000000000],
        defense: 55,
        symbol: null,
        reset: 'daily',
        drops: [null],
        solErda: null,
        mesos: 375500
      },
      chaos: {
        level: 195,
        health: [84000000000],
        defense: 55,
        symbol: null,
        reset: 'daily',
        drops: [null],
        solErda: null,
        mesos: 1543700
      }
    }
  },
  princessNo: {
    name: '濃姬',
    image: princessNoIcon,
    players: 6,
    difficulties: {
      normal: {
        level: 160,
        health: [200000000000],
        defense: 100,
        symbol: null,
        reset: 'weekly',
        drops: [princessNoEffectCouponIcon],
        solErda: null,
        mesos: 8953200
      }
    }
  },
  lucid: {
    name: '露希妲',
    image: lucidIcon,
    players: 6,
    difficulties: {
      easy: {
        level: 230,
        health: [6000000000000, 6000000000000],
        defense: 300,
        symbol: 360,
        reset: 'weekly',
        drops: [greenJadeBossRingBoxIcon],
        solErda: 50,
        mesos: 53800000
      },
      normal: {
        level: 230,
        health: [12000000000000, 12000000000000],
        defense: 300,
        symbol: 360,
        reset: 'weekly',
        drops: [greenJadeBossRingBoxIcon, twilightMarkIcon],
        solErda: 50,
        mesos: 64300000
      },
      hard: {
        level: 230,
        health: [50800000000000, 54000000000000, 12800000000000],
        defense: 300,
        symbol: 360,
        reset: 'weekly',
        drops: [redJadeBossRingBoxIcon, twilightMarkIcon, arcaneUmbraArmorBoxIcon, arcaneUmbraWeaponBoxIcon, lucidroidIcon, dreamyBeltIcon],
        solErda: 50,
        mesos: 102400000
      }
    }
  },
  omnicln: {
    name: '卡翁',
    image: omniclnIcon,
    players: 6,
    difficulties: {
      normal: {
        level: 180,
        health: [1680000000],
        defense: 60,
        symbol: null,
        reset: 'daily',
        drops: [null],
        solErda: null,
        mesos: 724200
      }
    }
  },
  papulatus: {
    name: '拉圖斯',
    image: papulatusIcon,
    players: 6,
    difficulties: {
      easy: {
        level: 125,
        health: [300000000, 100000000],
        defense: 50,
        symbol: null,
        reset: 'daily',
        drops: [null],
        solErda: null,
        mesos: 396500
      },
      normal: {
        level: 155,
        health: [126000000000, 42000000000],
        defense: 90,
        symbol: null,
        reset: 'daily',
        drops: [null],
        solErda: null,
        mesos: 1543700
      },
      chaos: {
        level: 190,
        health: [378000000000, 126000000000],
        defense: 250,
        symbol: null,
        reset: 'weekly',
        drops: [null],
        solErda: null,
        mesos: 20088150
      }
    }
  },
  will: {
    name: '威爾',
    image: willIcon,
    players: 6,
    difficulties: {
      easy: {
        level: 235,
        health: [5600000000000, 4200000000000, 7000000000000],
        defense: 300,
        symbol: 360,
        reset: 'weekly',
        drops: [mirrorWorldNodestoneIcon, greenJadeBossRingBoxIcon],
        solErda: null,
        mesos: 57400000
      },
      normal: {
        level: 235,
        health: [8400000000000, 6300000000000, 10500000000000],
        defense: 300,
        symbol: 360,
        reset: 'weekly',
        drops: [mirrorWorldNodestoneIcon, greenJadeBossRingBoxIcon, twilightMarkIcon],
        solErda: null,
        mesos: 74200000
      },
      hard: {
        level: 235,
        health: [42000000000000, 31500000000000, 52500000000000],
        defense: 300,
        symbol: 360,
        reset: 'weekly',
        drops: [mirrorWorldNodestoneIcon, redJadeBossRingBoxIcon, twilightMarkIcon, arcaneUmbraArmorBoxIcon, arcaneUmbraWeaponBoxIcon, willsCursedSpellbookSelectionBoxIcon],
        solErda: 50,
        mesos: 127400000
      }
    }
  },
  verusHilla: {
    name: '真希拉',
    image: verusHillaIcon,
    players: 6,
    difficulties: {
      normal: {
        level: 250,
        health: [88000000000000],
        defense: 300,
        symbol: 900,
        reset: 'weekly',
        drops: [daybreakPendantIcon, redJadeBossRingBoxIcon],
        solErda: 70,
        mesos: 124400000
      },
      hard: {
        level: 250,
        health: [176000000000000],
        defense: 300,
        symbol: 900,
        reset: 'weekly',
        drops: [daybreakPendantIcon, blackJadeBossRingBoxIcon, arcaneUmbraArmorBoxIcon, arcaneUmbraWeaponBoxIcon, sourceOfSufferingIcon],
        solErda: 100,
        mesos: 145200000
      }
    }
  },
  blackMage: {
    name: '黑魔法師',
    image: blackMageIcon,
    players: 6,
    difficulties: {
      hard: {
        level: [265, 275, 275, 265],
        health: [63000000000000, 115500000000000, 157500000000000, 136500000000000],
        defense: 300,
        symbol: 1320,
        reset: 'monthly',
        drops: [arcaneUmbraArmorBoxIcon, arcaneUmbraWeaponBoxIcon, whiteJadeBossRingBoxIcon, genesisBadgeIcon],
        solErda: 300,
        mesos: 990841916
      },
      extreme: {
        level: [275, 275, 275, 280],
        health: [1180000000000000, 1191000000000000, 1285000000000000, 1155000000000000],
        defense: 300,
        symbol: 1320,
        reset: 'monthly',
        drops: [arcaneUmbraArmorBoxIcon, arcaneUmbraWeaponBoxIcon, whiteJadeBossRingBoxIcon, genesisBadgeIcon, exceptionalHammerBeltIcon],
        solErda: 600,
        mesos: 3000000000
      }
    }
  },
  gloom: {
    name: '戴斯克',
    image: gloomIcon,
    players: 6,
    difficulties: {
      normal: {
        level: 255,
        health: [2600000000000],
        defense: 300,
        symbol: 730,
        reset: 'weekly',
        drops: [twilightMarkIcon, greenJadeBossRingBoxIcon],
        solErda: null,
        mesos: 79500000
      },
      chaos: {
        level: 255,
        health: [12600000000000],
        defense: 300,
        symbol: 730,
        reset: 'weekly',
        drops: [twilightMarkIcon, blackJadeBossRingBoxIcon, arcaneUmbraArmorBoxIcon, arcaneUmbraWeaponBoxIcon, endlessTerrorIcon],
        solErda: 100,
        mesos: 111200000
      }
    }
  },
  darknell: {
    name: '頓凱爾',
    image: darknellIcon,
    players: 6,
    difficulties: {
      normal: {
        level: 265,
        health: [26000000000000],
        defense: 300,
        symbol: 850,
        reset: 'weekly',
        drops: [estellaEarringsIcon, greenJadeBossRingBoxIcon],
        solErda: null,
        mesos: 84700000
      },
      hard: {
        level: 265,
        health: [160000000000000],
        defense: 300,
        symbol: 850,
        reset: 'weekly',
        drops: [estellaEarringsIcon, blackJadeBossRingBoxIcon, arcaneUmbraArmorBoxIcon, arcaneUmbraWeaponBoxIcon, commandingForceEarringIcon],
        solErda: 120,
        mesos: 126200000
      }
    }
  },
  seren: {
    name: '賽蓮',
    image: serenIcon,
    players: 6,
    difficulties: {
      normal: {
        level: 270,
        health: [52500000000000, 155400000000000],
        defense: 380,
        symbol: [150, 200],
        reset: 'weekly',
        drops: [mitrasNodestoneIcon, daybreakPendantIcon, blackJadeBossRingBoxIcon],
        solErda: 150,
        mesos: 149800000
      },
      hard: {
        level: 275,
        health: [126000000000000, 357000000000000],
        defense: 380,
        symbol: [150, 200],
        reset: 'weekly',
        drops: [mitrasNodestoneIcon, daybreakPendantIcon, whiteJadeBossRingBoxIcon, mitrasRageSelectionBoxIcon],
        solErda: 220,
        mesos: 271600000
      },
      extreme: {
        level: 280,
        health: [1320000000000000, 5160000000000000],
        defense: 380,
        symbol: [150, 200],
        reset: 'weekly',
        drops: [mitrasNodestoneIcon, daybreakPendantIcon, whiteJadeBossRingBoxIcon, mitrasRageSelectionBoxIcon, exceptionalHammerFaceAccIcon],
        solErda: 560,
        mesos: 724200000
      }
    }
  },
  guardianAngelSlime: {
    name: '守護天使綠水靈',
    image: guardianAngelSlimeIcon,
    players: 6,
    difficulties: {
      normal: {
        level: 220,
        health: [5000000000000],
        defense: 300,
        symbol: null,
        reset: 'weekly',
        drops: [dawnGuardianAngelRingIcon, greenJadeBossRingBoxIcon],
        solErda: null,
        mesos: 43000000
      },
      chaos: {
        level: 220,
        health: [90000000000000],
        defense: 300,
        symbol: null,
        reset: 'weekly',
        drops: [dawnGuardianAngelRingIcon, blackJadeBossRingBoxIcon],
        solErda: 70,
        mesos: 126500000
      }
    }
  },
  kalos: {
    name: '卡洛斯',
    image: kalosIcon,
    players: 6,
    difficulties: {
      easy: {
        level: 270,
        health: [94500000000000, 262500000000000],
        defense: 330,
        symbol: [200],
        reset: 'weekly',
        drops: [kalossResidualDeterminationFragmentIcon, whiteJadeBossRingBoxIcon],
        solErda: 200,
        mesos: 236900000
      },
      normal: {
        level: [275, 280],
        health: [336000000000000, 720000000000000],
        defense: 380,
        symbol: [250, 300],
        reset: 'weekly',
        drops: [kalossResidualDeterminationIcon, whiteJadeBossRingBoxIcon, grindstoneOfLifeIcon, nickyroidIcon],
        solErda: 250,
        mesos: 309000000
      },
      chaos: {
        level: 285,
        health: [1060000000000000, 4060000000000000],
        defense: 380,
        symbol: 330,
        reset: 'weekly',
        drops: [kalossResidualDeterminationIcon, lifeJadeBossRingBoxIcon, grindstoneOfLifeIcon, nickyroidIcon, divineEternalArmorBoxIcon],
        solErda: 400,
        mesos: 618800000
      },
      extreme: {
        level: 285,
        health: [5970000000000000, 15600000000000000],
        defense: 380,
        symbol: 440,
        reset: 'weekly',
        drops: [kalossResidualDeterminationIcon, lifeJadeBossRingBoxIcon, grindstoneOfLifeIcon, nickyroidIcon, divineEternalArmorBoxIcon, exceptionalHammerEyeAccIcon],
        solErda: 700,
        mesos: 1237100000
      }
    }
  },
  kaling: {
    name: '咖凌',
    image: kalingIcon,
    players: 6,
    difficulties: {
      easy: {
        level: 275,
        health: [96000000000000, 105000000000000, [126000000000000, 150000000000000]],
        defense: 380,
        symbol: 230,
        reset: 'weekly',
        drops: [ferociousEntanglementRingFragmentIcon, whiteJadeBossRingBoxIcon],
        solErda: 200,
        mesos: 258300000
      },
      normal: {
        level: 285,
        health: [400000000000000, 468000000000000, [512000000000000, 722000000000000]],
        defense: 380,
        symbol: 330,
        reset: 'weekly',
        drops: [ferociousBeastEntanglementRingIcon, whiteJadeBossRingBoxIcon, grindstoneOfLifeIcon, kalingroidIcon],
        solErda: 300,
        mesos: 361700000
      },
      hard: {
        level: 285,
        health: [920000000000000, 1404000000000000, [1827000000000000, 2446000000000000]],
        defense: 380,
        symbol: 350,
        reset: 'weekly',
        drops: [ferociousBeastEntanglementRingIcon, lifeJadeBossRingBoxIcon, grindstoneOfLifeIcon, kalingroidIcon, ferociousBeastEternalArmorBoxIcon],
        solErda: 500,
        mesos: 721100000
      },
      extreme: {
        level: 285,
        health: [6063000000000000, 6930000000000000, [6930000000000000, 8662000000000000]],
        defense: 380,
        symbol: 480,
        reset: 'weekly',
        drops: [ferociousBeastEntanglementRingIcon, lifeJadeBossRingBoxIcon, grindstoneOfLifeIcon, kalingroidIcon, ferociousBeastEternalArmorBoxIcon, exceptionalHammerEarringsIcon],
        solErda: 800,
        mesos: 1443300000
      }
    }
  },
  limbo: {
    name: '林波',
    image: limboIcon,
    players: 3,
    difficulties: {
      normal: {
        level: 285,
        health: [1940000000000000, 1940000000000000, 2625000000000000],
        defense: 380,
        symbol: 500,
        reset: 'weekly',
        drops: [distortedDesiresCrystalIcon, lifeJadeBossRingBoxIcon, grindstoneOfFaithIcon, limboroidIcon],
        solErda: 350,
        mesos: 420000000
      },
      hard: {
        level: 285,
        health: [3780000000000000, 3780000000000000, 4993000000000000],
        defense: 380,
        symbol: 500,
        reset: 'weekly',
        drops: [distortedDesiresCrystalIcon, lifeJadeBossRingBoxIcon, grindstoneOfFaithIcon, limboroidIcon, desiredEthernalArmorBoxIcon, whisperOfTheSourceIcon],
        solErda: 550,
        mesos: 749000000
      }
    }
  },
  baldrix: {
    name: '巴德利斯',
    image: baldrixIcon,
    players: 3,
    difficulties: {
      normal: {
        level: 290,
        health: [2379755700000000, 2531655000000000, 4145400000000000],
        defense: 380,
        symbol: 700,
        reset: 'weekly',
        drops: [traceOfEternalLoyaltyIcon, lifeJadeBossRingBoxIcon, grindstoneOfFaithIcon, baldrixroidIcon],
        solErda: 400,
        mesos: 560000000
      },
      hard: {
        level: 290,
        health: [5344605000000000, 5685750000000000, 9309300000000000],
        defense: 380,
        symbol: 700,
        reset: 'weekly',
        drops: [traceOfEternalLoyaltyIcon, lifeJadeBossRingBoxIcon, grindstoneOfFaithIcon, baldrixroidIcon, oathswornEthernalArmorBoxIcon, oathOfDeathIcon],
        solErda: 600,
        mesos: 840000000
      }
    }
  }
};