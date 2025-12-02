"use client";

import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { Check, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { bossData } from "@/data/bosses/bossData";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// 匯入挑戰者世界圖示
import challengerPointIcon from "@/assets/images/challengers-world/icons/challenger-point.png";
import challengerCoinIcon from "@/assets/images/challengers-world/icons/challenger-coin-xs.png";
import dailyMissionIcon from "@/assets/images/challengers-world/icons/challenger-daily-mission.png";

import {
  DAILY_MISSION_POINTS,
  DAILY_MISSION_COINS,
  EVENT_START_DATE,
  EVENT_END_DATE,
  LEVELS,
  LEVEL_ICONS,
  LEVEL_REWARDS,
  RANKS,
  BOSS_ORDER,
  DIFFICULTY_ORDER,
  BOSS_REWARDS_DATA
} from "@/data/challengers-world/season2";

const getDifficultyDisplay = (difficulty: string) => {
  const displays: Record<string, { text: string, className: string }> = {
    easy: { text: '簡單', className: 'bg-gray-500 text-white' },
    normal: { text: '普通', className: 'bg-cyan-500 text-white' },
    hard: { text: '困難', className: 'bg-rose-500 text-white' },
    chaos: { text: '混沌', className: 'bg-black text-yellow-300 border border-yellow-300' },
    extreme: { text: '極限', className: 'bg-black text-rose-500 border border-rose-500' },
  }
  return displays[difficulty] || { text: difficulty, className: 'bg-gray-500 text-white' }
}

export default function ChallengerWorldCalculator() {
  const [dailyMissions, setDailyMissions] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [bossStatus, setBossStatus] = useState<Record<string, string[]>>({});
  const [manualDailyPoints, setManualDailyPoints] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("maple-kit-challengers-world-season2");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.dailyMissions !== undefined) setDailyMissions(parsed.dailyMissions);
        if (parsed.selectedLevel !== undefined) setSelectedLevel(parsed.selectedLevel);
        if (parsed.bossStatus !== undefined) setBossStatus(parsed.bossStatus);
        if (parsed.manualDailyPoints !== undefined) setManualDailyPoints(parsed.manualDailyPoints);
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    const dataToSave = {
      dailyMissions,
      selectedLevel,
      bossStatus,
      manualDailyPoints
    };
    localStorage.setItem("maple-kit-challengers-world-season2", JSON.stringify(dataToSave));
  }, [dailyMissions, selectedLevel, bossStatus, manualDailyPoints, isLoaded]);

  // 計算總分
  const totals = useMemo(() => {
    let points = 0;
    let coins = 0;
    let advancedCoins = 0;

    let dailyPoints = 0;
    let dailyCoins = 0;
    let levelPoints = 0;
    let levelCoins = 0;
    let bossPoints = 0;
    let bossCoins = 0;
    let bossAdvancedCoins = 0;

    // 手動輸入 (假設與每日任務相關)
    const manualPoints = parseInt(manualDailyPoints) || 0;
    // 假設手動輸入的點數也像每日任務一樣以 1:3 的比例獲得硬幣
    const manualCoins = manualPoints * 3;

    // 每日任務
    dailyPoints += (dailyMissions * DAILY_MISSION_POINTS) + manualPoints;
    dailyCoins += (dailyMissions * DAILY_MISSION_COINS) + manualCoins;

    // 等級
    if (selectedLevel) {
      LEVELS.forEach((lvl) => {
        if (lvl <= selectedLevel) {
          levelPoints += LEVEL_REWARDS[lvl as keyof typeof LEVEL_REWARDS].points;
          levelCoins += LEVEL_REWARDS[lvl as keyof typeof LEVEL_REWARDS].coins;
        }
      });
    }

    // Boss
    Object.entries(bossStatus).forEach(([bossKey, difficulties]) => {
      difficulties.forEach((diff) => {
        const rewards = BOSS_REWARDS_DATA[bossKey]?.[diff];
        if (rewards) {
          bossPoints += rewards.points;
          bossCoins += rewards.coins;
          if (rewards.advancedCoins) {
            bossAdvancedCoins += rewards.advancedCoins;
          }
        }
      });
    });

    points = dailyPoints + levelPoints + bossPoints;
    coins = dailyCoins + levelCoins + bossCoins;
    advancedCoins = bossAdvancedCoins;

    return {
      points,
      coins,
      advancedCoins,
      breakdown: {
        dailyPoints,
        levelPoints,
        bossPoints
      }
    };
  }, [dailyMissions, selectedLevel, bossStatus, manualDailyPoints]);

  // 決定階級
  const currentRank = useMemo(() => {
    let rank = null;
    for (const r of RANKS) {
      if (totals.points >= r.points) {
        rank = r;
      } else {
        break;
      }
    }
    return rank;
  }, [totals.points]);

  const handleDifficultyClick = (bossKey: string, difficulty: string) => {
    const rewardsData = BOSS_REWARDS_DATA[bossKey] || {};
    const availableDiffs = Object.keys(rewardsData).sort((a, b) => {
      return DIFFICULTY_ORDER.indexOf(a) - DIFFICULTY_ORDER.indexOf(b);
    });

    const clickedIndex = availableDiffs.indexOf(difficulty);
    if (clickedIndex === -1) return;

    setBossStatus((prev) => {
      const currentCompleted = prev[bossKey] || [];

      // 找出目前完成的最高難度
      let currentHighestIndex = -1;
      currentCompleted.forEach(d => {
        const idx = availableDiffs.indexOf(d);
        if (idx > currentHighestIndex) currentHighestIndex = idx;
      });

      let newCompleted: string[] = [];

      if (clickedIndex === currentHighestIndex) {
        // 取消最高難度 (降級)
        newCompleted = availableDiffs.slice(0, clickedIndex);
      } else {
        // 設定為點擊的難度 (升級或降級到特定等級)
        newCompleted = availableDiffs.slice(0, clickedIndex + 1);
      }

      return { ...prev, [bossKey]: newCompleted };
    });
  };

  const getBossIconState = (bossKey: string) => {
    const completed = bossStatus[bossKey] || [];
    if (completed.length === 0) return "none";

    const boss = bossData[bossKey];
    if (!boss) return "none";

    const difficulties = Object.keys(boss.difficulties);
    // 依順序排序難度
    const sortedDiffs = difficulties.sort((a, b) => {
      return DIFFICULTY_ORDER.indexOf(a) - DIFFICULTY_ORDER.indexOf(b);
    });

    const hardest = sortedDiffs[sortedDiffs.length - 1];

    if (completed.includes(hardest)) return "max";
    return "partial";
  };

  const handleReset = () => {
    setDailyMissions(0);
    setSelectedLevel(null);
    setBossStatus({});
    setManualDailyPoints("");
  };

  const handleQuickResult = (target: number) => {
    setDailyMissions(5);
    setManualDailyPoints("8500");

    let newLevel: number | null = null;
    let newBossStatus: Record<string, string[]> = {};

    const setBoss = (key: string, diff: string) => {
      const rewardsData = BOSS_REWARDS_DATA[key] || {};
      const availableDiffs = Object.keys(rewardsData).sort((a, b) => {
        return DIFFICULTY_ORDER.indexOf(a) - DIFFICULTY_ORDER.indexOf(b);
      });
      const targetIndex = availableDiffs.indexOf(diff);
      if (targetIndex !== -1) {
        newBossStatus[key] = availableDiffs.slice(0, targetIndex + 1);
      }
    };

    // Common bosses
    setBoss("cygnus", "normal");
    setBoss("hilla", "normal");
    setBoss("pinkBean", "chaos");
    setBoss("zakum", "chaos");
    setBoss("pierre", "chaos");
    setBoss("vonBon", "chaos");
    setBoss("crimsonQueen", "chaos");
    setBoss("magnus", "hard");
    setBoss("vellum", "chaos");
    setBoss("papulatus", "chaos");
    setBoss("princessNo", "hard");

    if (target === 40000) {
      newLevel = 275;
      setBoss("lotus", "hard");
      setBoss("damien", "hard");
      setBoss("guardianAngelSlime", "chaos");
      setBoss("lucid", "hard");
      setBoss("will", "hard");
      setBoss("gloom", "normal");
      setBoss("darknell", "normal");
      setBoss("verusHilla", "normal");
    } else if (target === 60000) {
      newLevel = 280;
      setBoss("lotus", "hard");
      setBoss("damien", "hard");
      setBoss("guardianAngelSlime", "chaos");
      setBoss("lucid", "hard");
      setBoss("will", "hard");
      setBoss("gloom", "chaos");
      setBoss("darknell", "hard");
      setBoss("verusHilla", "hard");
      setBoss("blackMage", "hard");
    } else if (target === 75000) {
      newLevel = 285;
      setBoss("lotus", "hard");
      setBoss("damien", "hard");
      setBoss("guardianAngelSlime", "chaos");
      setBoss("lucid", "hard");
      setBoss("will", "hard");
      setBoss("gloom", "chaos");
      setBoss("darknell", "hard");
      setBoss("verusHilla", "hard");
      setBoss("blackMage", "hard");
      setBoss("seren", "normal");
    }

    setSelectedLevel(newLevel);
    setBossStatus(newBossStatus);
  };

  // 計算剩餘天數和有效日期 (用於預估完成時間)
  const { effectiveToday, daysRemaining, msPerDay } = useMemo(() => {
    const today = new Date();
    const effectiveToday = today < EVENT_START_DATE ? EVENT_START_DATE : today;
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysRemaining = Math.ceil((EVENT_END_DATE.getTime() - effectiveToday.getTime()) / msPerDay);
    return { effectiveToday, daysRemaining, msPerDay };
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
      {/* 左欄：控制項 */}
      <div className="space-y-8">
        {/* 快速設定 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold">快速試算</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="h-8 px-2 text-muted-foreground hover:text-destructive"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              重置
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[40000, 60000, 75000].map((score) => {
              const rank = RANKS.find((r) => r.points === score);
              return (
                <Button
                  key={score}
                  variant="outline"
                  className="flex flex-row items-center justify-center h-auto py-2 px-1 gap-1.5 hover:border-primary hover:bg-primary/5"
                  onClick={() => handleQuickResult(score)}
                >
                  {rank && (
                    <Image
                      src={rank.icon}
                      alt={rank.name}
                      width={24}
                      height={24}
                      className="w-6 h-6 object-contain"
                    />
                  )}
                  <div className="flex flex-col items-start leading-none gap-0.5">
                    <span className="text-xs font-bold">{rank?.name}</span>
                    <span className="text-[10px] text-muted-foreground">{score.toLocaleString()}</span>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>

        {/* 每日任務 */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold mb-2">每日任務</h2>
          <p className="text-xs text-muted-foreground">
            活動 18 週，一週最多完成 5 次，每次可獲得
            <Image
              src={challengerPointIcon}
              alt="Challenger Point"
              width={16}
              height={16}
              className="inline-block mx-1 w-4 h-4"
            />
            {DAILY_MISSION_POINTS}
            <Image
              src={challengerCoinIcon}
              alt="Challenger Coin"
              width={16}
              height={16}
              className="inline-block mx-1 w-4 h-4"
            />
            {DAILY_MISSION_COINS}
            。
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => setDailyMissions(num === dailyMissions ? 0 : num)}
                  className={cn(
                    "transition-all hover:scale-110",
                    num <= dailyMissions ? "grayscale-0" : "grayscale opacity-50"
                  )}
                >
                  <Image
                    src={dailyMissionIcon}
                    alt={`Daily Mission ${num}`}
                    width={32}
                    height={32}
                    className="object-contain w-8 h-8"
                  />
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-2 max-w-xs">
              <Label htmlFor="manual-points" className="text-sm font-bold mb-2">每日任務累計</Label>
              <Input
                id="manual-points"
                type="number"
                placeholder="0~8500"
                value={manualDailyPoints}
                min={0}
                max={8500}
                onChange={(e) => setManualDailyPoints(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* Levels */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold mb-2">達成等級</h2>
          <div className="grid grid-cols-5 gap-1 w-fit">
            {LEVELS.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl === selectedLevel ? null : lvl)}
                className={cn(
                  "transition-all hover:scale-110",
                  selectedLevel && lvl <= selectedLevel ? "grayscale-0" : "grayscale opacity-50"
                )}
              >
                <Image
                  src={LEVEL_ICONS[lvl as keyof typeof LEVEL_ICONS]}
                  alt={`Level ${lvl}`}
                  width={64}
                  height={64}
                  className="w-10 sm:w-16 h-auto object-contain mx-auto"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Boss */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold mb-2">已攻略 Boss</h2>
          <div className="grid grid-cols-6 gap-2 w-fit">
            {BOSS_ORDER.map((bossKey) => {
              const boss = bossData[bossKey];
              if (!boss) return null;

              const rewardsData = BOSS_REWARDS_DATA[bossKey] || {};
              const totalDiffs = Object.keys(rewardsData).length;
              const completedDiffs = bossStatus[bossKey] || [];
              const validCompletedCount = completedDiffs.filter(d => rewardsData[d]).length;

              const isAllCompleted = totalDiffs > 0 && validCompletedCount === totalDiffs;
              const isPartiallyCompleted = validCompletedCount > 0 && !isAllCompleted;

              return (
                <Popover key={bossKey}>
                  <PopoverTrigger asChild>
                    <button className="relative group transition-transform hover:scale-105">
                      <div className="relative">
                        <Image
                          src={boss.image}
                          alt={boss.name}
                          className="w-10 sm:w-16 h-auto object-contain mx-auto"
                        />
                        {isAllCompleted && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-md">
                            <Check className="w-10 h-10 text-yellow-500 stroke-[3]" />
                          </div>
                        )}
                        {isPartiallyCompleted && (
                          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-0.5 bg-black/60 p-0.5 rounded-b-sm">
                            {Array.from({ length: totalDiffs }).map((_, i) => (
                              <Image
                                key={i}
                                src={dailyMissionIcon}
                                alt="progress"
                                width={12}
                                height={12}
                                className={cn(
                                  "w-3 h-3 object-contain",
                                  i < validCompletedCount ? "brightness-100" : "grayscale opacity-40"
                                )}
                                style={i < validCompletedCount ? { filter: 'sepia(100%) saturate(400%) hue-rotate(-10deg)' } : undefined}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-70">
                    <div className="space-y-1">
                      <h4 className="font-medium leading-none mb-2 px-2">{boss.name}</h4>
                      {Object.entries(BOSS_REWARDS_DATA[bossKey] || {}).sort((a, b) => {
                        return DIFFICULTY_ORDER.indexOf(a[0]) - DIFFICULTY_ORDER.indexOf(b[0]);
                      }).map(([diff, rewards]) => {
                        const isCompleted = completedDiffs.includes(diff);
                        const diffDisplay = getDifficultyDisplay(diff);
                        return (
                          <div
                            key={diff}
                            className={cn(
                              "flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors",
                              isCompleted ? "bg-primary/20 hover:bg-primary/30" : "hover:bg-secondary"
                            )}
                            onClick={() => handleDifficultyClick(bossKey, diff)}
                          >
                            <div className="flex items-center space-x-2 min-w-[60px]">
                              <Badge className={cn("w-fit px-2 py-0.5", diffDisplay.className)}>
                                {diffDisplay.text}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground ml-auto">
                              <div className="flex items-center gap-1 w-14" title="挑戰者點數">
                                <Image src={challengerPointIcon} alt="CP" width={16} height={16} className="w-4 h-4" />
                                <span className={cn(isCompleted && "text-primary font-bold")}>{rewards.points}</span>
                              </div>
                              <div className="flex items-center gap-1 w-14" title="挑戰者硬幣">
                                <Image src={challengerCoinIcon} alt="CC" width={16} height={16} className="w-4 h-4" />
                                <span className={cn(isCompleted && "text-yellow-600 font-bold")}>{rewards.coins}</span>
                              </div>
                              {rewards.advancedCoins && (
                                <div className="flex items-center gap-1 w-14" title="高級挑戰者硬幣">
                                  <Image src={challengerCoinIcon} alt="ACC" width={16} height={16} className="hue-rotate-220 w-4 h-4" />
                                  <span className={cn(isCompleted && "text-purple-600 font-bold")}>{rewards.advancedCoins}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </PopoverContent>
                </Popover>
              );
            })}
          </div>
        </div>
      </div>

      {/* 右欄：摘要 */}
      <div className="space-y-8">
        <div className="flex flex-col gap-4 bg-secondary/20 p-6 rounded-xl">
          <div className="flex flex-col items-center justify-center space-y-2 pt-2">
            <h3 className="text-lg font-semibold text-muted-foreground">目前階級</h3>
            {currentRank ? (
              <div className="flex flex-col items-center gap-2">
                <Image src={currentRank.icon} alt={currentRank.name} width={64} height={64} />
                <span className="text-2xl font-bold">{currentRank.name}</span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-muted-foreground">無</span>
            )}
          </div>

          <div className="border-t border-border/50" />

          <div className="grid grid-cols-3 gap-2 border-b border-border/50 pb-4">
            <div className="flex flex-col items-center justify-center gap-1">
              <div className="flex items-center gap-2">
                <Image src={challengerPointIcon} alt="Challenger Point" width={16} height={16} className="w-4 h-4" />
                <h3 className="font-semibold text-muted-foreground text-sm">挑戰者點數</h3>
              </div>
              <p className="text-xl font-bold text-primary">{totals.points.toLocaleString()}</p>
            </div>

            <div className="flex flex-col items-center justify-center gap-1">
              <div className="flex items-center gap-2">
                <Image src={challengerCoinIcon} alt="Challenger Coin" width={16} height={16} className="w-4 h-4" />
                <h3 className="font-semibold text-muted-foreground text-sm">挑戰者硬幣</h3>
              </div>
              <p className="text-xl font-bold text-yellow-500">{totals.coins.toLocaleString()}</p>
            </div>

            <div className="flex flex-col items-center justify-center gap-1">
              <div className="flex items-center gap-2">
                <Image src={challengerCoinIcon} alt="Advanced Challenger Coin" width={16} height={16} className="hue-rotate-220 w-4 h-4" />
                <h3 className="font-semibold text-muted-foreground text-sm">高級硬幣</h3>
              </div>
              <p className="text-xl font-bold text-purple-500">{totals.advancedCoins.toLocaleString()}</p>
            </div>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground border-b border-border/50 pb-4">
            <div className="flex justify-between">
              <span>每日任務獲得的總點數:</span>
              <span>{totals.breakdown.dailyPoints.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>達成等級獲得的總點數:</span>
              <span>{totals.breakdown.levelPoints.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>攻略 Boss 獲得的總點數:</span>
              <span>{totals.breakdown.bossPoints.toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-end text-sm">
                <span>{totals.points.toLocaleString()} / 75,000</span>
              </div>
              <Progress value={Math.min((totals.points / 75000) * 100, 100)} className="h-4" />
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1 text-center">
              {RANKS.map((rank) => {
                const isReached = totals.points >= rank.points;

                // 計算預計完成日期
                let estimatedDateStr = "";
                let isPossible = true;

                if (!isReached) {
                  const pointsNeeded = rank.points - totals.points;

                  // 假設每週最多完成 5 次每日任務 = 每週 500 點
                  // 我們根據每 7 天 5 個任務來計算所需天數

                  if (daysRemaining <= 0) {
                    isPossible = false;
                  } else {
                    // 計算剩餘週數
                    const weeksRemaining = daysRemaining / 7;

                    // 計算所需任務數與週數
                    // 每個任務獲得 100 點，每週最多 5 個
                    const missionsNeeded = Math.ceil(pointsNeeded / DAILY_MISSION_POINTS);
                    const weeksNeeded = Math.ceil(missionsNeeded / 5);

                    // 粗略估計天數：週數 * 7
                    const daysNeeded = weeksNeeded * 7;

                    if (daysNeeded > daysRemaining) {
                      isPossible = false;
                    } else {
                      const estimatedDate = new Date(effectiveToday.getTime() + daysNeeded * msPerDay);
                      estimatedDateStr = `${estimatedDate.getMonth() + 1}/${estimatedDate.getDate()}`;
                    }
                  }
                }

                return (
                  <div
                    key={rank.name}
                    className={cn(
                      "flex flex-col items-center gap-2 p-2 rounded-lg transition-colors relative",
                      isReached ? "bg-primary/10" : "opacity-70"
                    )}
                  >
                    <div className="relative">
                      <Image
                        src={rank.icon}
                        alt={rank.name}
                        width={40}
                        height={40}
                        className={cn("w-8 h-8 sm:w-10 sm:h-10 object-contain", !isReached && "grayscale")}
                      />
                    </div>
                    <div className="space-y-1 w-full">
                      <div className="text-xs font-bold">{rank.name}</div>
                      <div className="text-[10px] text-muted-foreground">
                        {rank.points.toLocaleString()}
                      </div>

                      {/* 進度狀態 */}
                      <div className="pt-1 border-t border-border/50 mt-1">
                        {isReached ? (
                          <span className="text-[10px] font-bold text-green-600 block">已達成</span>
                        ) : (
                          isPossible ? (
                            <span className="text-[10px] font-medium text-blue-500 block">{estimatedDateStr}</span>
                          ) : (
                            <span className="text-[10px] font-medium text-red-500 block">無法完成</span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
