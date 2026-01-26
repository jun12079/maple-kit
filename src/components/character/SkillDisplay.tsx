import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { CharacterSkill, CharacterHexaMatrixStat, CharacterLinkSkill, Skill, LinkSkill, HexaStatCore } from '@/types/mapleAPI'

interface SkillWithOwned extends LinkSkill {
  isOwnedSkill?: boolean
}

interface SkillDisplayProps {
  hexaMatrix?: CharacterSkill | null
  hexaStatData?: CharacterHexaMatrixStat | null
  vMatrixData?: CharacterSkill | null
  linkSkillData?: CharacterLinkSkill | null
}

export function SkillDisplay({ hexaMatrix, hexaStatData, vMatrixData, linkSkillData }: SkillDisplayProps) {
  // 判斷當前裝備對應哪個預設
  const getCurrentPreset = (): string => {
    if (!linkSkillData || !linkSkillData.character_link_skill) return "1"

    const currentSkills = linkSkillData.character_link_skill
    if (currentSkills.length === 0) return "1"

    // 比較當前技能與各個預設
    const compareSkills = (preset: LinkSkill[] | undefined): boolean => {
      if (!preset || preset.length !== currentSkills.length) return false

      // 簡單比較：檢查技能名稱是否匹配
      const currentNames = currentSkills.map(skill => skill.skill_name).sort()
      const presetNames = preset.map(skill => skill.skill_name).sort()

      return JSON.stringify(currentNames) === JSON.stringify(presetNames)
    }

    if (compareSkills(linkSkillData.character_link_skill_preset_1)) return "1"
    if (compareSkills(linkSkillData.character_link_skill_preset_2)) return "2"
    if (compareSkills(linkSkillData.character_link_skill_preset_3)) return "3"

    return "1" // 預設回傳預設1
  }

  // 連結技能預設狀態 - 使用getCurrentPreset來初始化
  const [activeLinkSkillPreset, setActiveLinkSkillPreset] = useState<string>(() => getCurrentPreset())

  const getSkillGradeColor = (level: number): string => {
    if (level >= 30) return 'bg-yellow-500'
    if (level >= 25) return 'bg-orange-500'
    if (level >= 20) return 'bg-red-500'
    if (level >= 15) return 'bg-purple-500'
    if (level >= 10) return 'bg-blue-500'
    return 'bg-green-500'
  }

  // Hexa、V技能顯示
  const renderSkills = (skills?: Skill[]) => (
    <div className="flex flex-wrap gap-2">
      {skills?.map((skill, index) => (
        <div key={index} className="flex items-center justify-center">
          {/* 技能圖示 */}
          {skill.skill_icon && (
            <div className="relative">
              <img
                src={skill.skill_icon}
                alt={skill.skill_name}
                className="w-12 h-12 rounded"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
              {/* 等級標記 */}
              <Badge
                variant="secondary"
                className={`absolute -bottom-1 -right-1 text-xs px-1 min-w-6 text-center ${getSkillGradeColor(skill.skill_level)} text-white`}
              >
                {skill.skill_level}
              </Badge>
            </div>
          )}
        </div>
      ))}
    </div>
  )

  // 連結技能顯示
  const renderLinkSkills = (linkSkillData?: CharacterLinkSkill | null) => {
    if (!linkSkillData) {
      return (
        <>
          <h3 className="text-sm font-semibold mb-2">連結技能</h3>
          <div className="text-center py-4 text-muted-foreground text-sm">
            沒有裝備任何連結技能
          </div>
        </>
      )
    }

    // 渲染連結技能列表（包含擁有的連結技能）
    const renderLinkSkillList = (skills?: LinkSkill[]) => {
      // 合併擁有的連結技能到技能列表中
      let allSkills: SkillWithOwned[] = [...(skills || [])];

      // 檢查擁有的連結技能是否已存在於當前技能列表中
      if (linkSkillData.character_owned_link_skill) {
        const ownedSkill = linkSkillData.character_owned_link_skill;
        const isAlreadyInList = allSkills.some(skill =>
          skill.skill_name === ownedSkill.skill_name
        );

        // 如果不在列表中，則添加到前面
        if (!isAlreadyInList) {
          allSkills.unshift({
            ...ownedSkill,
            isOwnedSkill: true // 標記為擁有的技能
          });
        }
      }

      return (
        <div className="flex justify-center">
          {allSkills?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {allSkills.map((skill, index) => (
                <div key={index} className="flex items-center justify-center">
                  {skill.skill_icon && (
                    <div className="relative">
                      <img
                        src={skill.skill_icon}
                        alt={skill.skill_name}
                        className="w-12 h-12 rounded"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                      />
                      <Badge
                        variant="secondary"
                        className="absolute -bottom-1 -right-1 text-xs px-1 min-w-6 text-center bg-primary text-white"
                      >
                        {skill.skill_level}
                      </Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground text-sm">
              沒有設定連結技能
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="space-y-4">
        {/* 預設切換按鈕 */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold mb-2">連結技能</h3>
          <div className="flex gap-1">
            <Button
              variant={activeLinkSkillPreset === '1' ? 'default' : 'outline'}
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => setActiveLinkSkillPreset('1')}
            >
              預設 1
            </Button>
            <Button
              variant={activeLinkSkillPreset === '2' ? 'default' : 'outline'}
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => setActiveLinkSkillPreset('2')}
            >
              預設 2
            </Button>
            <Button
              variant={activeLinkSkillPreset === '3' ? 'default' : 'outline'}
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => setActiveLinkSkillPreset('3')}
            >
              預設 3
            </Button>
          </div>
        </div>

        {/* 技能顯示 */}
        <div>
          {activeLinkSkillPreset === '1' && renderLinkSkillList(linkSkillData.character_link_skill_preset_1)}
          {activeLinkSkillPreset === '2' && renderLinkSkillList(linkSkillData.character_link_skill_preset_2)}
          {activeLinkSkillPreset === '3' && renderLinkSkillList(linkSkillData.character_link_skill_preset_3)}
        </div>
      </div>
    )
  }

  // HEXA 屬性核心顯示
  const renderHexaStatCores = (hexaStatData?: CharacterHexaMatrixStat | null) => {
    if (!hexaStatData) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          沒有裝備任何 HEXA 屬性核心
        </div>
      )
    }

    // 取得三個屬性核心
    const statCores: (HexaStatCore | undefined)[] = [
      hexaStatData.character_hexa_stat_core?.[0],
      hexaStatData.character_hexa_stat_core_2?.[0],
      hexaStatData.character_hexa_stat_core_3?.[0]
    ].filter(Boolean)

    if (statCores.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          沒有裝備任何 HEXA 屬性核心
        </div>
      )
    }

    const coreNames = ['HEXA屬性 I', 'HEXA屬性 II', 'HEXA屬性 III']

    // 格式化數值顯示
    const formatStatValue = (value: number | undefined, statName: string): string => {
      if (value === undefined) return ''
      
      // 主要屬性、魔力、攻擊力不顯示百分比，其他都顯示
      const noPercentage = statName.includes('主要屬性') || 
                          statName.includes('魔力') || 
                          statName.includes('攻擊力')
      
      return `+${value}${noPercentage ? '' : '%'}`
    }

    // 計算進度百分比（最大等級10）
    const getProgressPercentage = (level: number): number => {
      return (level / 10) * 100
    }

    return (
      <div className="space-y-4">
        {/* 屬性總和 - 簡約顯示在標題下 */}
        {hexaStatData.stat_totals && Object.keys(hexaStatData.stat_totals).length > 0 && (
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {Object.entries(hexaStatData.stat_totals).map(([statName, statValue]) => (
              <div key={statName} className="flex items-center gap-1.5">
                <span className="text-muted-foreground">{statName}</span>
                <span className="font-semibold">
                  {formatStatValue(statValue as number, statName)}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* 核心列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {statCores.map((core, index) => {
            if (!core) return null
            
            return (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                {/* 標題與總等級 */}
                <div className="flex items-center justify-between pb-2">
                  <span className="text-base font-semibold">{coreNames[index]}</span>
                  <Badge variant="outline" className="text-xs">
                    Lv.{core.stat_grade}
                  </Badge>
                </div>

                {/* MAIN STAT */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground font-medium">MAIN STAT</div>
                    <div className="text-xs text-muted-foreground">
                      Lv.{core.main_stat_level}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>{core.main_stat_name}</span>
                      {core.main_stat_value !== undefined && (
                        <span className="font-semibold">
                          {formatStatValue(core.main_stat_value, core.main_stat_name)}
                        </span>
                      )}
                    </div>
                    <div className="relative h-1 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full bg-purple-500 transition-all"
                        style={{ width: `${getProgressPercentage(core.main_stat_level)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* ADDITIONAL STAT 1 */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground font-medium">ADDITIONAL STAT</div>
                    <div className="text-xs text-muted-foreground">
                      Lv.{core.sub_stat_level_1}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>{core.sub_stat_name_1}</span>
                      {core.sub_stat_value_1 !== undefined && (
                        <span className="font-semibold">
                          {formatStatValue(core.sub_stat_value_1, core.sub_stat_name_1)}
                        </span>
                      )}
                    </div>
                    <div className="relative h-1 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full bg-blue-500 transition-all"
                        style={{ width: `${getProgressPercentage(core.sub_stat_level_1)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* ADDITIONAL STAT 2 */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground font-medium">ADDITIONAL STAT</div>
                    <div className="text-xs text-muted-foreground">
                      Lv.{core.sub_stat_level_2}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>{core.sub_stat_name_2}</span>
                      {core.sub_stat_value_2 !== undefined && (
                        <span className="font-semibold">
                          {formatStatValue(core.sub_stat_value_2, core.sub_stat_name_2)}
                        </span>
                      )}
                    </div>
                    <div className="relative h-1 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full bg-blue-500 transition-all"
                        style={{ width: `${getProgressPercentage(core.sub_stat_level_2)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // 統一顯示模式
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">技能</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* HEXA矩陣 */}
        {hexaMatrix && hexaMatrix.character_skill && hexaMatrix.character_skill.length > 0 ? (
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-semibold mb-2">HEXA 矩陣</h3>
              {renderSkills(hexaMatrix.character_skill)}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-semibold mb-2">HEXA 矩陣</h3>
              <div className="text-center py-4 text-muted-foreground text-sm">
                沒有裝備任何 HEXA 技能
              </div>
            </div>
          </div>
        )}

        {/* HEXA屬性核心 */}
        <div className="space-y-3">
          <div className="border-t pt-4">
            <h3 className="text-sm font-semibold mb-2">HEXA 屬性</h3>
            {renderHexaStatCores(hexaStatData)}
          </div>
        </div>

        {/* V矩陣 */}
        <div className="space-y-3">
          <div className="border-t pt-4">
            <h3 className="text-sm font-semibold mb-2">V 矩陣</h3>
            {vMatrixData && vMatrixData.character_skill && vMatrixData.character_skill.length > 0 ? (
              renderSkills(vMatrixData.character_skill)
            ) : (
              <div className="text-center py-4 text-muted-foreground text-sm">
                沒有裝備任何 V 技能
              </div>
            )}
          </div>
        </div>

        {/* 連結技能 */}
        <div className="space-y-3">
          <div className="border-t pt-4">
            {renderLinkSkills(linkSkillData)}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
