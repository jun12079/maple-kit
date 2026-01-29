"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RotateCcw } from "lucide-react";
import {
  CORE_TYPES,
  MATERIALS,
  calculateUpgradeCost,
  TOTAL_UPGRADE_COSTS,
  CoreType
} from "@/data/hexa/hexaSkillData";
import { useHexaSkillSave } from "@/hooks/useHexaSkillSave";
import HexaRequirementsTable from "./HexaRequirementsTable";

interface Core {
  level: number;
}

interface Calculations {
  totalUsedSolErda: number;
  totalUsedSolErdaFragment: number;
  totalRequiredSolErda: number;
  totalRequiredSolErdaFragment: number;
  overallProgress: number;
}

export default function HexaSkillCalculator() {
  const { data: savedData, isLoaded, saveData, resetData } = useHexaSkillSave();

  // 技能核心 1 種
  const [skillCores, setSkillCores] = useState<Core[]>([
    { level: 0 },
    { level: 0 }
  ]);

  // 精通核心 4 種
  const [masteryCores, setMasteryCores] = useState<Core[]>([
    { level: 0 },
    { level: 0 },
    { level: 0 },
    { level: 0 }
  ]);

  // 強化核心 4 種
  const [reinforcedCores, setReinforcedCores] = useState<Core[]>([
    { level: 0 },
    { level: 0 },
    { level: 0 },
    { level: 0 }
  ]);

  // 共通核心 1 種
  const [commonCores, setCommonCores] = useState<Core[]>([{ level: 0 }]);

  // 是否包含共用核心
  const [includeCommonCore, setIncludeCommonCore] = useState(true);

  // 載入已儲存的資料
  useEffect(() => {
    if (isLoaded && savedData) {
      setSkillCores(savedData.skillCores);
      setMasteryCores(savedData.masteryCores);
      setReinforcedCores(savedData.reinforcedCores);
      setCommonCores(savedData.commonCores);
      setIncludeCommonCore(savedData.includeCommonCore);
    }
  }, [isLoaded]);

  // 自動儲存當前設定（跳過初次載入）
  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        saveData({
          skillCores,
          masteryCores,
          reinforcedCores,
          commonCores,
          includeCommonCore
        });
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [skillCores, masteryCores, reinforcedCores, commonCores, includeCommonCore, isLoaded, saveData]);

  // 重置所有資料
  const handleReset = () => {
    resetData();
    // 手動重置所有狀態
    setSkillCores([{ level: 0 }, { level: 0 }]);
    setMasteryCores([{ level: 0 }, { level: 0 }, { level: 0 }, { level: 0 }]);
    setReinforcedCores([{ level: 0 }, { level: 0 }, { level: 0 }, { level: 0 }]);
    setCommonCores([{ level: 0 }]);
    setIncludeCommonCore(true);
  };

  // 更新核心等級
  const updateCoreLevel = (type: CoreType, index: number, level: string) => {
    const parsedLevel = parseInt(level) || 0;
    const clampedLevel = Math.min(Math.max(parsedLevel, 0), 30);

    switch (type) {
      case 'skill':
        setSkillCores(prev => {
          const newCores = [...prev];
          newCores[index] = { level: clampedLevel };
          return newCores;
        });
        break;
      case 'mastery':
        setMasteryCores(prev => {
          const newCores = [...prev];
          newCores[index] = { level: clampedLevel };
          return newCores;
        });
        break;
      case 'reinforced':
        setReinforcedCores(prev => {
          const newCores = [...prev];
          newCores[index] = { level: clampedLevel };
          return newCores;
        });
        break;
      case 'common':
        setCommonCores(prev => {
          const newCores = [...prev];
          newCores[index] = { level: clampedLevel };
          return newCores;
        });
        break;
    }
  };

  // 計算總消耗和進度
  const calculations: Calculations = useMemo(() => {
    let totalUsedSolErda = 0;
    let totalUsedSolErdaFragment = 0;

    // 計算已使用的材料（從等級 0 到當前等級）
    skillCores.forEach(core => {
      if (core.level > 0) {
        const cost = calculateUpgradeCost('skill', 0, core.level);
        totalUsedSolErda += cost.solErda;
        totalUsedSolErdaFragment += cost.solErdaFragment;
      }
    });

    masteryCores.forEach(core => {
      if (core.level > 0) {
        const cost = calculateUpgradeCost('mastery', 0, core.level);
        totalUsedSolErda += cost.solErda;
        totalUsedSolErdaFragment += cost.solErdaFragment;
      }
    });

    reinforcedCores.forEach(core => {
      if (core.level > 0) {
        const cost = calculateUpgradeCost('reinforced', 0, core.level);
        totalUsedSolErda += cost.solErda;
        totalUsedSolErdaFragment += cost.solErdaFragment;
      }
    });

    if (includeCommonCore) {
      commonCores.forEach(core => {
        if (core.level > 0) {
          const cost = calculateUpgradeCost('common', 0, core.level);
          totalUsedSolErda += cost.solErda;
          totalUsedSolErdaFragment += cost.solErdaFragment;
        }
      });
    }

    // 總艾爾達氣息和碎片需求
    const totalRequiredSolErda =
      TOTAL_UPGRADE_COSTS.skill.solErda * skillCores.length +
      TOTAL_UPGRADE_COSTS.mastery.solErda * masteryCores.length +
      TOTAL_UPGRADE_COSTS.reinforced.solErda * reinforcedCores.length +
      (includeCommonCore ? TOTAL_UPGRADE_COSTS.common.solErda * commonCores.length : 0);

    const totalRequiredSolErdaFragment =
      TOTAL_UPGRADE_COSTS.skill.solErdaFragment * skillCores.length +
      TOTAL_UPGRADE_COSTS.mastery.solErdaFragment * masteryCores.length +
      TOTAL_UPGRADE_COSTS.reinforced.solErdaFragment * reinforcedCores.length +
      (includeCommonCore ? TOTAL_UPGRADE_COSTS.common.solErdaFragment * commonCores.length : 0);

    // 計算進度百分比
    const solErdaProgress = totalRequiredSolErda > 0 ? (totalUsedSolErda / totalRequiredSolErda) * 100 : 0;
    const solErdaFragmentProgress = totalRequiredSolErdaFragment > 0 ? (totalUsedSolErdaFragment / totalRequiredSolErdaFragment) * 100 : 0;
    const overallProgress = ((solErdaProgress + solErdaFragmentProgress) / 2);

    return {
      totalUsedSolErda,
      totalUsedSolErdaFragment,
      totalRequiredSolErda,
      totalRequiredSolErdaFragment,
      overallProgress: overallProgress || 0
    };
  }, [skillCores, masteryCores, reinforcedCores, commonCores, includeCommonCore]);

  // 渲染核心輸入區塊
  const renderCoreInputs = (coreType: CoreType, cores: Core[], typeName: string) => {
    return (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">{typeName}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {cores.map((core, index) => (
            <div key={index} className="space-y-1.5">
              <Label htmlFor={`${coreType}-${index}`} className="text-sm">
                {cores.length > 1 ? `${typeName} ${index + 1}` : typeName}
              </Label>
              <div className="relative">
                <Input
                  type="number"
                  id={`${coreType}-${index}`}
                  value={core.level || ''}
                  onChange={(e) => updateCoreLevel(coreType, index, e.target.value)}
                  min="0"
                  max="30"
                  className="pr-12"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  / 30
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* 技能等級與進度統計合併區 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">HEXA技能</h3>
            <div className="flex items-center gap-2">
              <Checkbox
                id="includeCommonCore"
                checked={includeCommonCore}
                onCheckedChange={(checked) => setIncludeCommonCore(checked as boolean)}
              />
              <Label htmlFor="includeCommonCore" className="text-sm font-normal cursor-pointer">
                包含共用核心
              </Label>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="gap-2 ml-2"
              >
                <RotateCcw className="h-4 w-4" />
                重置
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 左側：技能等級輸入區 */}
            <div className="space-y-6">
              {renderCoreInputs('skill', skillCores, CORE_TYPES.skill)}
              {renderCoreInputs('mastery', masteryCores, CORE_TYPES.mastery)}
              {renderCoreInputs('reinforced', reinforcedCores, CORE_TYPES.reinforced)}
              {renderCoreInputs('common', commonCores, CORE_TYPES.common)}
            </div>

            {/* 右側：進度統計區 */}
            <div className="space-y-6">
              {/* 總進度 */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">目前進度</span>
                  <Badge variant="outline" className="text-base font-bold">
                    {calculations.overallProgress.toFixed(1)}%
                  </Badge>
                </div>
                <Progress value={calculations.overallProgress} className="h-3" />
              </div>

              {/* 材料統計列表 */}
              <div className="space-y-3">
                {/* Sol Erda 統計 */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 px-3 bg-muted/50 rounded-md">
                    <div className="flex items-center space-x-2">
                      <img src={MATERIALS.solErda.icon} alt={MATERIALS.solErda.name} style={{ width: '24px', height: 'auto' }} />
                      <span className="text-sm font-medium">{MATERIALS.solErda.name}</span>
                    </div>
                    <div className="text-right text-sm">
                      <div className="font-semibold">
                        {calculations.totalUsedSolErda.toLocaleString()} / {calculations.totalRequiredSolErda.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        剩餘 {(calculations.totalRequiredSolErda - calculations.totalUsedSolErda).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sol Erda Fragment 統計 */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 px-3 bg-muted/50 rounded-md">
                    <div className="flex items-center space-x-2">
                      <img src={MATERIALS.solErdaFragment.icon} alt={MATERIALS.solErdaFragment.name} style={{ width: '24px', height: 'auto' }} />
                      <span className="text-sm font-medium">{MATERIALS.solErdaFragment.name}</span>
                    </div>
                    <div className="text-right text-sm">
                      <div className="font-semibold">
                        {calculations.totalUsedSolErdaFragment.toLocaleString()} / {calculations.totalRequiredSolErdaFragment.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        剩餘 {(calculations.totalRequiredSolErdaFragment - calculations.totalUsedSolErdaFragment).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* HEXA 技能需求表 */}
      <HexaRequirementsTable />
    </>
  );
}
