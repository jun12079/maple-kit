"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BossResetDialog from "@/components/calc/genesis-weapon/BossResetDialog";

const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || '';
const weeklyBossClearCountResetTicketIcon = `${CDN_URL}/images/Weekly_Boss_Clear_Count_Reset_Ticket_icon.png`;
const monthlyBossClearCountResetTicketIcon = `${CDN_URL}/images/Monthly_Boss_Clear_Count_Reset_Ticket_icon.png`;

import {
  genesisBossData as bossData,
  genesisItemIcon as itemIcon,
  genesisBossIcon as bossIcon,
  genesisStageIcon as stageBossIcon,
  genesisStageEnergy as stageEnergy,
  genesisStageCumulative as stageCumulative,
  BossInfo,
  MAX_ENERGY,
  MONTHLY_BOSSES
} from "@/data/bosses/genesisWeaponData";

interface BossConfigStateItem {
  players: number;
  difficulty: string;
  origin: string;
  enabled: boolean;
  reset: boolean;
}

interface BossConfigState {
  [key: string]: BossConfigStateItem;
}

interface StageProgress {
  weeks: number;
  finishDate: string;
}

export default function GenesisWeaponCalculator() {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [startEnergy, setStartEnergy] = useState(0);
  const [isBossResetDialogOpen, setIsBossResetDialogOpen] = useState(false);
  const [genesisPassEnabled, setGenesisPassEnabled] = useState(false);
  const [bossConfig, setBossConfig] = useState<BossConfigState>({
    lotus: { players: 1, difficulty: "extreme", origin: "lotus", enabled: true, reset: false },
    damien: { players: 1, difficulty: "hard", origin: "damien", enabled: true, reset: false },
    lucid: { players: 1, difficulty: "hard", origin: "lucid", enabled: true, reset: false },
    will: { players: 1, difficulty: "hard", origin: "will", enabled: true, reset: false },
    gloom: { players: 1, difficulty: "hard", origin: "gloom", enabled: true, reset: false },
    darknell: { players: 1, difficulty: "hard", origin: "darknell", enabled: true, reset: false },
    verusHilla: { players: 1, difficulty: "hard", origin: "verusHilla", enabled: true, reset: false },
    blackMage: { players: 1, difficulty: "hard", origin: "blackMage", enabled: true, reset: false }
  });

  const updateBossConfig = (boss: string, field: keyof BossConfigStateItem, value: any) => {
    if (field === 'difficulty') {
      // Just for testing/validation if needed, but logic is same as below
    }

    const newConfig = { ...bossConfig };
    newConfig[boss] = { ...newConfig[boss], [field]: value };
    setBossConfig(newConfig);
  };

  const handleOpenBossResetDialog = () => {
    setIsBossResetDialogOpen(true);
  };

  const calculateEnergy = (
    bossData: Record<string, BossInfo>,
    origin: string,
    difficulty: string,
    players: number,
    reset: boolean,
    genesisPass: boolean,
    enabled: boolean
  ) => {
    if (!enabled) return 0;
    const baseEnergy = bossData[origin].difficulties[difficulty].energy;
    let totalEnergy = reset ? baseEnergy * 2 : baseEnergy;

    if (genesisPass) {
      totalEnergy *= 3;
    }

    return Math.round(totalEnergy / players);
  };

  const calculateWeeklyAndMonthlyEnergy = () => {
    let weeklyTotal = 0;
    let monthlyTotal = 0;

    Object.values(bossConfig).forEach(config => {
      if (!config.enabled) return;

      const perEnergy = calculateEnergy(
        bossData,
        config.origin,
        config.difficulty,
        config.players,
        config.reset,
        genesisPassEnabled,
        config.enabled
      );

      if (MONTHLY_BOSSES.includes(config.origin)) {
        monthlyTotal += perEnergy;
      } else {
        weeklyTotal += perEnergy;
      }
    });

    return { weeklyTotal, monthlyTotal };
  };

  // 判斷兩個日期是否在同一個月
  const isSameMonth = (date1: Date, date2: Date) => {
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth();
  };

  const calculateStageProgress = (
    weeklyEnergy: number,
    monthlyEnergy: number,
    startEnergy: number,
    startDate: Date
  ): StageProgress[] => {
    return stageCumulative.map(targetEnergy => {
      if (startEnergy >= targetEnergy) {
        return {
          weeks: 0,
          finishDate: '已完成'
        };
      }

      if (weeklyEnergy === 0 && monthlyEnergy === 0) {
        return {
          weeks: 0,
          finishDate: '--'
        };
      }

      let currentEnergy = startEnergy;
      let currentDate = new Date(startDate);
      let weeks = 0;
      let isFirstWeek = true;

      while (currentEnergy < targetEnergy) {
        weeks++;

        // 每週都可以獲得週度痕跡
        let weekEnergy = weeklyEnergy;

        // 判斷是否可以獲得月度痕跡
        if (isFirstWeek || !isSameMonth(currentDate, new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000))) {
          weekEnergy += monthlyEnergy;
        }

        currentEnergy += weekEnergy;
        currentDate.setDate(currentDate.getDate() + 7);
        isFirstWeek = false;
      }

      return {
        weeks: weeks,
        finishDate: new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString('zh-TW')
      };
    });
  }

  const { weeklyTotal, monthlyTotal } = calculateWeeklyAndMonthlyEnergy();
  const stageProgressData = calculateStageProgress(weeklyTotal, monthlyTotal, startEnergy, startDate);
  const percentage = Math.min((startEnergy / MAX_ENERGY) * 100, 100).toFixed(1);

  // 計算每個階段的進度
  const getStageProgress = (currentEnergy: number, stageIndex: number) => {
    const previousCumulative = stageIndex === 0 ? 0 : stageCumulative[stageIndex - 1];
    const stageTarget = stageEnergy[stageIndex];

    if (currentEnergy >= stageCumulative[stageIndex]) {
      // 已完成
      return { current: stageTarget, total: stageTarget };
    } else if (currentEnergy > previousCumulative) {
      // 進行中
      return { current: currentEnergy - previousCumulative, total: stageTarget };
    } else {
      // 尚未開始
      return { current: 0, total: stageTarget };
    }
  };

  const getStageText = (currentEnergy: number) => {
    if (currentEnergy >= MAX_ENERGY) return `解放完成 ${currentEnergy.toLocaleString()}/${MAX_ENERGY.toLocaleString()}`;

    const stages = [
      "第一階段", "第二階段", "第三階段", "第四階段",
      "第五階段", "第六階段", "第七階段", "第八階段"
    ];

    for (let i = 6; i >= 0; i--) {
      if (currentEnergy >= stageCumulative[i]) {
        return `${stages[i + 1]} ${currentEnergy.toLocaleString()}/${MAX_ENERGY.toLocaleString()}`;
      }
    }

    return `${stages[0]} ${currentEnergy.toLocaleString()}/${MAX_ENERGY.toLocaleString()}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 角色狀態 */}
      <Card>
        <CardHeader>
          <CardTitle>角色狀態</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 開始日期 */}
          <div>
            <Label htmlFor="startDate" className="block text-sm font-bold mb-2">
              開始日期
            </Label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="startDate"
                  className="w-full justify-between font-normal text-left"
                >
                  {startDate ? startDate.toLocaleDateString('zh-TW') : "選擇日期"}
                  <CalendarIcon className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  captionLayout="dropdown"
                  startMonth={new Date(2005, 0)}
                  endMonth={new Date(2040, 11)}
                  onSelect={(date) => {
                    setStartDate(date || new Date());
                    setCalendarOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* 目前痕跡 */}
          <div>
            <Label htmlFor="startEnergy" className="block text-sm font-bold mb-2">
              目前痕跡
            </Label>
            <Input
              type="number"
              id="startEnergy"
              value={startEnergy || ''}
              min="0"
              max={MAX_ENERGY}
              onChange={(e) => setStartEnergy(Number(e.target.value) || 0)}
              placeholder={`輸入目前痕跡 (0-${MAX_ENERGY})`}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="rounded-full px-3 py-2 mb-2 shadow-sm"
              onClick={handleOpenBossResetDialog}
            >
              <div className="flex items-center justify-center">
                <span className="mr-1">使用</span>
                <div className="relative w-8 h-7">
                  {/* 左圖：左下 → 左上 → 右上 */}
                  <img
                    src={weeklyBossClearCountResetTicketIcon}
                    alt="Weekly_Boss_Clear_Count_Reset_Ticket_icon"
                    className="w-full h-full object-cover absolute top-0 left-0"
                    style={{
                      clipPath: "polygon(0 100%, 0 0, 100% 0)", // 左下 → 左上 → 右上
                    }}
                  />
                  {/* 右圖：右上 → 右下 → 左下 */}
                  <img
                    src={monthlyBossClearCountResetTicketIcon}
                    alt="Monthly_Boss_Clear_Count_Reset_Ticket_icon"
                    className="w-full h-full object-cover absolute top-0 left-0"
                    style={{
                      clipPath: "polygon(100% 0, 100% 100%, 0 100%)", // 右上 → 右下 → 左下
                    }}
                  />
                </div>
              </div>
            </Button>
            <Button
              variant={genesisPassEnabled ? "default" : "outline"}
              className="rounded-full px-3 py-2 mb-2 shadow-sm"
              onClick={() => setGenesisPassEnabled(!genesisPassEnabled)}
            >
              <div className="flex items-center justify-center gap-2">
                <span>使用</span>
                <img
                  src={itemIcon.genesisPass}
                  alt="Genesis Pass"
                  className="w-full h-full"
                />
              </div>
            </Button>
          </div>
          {/* BOSS選單 */}
          <div>
            {/* 滾動提示 */}
            <div className="mb-2 text-xs text-muted-foreground text-center md:hidden">
              <span className="inline-flex items-center gap-1">
                ← 左右滑動查看所有欄位 →
              </span>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted dark:bg-muted">
                  <TableRow>
                    <TableHead className="text-center">選擇</TableHead>
                    <TableHead className="text-center">BOSS</TableHead>
                    <TableHead className="text-center">難度</TableHead>
                    <TableHead className="text-center">人數</TableHead>
                    <TableHead className="text-center">
                      <img src={itemIcon.tracesOfDarkness} alt="Traces of Darkness" className="w-6 h-6 mx-auto" />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(bossConfig).map(([boss, { players, difficulty, origin, enabled, reset }], index) => (
                    <TableRow key={index}>
                      <TableCell className="py-2 px-2">
                        <div className="flex justify-center">
                          <Checkbox
                            id={boss}
                            checked={enabled}
                            onCheckedChange={(checked) => updateBossConfig(boss, 'enabled', checked)}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="py-2 px-2">
                        <div className="flex justify-center items-center gap-1">
                          <img
                            src={bossIcon[origin]}
                            alt={origin}
                            className="w-8 h-auto flex-shrink-0"
                          />
                          {reset && !MONTHLY_BOSSES.includes(boss) && (
                            <>
                              <span>+</span>
                              <img
                                src={weeklyBossClearCountResetTicketIcon}
                                alt="Weekly_Boss_Clear_Count_Reset_Ticket_icon"
                                className="w-8 h-auto flex-shrink-0"
                              />
                            </>
                          )}
                          {reset && MONTHLY_BOSSES.includes(boss) && (
                            <>
                              <span>+</span>
                              <img
                                src={monthlyBossClearCountResetTicketIcon}
                                alt="Monthly_Boss_Clear_Count_Reset_Ticket_icon"
                                className="w-8 h-auto flex-shrink-0"
                              />
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="py-2 px-2">
                        <div className="flex justify-center">
                          <Select
                            value={difficulty}
                            onValueChange={(value) => updateBossConfig(boss, 'difficulty', value)}
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.keys(bossData[origin].difficulties).map((key) => (
                                <SelectItem key={key} value={key}>{bossData[origin].difficulties[key].name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                      <TableCell className="py-2 px-2">
                        <div className="flex justify-center">
                          <Select
                            value={players.toString()}
                            onValueChange={(value) => updateBossConfig(boss, 'players', Number(value))}
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: bossData[origin].players }, (_, i) => (
                                <SelectItem key={i + 1} value={(i + 1).toString()}>{i + 1}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                      <TableCell className="py-2 px-2">
                        <div className="flex justify-center">
                          <Badge
                            variant={enabled ? "default" : "secondary"}
                            className="text-xs font-mono min-w-[3rem] justify-center"
                          >
                            {calculateEnergy(bossData, origin, difficulty, players, reset, genesisPassEnabled, enabled)}
                          </Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={5} className="text-center font-bold py-4 text-lg">
                      週痕跡：{weeklyTotal.toLocaleString()}
                      {monthlyTotal > 0 && (
                        <span className="ml-2">
                          + 月痕跡：{monthlyTotal.toLocaleString()}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 進度預估 */}
      <Card className="relative">
        <CardHeader>
          <CardTitle>進度預估</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 進度列表 */}
          <ul className="space-y-0">
            {stageCumulative.map((stage, i) => {
              const isCompleted = startEnergy >= stageCumulative[i];
              const isActive = !isCompleted && (i === 0 || startEnergy >= stageCumulative[i - 1]);
              const { weeks, finishDate } = stageProgressData[i];
              const { current, total } = getStageProgress(startEnergy, i);

              return (
                <li
                  key={i}
                  className={`flex items-center py-4 ${i < stageCumulative.length - 1 ? 'border-b border-border' : 'border-b border-border'} ${isCompleted ? 'completed' : ''}`}
                >
                  {/* 圓形圖標區域 */}
                  <div className="flex-shrink-0 mr-4">
                    <div className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center transition-all duration-300 shadow-lg relative ${isCompleted ? 'bg-green-500 scale-110 shadow-green-500/30' :
                      isActive ? 'bg-yellow-500 scale-105 shadow-yellow-500/30 animate-pulse-glow' :
                        'bg-slate-300 shadow-slate-300/30'}`}>
                      {isCompleted ? (
                        <div className="text-white text-sm font-bold">✓</div>
                      ) : (
                        <img
                          src={stageBossIcon[Object.keys(stageBossIcon)[i]]}
                          alt={`Stage ${i + 1}`}
                          className="w-6 h-6 rounded-full object-contain"
                        />
                      )}
                    </div>
                  </div>

                  {/* 內容區域 */}
                  <div className="flex justify-between items-center w-full">
                    <div className="stage-info">
                      <div className="font-bold">第{i + 1}階段</div>
                      <div className="text-sm text-muted-foreground">
                        {current.toLocaleString()}/{total.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div>完成日期：{finishDate}</div>
                      <div className="font-medium">
                        第 <span className="text-cyan-500 dark:text-cyan-400 font-bold">{weeks || 0}</span> 週
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* 進度統計區塊 */}
          <div className="relative">
            {/* 進度狀態文字 */}
            <div className="text-center font-medium mb-6">
              目前進度：{getStageText(startEnergy)} ({percentage}%)
            </div>

            {/* 統計卡片 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-muted/50 rounded-lg p-4 text-center border border-border/50">
                <div className="text-2xl font-bold mb-1">
                  {startEnergy.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">目前痕跡</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-center border border-border/50">
                <div className="text-2xl font-bold mb-1">
                  {weeklyTotal.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">週王痕跡</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-center border border-border/50">
                <div className="text-2xl font-bold mb-1">
                  {monthlyTotal.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">月王痕跡</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-center border border-border/50">
                <div className="text-2xl font-bold mb-1">
                  {startEnergy >= MAX_ENERGY ? 0 : stageProgressData[7]?.weeks || 0}
                </div>
                <div className="text-sm text-muted-foreground">剩餘週數</div>
              </div>
            </div>

            {/* 特殊狀態覆蓋層 */}
            {startEnergy >= MAX_ENERGY && (
              <div className="absolute inset-0 bg-green-100/40 dark:bg-green-900/40 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
                <h3 className="text-2xl text-green-600 dark:text-green-400 font-bold">已解放！</h3>
              </div>
            )}

            {weeklyTotal === 0 && monthlyTotal === 0 && startEnergy < MAX_ENERGY && (
              <div className="absolute inset-0 bg-yellow-100/40 dark:bg-yellow-900/40 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
                <h3 className="text-2xl text-yellow-600 dark:text-yellow-400 font-bold">去課金！</h3>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <BossResetDialog
        bossConfig={bossConfig}
        setBossConfig={setBossConfig}
        isOpen={isBossResetDialogOpen}
        onOpenChange={setIsBossResetDialogOpen}
      />
    </div>
  );
}
