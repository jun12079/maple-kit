"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  CORE_TYPES, 
  MATERIALS, 
  calculateUpgradeCost,
  TOTAL_UPGRADE_COSTS,
  HEXA_UPGRADE_COSTS 
} from "@/data/hexa/hexaSkillData";
import Image from "next/image";

export default function HexaSkillCalculator() {
  // 技能核心 1 種
  const [skillCores, setSkillCores] = useState([{ level: 0 }]);
  
  // 精通核心 4 種
  const [masteryCores, setMasteryCores] = useState([
    { level: 0 },
    { level: 0 },
    { level: 0 },
    { level: 0 }
  ]);
  
  // 強化核心 4 種
  const [reinforcedCores, setReinforcedCores] = useState([
    { level: 0 },
    { level: 0 },
    { level: 0 },
    { level: 0 }
  ]);
  
  // 共通核心 1 種
  const [commonCores, setCommonCores] = useState([{ level: 0 }]);
  
  // 手機版核心類型切換
  const [selectedCoreType, setSelectedCoreType] = useState('skill');
  
  // 是否包含共用核心
  const [includeCommonCore, setIncludeCommonCore] = useState(true);

  // 更新核心等級
  const updateCoreLevel = (type, index, level) => {
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
  const calculations = useMemo(() => {
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
  const renderCoreInputs = (coreType, cores, typeName) => {
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
            <div className="flex items-center space-x-2">
              <Checkbox
                id="includeCommonCore"
                checked={includeCommonCore}
                onCheckedChange={setIncludeCommonCore}
              />
              <Label htmlFor="includeCommonCore" className="text-sm font-normal cursor-pointer">
                包含共用核心
              </Label>
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
                      <Image src={MATERIALS.solErda.icon} alt={MATERIALS.solErda.name} style={{ width: '24px', height: 'auto' }} />
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
                      <Image src={MATERIALS.solErdaFragment.icon} alt={MATERIALS.solErdaFragment.name} style={{ width: '24px', height: 'auto' }} />
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
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>HEXA 技能需求</CardTitle>
        </CardHeader>
        <CardContent>
          {/* 手機版技能切換按鈕 */}
          <div className="block md:hidden mb-6">
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: 'skill', name: '技能核心', color: 'text-[#7a44d6] border-[#7a44d6]/30' },
                { key: 'mastery', name: '精通核心', color: 'text-[#9d3e85] border-[#9d3e85]/30' },
                { key: 'reinforced', name: '強化核心', color: 'text-[#4389ae] border-[#4389ae]/30' },
                { key: 'common', name: '共通核心', color: 'text-[#7277a6] border-[#7277a6]/30' }
              ].map((core) => (
                <Button
                  key={core.key}
                  variant={selectedCoreType === core.key ? "default" : "outline"}
                  onClick={() => setSelectedCoreType(core.key)}
                  className={`${selectedCoreType === core.key ? '' : core.color}`}
                >
                  {core.name}
                </Button>
              ))}
            </div>
          </div>

          {/* 桌面版完整表格 */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/80 dark:bg-muted/60 sticky top-0">
                <tr className="border-b">
                  <th className="text-center py-3 px-2 font-semibold">升級</th>
                  <th className="text-center py-3 px-2 font-semibold" colSpan="2">
                    技能核心
                  </th>
                  <th className="text-center py-3 px-2 font-semibold" colSpan="2">
                    精通核心
                  </th>
                  <th className="text-center py-3 px-2 font-semibold" colSpan="2">
                    強化核心
                  </th>
                  <th className="text-center py-3 px-2 font-semibold" colSpan="2">
                    共通核心
                  </th>
                </tr>
                <tr className="border-b bg-muted/60 dark:bg-muted/40">
                  <th className="py-2 px-2"></th>
                  <th className="py-2 px-1 text-xs font-medium">
                    <Image src={MATERIALS.solErda.icon} alt={MATERIALS.solErda.shortName} className="mx-auto" style={{ width: '24px', height: 'auto' }} />
                  </th>
                  <th className="py-2 px-1 text-xs font-medium">
                    <Image src={MATERIALS.solErdaFragment.icon} alt={MATERIALS.solErdaFragment.shortName} className="mx-auto" style={{ width: '24px', height: 'auto' }} />
                  </th>
                  <th className="py-2 px-1 text-xs font-medium">
                    <Image src={MATERIALS.solErda.icon} alt={MATERIALS.solErda.shortName} className="mx-auto" style={{ width: '24px', height: 'auto' }} />
                  </th>
                  <th className="py-2 px-1 text-xs font-medium">
                    <Image src={MATERIALS.solErdaFragment.icon} alt={MATERIALS.solErdaFragment.shortName} className="mx-auto" style={{ width: '24px', height: 'auto' }} />
                  </th>
                  <th className="py-2 px-1 text-xs font-medium">
                    <Image src={MATERIALS.solErda.icon} alt={MATERIALS.solErda.shortName} className="mx-auto" style={{ width: '24px', height: 'auto' }} />
                  </th>
                  <th className="py-2 px-1 text-xs font-medium">
                    <Image src={MATERIALS.solErdaFragment.icon} alt={MATERIALS.solErdaFragment.shortName} className="mx-auto" style={{ width: '24px', height: 'auto' }} />
                  </th>
                  <th className="py-2 px-1 text-xs font-medium">
                    <Image src={MATERIALS.solErda.icon} alt={MATERIALS.solErda.shortName} className="mx-auto" style={{ width: '24px', height: 'auto' }} />
                  </th>
                  <th className="py-2 px-1 text-xs font-medium">
                    <Image src={MATERIALS.solErdaFragment.icon} alt={MATERIALS.solErdaFragment.shortName} className="mx-auto" style={{ width: '24px', height: 'auto' }} />
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 30 }, (_, i) => i + 1).map((level) => {
                  const skillCost = HEXA_UPGRADE_COSTS.skill.find(c => c.level === level);
                  const masteryCost = HEXA_UPGRADE_COSTS.mastery.find(c => c.level === level);
                  const reinforcedCost = HEXA_UPGRADE_COSTS.reinforced.find(c => c.level === level);
                  const commonCost = HEXA_UPGRADE_COSTS.common.find(c => c.level === level);
                  
                  // 特殊背景色的等級
                  const isSpecialLevel = level === 10 || level === 20 || level === 30;
                  
                  return (
                    <tr key={level} className={`border-b hover:bg-muted/30 transition-colors ${
                      isSpecialLevel ? 'bg-accent/50 dark:bg-accent/30' : ''
                    }`}>
                      <td className="text-center py-2 px-2 font-medium">
                        {level - 1}→{level}
                      </td>
                      <td className="text-center py-2 px-1">{skillCost?.solErda || 0}</td>
                      <td className="text-center py-2 px-1">{skillCost?.solErdaFragment || 0}</td>
                      <td className="text-center py-2 px-1">{masteryCost?.solErda || 0}</td>
                      <td className="text-center py-2 px-1">{masteryCost?.solErdaFragment || 0}</td>
                      <td className="text-center py-2 px-1">{reinforcedCost?.solErda || 0}</td>
                      <td className="text-center py-2 px-1">{reinforcedCost?.solErdaFragment || 0}</td>
                      <td className="text-center py-2 px-1">{commonCost?.solErda || 0}</td>
                      <td className="text-center py-2 px-1">{commonCost?.solErdaFragment || 0}</td>
                    </tr>
                  );
                })}
                {/* Total 行 */}
                <tr className="border-b-2 border-primary bg-primary/10 dark:bg-primary/5 font-bold">
                  <td className="text-center py-3 px-2">
                    總計
                  </td>
                  <td className="text-center py-3 px-1">
                    {TOTAL_UPGRADE_COSTS.skill.solErda}
                  </td>
                  <td className="text-center py-3 px-1">
                    {TOTAL_UPGRADE_COSTS.skill.solErdaFragment.toLocaleString()}
                  </td>
                  <td className="text-center py-3 px-1">
                    {TOTAL_UPGRADE_COSTS.mastery.solErda}
                  </td>
                  <td className="text-center py-3 px-1">
                    {TOTAL_UPGRADE_COSTS.mastery.solErdaFragment.toLocaleString()}
                  </td>
                  <td className="text-center py-3 px-1">
                    {TOTAL_UPGRADE_COSTS.reinforced.solErda}
                  </td>
                  <td className="text-center py-3 px-1">
                    {TOTAL_UPGRADE_COSTS.reinforced.solErdaFragment.toLocaleString()}
                  </td>
                  <td className="text-center py-3 px-1">
                    {TOTAL_UPGRADE_COSTS.common.solErda}
                  </td>
                  <td className="text-center py-3 px-1">
                    {TOTAL_UPGRADE_COSTS.common.solErdaFragment.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 手機版單一核心表格 */}
          <div className="block md:hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/80 dark:bg-muted/60">
                  <tr className="border-b">
                    <th className="text-center py-3 px-3 font-semibold">升級</th>
                    <th className="text-center py-3 px-3 font-semibold">
                      <div className="flex items-center justify-center space-x-2">
                        <Image src={MATERIALS.solErda.icon} alt={MATERIALS.solErda.name} style={{ width: '24px', height: 'auto' }} />
                        <span className="hidden sm:inline">{MATERIALS.solErda.shortName}</span>
                      </div>
                    </th>
                    <th className="text-center py-3 px-3 font-semibold">
                      <div className="flex items-center justify-center space-x-2">
                        <Image src={MATERIALS.solErdaFragment.icon} alt={MATERIALS.solErdaFragment.name} style={{ width: '24px', height: 'auto' }} />
                        <span className="hidden sm:inline">{MATERIALS.solErdaFragment.shortName}</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((level) => {
                    const cost = HEXA_UPGRADE_COSTS[selectedCoreType]?.find(c => c.level === level);
                    const isSpecialLevel = level === 10 || level === 20 || level === 30;
                    
                    return (
                      <tr key={level} className={`border-b hover:bg-muted/30 transition-colors ${
                        isSpecialLevel ? 'bg-accent/50 dark:bg-accent/30' : ''
                      }`}>
                        <td className="text-center py-2 px-3 font-medium">
                          {level - 1}→{level}
                        </td>
                        <td className="text-center py-2 px-3">{cost?.solErda || 0}</td>
                        <td className="text-center py-2 px-3">{cost?.solErdaFragment || 0}</td>
                      </tr>
                    );
                  })}
                  {/* Total 行 */}
                  <tr className="border-b-2 border-primary bg-primary/10 dark:bg-primary/5 font-bold">
                    <td className="text-center py-3 px-3">
                      總計
                    </td>
                    <td className="text-center py-3 px-3">
                      {TOTAL_UPGRADE_COSTS[selectedCoreType]?.solErda || 0}
                    </td>
                    <td className="text-center py-3 px-3">
                      {TOTAL_UPGRADE_COSTS[selectedCoreType]?.solErdaFragment?.toLocaleString() || 0}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}