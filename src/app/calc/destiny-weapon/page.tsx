import DestinyWeaponCalculator from "@/components/calc/destiny-weapon/DestinyWeaponCalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "命運武器進度計算機",
  description: "新楓之谷命運武器進度計算機，幫助玩家計算各階段所需決心、完成時間與週數",
  keywords: "新楓之谷, 命運武器, 命運任務, 進度計算機, 決心, Boss, Destiny Weapon, Calculator, MapleStory, Maple Kit, TMS",
};

export default function DestinyWeaponPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">命運武器進度計算機</h1>
      <DestinyWeaponCalculator />
    </div>
  );
}
