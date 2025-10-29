import HexaSkillCalculator from "@/components/calc/hexa-skill/HexaSkillCalculator";

export const metadata = {
  title: "HEXA 技能進度計算器 | Maple Kit",
  description: "新楓之谷 HEXA 技能進度計算工具，幫助玩家計算技能核心、精通核心、強化核心和共通核心的升級進度",
  keywords: "新楓之谷, HEXA技能, 進度計算器, 技能核心, Sol Erda",
  openGraph: {
    title: "HEXA 技能進度計算器 | Maple Kit",
    description: "計算 HEXA 技能各核心類型的升級進度和所需材料",
  },
};

export default function HexaSkillPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">HEXA 技能進度計算器</h1>
      <HexaSkillCalculator />
    </div>
  );
}
