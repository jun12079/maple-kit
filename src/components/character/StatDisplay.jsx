import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

/**
 * 統計資訊顯示組件
 * @param {Object} props
 * @param {Object} props.statData - 統計資訊
 * @param {Object} props.hyperStatData - 極限屬性資訊
 * @param {Object} props.abilityData - 能力資訊
 * @returns {JSX.Element}
 */
export function StatDisplay({ statData, hyperStatData, abilityData }) {
  const [activeHyperStatPreset, setActiveHyperStatPreset] = useState(hyperStatData?.use_preset_no?.toString() || '1')
  const [activeAbilityPreset, setActiveAbilityPreset] = useState(abilityData?.preset_no?.toString() || '1')
  const formatNumber = (num) => {
    if (!num) return '0'
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  // 定義顯示順序和API欄位名稱對應表
  const statConfig = [
    { display: 'HP', apiName: 'HP' },
    { display: 'MP', apiName: 'MP' },
    { display: 'STR', apiName: 'STR' },
    { display: 'DEX', apiName: 'DEX' },
    { display: 'INT', apiName: 'INT' },
    { display: 'LUK', apiName: 'LUK' },
    { display: '屬性攻擊力', apiName: ['最低屬性攻擊力', '最高屬性攻擊力'] },
    { display: '傷害', apiName: '傷害' },
    { display: '最終傷害', apiName: '最終傷害' },
    { display: 'BOSS怪物傷害', apiName: 'BOSS怪物傷害' },
    { display: '無視防禦率', apiName: '無視防禦率' },
    { display: '一般怪物傷害', apiName: '一般怪物傷害' },
    { display: '攻擊力', apiName: '攻擊力' },
    { display: '爆擊機率', apiName: '爆擊機率' },
    { display: '魔法攻擊力', apiName: '魔法攻擊力' },
    { display: '爆擊傷害', apiName: '爆擊傷害' },
    { display: '冷卻時間減少', apiName: ['冷卻時間減少(％)', '冷卻時間減少(秒)'] },
    { display: 'Buff持續時間', apiName: 'Buff持續時間' },
    { display: '無視冷卻時間', apiName: '未套用冷卻時間' },
    { display: '無視屬性抗性', apiName: '無視屬性耐性' },
    { display: '狀態異常追加傷害', apiName: '狀態異常追加傷害' },
    { display: '增加召喚獸持續時間', apiName: '召喚獸持續時間增加' },
    { display: '楓幣獲得量', apiName: '楓幣獲得量' },
    { display: '星力', apiName: '星力' },
    { display: '道具掉落率', apiName: '道具掉落率' },
    { display: '神秘力量', apiName: '神秘力量' },
    { display: '額外獲得經驗值', apiName: '獲得額外經驗值' },
    { display: '真實力量', apiName: '真實之力' },
    { display: '防禦力', apiName: '防禦力' },
    { display: '狀態異常耐性', apiName: '狀態異常耐性' },
    { display: '移動速度', apiName: '移動速度' },
    { display: '跳躍力', apiName: '跳躍力' },
    { display: '格擋', apiName: '格擋' },
    { display: '攻擊速度', apiName: '攻擊速度' }
  ]

  // 格式化特殊數值
  const formatStatValue = (stat, value) => {
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
      const parts = []
      if (percentStat && percentStat.stat_value !== '0') {
        parts.push(`${percentStat.stat_value}%`)
      }
      if (secondStat && secondStat.stat_value !== '0') {
        parts.push(`${secondStat.stat_value}秒`)
      }
      return parts.length > 0 ? parts.join(' + ') : '0'
    }

    // 百分比數值處理
    if (typeof value === 'string' && value.includes('.') &&
      ['傷害', '最終傷害', 'BOSS怪物傷害', '無視防禦率', '爆擊傷害', '一般怪物傷害', '無視屬性抗性', '狀態異常追加傷害', '獲得額外經驗值'].includes(stat.display)) {
      return `${value}%`
    }

    return formatNumber(value)
  }

  // 依照順序整理資料
  const orderedStats = statConfig.map(config => {
    let stat = null
    let value = '0'
    let hasData = false

    // 處理多個可能的API欄位名稱
    if (Array.isArray(config.apiName)) {
      // 特殊處理：屬性攻擊力
      if (config.display === '屬性攻擊力') {
        const minStat = statData.final_stat?.find(s => s.stat_name === '最低屬性攻擊力')
        const maxStat = statData.final_stat?.find(s => s.stat_name === '最高屬性攻擊力')
        if (minStat && maxStat) {
          stat = { stat_name: config.display, stat_value: 'range' }
          value = formatStatValue(config, '0')
          hasData = true
        }
      }
      // 特殊處理：冷卻時間減少
      else if (config.display === '冷卻時間減少') {
        const percentStat = statData.final_stat?.find(s => s.stat_name === '冷卻時間減少(%)')
        const secondStat = statData.final_stat?.find(s => s.stat_name === '冷卻時間減少(秒)')
        if ((percentStat && percentStat.stat_value !== '0') || (secondStat && secondStat.stat_value !== '0')) {
          stat = { stat_name: config.display, stat_value: 'combined' }
          value = formatStatValue(config, '0')
          hasData = true
        }
      }
      // 其他陣列類型欄位
      else {
        for (const apiName of config.apiName) {
          const foundStat = statData.final_stat?.find(s => s.stat_name === apiName)
          if (foundStat && foundStat.stat_value !== '0') {
            stat = foundStat
            value = formatStatValue(config, foundStat.stat_value)
            hasData = true
            break
          }
        }
      }
    } else {
      // 單一欄位名稱
      stat = statData.final_stat?.find(s => s.stat_name === config.apiName)
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
  const formatChineseNumber = (num) => {
    if (!num || num === '0') return '0'

    const number = parseInt(num.replace(/,/g, ''))

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
  const getRemainPoints = (presetNo) => {
    if (!hyperStatData) return 0
    const remainPointKey = `hyper_stat_preset_${presetNo}_remain_point`
    return hyperStatData[remainPointKey] || 0
  }

  const renderHyperStatList = (hyperStatPreset) => {
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
              <Badge className="bg-primary text-xs h-5 px-1">Lv. {stat.stat_level}</Badge>
              <span className="text-xs text-muted-foreground">{stat.stat_type}</span>
            </div>
            <div className="text-xs font-mono text-foreground">
              {stat.stat_increase}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // 角色內在潛能相關函數
  const getGradeColor = (grade) => {
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

  const renderAbilityList = (abilityInfo) => (
    <div className="space-y-1">
      {abilityInfo?.length > 0 ? (
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

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">角色資料</CardTitle>
        <CardDescription>剩餘 AP: {formatNumber(statData.remain_ap)}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 戰鬥力獨立顯示 */}
        <div className="text-center p-2 bg-muted/50 rounded-lg">
          <div className="text-xs font-medium mb-1">戰鬥力</div>
          <div className="font-mono text-lg font-bold text-muted-foreground">{combatPower}</div>
        </div>

        {/* 角色屬性 - 單排顯示，左側名稱右側數值 */}
        <div className="space-y-1">
          {orderedStats.map((stat, index) => (
            <div key={index} className="flex justify-between items-center py-1 px-2 rounded hover:bg-muted/30 transition-colors">
              <div className="text-xs text-muted-foreground truncate" title={stat.stat_name}>
                {stat.stat_name}
              </div>
              <div className="font-mono text-xs font-semibold text-foreground ml-2">
                {stat.stat_value}
              </div>
            </div>
          ))}
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

        {/* 角色內在潛能 */}
        {abilityData && (
          <div className="space-y-3">
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-sm font-semibold">角色內在潛能</h3>
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