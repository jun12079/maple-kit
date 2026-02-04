import Logo from "../../../public/logo.png";

const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || '';
const DestinyRitualFanIcon = `${CDN_URL}/images/Destiny_Ritual_Fan_icon.png`;
const GenesisRitualFanIcon = `${CDN_URL}/images/Genesis_Ritual_Fan_icon.png`;
const SolErdaFragmentIcon = `${CDN_URL}/images/items/icons/SolErdaFragment_icon.png`;
const ExpCoupon = `${CDN_URL}/images/items/icons/EXPCoupon_icon.png`;
const ArcaneAuthenticSymbolSelectCoupon = `${CDN_URL}/images/symbol/Arcane_Authentic_Symbol_Select_Coupon.png`;
const BaldrixIcon = `${CDN_URL}/images/bosses/icons/Baldrix_icon.png`;

import type { StaticImageData } from "next/image";

export interface LogoConfig {
  title: string;
  src: StaticImageData;
  url: string;
  alt: string;
}

export interface MenuItem {
  title: string;
  icon?: string;
  url: string;
}

export interface MenuGroup {
  title: string;
  url: string;
  items?: MenuItem[];
}

export const logo: LogoConfig = {
  title: "MapleKit",
  src: Logo,
  url: "/",
  alt: "MapleKit",
};

export const menu: MenuGroup[] = [
  // { title: "Home", url: "/" },
  {
    title: "工具",
    url: "#",
    items: [
      {
        title: "命運武器",
        icon: DestinyRitualFanIcon,
        url: "/calc/destiny-weapon",
      },
      {
        title: "創世武器",
        icon: GenesisRitualFanIcon,
        url: "/calc/genesis-weapon",
      },
      {
        title: "HEXA技能",
        icon: SolErdaFragmentIcon,
        url: "/calc/hexa-skill",
      },
      {
        title: "EXP交換券",
        icon: ExpCoupon,
        url: "/calc/exp-coupon",
      },
    ],
  },
  {
    title: "資料",
    url: "#",
    items: [
      {
        title: "符文系統",
        icon: ArcaneAuthenticSymbolSelectCoupon,
        url: "/data/symbols",
      },
      {
        title: "Boss 資訊",
        icon: BaldrixIcon,
        url: "/data/bosses",
      }
    ],
  },
  {
    title: "角色查詢",
    url: "/character",
  },
  {
    title: "挑戰者世界S2",
    url: "/calc/challengers-world/season2",
  },
  {
    title: "其他",
    url: "#",
    items: [
      {
        title: "常見問題",
        url: "/faq",
      },
      {
        title: "更新日誌",
        url: "/changelog",
      },
    ],
  },
];
