"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calculator,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

import teraBurningBooster from "@/assets/images/items/icons/tera-burning-booster.png";
import hyperBurningBooster from "@/assets/images/items/icons/hyper-burning-booster.png";
import EXPCoupon from "@/assets/images/items/icons/EXPCoupon_icon.png";
import AdvancedEXPCoupon from "@/assets/images/items/icons/AdvancedEXPCoupon_icon.png";
import { EXP_DATA } from "@/data/exp/expData";
import { EXP_COUPON, ADVANCED_EXP_COUPON } from "@/data/exp/expItemsData";

// 計算結果類型定義
type LevelUpDetail = {
  fromLevel: number;
  toLevel: number;
  count: number;
};

type CalculationResult = {
  usedCount: number;       // 使用的交換券數量
  gainedExp: number;       // 獲得的經驗值
  finalLevel: number;      // 最終等級
  finalPercent: number;    // 最終經驗百分比
  details: LevelUpDetail[]; // 升級詳情
} | null;

export default function ExpCouponCalculator() {

  const [currentLevel, setCurrentLevel] = useState<number | "">(200);               // 目前等級
  const [currentExpPercent, setCurrentExpPercent] = useState<number | "">(0);       // 目前經驗百分比
  const [burningType, setBurningType] = useState<string>("0");                      // 燃燒效果類型
  const [calcType, setCalcType] = useState<"target" | "coupon">("target");          // 計算類型
  const [couponType, setCouponType] = useState<"normal" | "advanced">("normal");    // 交換券類型
  const [targetLevel, setTargetLevel] = useState<number | "">(260);                 // 目標等級
  const [couponCount, setCouponCount] = useState<number | "">(0);                   // 交換券數量

  const [result, setResult] = useState<CalculationResult>(null);                    // 計算結果

  const minLevel = couponType === "normal" ? 200 : 260;
  const maxLevel = 300;

  // 驗證輸入是否有效
  const isValid = () => {
    if (currentLevel === "" || currentExpPercent === "") return false;
    if (calcType === "target" && targetLevel === "") return false;
    if (calcType === "coupon" && couponCount === "") return false;
    return true;
  };

  // 重置函數
  const reset = () => {
    setCurrentLevel(200);
    setCurrentExpPercent(0);
    setBurningType("0");
    setCalcType("target");
    setCouponType("normal");
    setTargetLevel(260);
    setCouponCount(0);
    setResult(null);
  };

  // 計算函數
  const calculate = () => {
    if (!isValid()) return;

    const startLevel = Math.max(200, Math.floor(Number(currentLevel) || 200));
    const startExpPercent = Math.max(0, Number(currentExpPercent) || 0);
    const burn = parseInt(burningType);
    const burnBonus = burn === 1 ? 2 : burn === 2 ? 4 : 0; // 燃燒加成等級
    const BURNING_CAP = 260; // 燃燒效果等級上限

    // 獲取該等級所需經驗值
    const getExpReq = (lvl: number) => EXP_DATA[lvl.toString()] || 0;
    
    const couponData = couponType === "normal" ? EXP_COUPON : ADVANCED_EXP_COUPON;
    // 獲取該等級優惠券提供的經驗值
    const getCouponExp = (lvl: number) => {
      return couponData[lvl] || 0;
    };

    // 計算實際獲得的等級加成
    const getEffectiveBurnBonus = (currentLvl: number) => {
      if (burnBonus === 0) return 0;
      if (currentLvl >= BURNING_CAP) return 0;

      const potentialNextLvl = currentLvl + 1 + burnBonus;

      // 如果加上燃燒加成後會超過上限，則只升到上限
      if (potentialNextLvl > BURNING_CAP) {
        return Math.max(0, BURNING_CAP - currentLvl - 1);
      }

      return burnBonus;
    };

    let lvl = startLevel;
    let currentExp = getExpReq(lvl) * (startExpPercent / 100);
    let totalGainedExp = 0;
    let usedCount = 0;
    const details: LevelUpDetail[] = [];

    if (calcType === "target") {
      // 目標等級模式：計算到達目標等級需要的優惠券數量
      const target = Number(targetLevel) || 260;
      let loops = 0;
      while (lvl < target && loops < 100000) {
        loops++;
        const req = getExpReq(lvl);
        if (req === 0) break;

        const needed = req - currentExp;
        const startLvl = lvl;
        const currentBonus = getEffectiveBurnBonus(lvl);

        if (needed <= 0) {
          currentExp -= req;
          lvl += 1 + currentBonus;
          continue;
        }

        const couponVal = getCouponExp(lvl);
        if (couponVal <= 0) {
          break;
        }

        const num = Math.ceil(needed / couponVal);
        usedCount += num;
        const gained = num * couponVal;
        totalGainedExp += gained;
        currentExp += gained;

        currentExp -= req;
        lvl += 1 + currentBonus;

        details.push({
          fromLevel: startLvl,
          toLevel: lvl,
          count: num,
        });
      }
    } else {
      // 使用數量模式：計算使用指定數量優惠券後的等級
      let remaining = Number(couponCount) || 0;
      while (remaining > 0) {
        const req = getExpReq(lvl);
        if (req === 0) break;

        const couponVal = getCouponExp(lvl);
        if (couponVal <= 0) break;

        const needed = req - currentExp;
        const numToLevel = Math.ceil(needed / couponVal);
        const startLvl = lvl;
        const currentBonus = getEffectiveBurnBonus(lvl);

        if (remaining >= numToLevel) {
          const gained = numToLevel * couponVal;
          totalGainedExp += gained;
          currentExp += gained;
          remaining -= numToLevel;
          usedCount += numToLevel;

          currentExp -= req;
          lvl += 1 + currentBonus;

          details.push({
            fromLevel: startLvl,
            toLevel: lvl,
            count: numToLevel,
          });
        } else {
          const gained = remaining * couponVal;
          totalGainedExp += gained;
          currentExp += gained;
          usedCount += remaining;

          details.push({
            fromLevel: startLvl,
            toLevel: startLvl,
            count: remaining,
          });

          remaining = 0;
        }
      }
    }

    // 計算最終經驗百分比
    const finalReq = getExpReq(lvl);
    const finalPercent = finalReq > 0 ? (currentExp / finalReq) * 100 : 0;

    setResult({
      usedCount,
      gainedExp: totalGainedExp,
      finalLevel: lvl,
      finalPercent,
      details,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* 計算選項 */}
      <Card className="lg:col-span-5 h-fit gap-0">
        <CardHeader>
          <CardTitle className="font-semibold">計算選項</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {/* 等級 & 經驗 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1.5">
                目前等級
              </Label>
              <Input
                type="number"
                min={minLevel}
                max={maxLevel}
                value={currentLevel}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "") {
                    setCurrentLevel("");
                    return;
                  }
                  let numVal = Number(val);
                  if (numVal > maxLevel) numVal = maxLevel;
                  setCurrentLevel(numVal);
                }}
                className="focus:border-primary bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1.5">
                目前經驗
              </Label>
              <div className="relative">
                <Input
                  type="number"
                  step="0.001"
                  min={0}
                  max={100}
                  value={currentExpPercent}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "") {
                      setCurrentExpPercent("");
                      return;
                    }
                    let numVal = Number(val);
                    if (numVal < 0) numVal = 0;
                    if (numVal > 100) numVal = 100;
                    setCurrentExpPercent(numVal);
                  }}
                  className="focus:border-primary bg-background/50 pr-8"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
                  %
                </div>
              </div>
            </div>
          </div>

          {/* 燃燒效果 */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-1.5">
              燃燒效果
            </Label>
            <Select value={burningType} onValueChange={setBurningType}>
              <SelectTrigger className="focus:border-primary bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">未套用燃燒效果</SelectItem>
                <SelectItem value="1">
                  <Image
                    src={teraBurningBooster}
                    alt="Tera Burning Booster"
                    width={16}
                    className="inline-block mr-2 object-contain"
                  />
                  燃燒 1+2
                </SelectItem>
                <SelectItem value="2">
                  <Image
                    src={hyperBurningBooster}
                    alt="Hyper Burning Booster"
                    width={16}
                    className="inline-block mr-2 object-contain"
                  />
                  燃燒 1+4
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 交換券種類 */}
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-1.5">
              票券種類
            </Label>
            <RadioGroup
              value={couponType}
              onValueChange={(v) => {
                const newType = v as "normal" | "advanced";
                setCouponType(newType);
                const newMin = newType === "normal" ? 200 : 260;
                if (Number(currentLevel) < newMin) setCurrentLevel(newMin);
                if (Number(targetLevel) < newMin) setTargetLevel(newMin);
              }}
              className="grid grid-cols-2 gap-4"
            >
              <div className={`flex items-center space-x-2 border rounded-lg p-3 transition-colors ${couponType === 'normal' ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50'}`}>
                <RadioGroupItem value="normal" id="r-normal" className="border-primary" />
                <Label htmlFor="r-normal" className="cursor-pointer flex-1 font-normal flex items-center gap-2">
                  <Image
                    src={EXPCoupon}
                    alt="EXP 交換券"
                    width={24}
                    className="object-contain"
                  />
                  <span className="text-xs sm:text-sm">EXP 交換券</span>
                </Label>
              </div>
              <div className={`flex items-center space-x-2 border rounded-lg p-3 transition-colors ${couponType === 'advanced' ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50'}`}>
                <RadioGroupItem value="advanced" id="r-advanced" className="border-primary" />
                <Label htmlFor="r-advanced" className="cursor-pointer flex-1 font-normal flex items-center gap-2">
                  <Image
                    src={AdvancedEXPCoupon}
                    alt="上級 EXP 交換券"
                    width={24}
                    className="object-contain"
                  />
                  <span className="text-xs sm:text-sm">上級 EXP 交換券</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* 計算類型 */}
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-1.5">
              計算方式
            </Label>
            <RadioGroup
              value={calcType}
              onValueChange={(v) => setCalcType(v as "target" | "coupon")}
              className="grid grid-cols-2 gap-4"
            >
              <div className={`flex items-center space-x-2 border rounded-lg p-3 transition-colors ${calcType === 'target' ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50'}`}>
                <RadioGroupItem value="target" id="r-target" className="border-primary" />
                <Label htmlFor="r-target" className="cursor-pointer flex-1 font-normal">目標等級</Label>
              </div>
              <div className={`flex items-center space-x-2 border rounded-lg p-3 transition-colors ${calcType === 'coupon' ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50'}`}>
                <RadioGroupItem value="coupon" id="r-coupon" className="border-primary" />
                <Label htmlFor="r-coupon" className="cursor-pointer flex-1 font-normal">票券數量</Label>
              </div>
            </RadioGroup>
          </div>

          {/* 根據計算類型顯示不同 Input */}
          <div className="pt-2">
            {calcType === "target" ? (
              <div className="space-y-2">
                <Label className="text-sm font-medium">目標等級</Label>
                <Input
                  type="number"
                  min={minLevel}
                  max={maxLevel}
                  value={targetLevel}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "") {
                      setTargetLevel("");
                      return;
                    }
                    let numVal = Number(val);
                    if (numVal > maxLevel) numVal = maxLevel;
                    setTargetLevel(numVal);
                  }}
                  className="focus:border-primary"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label className="text-sm font-medium">使用數量</Label>
                <Input
                  type="number"
                  value={couponCount}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "") {
                      setCouponCount("");
                      return;
                    }
                    setCouponCount(Number(val));
                  }}
                  className="focus:border-primary"
                />
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              className="flex-1 hover:bg-primary/5 hover:text-primary"
              onClick={reset}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              重置
            </Button>
            <Button
              className="flex-[2] bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={calculate}
              disabled={!isValid()}
            >
              開始計算
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 計算結果 */}
      <Card className="lg:col-span-7 shadow-md flex flex-col gap-0">
        <CardHeader>
          <CardTitle className="font-semibold">計算結果</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            * 計算結果僅供參考，實際數值可能因遊戲版本更新而略有差異
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pt-6 flex flex-col">
          {result ? (
            <div className="space-y-6">
              <div className="bg-muted/30 rounded-xl p-5 space-y-6">
                <div className="flex flex-col md:flex-row items-center justify-around gap-4">
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Image
                        src={couponType === "normal" ? EXPCoupon : AdvancedEXPCoupon}
                        alt="Coupon"
                        width={24}
                        className="object-contain"
                      />
                      <span>消耗數量</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-primary tracking-tight">
                        {result.usedCount.toLocaleString()}
                      </span>
                      <span className="text-xs text-muted-foreground">張</span>
                    </div>
                  </div>

                  <div className="hidden md:block w-px h-10 bg-border" />
                  <div className="block md:hidden w-full h-px bg-border" />

                  <div className="flex flex-col items-center gap-1">
                    <span className="text-sm font-medium text-muted-foreground">
                      獲得總經驗值
                    </span>
                    <span className="text-xl font-bold text-green-600 dark:text-green-400 tracking-tight">
                      {result.gainedExp.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="w-full h-px bg-border/50" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground mb-0.5">目前</div>
                      <div className="text-lg font-bold text-muted-foreground">Lv. {currentLevel}</div>
                    </div>

                    <ArrowRight className="w-5 h-5 text-primary/30" />

                    <div className="text-center">
                      <div className="text-xs text-muted-foreground mb-0.5">達成</div>
                      <div className="text-lg font-bold text-muted-foreground">Lv. {result.finalLevel}</div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">經驗值百分比</span>
                      <span className="font-mono font-medium text-muted-foreground">{result.finalPercent.toFixed(3)}%</span>
                    </div>
                    <Progress value={result.finalPercent} className="h-2" />
                  </div>
                </div>
              </div>

              {/* 升級詳情表格 */}
              {result.details.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h3 className="text-base font-semibold px-1">升級詳情</h3>
                  <div>
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="text-center h-9 text-xs">等級區間</TableHead>
                          <TableHead className="text-center h-9 text-xs">消耗數量</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {result.details.map((detail, index) => (
                          <TableRow key={index} className="border-b border-border/50 last:border-0">
                            <TableCell className="text-center py-2 text-sm">
                              Lv. {detail.fromLevel} <span className="text-muted-foreground mx-1">→</span> Lv. {detail.toLevel}
                            </TableCell>
                            <TableCell className="text-center py-2 text-sm">
                              {detail.count.toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-muted-foreground space-y-4">
              <Calculator className="w-10 h-10 text-muted-foreground/50" />
              <div className="text-center">
                <p className="text-sm max-w-[250px]">請在左側輸入角色資訊與目標，然後點擊「開始計算」</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
