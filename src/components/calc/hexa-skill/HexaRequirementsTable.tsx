"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MATERIALS,
  TOTAL_UPGRADE_COSTS,
  HEXA_UPGRADE_COSTS,
  CoreType
} from "@/data/hexa/hexaSkillData";

export default function HexaRequirementsTable() {
  const [selectedCoreType, setSelectedCoreType] = useState<CoreType>('skill');

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>HEXA 技能需求</CardTitle>
      </CardHeader>
      <CardContent>
        {/* 手機版技能切換按鈕 */}
        <div className="block md:hidden mb-6">
          <div className="grid grid-cols-2 gap-2">
            {[
              { key: 'skill' as CoreType, name: '技能核心', color: 'text-[#7a44d6] border-[#7a44d6]/30' },
              { key: 'mastery' as CoreType, name: '精通核心', color: 'text-[#9d3e85] border-[#9d3e85]/30' },
              { key: 'reinforced' as CoreType, name: '強化核心', color: 'text-[#4389ae] border-[#4389ae]/30' },
              { key: 'common' as CoreType, name: '共通核心', color: 'text-[#7277a6] border-[#7277a6]/30' }
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
                <th className="text-center py-3 px-2 font-semibold" colSpan={2}>
                  技能核心
                </th>
                <th className="text-center py-3 px-2 font-semibold" colSpan={2}>
                  精通核心
                </th>
                <th className="text-center py-3 px-2 font-semibold" colSpan={2}>
                  強化核心
                </th>
                <th className="text-center py-3 px-2 font-semibold" colSpan={2}>
                  共通核心
                </th>
              </tr>
              <tr className="border-b bg-muted/60 dark:bg-muted/40">
                <th className="py-2 px-2"></th>
                <th className="py-2 px-1 text-xs font-medium">
                  <img src={MATERIALS.solErda.icon} alt={MATERIALS.solErda.shortName} className="mx-auto" style={{ width: '24px', height: 'auto' }} />
                </th>
                <th className="py-2 px-1 text-xs font-medium">
                  <img src={MATERIALS.solErdaFragment.icon} alt={MATERIALS.solErdaFragment.shortName} className="mx-auto" style={{ width: '24px', height: 'auto' }} />
                </th>
                <th className="py-2 px-1 text-xs font-medium">
                  <img src={MATERIALS.solErda.icon} alt={MATERIALS.solErda.shortName} className="mx-auto" style={{ width: '24px', height: 'auto' }} />
                </th>
                <th className="py-2 px-1 text-xs font-medium">
                  <img src={MATERIALS.solErdaFragment.icon} alt={MATERIALS.solErdaFragment.shortName} className="mx-auto" style={{ width: '24px', height: 'auto' }} />
                </th>
                <th className="py-2 px-1 text-xs font-medium">
                  <img src={MATERIALS.solErda.icon} alt={MATERIALS.solErda.shortName} className="mx-auto" style={{ width: '24px', height: 'auto' }} />
                </th>
                <th className="py-2 px-1 text-xs font-medium">
                  <img src={MATERIALS.solErdaFragment.icon} alt={MATERIALS.solErdaFragment.shortName} className="mx-auto" style={{ width: '24px', height: 'auto' }} />
                </th>
                <th className="py-2 px-1 text-xs font-medium">
                  <img src={MATERIALS.solErda.icon} alt={MATERIALS.solErda.shortName} className="mx-auto" style={{ width: '24px', height: 'auto' }} />
                </th>
                <th className="py-2 px-1 text-xs font-medium">
                  <img src={MATERIALS.solErdaFragment.icon} alt={MATERIALS.solErdaFragment.shortName} className="mx-auto" style={{ width: '24px', height: 'auto' }} />
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
                  <tr
                    key={level}
                    className={`border-b hover:bg-muted/30 transition-colors ${isSpecialLevel ? 'bg-accent/50 dark:bg-accent/30' : ''}`}
                  >
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
                      <img src={MATERIALS.solErda.icon} alt={MATERIALS.solErda.name} style={{ width: '24px', height: 'auto' }} />
                      <span className="hidden sm:inline">{MATERIALS.solErda.shortName}</span>
                    </div>
                  </th>
                  <th className="text-center py-3 px-3 font-semibold">
                    <div className="flex items-center justify-center space-x-2">
                      <img src={MATERIALS.solErdaFragment.icon} alt={MATERIALS.solErdaFragment.name} style={{ width: '24px', height: 'auto' }} />
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
                    <tr
                      key={level}
                      className={`border-b hover:bg-muted/30 transition-colors ${isSpecialLevel ? 'bg-accent/50 dark:bg-accent/30' : ''}`}
                    >
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
  );
}
