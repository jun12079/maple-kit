import Link from "next/link";
import Image from "next/image";
import DestinyRitualFanIcon from "@/assets/images/Destiny_Ritual_Fan_icon.png";
import GenesisRitualFanIcon from "@/assets/images/Genesis_Ritual_Fan_icon.png";

export default function Home() {
  return (
    <div className="mx-auto px-4 py-8">
      <div className="flex flex-col items-center text-center pt-10">
        <h1 className="text-6xl font-semibold mb-12">MapleKit</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <Link href="/calc/destiny-weapon" className="no-underline">
            <div className="border shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-lg">
              <div className="p-12 text-left">
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
              <div className="p-12 text-left">
                <div className="flex items-center mb-2">
                  <Image
                    src={GenesisRitualFanIcon}
                    alt="Genesis Weapon icon"
                    width={32}
                    height={32}
                    className="mr-2"
                  />
                  <h3 className="text-xl font-bold mb-1">創世武器進度</h3>
                </div>
                <p className="mb-0 text-gray-600 dark:text-gray-400">計算各階段所需痕跡、完成時間與週數</p>
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
