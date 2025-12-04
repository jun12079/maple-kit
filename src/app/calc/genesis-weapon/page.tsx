import GenesisWeaponCalculator from "@/components/calc/genesis-weapon/GenesisWeaponCalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "創世武器進度計算器",
  description: "新楓之谷創世武器進度計算工具，幫助玩家計算各階段所需痕跡、完成時間與週數",
  keywords: "新楓之谷, 創世武器, 進度計算器, 痕跡, boss",
};

export default function GenesisWeaponPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">創世武器進度計算器</h1>
      <GenesisWeaponCalculator />
    </div>
  );
}
