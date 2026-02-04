import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { CharacterStat, CharacterHyperStat, CharacterAbility, HyperStatPreset, AbilityInfo } from '@/types/mapleAPI'

interface StatConfig {
  display: string
  apiName: string | string[]
}

interface OrderedStat {
  stat_name: string
  stat_value: string
  has_data: boolean
}

interface StatDisplayProps {
  statData: CharacterStat
  hyperStatData?: CharacterHyperStat | null
  abilityData?: CharacterAbility | null
}

export function StatDisplay({ statData, hyperStatData, abilityData }: StatDisplayProps) {
  const [activeHyperStatPreset, setActiveHyperStatPreset] = useState<string>(hyperStatData?.use_preset_no?.toString() || '1')
  const [activeAbilityPreset, setActiveAbilityPreset] = useState<string>(abilityData?.preset_no?.toString() || '1')

  const formatNumber = (num: number | string): string => {
    if (!num) return '0'
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  // 定義顯示順序和API欄位名稱對應表
  const statConfig: StatConfig[] = [
    { display: 'HP', apiName: 'HP' },
    { display: 'MP', apiName: 'MP' },
    { display: 'STR', apiName: 'STR' },
    { display: 'DEX', apiName: 'DEX' },
    { display: 'INT', apiName: 'INT' },
    { display: 'LUK', apiName: 'LUK' },
    { display: '屬性攻擊力', apiName: ['最低屬性攻擊力', '最高屬性攻擊力'] },
    { display: '最終傷害', apiName: '最終傷害' },
    { display: '傷害', apiName: '傷害' },
    { display: 'BOSS怪物傷害', apiName: 'BOSS怪物傷害' },
    { display: '無視防禦率', apiName: '無視防禦率' },
    { display: '攻擊力', apiName: '攻擊力' },
    { display: '魔法攻擊力', apiName: '魔法攻擊力' },
    { display: '爆擊機率', apiName: '爆擊機率' },
    { display: '爆擊傷害', apiName: '爆擊傷害' },
    { display: '星力', apiName: '星力' },
    { display: '額外獲得經驗值', apiName: '獲得額外經驗值' },
    { display: '楓幣獲得量', apiName: '楓幣獲得量' },
    { display: '道具掉落率', apiName: '道具掉落率' },
    { display: '神秘力量', apiName: '神秘力量' },
    { display: '真實力量', apiName: '真實之力' },
    { display: '冷卻時間減少', apiName: ['冷卻時間減少(％)', '冷卻時間減少(秒)'] },
    { display: 'Buff持續時間', apiName: 'Buff持續時間' },
    { display: '無視冷卻時間', apiName: '未套用冷卻時間' },
    { display: '一般怪物傷害', apiName: '一般怪物傷害' },
    { display: '無視屬性抗性', apiName: '無視屬性耐性' },
    { display: '狀態異常耐性', apiName: '狀態異常耐性' },
    { display: '狀態異常追加傷害', apiName: '狀態異常追加傷害' },
    { display: '增加召喚獸持續時間', apiName: '召喚獸持續時間增加' },
    { display: '攻擊速度', apiName: '攻擊速度' },
    { display: '格擋', apiName: '格擋' },
    { display: '防禦力', apiName: '防禦力' },
    { display: '跳躍力', apiName: '跳躍力' },
    { display: '移動速度', apiName: '移動速度' }
  ]

  // 格式化特殊數值
  const formatStatValue = (stat: StatConfig, value: string): string => {
    // 屬性攻擊力特殊處理（範圍顯示）
    if (stat.display === '屬性攻擊力') {
      const minStat = statData.final_stat?.find(s => s.stat_name === '最低屬性攻擊力')
      const maxStat = statData.final_stat?.find(s => s.stat_name === '最高屬性攻擊力')
      if (minStat && maxStat) {
        return `${formatNumber(minStat.stat_value)} ~ ${formatNumber(maxStat.stat_value)}`
      }
    }

    // 冷卻時間減少特殊處理
    if (stat.display === '冷卻時間減少') {
      const percentStat = statData.final_stat?.find(s => s.stat_name === '冷卻時間減少(％)')
      const secondStat = statData.final_stat?.find(s => s.stat_name === '冷卻時間減少(秒)')

      const secondValue = secondStat?.stat_value || '0'
      const percentValue = percentStat?.stat_value || '0'

      return `${secondValue}秒 / ${percentValue}%`
    }

    // 攻擊速度特殊處理
    if (stat.display === '攻擊速度') {
      return `第${value}階段`
    }

    // 百分比數值處理
    if (typeof value === 'string' && value.includes('.') &&
      ['傷害', '最終傷害', 'BOSS怪物傷害', '無視防禦率', '爆擊傷害', '一般怪物傷害', '無視屬性抗性', '狀態異常追加傷害', '獲得額外經驗值'].includes(stat.display)) {
      return `${value}%`
    }

    // 需要加上 % 的統計項目
    if (['爆擊機率', 'Buff持續時間', '無視冷卻時間', '增加召喚獸持續時間', '楓幣獲得量', '道具掉落率', '額外獲得經驗值', '移動速度', '跳躍力', '格擋'].includes(stat.display)) {
      return `${formatNumber(value)}%`
    }

    return formatNumber(value)
  }

  // 依照順序整理資料
  const orderedStats: OrderedStat[] = statConfig.map(config => {
    let value = '0'
    let hasData = false

    // 處理多個可能的API欄位名稱
    if (Array.isArray(config.apiName)) {
      // 特殊處理：屬性攻擊力
      if (config.display === '屬性攻擊力') {
        const minStat = statData.final_stat?.find(s => s.stat_name === '最低屬性攻擊力')
        const maxStat = statData.final_stat?.find(s => s.stat_name === '最高屬性攻擊力')
        if (minStat && maxStat) {
          value = formatStatValue(config, '0')
          hasData = true
        }
      }
      // 特殊處理：冷卻時間減少
      else if (config.display === '冷卻時間減少') {
        const percentStat = statData.final_stat?.find(s => s.stat_name === '冷卻時間減少(%)')
        const secondStat = statData.final_stat?.find(s => s.stat_name === '冷卻時間減少(秒)')
        if ((percentStat && percentStat.stat_value !== '0') || (secondStat && secondStat.stat_value !== '0')) {
          value = formatStatValue(config, '0')
          hasData = true
        }
      }
      // 其他陣列類型欄位
      else {
        for (const apiName of config.apiName) {
          const foundStat = statData.final_stat?.find(s => s.stat_name === apiName)
          if (foundStat && foundStat.stat_value !== '0') {
            value = formatStatValue(config, foundStat.stat_value)
            hasData = true
            break
          }
        }
      }
    } else {
      // 單一欄位名稱
      const stat = statData.final_stat?.find(s => s.stat_name === config.apiName)
      if (stat && stat.stat_value !== '0') {
        value = formatStatValue(config, stat.stat_value)
        hasData = true
      }
    }

    return {
      stat_name: config.display,
      stat_value: value,
      has_data: hasData
    }
  }).filter(stat => stat.has_data)

  // 取得戰鬥力數據並轉換為中文單位
  const formatChineseNumber = (num: number | string): string => {
    if (!num || num === '0') return '0'

    const number = parseInt(num.toString().replace(/,/g, ''))

    if (number >= 100000000) {
      const yi = Math.floor(number / 100000000)
      const remainder = number % 100000000
      const wan = Math.floor(remainder / 10000)
      const lastDigits = remainder % 10000

      let result = `${yi}億`
      if (wan > 0) {
        result += `${wan}萬`
      }
      if (lastDigits > 0) {
        result += lastDigits
      }
      return result
    } else if (number >= 10000) {
      const wan = Math.floor(number / 10000)
      const remainder = number % 10000
      let result = `${wan}萬`
      if (remainder > 0) {
        result += remainder
      }
      return result
    }

    return formatNumber(number)
  }

  const combatPowerStat = statData.final_stat?.find(s => s.stat_name === '戰鬥力')
  const combatPower = combatPowerStat ? formatChineseNumber(combatPowerStat.stat_value) : '0'

  // 極限屬性相關函數
  const getRemainPoints = (presetNo: string): number => {
    if (!hyperStatData) return 0
    const remainPointKey = `hyper_stat_preset_${presetNo}_remain_point` as keyof CharacterHyperStat
    return (hyperStatData[remainPointKey] as number) || 0
  }

  const renderHyperStatList = (hyperStatPreset?: HyperStatPreset[]) => {
    if (!hyperStatPreset || hyperStatPreset.length === 0) {
      return (
        <div className="text-center py-4 text-xs text-muted-foreground">
          此預設沒有設定任何極限屬性
        </div>
      )
    }

    const activeStats = hyperStatPreset.filter(stat => stat.stat_level > 0)

    if (activeStats.length === 0) {
      return (
        <div className="text-center py-4 text-xs text-muted-foreground">
          此預設沒有升級任何極限屬性
        </div>
      )
    }

    const sortedStats = activeStats.sort((a, b) => b.stat_level - a.stat_level)

    return (
      <div className="space-y-1">
        {sortedStats.map((stat, index) => (
          <div key={index} className="flex justify-between items-center py-1 px-2 rounded hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-2">
              <Badge className="bg-primary text-xs h-5 px-0 w-7 sm:w-12 justify-center shrink-0">
                <span className="sm:hidden">{stat.stat_level}</span>
                <span className="hidden sm:inline">Lv. {stat.stat_level}</span>
              </Badge>
              <span className="text-xs text-muted-foreground">{stat.stat_type}</span>
            </div>
            <div className="text-xs font-mono text-foreground text-right">
              {stat.stat_increase}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // 內在潛能相關函數
  const getGradeColor = (grade: string): string => {
    switch (grade) {
      case '傳說':
        return 'text-green-700 dark:text-green-300 border-green-300 dark:border-green-600 bg-green-50 dark:bg-green-950/50'
      case '罕見':
        return 'text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-600 bg-orange-50 dark:bg-orange-950/50'
      case '稀有':
        return 'text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-600 bg-purple-50 dark:bg-purple-950/50'
      case '特殊':
        return 'text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-600 bg-blue-50 dark:bg-blue-950/50'
      default:
        return 'text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-950/50'
    }
  }

  const renderAbilityList = (abilityInfo?: AbilityInfo[]) => (
    <div className="space-y-1">
      {abilityInfo && abilityInfo.length > 0 ? (
        abilityInfo.map((ability, index) => (
          <div key={index} className={`p-2 rounded ${getGradeColor(ability.ability_grade)}`}>
            <p className="text-xs">{ability.ability_value}</p>
          </div>
        ))
      ) : (
        <p className="text-xs text-muted-foreground text-center py-4">尚未設定任何能力</p>
      )}
    </div>
  )

  // 依據類別分組屬性
  const basicStatsList = ['HP', 'MP', 'STR', 'DEX', 'INT', 'LUK']
  const attackStatsList = ['屬性攻擊力', '傷害', '最終傷害', 'BOSS怪物傷害', '無視防禦率', '攻擊力', '魔法攻擊力', '爆擊機率', '爆擊傷害']
  const specialStatsList = ['星力', '神秘力量', '真實力量', '道具掉落率', '楓幣獲得量', '額外獲得經驗值']

  const basicStats = orderedStats.filter(s => basicStatsList.includes(s.stat_name))
  const attackStats = orderedStats.filter(s => attackStatsList.includes(s.stat_name))
  const specialStats = orderedStats.filter(s => specialStatsList.includes(s.stat_name))
  const otherStats = orderedStats.filter(s =>
    !basicStatsList.includes(s.stat_name) &&
    !attackStatsList.includes(s.stat_name) &&
    !specialStatsList.includes(s.stat_name)
  )

  const renderStatGrid = (stats: OrderedStat[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className={`flex justify-between items-center py-1 px-2 rounded hover:bg-muted/30 transition-colors ${
            stat.stat_name === '屬性攻擊力' ? 'sm:col-span-2' : ''
          }`}
        >
          <div className="text-xs text-muted-foreground truncate shrink-0" title={stat.stat_name}>
            {stat.stat_name}
          </div>
          <div className="font-mono text-xs font-semibold text-foreground ml-2 text-right truncate">
            {stat.stat_value}
          </div>
        </div>
      ))}
    </div>
  )

  const StatSection = ({ stats }: { stats: OrderedStat[] }) => {
    if (stats.length === 0) return null
    return (
      <div className="space-y-2">
        <div className="h-px bg-border w-full opacity-50" />
        {renderStatGrid(stats)}
      </div>
    )
  }

  return (
    <Card className="gap-3">
      <CardHeader className="pb-0">
        <div>
          <h3 className="text-sm font-semibold">角色資料</h3>
          <p className="text-xs text-muted-foreground">剩餘 AP: {formatNumber(statData.remain_ap)}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 戰鬥力獨立顯示 */}
        <div className="text-center p-3 bg-muted/40 rounded-lg border border-border/50">
          <div className="text-xs font-medium mb-1 text-muted-foreground">戰鬥力</div>
          <div className="font-mono text-xl font-bold text-primary dark:text-primary-foreground">{combatPower}</div>
        </div>

        {/* 分組顯示屬性 */}
        <div className="space-y-5">
          <StatSection stats={basicStats} />
          <StatSection stats={attackStats} />
          <StatSection stats={specialStats} />
          <StatSection stats={otherStats} />
        </div>

        {/* 極限屬性 */}
        {hyperStatData && (
          <div className="space-y-3">
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-sm font-semibold">極限屬性</h3>
                  <p className="text-xs text-muted-foreground">
                    總點數: {formatNumber(hyperStatData.use_available_hyper_stat || 0)} | 剩餘: {formatNumber(getRemainPoints(activeHyperStatPreset))}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant={activeHyperStatPreset === '1' ? 'default' : 'outline'}
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={() => setActiveHyperStatPreset('1')}
                  >
                    預設 1
                  </Button>
                  <Button
                    variant={activeHyperStatPreset === '2' ? 'default' : 'outline'}
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={() => setActiveHyperStatPreset('2')}
                  >
                    預設 2
                  </Button>
                  <Button
                    variant={activeHyperStatPreset === '3' ? 'default' : 'outline'}
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={() => setActiveHyperStatPreset('3')}
                  >
                    預設 3
                  </Button>
                </div>
              </div>
              <div>
                {activeHyperStatPreset === '1' && renderHyperStatList(hyperStatData.hyper_stat_preset_1)}
                {activeHyperStatPreset === '2' && renderHyperStatList(hyperStatData.hyper_stat_preset_2)}
                {activeHyperStatPreset === '3' && renderHyperStatList(hyperStatData.hyper_stat_preset_3)}
              </div>
            </div>
          </div>
        )}

        {/* 內在潛能 */}
        {abilityData && (
          <div className="space-y-3">
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-sm font-semibold">內在潛能</h3>
                  <p className="text-xs text-muted-foreground">剩餘名聲值: {formatNumber(abilityData.remain_fame)}</p>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant={activeAbilityPreset === '1' ? 'default' : 'outline'}
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={() => setActiveAbilityPreset('1')}
                  >
                    預設 1
                  </Button>
                  <Button
                    variant={activeAbilityPreset === '2' ? 'default' : 'outline'}
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={() => setActiveAbilityPreset('2')}
                  >
                    預設 2
                  </Button>
                  <Button
                    variant={activeAbilityPreset === '3' ? 'default' : 'outline'}
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={() => setActiveAbilityPreset('3')}
                  >
                    預設 3
                  </Button>
                </div>
              </div>
              <div>
                {activeAbilityPreset === '1' && renderAbilityList(abilityData.ability_preset_1?.ability_info)}
                {activeAbilityPreset === '2' && renderAbilityList(abilityData.ability_preset_2?.ability_info)}
                {activeAbilityPreset === '3' && renderAbilityList(abilityData.ability_preset_3?.ability_info)}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
