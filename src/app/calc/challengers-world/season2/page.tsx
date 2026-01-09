import ChallengerWorldCalculator from "@/components/calc/challengers-world/season2/ChallengerWorldCalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "挑戰者世界計算機 Season 2",
  description: "新楓之谷挑戰者世界 Season 2 計算機，幫助玩家預估達成目標所需的時間與週數",
  keywords: "新楓之谷, 挑戰者世界, 挑戰者伺服器, 計算機, 分數, 總分, Challengers World, Season 2, Calculator, MapleStory, Maple Kit, TMS",
};

export default function ChallengerWorldPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">挑戰者世界計算機 Season 2</h1>
      <p className="text-gray-500 text-center mb-8">活動時間：2025/12/3~2026/4/7</p>
      <ChallengerWorldCalculator />
    </div>
  );
}
