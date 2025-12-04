import ChallengerWorldCalculator from "@/components/calc/challengers-world/season1/ChallengerWorldCalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "挑戰者世界S1計算器",
  description: "新楓之谷挑戰者世界S1計算工具，幫助玩家預估達成目標所需的時間與週數",
  keywords: "新楓之谷, 挑戰者世界, 計算器, Season 1, MapleStory, Maple Kit",
};

export default function ChallengerWorldPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">挑戰者世界S1計算器</h1>
      <p className="text-gray-500 text-center mb-8">活動時間：2025/6/25~2025/10/14</p>
      <ChallengerWorldCalculator />
    </div>
  );
}
