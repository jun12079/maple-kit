"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || '';
const weeklyBossClearCountResetTicketIcon = `${CDN_URL}/images/Weekly_Boss_Clear_Count_Reset_Ticket_icon.png`;

import {
  destinyBossData as bossData,
  destinyItemIcon as itemIcon,
  destinyBossIcon as bossIcon,
  destinyStageEnergy as stageEnergy,
  destinyStageCumulative as stageCumulative,
  MAX_ENERGY
} from "@/data/bosses/destinyWeaponData";

interface BossConfigItem {
  players: number;
  difficulty: string;
  origin: string;
  enabled: boolean;
}

interface BossConfig {
  [key: string]: BossConfigItem;
}

export default function DestinyWeaponCalculator() {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
  const [currentStage, setCurrentStage] = useState(1); // 目前進行的階段 (1-3)
  const [currentStageEnergy, setCurrentStageEnergy] = useState(0); // 目前階段的決心 (0-3000)
  const [bossConfig, setBossConfig] = useState<BossConfig>({
    seren: { players: 1, difficulty: "hard", origin: "seren", enabled: true },
    serenReset: { players: 1, difficulty: "hard", origin: "seren", enabled: true },
    kalos: { players: 1, difficulty: "normal", origin: "kalos", enabled: true },
    kalosReset: { players: 1, difficulty: "normal", origin: "kalos", enabled: true },
    firstAdversary: { players: 1, difficulty: "normal", origin: "firstAdversary", enabled: true },
    kaling: { players: 1, difficulty: "normal", origin: "kaling", enabled: true },
    limbo: { players: 1, difficulty: "normal", origin: "limbo", enabled: true },
    baldrix: { players: 1, difficulty: "normal", origin: "baldrix", enabled: true },
  });

  const checkRules = (boss: string, testConfig: BossConfig) => {
    const rows = Object.values(testConfig).filter(row => row.origin === boss && row.enabled);
    const diffs = rows.map(row => row.difficulty);
    if ((boss === 'seren' || boss === 'kalos') && diffs.filter(d => d === 'extreme').length > 1) {
      return false;
    }
    return true;
  };

  const updateBossConfig = (boss: string, field: keyof BossConfigItem, value: string | number | boolean) => {
    if (field === 'difficulty') {
      const testConfig: BossConfig = {};
      Object.keys(bossConfig).forEach(key => {
        testConfig[key] = key === boss 
          ? { ...bossConfig[key], [field]: value as string }
          : { ...bossConfig[key] };
      });

      if ((testConfig[boss].origin === 'seren' || testConfig[boss].origin === 'kalos') && !checkRules(testConfig[boss].origin, testConfig)) {
        alert(`${bossData[testConfig[boss].origin].name} 無法選擇兩場極限`);
        return;
      }
    }

    const newConfig: BossConfig = {};
    Object.keys(bossConfig).forEach(key => {
      newConfig[key] = key === boss
        ? { ...bossConfig[key], [field]: value }
        : { ...bossConfig[key] };
    });
    setBossConfig(newConfig);
  };

  const calculateTotalWeekEnergy = () => {
    const total = Object.values(bossConfig).reduce((acc, config) => {
      if (!config.enabled) return acc;
      const perEnergy = Math.round(bossData[config.origin].difficulties[config.difficulty].energy / config.players);
      return acc + perEnergy;
    }, 0);
    return total;
  };

  // 根據階段和階段決心計算總決心
  const startEnergy = currentStage === 1 
    ? currentStageEnergy 
    : stageCumulative[currentStage - 2] + currentStageEnergy;

  function calculateStageWeeks(totalWeekEnergy: number, startEnergy: number) {
    let stageWeeks: number[] = [];

    stageEnergy.forEach((req, index) => {
      const cumulativeNeeded = stageCumulative[index];
      let weeks;
      if (totalWeekEnergy === 0) {
        weeks = 0;
      } else if (startEnergy >= cumulativeNeeded) {
        weeks = 0; // 已完成
      } else {
        weeks = Math.ceil((cumulativeNeeded - startEnergy) / totalWeekEnergy);
      }
      stageWeeks.push(weeks);
    });
    return stageWeeks;
  }

  const totalWeekEnergy = calculateTotalWeekEnergy();
  const stageWeeks = calculateStageWeeks(totalWeekEnergy, startEnergy);
  const percentage = Math.min((startEnergy / stageCumulative[2]) * 100, 100).toFixed(1);

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

          {/* 目前決心 */}
          <div className="grid grid-cols-1 md:grid-cols-[7fr_5fr] gap-4">
            {/* 階段選擇 */}
            <div>
              <Label htmlFor="currentStage" className="block text-sm font-bold mb-2">
                目前階段
              </Label>
              <Select
                value={currentStage.toString()}
                onValueChange={(value) => {
                  setCurrentStage(Number(value));
                  setCurrentStageEnergy(0); // 切換階段時重置階段決心
                }}
              >
                <SelectTrigger id="currentStage" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">
                    <div className="flex items-center gap-2">
                      <img src={bossIcon.seren} alt="Seren" className="w-6 h-6" />
                      <span>決戰，受選的賽連</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="2">
                    <div className="flex items-center gap-2">
                      <img src={bossIcon.kalos} alt="Kalos" className="w-6 h-6" />
                      <span>決戰，監視者卡洛斯</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="3">
                    <div className="flex items-center gap-2">
                      <img src={bossIcon.kaling} alt="Kaling" className="w-6 h-6" />
                      <span>決戰，使徒咖凌</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 階段決心輸入 */}
            <div>
              <Label htmlFor="currentStageEnergy" className="block text-sm font-bold mb-2">
                目前決心
              </Label>
              <Input
                type="number"
                id="currentStageEnergy"
                value={currentStageEnergy || ''}
                min="0"
                max={3000}
                onChange={(e) => {
                  const value = Number(e.target.value) || 0;
                  setCurrentStageEnergy(Math.min(Math.max(0, value), 3000));
                }}
                placeholder="輸入目前決心 (0-3000)"
              />
            </div>
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
                      <img src={itemIcon.adversarysDetermination} alt="Adversary's Determination" className="w-6 h-6 mx-auto" />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(bossConfig).map(([boss, { players, difficulty, origin, enabled }], index) => (
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
                          {(boss === "serenReset" || boss === "kalosReset") && (
                            <img
                              src={weeklyBossClearCountResetTicketIcon}
                              alt="Weekly_Boss_Clear_Count_Reset_Ticket_icon"
                              className="w-8 h-auto flex-shrink-0"
                            />
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
                            {enabled ? Math.round(bossData[origin].difficulties[difficulty].energy / players) : 0}
                          </Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={5} className="text-center font-bold py-4 text-lg">
                      每週總決心：{totalWeekEnergy.toLocaleString()}
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
          <div className="space-y-4">
            {stageCumulative.map((stage, i) => {
              const isCompleted = startEnergy >= stageCumulative[i];
              const weeks = stageWeeks[i];
              let finishDate = '--';

              if (weeks > 0 && !isCompleted) {
                const date = new Date(startDate);
                date.setDate(date.getDate() + (weeks - 1) * 7);
                finishDate = date.toLocaleDateString('zh-TW');
              } else if (isCompleted) {
                finishDate = '已完成';
              }

              return (
                <div
                  key={i}
                  className={`flex items-center justify-between ${i < stageCumulative.length - 1 ? 'border-b border-border pb-4' : ''}`}
                >
                  <div>
                    <div className="font-medium">第{i + 1}階段</div>
                    <div className="text-sm text-muted-foreground">
                      累積決心：{stage.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <div>{finishDate}</div>
                    <div className="font-medium">
                      第 <span className="text-cyan-500 dark:text-cyan-400">{weeks || 0}</span> 週
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 進度條容器 */}
          <Card className="border-0 shadow-none relative">
            <CardContent>
              {/* 進度條 */}
              <div className="relative">
                <div className="relative mx-0 my-12 overflow-visible">
                  <Progress
                    value={parseFloat(percentage)}
                    className="h-5 dark:[&>*]:bg-accent-foreground dark:[&>*]:shadow-sm border"
                  />

                  {/* 階段標記 */}
                  {stageCumulative.map((stage, i) => {
                    const isCompleted = startEnergy >= stageCumulative[i];
                    const isActive = !isCompleted && (i === 0 || startEnergy >= stageCumulative[i - 1]);
                    const weeks = stageWeeks[i];
                    let finishDate = '--';

                    if (weeks > 0 && !isCompleted) {
                      const date = new Date(startDate);
                      date.setDate(date.getDate() + (weeks - 1) * 7);
                      finishDate = date.toLocaleDateString('zh-TW');
                    } else if (isCompleted) {
                      finishDate = '已完成';
                    }

                    return (
                      <div
                        key={i}
                        className="absolute top-0 transform -translate-x-1/2 -translate-y-14 flex flex-col items-center z-10"
                        style={{ left: i !== 2 ? `${(stage / stageCumulative[2]) * 100}%` : '95%' }}
                      >
                        {/* 圓形圖標 */}
                        <div className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center transition-all duration-300 shadow-lg relative ${isCompleted ? 'bg-green-500 scale-110 shadow-green-500/30' :
                          isActive ? 'bg-yellow-500 scale-105 shadow-yellow-500/30 animate-pulse-glow' :
                            'bg-slate-300 shadow-slate-300/30'}`}>
                          {isCompleted ? (
                            <div className="text-white text-sm font-bold">✓</div>
                          ) : (
                            <img
                              src={i === 0 ? bossIcon.seren : i === 1 ? bossIcon.kalos : bossIcon.kaling}
                              alt={`Stage ${i + 1}`}
                              className="w-6 h-6 rounded-full object-contain"
                            />
                          )}
                        </div>

                        {/* 資訊標籤 */}
                        <div className={`mt-2 text-center text-[10px] md:text-xs bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm border-0 border-slate-200/50 whitespace-nowrap 
                        ${isCompleted ? 'text-green-600 font-semibold' : isActive ? 'text-yellow-600 font-semibold' : 'text-slate-500'}`}
                        >
                          <div>第{i + 1}階段</div>
                          {(isCompleted ? '已完成' : weeks > 0 ? `第${weeks}週` : '--') && (
                            <div className="">
                              {isCompleted ? '已完成' : weeks > 0 ? `第${weeks}週` : '--'}
                              {weeks > 0 && !isCompleted && <><br />{finishDate}</>}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 進度統計區塊 */}
              <div className="relative mt-16">
                {/* 進度狀態文字 */}
                <div className="text-center font-medium mb-6">
                  目前進度：{
                    startEnergy >= stageCumulative[2] ? `解放完成 ${startEnergy.toLocaleString()}/${stageCumulative[2].toLocaleString()}` :
                      startEnergy > stageCumulative[1] ? `第三階段 ${startEnergy.toLocaleString()}/${stageCumulative[2].toLocaleString()}` :
                        startEnergy > stageCumulative[0] ? `第二階段 ${startEnergy.toLocaleString()}/${stageCumulative[1].toLocaleString()}` :
                          `第一階段 ${startEnergy.toLocaleString()}/${stageCumulative[0].toLocaleString()}`
                  } ({percentage}%)
                </div>

                {/* 統計卡片 */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-muted/50 rounded-lg p-4 text-center border border-border/50">
                    <div className="text-2xl font-bold mb-1">
                      {startEnergy.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">目前決心</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 text-center border border-border/50">
                    <div className="text-2xl font-bold mb-1">
                      {totalWeekEnergy.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">每週決心</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 text-center border border-border/50">
                    <div className="text-2xl font-bold mb-1">
                      {startEnergy >= MAX_ENERGY ? 0 : Math.ceil((stageCumulative[2] - startEnergy) / (totalWeekEnergy || 1))}
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

                {totalWeekEnergy === 0 && startEnergy < MAX_ENERGY && (
                  <div className="absolute inset-0 bg-yellow-100/40 dark:bg-yellow-900/40 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
                    <h3 className="text-2xl text-yellow-600 dark:text-yellow-400 font-bold">去課金！</h3>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
