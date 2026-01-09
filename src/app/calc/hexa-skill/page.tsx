import { Metadata } from "next";
import HexaSkillCalculator from "@/components/calc/hexa-skill/HexaSkillCalculator";

export const metadata: Metadata = {
  title: "HEXA 技能進度計算機",
  description: "新楓之谷 HEXA 技能進度計算機，幫助玩家計算技能核心、精通核心、強化核心和共通核心的升級進度",
  keywords: "新楓之谷, HEXA技能, 進度計算機, 技能核心, Sol Erda",
};

export default function HexaSkillPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">HEXA 技能進度計算機</h1>
      <HexaSkillCalculator />
    </div>
  );
}
