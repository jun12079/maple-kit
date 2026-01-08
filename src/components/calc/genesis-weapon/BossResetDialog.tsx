"use client";

import { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";

const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || '';
const weeklyBossClearCountResetTicketIcon = `${CDN_URL}/images/Weekly_Boss_Clear_Count_Reset_Ticket_icon.png`;
const monthlyBossClearCountResetTicketIcon = `${CDN_URL}/images/Monthly_Boss_Clear_Count_Reset_Ticket_icon.png`;

import { genesisBossIcon, genesisBossData, WEEKLY_BOSSES, MONTHLY_BOSSES } from "@/data/bosses/genesisWeaponData";

// 定義Boss類型跟上限
const MAX_WEEKLY_SELECTION = 3;
const MAX_MONTHLY_SELECTION = 1;

interface BossConfigItem {
  players: number;
  difficulty: string;
  origin: string;
  enabled: boolean;
  reset: boolean;
}

interface BossConfig {
  [key: string]: BossConfigItem;
}

interface BossResetDialogProps<T extends BossConfig> {
  bossConfig: T;
  setBossConfig: (config: T) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BossResetDialog<T extends BossConfig>({ 
  bossConfig, 
  setBossConfig, 
  isOpen, 
  onOpenChange 
}: BossResetDialogProps<T>) {
  const [selectedBosses, setSelectedBosses] = useState<string[]>([]);

  // 從bossConfig取得所有boss
  const allBosses = useMemo(() => {
    return Object.entries(bossConfig).map(([boss, config]) => ({
      id: boss,
      origin: config.origin,
      name: genesisBossData[config.origin].name
    }));
  }, [bossConfig]);

  // 計算目前選擇的週、月王數量
  const selectionCounts = useMemo(() => {
    const weeklyCount = selectedBosses.filter(bossId => {
      const boss = allBosses.find(b => b.id === bossId);
      return boss && WEEKLY_BOSSES.includes(boss.origin);
    }).length;

    const monthlyCount = selectedBosses.filter(bossId => {
      const boss = allBosses.find(b => b.id === bossId);
      return boss && MONTHLY_BOSSES.includes(boss.origin);
    }).length;

    return { weekly: weeklyCount, monthly: monthlyCount };
  }, [selectedBosses, allBosses]);

  const handleBossToggle = (bossId: string) => {
    const isCurrentlySelected = selectedBosses.includes(bossId);

    if (isCurrentlySelected) {
      setSelectedBosses(prev => prev.filter(id => id !== bossId));
    } else {
      setSelectedBosses(prev => [...prev, bossId]);
    }
  };

  const handleBossReset = () => {
    // 更新boss配置
    const updatedConfig: BossConfig = {};
    Object.keys(bossConfig).forEach(key => {
      updatedConfig[key] = {
        ...bossConfig[key],
        reset: selectedBosses.includes(key)
      };
    });

    setBossConfig(updatedConfig as T);
    setSelectedBosses([]); // 重置選擇
    onOpenChange(false); // 關閉dialog
  };

  const isCheckboxDisabled = (bossId: string) => {
    const boss = allBosses.find(b => b.id === bossId);
    if (!boss) return true;

    const isSelected = selectedBosses.includes(bossId);

    if (isSelected) return false; // 已選中的不禁用

    const isWeeklyBoss = WEEKLY_BOSSES.includes(boss.origin);
    const isMonthlyBoss = MONTHLY_BOSSES.includes(boss.origin);

    if (isWeeklyBoss && selectionCounts.weekly >= MAX_WEEKLY_SELECTION) return true;
    if (isMonthlyBoss && selectionCounts.monthly >= MAX_MONTHLY_SELECTION) return true;

    return false;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-4 justify-center">
              <div className="flex items-center gap-2">
                <img 
                  src={weeklyBossClearCountResetTicketIcon} 
                  alt="Weekly Boss Clear Count Reset Ticket" 
                  className='w-6 h-6'
                />
                <span className="text-primary">{selectionCounts.weekly} / 3</span>
              </div>
              <div className="flex items-center gap-2">
                <img 
                  src={monthlyBossClearCountResetTicketIcon} 
                  alt="Monthly Boss Clear Count Reset Ticket" 
                  className='w-6 h-6'
                />
                <span className="text-primary">{selectionCounts.monthly} / 1</span>
              </div>
            </div>
          </DialogTitle>
          <DialogDescription className="sr-only">
            選擇要重置的 Boss 通關次數。每週最多可選 3 隻週 Boss，每月最多可選 1 隻月 Boss。
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto p-2">
          {allBosses.map((boss) => {
            const isSelected = selectedBosses.includes(boss.id);
            const isDisabled = isCheckboxDisabled(boss.id);

            return (
              <Card 
                key={boss.id}
                className={`cursor-pointer transition-all duration-200 rounded-xl shadow-sm overflow-hidden py-0 ${
                  isSelected ? 'border-green-500 bg-green-50 dark:bg-green-950' : ''
                } ${
                  isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-muted/50'
                }`}
                onClick={() => !isDisabled && handleBossToggle(boss.id)}
              >
                <CardContent className="flex items-center gap-3 p-3">
                  <Checkbox
                    checked={isSelected}
                    disabled={isDisabled}
                    onCheckedChange={() => !isDisabled && handleBossToggle(boss.id)}
                  />

                  <img
                    src={genesisBossIcon[boss.origin]}
                    alt={genesisBossData[boss.origin].name}
                    className="object-contain w-8 h-8"
                  />
                  
                  <h6 className="font-medium">{boss.name}</h6>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <DialogFooter>
          <Button onClick={handleBossReset}>
            確認
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
