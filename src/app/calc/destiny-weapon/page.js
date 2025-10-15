"use client";

import { useState } from "react";
import Image from "next/image";
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
import weeklyBossClearCountResetTicketIcon from "@/assets/images/Weekly_Boss_Clear_Count_Reset_Ticket_icon.png";
import serenIcon from "@/assets/images/bosses/icons/Seren_icon.png";
import kalosIcon from "@/assets/images/bosses/icons/Kalos_icon.png";
import kalingIcon from "@/assets/images/bosses/icons/Kaling_icon.png";
import limboIcon from "@/assets/images/bosses/icons/Limbo_icon.png";
import baldrixIcon from "@/assets/images/bosses/icons/Baldrix_icon.png";

const bossData = {
  seren: {
    name: '賽連',
    players: 6,
    difficulties: {
      hard: { name: '困難', energy: 6 },
      extreme: { name: '極限', energy: 80 }
    }
  },
  kalos: {
    name: '卡洛斯',
    players: 6,
    difficulties: {
      normal: { name: '普通', energy: 10 },
      hard: { name: '困難', energy: 70 },
      extreme: { name: '極限', energy: 400 }
    }
  },
  kaling: {
    name: '卡凌',
    players: 6,
    difficulties: {
      normal: { name: '普通', energy: 20 },
      hard: { name: '困難', energy: 160 },
      extreme: { name: '極限', energy: 1200 }
    }
  },
  limbo: {
    name: '林波',
    players: 3,
    difficulties: {
      normal: { name: '普通', energy: 120 },
      hard: { name: '困難', energy: 360 }
    }
  },
  baldrix: {
    name: '巴德利斯',
    players: 3,
    difficulties: {
      normal: { name: '普通', energy: 150 },
      hard: { name: '困難', energy: 450 }
    }
  }
};

const bossIcon = {
  seren: serenIcon,
  serenReset: serenIcon,
  kalos: kalosIcon,
  kalosReset: kalosIcon,
  kaling: kalingIcon,
  limbo: limboIcon,
  baldrix: baldrixIcon
};

const stageEnergy = [2000, 2500, 3000];
const stageCumulative = [2000, 4500, 7500];

export default function DestinyWeapon() {
  const [startDate, setStartDate] = useState(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [startEnergy, setStartEnergy] = useState(0);
  const [bossConfig, setBossConfig] = useState({
    seren: { players: 1, difficulty: "hard", origin: "seren", enabled: true },
    serenReset: { players: 1, difficulty: "hard", origin: "seren", enabled: true },
    kalos: { players: 1, difficulty: "normal", origin: "kalos", enabled: true },
    kalosReset: { players: 1, difficulty: "normal", origin: "kalos", enabled: true },
    kaling: { players: 1, difficulty: "normal", origin: "kaling", enabled: true },
    limbo: { players: 1, difficulty: "normal", origin: "limbo", enabled: true },
    baldrix: { players: 1, difficulty: "normal", origin: "baldrix", enabled: true },
  });

  const updateBossConfig = (boss, field, value) => {
    if (field === 'difficulty') {
      const testConfig = { ...bossConfig };
      testConfig[boss] = { ...testConfig[boss], [field]: value };

      if ((testConfig[boss].origin === 'seren' || testConfig[boss].origin === 'kalos') && !checkRules(testConfig[boss].origin, testConfig)) {
        alert(`${bossData[testConfig[boss].origin].name} 無法選擇兩場極限`);
        return;
      }
    }

    const newConfig = { ...bossConfig };
    newConfig[boss] = { ...newConfig[boss], [field]: value };
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

  const checkRules = (boss, testConfig) => {
    const rows = Object.values(testConfig).filter(row => row.origin === boss && row.enabled);
    const diffs = rows.map(row => row.difficulty);
    if ((boss === 'seren' || boss === 'kalos') && diffs.filter(d => d === 'extreme').length > 1) {
      return false;
    }
    return true;
  };

  function calculateStageWeeks(totalWeekEnergy, startEnergy) {
    let stageWeeks = [];

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">命運武器進度計算器</h1>

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
                    onSelect={(date) => {
                      setStartDate(date || new Date());
                      setCalendarOpen(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* 目前決心 */}
            <div>
              <Label htmlFor="startEnergy" className="block text-sm font-bold mb-2">
                目前決心
              </Label>
              <Input
                type="number"
                id="startEnergy"
                value={startEnergy}
                min="0"
                max="7500"
                onChange={(e) => setStartEnergy(Number(e.target.value))}
                placeholder="輸入目前決心數值 (0-7500)"
              />
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
                      <TableHead className="text-center">決心</TableHead>
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
                            <Image
                              src={bossIcon[origin]}
                              alt={origin}
                              className="w-8 h-auto flex-shrink-0"
                            />
                            {(boss === "serenReset" || boss === "kalosReset") && (
                              <Image
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
            <Card className="relative">
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
                              <Image
                                src={bossIcon[Object.keys(bossData)[i]]}
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

                {/* 進度狀態文字 */}
                <div className="text-center mt-16 font-medium">
                  目前進度：{
                    startEnergy >= stageCumulative[2] ? `解放完成 ${startEnergy.toLocaleString()}/${stageCumulative[2].toLocaleString()}` :
                      startEnergy > stageCumulative[1] ? `第三階段 ${startEnergy.toLocaleString()}/${stageCumulative[2].toLocaleString()}` :
                        startEnergy > stageCumulative[0] ? `第二階段 ${startEnergy.toLocaleString()}/${stageCumulative[1].toLocaleString()}` :
                          `第一階段 ${startEnergy.toLocaleString()}/${stageCumulative[0].toLocaleString()}`
                  } ({percentage}%)
                </div>

                {/* 統計卡片 */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                  <Card>
                    <CardContent className="text-center">
                      <div className="text-2xl font-bold mb-1">
                        {startEnergy.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground font-normal">目前決心</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="text-center">
                      <div className="text-2xl font-bold mb-1">
                        {totalWeekEnergy.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground font-normal">每週決心</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="text-center">
                      <div className="text-2xl font-bold mb-1">
                        {startEnergy >= 7500 ? 0 : Math.ceil((stageCumulative[2] - startEnergy) / (totalWeekEnergy || 1))}
                      </div>
                      <div className="text-sm text-muted-foreground font-normal">剩餘週數</div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>

              {/* 特殊狀態覆蓋層 */}
              {startEnergy >= 7500 && (
                <div className="absolute inset-0 bg-green-100/30 dark:bg-green-400/30 backdrop-blur-md rounded-xl flex items-center justify-center z-20">
                  <h3 className="text-2xl text-green-500 dark:text-green-400 font-bold">已解放！</h3>
                </div>
              )}

              {totalWeekEnergy === 0 && startEnergy < 7500 && (
                <div className="absolute inset-0 bg-yellow-100/30 dark:bg-yellow-400/30 backdrop-blur-md rounded-xl flex items-center justify-center z-20">
                  <h3 className="text-2xl text-yellow-500 dark:text-yellow-400 font-bold">去課金！</h3>
                </div>
              )}
            </Card>


          </CardContent>
        </Card>
      </div>
    </div>
  );
}