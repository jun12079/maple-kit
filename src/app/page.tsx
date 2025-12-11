import Link from "next/link";
import Image from "next/image";
import DestinyRitualFanIcon from "@/assets/images/Destiny_Ritual_Fan_icon.png";
import GenesisRitualFanIcon from "@/assets/images/Genesis_Ritual_Fan_icon.png";
import SolErdaFragmentIcon from "@/assets/images/items/icons/SolErdaFragment_icon.png";
import ArcaneAuthenticSymbolSelectCoupon from "@/assets/images/symbol/Arcane_Authentic_Symbol_Select_Coupon.png";
import BaldrixIcon from '@/assets/images/bosses/icons/Baldrix_icon.png';
import challengerMedal from "@/assets/images/challengers-world/icons/challenger-s1-challenger-medal.png";
import ExpCoupon from "@/assets/images/items/icons/EXPCoupon_icon.png";
import logo from "../../public/logo.png";

export const metadata = {
  description: "MapleKit 為新楓之谷玩家提供命運武器進度計算、創世武器進度計算、HEXA技能計算等實用工具",
  keywords: "新楓之谷, MapleStory, 命運武器, 創世武器, HEXA技能, 遊戲工具",
};

export default function Home() {
  return (
    <div className="mx-auto px-4 py-8">
      <div className="flex flex-col items-center text-center pt-10">
        <div className="flex flex-row items-center justify-center mb-12">
          <Image src={logo} alt="MapleKit Logo" width={80} height={80} />
          <h1 className="text-6xl font-semibold flex items-center h-[80px]">MapleKit</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          <Link href="/calc/destiny-weapon" className="no-underline">
            <div className="border shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-lg">
              <div className="p-8 text-left">
                <div className="flex items-center mb-2">
                  <Image
                    src={DestinyRitualFanIcon}
                    alt="Destiny Weapon icon"
                    width={32}
                    className="mr-2"
                  />
                  <h3 className="text-xl font-bold mb-1">命運武器進度</h3>
                </div>
                <p className="mb-0 text-gray-600 dark:text-gray-400">計算各階段所需決心、完成時間與週數</p>
              </div>
            </div>
          </Link>

          <Link href="/calc/genesis-weapon" className="no-underline">
            <div className="border shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-lg">
              <div className="p-8 text-left">
                <div className="flex items-center mb-2">
                  <Image
                    src={GenesisRitualFanIcon}
                    alt="Genesis Weapon icon"
                    width={32}
                    className="mr-2"
                  />
                  <h3 className="text-xl font-bold mb-1">創世武器進度</h3>
                </div>
                <p className="mb-0 text-gray-600 dark:text-gray-400">計算各階段所需痕跡、完成時間與週數</p>
              </div>
            </div>
          </Link>

          <Link href="/data/symbols" className="no-underline">
            <div className="border shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-lg">
              <div className="p-8 text-left">
                <div className="flex items-center mb-2">
                  <Image
                    src={ArcaneAuthenticSymbolSelectCoupon}
                    alt="Symbol icon"
                    width={32}
                    className="mr-2"
                  />
                  <h3 className="text-xl font-bold mb-1">符文系統</h3>
                </div>
                <p className="mb-0 text-gray-600 dark:text-gray-400">查看神祕和真實符文升級所需數量</p>
              </div>
            </div>
          </Link>

          <Link href="/data/bosses" className="no-underline">
            <div className="border shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-lg">
              <div className="p-8 text-left">
                <div className="flex items-center mb-2">
                  <Image
                    src={BaldrixIcon}
                    alt="Boss icon"
                    width={32}
                    className="mr-2"
                  />
                  <h3 className="text-xl font-bold mb-1">Boss 資訊</h3>
                </div>
                <p className="mb-0 text-gray-600 dark:text-gray-400">查看各Boss的詳細資訊與物品道具</p>
              </div>
            </div>
          </Link>

          <Link href="/calc/hexa-skill" className="no-underline">
            <div className="border shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-lg">
              <div className="p-8 text-left">
                <div className="flex items-center mb-2">
                  <Image
                    src={SolErdaFragmentIcon}
                    alt="Hexa Skill icon"
                    width={32}
                    className="mr-2"
                  />
                  <h3 className="text-xl font-bold mb-1">HEXA技能</h3>
                </div>
                <p className="mb-0 text-gray-600 dark:text-gray-400">計算HEXA技能進度與升級所需數量</p>
              </div>
            </div>
          </Link>

          <Link href="/calc/challengers-world/season2" className="no-underline">
            <div className="border shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-lg">
              <div className="p-8 text-left">
                <div className="flex items-center mb-2">
                  <Image
                    src={challengerMedal}
                    alt="Challenger World icon"
                    width={32}
                    className="mr-2"
                  />
                  <h3 className="text-xl font-bold mb-1">挑戰者世界S2</h3>
                </div>
                <p className="mb-0 text-gray-600 dark:text-gray-400">計算挑戰者世界的點數與硬幣獲取進度</p>
              </div>
            </div>
          </Link>

          <Link href="/calc/exp-coupon" className="no-underline">
            <div className="border shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-lg">
              <div className="p-8 text-left">
                <div className="flex items-center mb-2">
                  <Image
                    src={ExpCoupon}
                    alt="EXP Coupon icon"
                    width={32}
                    className="mr-2"
                  />
                  <h3 className="text-xl font-bold mb-1">EXP 交換券</h3>
                </div>
                <p className="mb-0 text-gray-600 dark:text-gray-400">計算經驗券使用結果</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-primary dark:text-primary-foreground">
            <strong>免責聲明：</strong>本工具僅供參考，計算結果可能因遊戲內部調整而有所變動。<br />
            使用者需自行承擔使用本工具所產生的風險。
          </p>
        </div>
      </div>
    </div>
  );
}
