import DestinyWeaponCalculator from "@/components/calc/destiny-weapon/DestinyWeaponCalculator";

export const metadata = {
  title: "命運武器進度計算器 | Maple Kit",
  description: "新楓之谷命運武器進度計算工具，幫助玩家計算各階段所需決心、完成時間與週數",
  keywords: "新楓之谷, 命運武器, 進度計算器, 決心, boss",
  openGraph: {
    title: "命運武器進度計算器 | Maple Kit",
    description: "計算命運武器各階段所需決心、完成時間與週數",
  },
};

export default function DestinyWeaponPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">命運武器進度計算器</h1>
      <DestinyWeaponCalculator />
    </div>
  );
}
