"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import weeklyBossClearCountResetTicketIcon from "@/assets/images/Weekly_Boss_Clear_Count_Reset_Ticket_icon.png";
import monthlyBossClearCountResetTicketIcon from "@/assets/images/Monthly_Boss_Clear_Count_Reset_Ticket_icon.png";
import lotusIcon from "@/assets/images/bosses/icons/Lotus_icon.png";
import damienIcon from "@/assets/images/bosses/icons/Damien_icon.png";
import willIcon from "@/assets/images/bosses/icons/Will_icon.png";
import lucidIcon from "@/assets/images/bosses/icons/Lucid_icon.png";
import verusHillaIcon from "@/assets/images/bosses/icons/VerusHilla_icon.png";
import gloomIcon from "@/assets/images/bosses/icons/Gloom_icon.png";
import darknellIcon from "@/assets/images/bosses/icons/Darknell_icon.png";
import blackMageIcon from "@/assets/images/bosses/icons/BlackMage_icon.png";

const bossIcon = {
  lotus: lotusIcon,
  damien: damienIcon,
  lucid: lucidIcon,
  will: willIcon,
  gloom: gloomIcon,
  darknell: darknellIcon,
  verusHilla: verusHillaIcon,
  blackMage: blackMageIcon
};

// Boss中文名稱對應
const bossNames = {
  lotus: '史烏',
  damien: '戴米安',
  lucid: '露希妲',
  will: '威爾',
  gloom: '戴斯克',
  darknell: '頓凱爾',
  verusHilla: '真希拉',
  blackMage: '黑魔法師'
};

// 定義Boss類型跟上限
const WEEKLY_BOSSES = ['lotus', 'damien', 'lucid', 'will', 'gloom', 'darknell', 'verusHilla'];
const MONTHLY_BOSSES = ['blackMage'];
const MAX_WEEKLY_SELECTION = 3;
const MAX_MONTHLY_SELECTION = 1;

export default function BossResetDialog({ 
  bossConfig, 
  setBossConfig, 
  isOpen, 
  onOpenChange 
}) {
  const [selectedBosses, setSelectedBosses] = useState([]);

  // 從bossConfig取得所有boss
  const allBosses = useMemo(() => {
    return Object.entries(bossConfig).map(([boss, config]) => ({
      id: boss,
      origin: config.origin,
      name: bossNames[config.origin]
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

  const handleBossToggle = (bossId) => {
    const isCurrentlySelected = selectedBosses.includes(bossId);

    if (isCurrentlySelected) {
      setSelectedBosses(prev => prev.filter(id => id !== bossId));
    } else {
      setSelectedBosses(prev => [...prev, bossId]);
    }
  };

  const handleBossReset = () => {
    // 更新boss配置
    const updatedConfig = { ...bossConfig };
    Object.keys(updatedConfig).forEach(boss => {
      updatedConfig[boss] = {
        ...updatedConfig[boss],
        reset: selectedBosses.includes(boss)
      };
    });

    setBossConfig(updatedConfig);
    setSelectedBosses([]); // 重置選擇
    onOpenChange(false); // 關閉dialog
  };

  const isCheckboxDisabled = (bossId) => {
    const boss = allBosses.find(b => b.id === bossId);
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
                <Image 
                  src={weeklyBossClearCountResetTicketIcon} 
                  alt="Weekly Boss Clear Count Reset Ticket" 
                  className='w-6 h-6'
                />
                <span className="text-primary">{selectionCounts.weekly} / 3</span>
              </div>
              <div className="flex items-center gap-2">
                <Image 
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
          {allBosses.map((boss) => {
            const isSelected = selectedBosses.includes(boss.id);
            const isDisabled = isCheckboxDisabled(boss.id);

            return (
              <Card 
                key={boss.id}
                className={`cursor-pointer transition-all duration-200 ${
                  isSelected ? 'border-green-500 bg-green-50 dark:bg-green-950' : ''
                } ${
                  isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-muted/50'
                }`}
                onClick={() => !isDisabled && handleBossToggle(boss.id)}
              >
                <CardContent className="flex items-center gap-3">
                  <Checkbox
                    checked={isSelected}
                    disabled={isDisabled}
                    onCheckedChange={() => !isDisabled && handleBossToggle(boss.id)}
                  />

                  <Image
                    src={bossIcon[boss.origin]}
                    alt={bossNames[boss.origin]}
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