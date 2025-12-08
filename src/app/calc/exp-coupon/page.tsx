import { Metadata } from "next";
import ExpCouponCalculator from "@/components/calc/exp-coupon/ExpCouponCalculator";

export const metadata: Metadata = {
  title: "經驗值計算機",
  description: "新楓之谷經驗值計算工具，支援燃燒效果、經驗券數量計算與目標等級規劃",
  keywords: "新楓之谷, 經驗值, 計算機, 燃燒, 經驗券, 升等",
};

export default function ExpCouponCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">EXP交換券計算器</h1>
      <ExpCouponCalculator />
    </div>
  );
}
