import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import Image from 'next/image'
import { Star, Package } from 'lucide-react'

/**
 * 裝備詳情組件
 * @param {Object} props
 * @param {Object} props.equipmentData - 裝備資料
 * @param {Object} props.symbolData - 符文資料
 * @returns {JSX.Element}
 */
export function EquipmentDisplay({ equipmentData, symbolData }) {
  const [selectedEquipment, setSelectedEquipment] = useState(null)

  // 裝備位置映射 (7x4 grid for desktop)
  const equipmentSlots = [
    ['戒指1', '臉飾', '墜飾', '帽子', '披風', '武器', '稱號'],
    ['戒指2', '眼飾', '墜飾2', '上衣', '手套', '輔助武器', ''],
    ['戒指3', '腰帶', '胸章', '褲/裙', '鞋子', '徽章', ''],
    ['戒指4', '耳環', '勳章', '肩膀裝飾', '機器心臟', '口袋道具', '']
  ]

  // 手機版裝備位置映射 (4x7 grid for mobile)
  const equipmentSlotsMobile = [
    ['戒指1', '戒指2', '戒指3', '戒指4'],
    ['臉飾', '眼飾', '腰帶', '耳環'],
    ['墜飾', '墜飾2', '胸章', '勳章'],
    ['帽子', '上衣', '褲/裙', '肩膀裝飾'],
    ['披風', '手套', '鞋子', '機器心臟'],
    ['武器', '輔助武器', '徽章', '口袋道具'],
    ['稱號', '', '', '']
  ]

  const formatNumber = (num) => {
    if (!num) return '0'
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  // 判斷符文類型和最大等級
  const getSymbolInfo = (symbolName) => {
    const arcaneSymbols = ['祕法符文：消逝的旅途', '祕法符文：啾啾艾爾蘭', '祕法符文：拉契爾恩', '祕法符文：阿爾卡娜', '祕法符文：魔菈斯', '祕法符文：艾斯佩拉']
    const authenticSymbols = ['真實符文：賽爾尼溫', '真實符文：阿爾克斯', '真實符文：奧迪溫', '真實符文：桃源境', '真實符文：阿爾特利亞', '真實符文：卡爾西溫', '豪華真實符文：塔拉哈特']

    if (arcaneSymbols.includes(symbolName)) {
      return { type: 'ARC', maxLevel: 20 }
    } else if (authenticSymbols.includes(symbolName)) {
      return { type: 'AUT', maxLevel: 11 }
    }
    return { type: 'UNKNOWN', maxLevel: 20 }
  }

  // 計算 ARC 和 AUT 的統計資料
  const calculateSymbolStats = () => {
    if (!symbolData || !symbolData.symbol || symbolData.symbol.length === 0) {
      return {
        arc: { force: 0, stats: 0 },
        aut: { force: 0, stats: 0 },
        total: { stats: 0, dropRate: 0, mesoRate: 0, expRate: 0 }
      }
    }

    const stats = {
      arc: { force: 0, stats: 0 },
      aut: { force: 0, stats: 0 },
      total: { stats: 0, dropRate: 0, mesoRate: 0, expRate: 0 }
    }

    symbolData.symbol.forEach(symbol => {
      const symbolInfo = getSymbolInfo(symbol.symbol_name)
      const symbolForce = parseInt(symbol.symbol_force || 0)
      const totalStats = parseInt(symbol.symbol_str || 0) +
        parseInt(symbol.symbol_dex || 0) +
        parseInt(symbol.symbol_int || 0) +
        parseInt(symbol.symbol_luk || 0)

      // 計算總屬性
      stats.total.stats += totalStats

      // 計算掉寶、楓掉、經驗加成
      if (symbol.symbol_drop_rate && symbol.symbol_drop_rate !== '0') {
        stats.total.dropRate += parseInt(symbol.symbol_drop_rate)
      }
      if (symbol.symbol_meso_rate && symbol.symbol_meso_rate !== '0') {
        stats.total.mesoRate += parseInt(symbol.symbol_meso_rate)
      }
      if (symbol.symbol_exp_rate && symbol.symbol_exp_rate !== '0') {
        stats.total.expRate += parseInt(symbol.symbol_exp_rate)
      }

      if (symbolInfo.type === 'ARC') {
        stats.arc.force += symbolForce
        stats.arc.stats += totalStats
      } else if (symbolInfo.type === 'AUT') {
        stats.aut.force += symbolForce
        stats.aut.stats += totalStats
      }
    })

    return stats
  }

  const getPotentialColors = (grade) => {
    const colorMap = {
      '傳說': {
        bg: 'bg-green-50',
        text: 'text-green-700',
        option: 'text-green-600'
      },
      '罕見': {
        bg: 'bg-yellow-50',
        text: 'text-yellow-700',
        option: 'text-yellow-600'
      },
      '稀有': {
        bg: 'bg-purple-50',
        text: 'text-purple-700',
        option: 'text-purple-600'
      },
      '特殊': {
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        option: 'text-blue-600'
      }
    }
    return colorMap[grade] || {
      bg: 'bg-gray-50',
      text: 'text-gray-700',
      option: 'text-gray-600'
    }
  }

  // 根據裝備部位名稱找出對應的裝備或稱號
  const findEquipmentByPart = (itemList, partName, titleData) => {
    if (!partName) return null

    // 如果是稱號，返回稱號資料
    if (partName === '稱號') {
      return titleData && titleData.title_name ? titleData : null
    }

    // 其他裝備的處理
    if (!itemList) return null
    const slot = item => item.item_equipment_slot

    // 直接匹配裝備槽位名稱 (使用 item_equipment_slot)
    // API 會直接返回 "戒指1", "戒指2", "戒指3", "戒指4", "墜飾1", "墜飾2" 等
    return itemList.find(item => slot(item) === partName) || null
  }

  // 渲染裝備網格中的單個裝備槽
  const renderEquipmentSlot = (partName, itemList, titleData) => {
    const item = findEquipmentByPart(itemList, partName, titleData)
    const isEmpty = !partName || !item
    const isTitle = partName === '稱號'

    return (
      <div key={partName || 'empty'} className="flex flex-col items-center">
        <Button
          variant={selectedEquipment === item ? "default" : "outline"}
          className={`
            h-16 w-16 p-1 relative
            ${isEmpty ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent/50 dark:hover:bg-accent/50'}
            ${selectedEquipment === item ? 'bg-primary/10 border-primary dark:bg-primary/20 dark:border-primary' : ''}
          `}
          onClick={() => isEmpty ? null : setSelectedEquipment(item)}
          disabled={isEmpty}
        >
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center">
              <Package className="h-4 w-4 text-gray-400" />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="flex flex-col items-center justify-center flex-1">
                {/* 根據是否為稱號選擇不同的圖片和名稱 */}
                {(isTitle ? item.title_icon : item.item_icon) ? (
                  <Image
                    src={isTitle ? item.title_icon : item.item_icon}
                    alt={isTitle ? item.title_name : item.item_name}
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                    style={{ imageRendering: 'crisp-edges' }}
                    onError={(e) => { e.target.style.display = 'none' }}
                    priority={false}
                  />
                ) : (
                  <Package className="h-6 w-6 text-gray-600" />
                )}
              </div>
              {/* 只有裝備才顯示星力，固定在底部 */}
              {!isTitle && item.starforce && parseInt(item.starforce) > 0 && (
                <div className="flex items-center text-yellow-600 mt-0.5">
                  <Star className="h-3 w-3 fill-current" />
                  <span className="text-xs font-bold">{item.starforce}</span>
                </div>
              )}
            </div>
          )}
        </Button>
        {/* 顯示裝備槽位名稱 */}
        {partName && (
          <span className="text-xs text-gray-500 mt-1 text-center">{partName}</span>
        )}
      </div>
    )
  }

  // 渲染稱號詳細資訊
  const renderTitleDetail = (titleItem) => {
    if (!titleItem || !titleItem.title_name) return null

    return (
      <Card className="p-4">
        <div className="space-y-4">
          {/* 稱號標題 */}
          <div className="flex items-start gap-3">
            {titleItem.title_icon && (
              <Image
                src={titleItem.title_icon}
                alt={titleItem.title_name}
                width={24}
                height={24}
                className="w-6 h-6 flex-shrink-0"
                onError={(e) => { e.target.style.display = 'none' }}
              />
            )}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-lg">{titleItem.title_name}</h4>
              <Badge variant="outline">稱號</Badge>
            </div>
          </div>

          {/* 稱號描述 */}
          {titleItem.title_description && (
            <div>
              <h5 className="font-semibold mb-2">效果說明</h5>
              <div className="bg-blue-50 p-3 rounded">
                <p className="text-sm text-blue-800 whitespace-pre-line">
                  {titleItem.title_description}
                </p>
              </div>
            </div>
          )}

          {/* 到期日期 */}
          {titleItem.date_expire && (
            <div>
              <h5 className="font-semibold mb-2">到期日期</h5>
              <p className="text-sm text-gray-600">{titleItem.date_expire}</p>
            </div>
          )}
        </div>
      </Card>
    )
  }

  // 渲染裝備詳細資訊
  const renderEquipmentDetail = (item) => {
    if (!item) return null

    // 如果是稱號，使用稱號專用渲染函數
    if (item.title_name) {
      return renderTitleDetail(item)
    }

    // 定義屬性映射
    const statMappings = {
      str: 'STR',
      dex: 'DEX', 
      int: 'INT',
      luk: 'LUK',
      max_hp: 'HP',
      max_mp: 'MP',
      attack_power: '攻擊力',
      magic_power: '魔法攻擊力',
      armor: '防禦力',
      speed: '移動速度',
      jump: '跳躍力',
      boss_damage: 'BOSS傷害',
      ignore_monster_armor: '無視防禦率',
      all_stat: '全屬性',
      damage: '傷害',
      max_hp_rate: 'HP%',
      max_mp_rate: 'MP%'
    }

    // 獲取屬性的合計詳情
    const getStatBreakdown = () => {
      const statBreakdowns = {}
      
      // 獲取所有可能的屬性
      const allStats = new Set()
      
      if (item.item_total_option) {
        Object.keys(item.item_total_option).forEach(key => allStats.add(key))
      }
      if (item.item_base_option) {
        Object.keys(item.item_base_option).forEach(key => allStats.add(key))
      }
      if (item.item_starforce_option) {
        Object.keys(item.item_starforce_option).forEach(key => allStats.add(key))
      }
      if (item.item_etc_option) {
        Object.keys(item.item_etc_option).forEach(key => allStats.add(key))
      }
      if (item.item_add_option) {
        Object.keys(item.item_add_option).forEach(key => allStats.add(key))
      }

      allStats.forEach(statKey => {
        if (statKey === 'base_equipment_level' || statKey === 'equipment_level_decrease' || statKey === 'exceptional_upgrade') return

        const totalValue = parseInt(item.item_total_option?.[statKey] || 0)
        const baseValue = parseInt(item.item_base_option?.[statKey] || 0)
        const starforceValue = parseInt(item.item_starforce_option?.[statKey] || 0)
        const scrollValue = parseInt(item.item_etc_option?.[statKey] || 0)
        const flameValue = parseInt(item.item_add_option?.[statKey] || 0)

        // 只顯示總值不為0的屬性
        if (totalValue > 0) {
          statBreakdowns[statKey] = {
            total: totalValue,
            base: baseValue,
            starforce: starforceValue,
            scroll: scrollValue,
            flame: flameValue,
            displayName: statMappings[statKey] || statKey
          }
        }
      })

      return statBreakdowns
    }

    const statBreakdowns = getStatBreakdown()

    // 收集其他裝備資訊
    const equipmentInfo = []

    // 基本資訊
    equipmentInfo.push({ name: '裝備名稱', value: item.item_name })
    equipmentInfo.push({ name: '裝備部位', value: item.item_equipment_part })
    
    if (item.starforce && parseInt(item.starforce) > 0) {
      equipmentInfo.push({ name: '星力', value: `${item.starforce}星` })
    }

    // 卷軸和升級資訊
    if (item.scroll_upgrade && item.scroll_upgrade !== '0') {
      equipmentInfo.push({ name: '卷軸升級', value: `${item.scroll_upgrade}次` })
    }

    if (item.scroll_resilience_count && item.scroll_resilience_count !== '0') {
      equipmentInfo.push({ name: '守護盾', value: `${item.scroll_resilience_count}次` })
    }

    if (item.scroll_upgradeable_count && item.scroll_upgradeable_count !== '0') {
      equipmentInfo.push({ name: '可升級次數', value: `${item.scroll_upgradeable_count}次` })
    }

    if (item.starforce_scroll_flag && item.starforce_scroll_flag !== '未套用') {
      equipmentInfo.push({ name: '星力捲軸', value: item.starforce_scroll_flag })
    }

    // 成長等級
    if (item.growth_level && item.growth_level > 0) {
      equipmentInfo.push({ name: '成長等級', value: `Lv.${item.growth_level}` })
    }

    if (item.growth_exp && item.growth_exp > 0) {
      equipmentInfo.push({ name: '成長經驗', value: formatNumber(item.growth_exp) })
    }

    // 特殊戒指等級
    if (item.special_ring_level && item.special_ring_level > 0) {
      equipmentInfo.push({ name: '塔戒等級', value: `Lv.${item.special_ring_level}` })
    }

    // 到期日期
    if (item.date_expire && item.date_expire !== 'null') {
      equipmentInfo.push({ name: '到期日期', value: item.date_expire })
    }

    return (
      <div className="space-y-4">
        {/* 裝備標題 */}
        <div className="flex items-center gap-3 pb-2 border-b">
          {item.item_icon && (
            <Image
              src={item.item_icon}
              alt={item.item_name}
              width={24}
              height={24}
              className="w-6 h-6 flex-shrink-0"
              onError={(e) => { e.target.style.display = 'none' }}
            />
          )}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm">{item.item_name}</h4>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs">{item.item_equipment_part}</Badge>
              {item.starforce && parseInt(item.starforce) > 0 && (
                <Badge variant="secondary" className="bg-yellow-50 text-yellow-700 text-xs">
                  <Star className="inline-block w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
                  {item.starforce}星
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* 屬性詳細分解 */}
        {Object.keys(statBreakdowns).length > 0 && (
          <div className="space-y-2">
            <span className="text-sm font-semibold">屬性</span>
            <div className="space-y-1">
              {Object.entries(statBreakdowns).map(([statKey, breakdown]) => (
                <div key={statKey} className="flex justify-between items-center py-1 px-2 rounded hover:bg-muted/30 transition-colors">
                  <div className="text-xs text-muted-foreground truncate" title={breakdown.displayName}>
                    {breakdown.displayName}
                  </div>
                  <div className="font-mono text-xs font-semibold text-foreground ml-2 flex items-center gap-1">
                    <span>+{formatNumber(breakdown.total)}</span>
                    <span className="text-muted-foreground">(</span>
                    {breakdown.base > 0 && <span className="dark:text-white">{breakdown.base}</span>}
                    {breakdown.base > 0 && (breakdown.starforce > 0 || breakdown.scroll > 0 || breakdown.flame > 0) && <span className="text-muted-foreground">+</span>}
                    {breakdown.starforce > 0 && <span className="text-yellow-600">{breakdown.starforce}</span>}
                    {breakdown.starforce > 0 && (breakdown.scroll > 0 || breakdown.flame > 0) && <span className="text-muted-foreground">+</span>}
                    {breakdown.scroll > 0 && <span className="text-blue-600">{breakdown.scroll}</span>}
                    {breakdown.scroll > 0 && breakdown.flame > 0 && <span className="text-muted-foreground">+</span>}
                    {breakdown.flame > 0 && <span className="text-green-600">{breakdown.flame}</span>}
                    <span className="text-muted-foreground">)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 基本資訊 */}
        {equipmentInfo.length > 0 && (
          <div className="space-y-2 pt-2 border-t">
            <span className="text-sm font-semibold">裝備資訊</span>
            <div className="space-y-1">
              {equipmentInfo.map((info, index) => (
                <div key={index} className="flex justify-between items-center py-1 px-2 rounded hover:bg-muted/30 transition-colors">
                  <div className="text-xs text-muted-foreground truncate" title={info.name}>
                    {info.name}
                  </div>
                  <div className="font-mono text-xs font-semibold text-foreground ml-2">
                    {info.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 潛能 */}
        {(item.potential_option_1 || item.potential_option_2 || item.potential_option_3) && (
          <div className="space-y-2 pt-2 border-t">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">潛能</span>
              {item.potential_option_grade && (
                <Badge variant="secondary" className={`text-xs ${getPotentialColors(item.potential_option_grade).bg} ${getPotentialColors(item.potential_option_grade).text}`}>
                  {item.potential_option_grade}
                </Badge>
              )}
            </div>
            <div className="space-y-1">
              {[item.potential_option_1, item.potential_option_2, item.potential_option_3]
                .filter(Boolean)
                .map((option, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1 px-2 rounded hover:bg-muted/30 transition-colors">
                    <div className="text-xs text-muted-foreground">
                      潛能 {idx + 1}
                    </div>
                    <div className="font-mono text-xs font-semibold text-foreground ml-2">
                      {option}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* 附加潛能 */}
        {(item.additional_potential_option_1 || item.additional_potential_option_2 || item.additional_potential_option_3) && (
          <div className="space-y-2 pt-2 border-t">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">附加潛能</span>
              {item.additional_potential_option_grade && (
                <Badge variant="secondary" className={`text-xs ${getPotentialColors(item.additional_potential_option_grade).bg} ${getPotentialColors(item.additional_potential_option_grade).text}`}>
                  {item.additional_potential_option_grade}
                </Badge>
              )}
            </div>
            <div className="space-y-1">
              {[item.additional_potential_option_1, item.additional_potential_option_2, item.additional_potential_option_3]
                .filter(Boolean)
                .map((option, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1 px-2 rounded hover:bg-muted/30 transition-colors">
                    <div className="text-xs text-muted-foreground">
                      附加潛能 {idx + 1}
                    </div>
                    <div className="font-mono text-xs font-semibold text-foreground ml-2">
                      {option}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* 靈魂 */}
        {item.soul_name && (
          <div className="space-y-2 pt-2 border-t">
            <span className="text-sm font-semibold">靈魂</span>
            <div className="space-y-1">
              <div className="flex justify-between items-center py-1 px-2 rounded hover:bg-muted/30 transition-colors">
                <div className="text-xs text-muted-foreground">
                  靈魂名稱
                </div>
                <div className="font-mono text-xs font-semibold text-foreground ml-2">
                  {item.soul_name}
                </div>
              </div>
              {item.soul_option && (
                <div className="flex justify-between items-center py-1 px-2 rounded hover:bg-muted/30 transition-colors">
                  <div className="text-xs text-muted-foreground">
                    靈魂效果
                  </div>
                  <div className="font-mono text-xs font-semibold text-foreground ml-2">
                    {item.soul_option}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  // 渲染符文區塊的函數
  const renderSymbolSection = () => {
    if (!symbolData || !symbolData.symbol || symbolData.symbol.length === 0) {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-lg">符文之力</h4>
          </div>
          <p className="text-sm text-muted-foreground text-center py-4">尚未裝備任何符文</p>
        </div>
      )
    }

    const symbolStats = calculateSymbolStats()

    return (
      <div className="space-y-4">
        {/* 符文標題和統計 */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold">符文之力</h3>
            <p className="text-xs text-muted-foreground">
              ARC: {formatNumber(symbolStats.arc.force)} | AUT: {formatNumber(symbolStats.aut.force)} |
              屬性: {formatNumber(symbolStats.total.stats)}
              {(symbolStats.total.dropRate > 0 || symbolStats.total.mesoRate > 0 || symbolStats.total.expRate > 0) && (
                <>
                  {' | '}
                  {symbolStats.total.dropRate > 0 && `掉寶: ${symbolStats.total.dropRate}%`}
                  {symbolStats.total.dropRate > 0 && (symbolStats.total.mesoRate > 0 || symbolStats.total.expRate > 0) && ' | '}
                  {symbolStats.total.mesoRate > 0 && `楓掉: ${symbolStats.total.mesoRate}%`}
                  {symbolStats.total.mesoRate > 0 && symbolStats.total.expRate > 0 && ' | '}
                  {symbolStats.total.expRate > 0 && `經驗: ${symbolStats.total.expRate}%`}
                </>
              )}
            </p>
          </div>
        </div>

        {/* 符文網格 */}
        <div className="flex justify-center">
          <div className="grid grid-cols-6 gap-2 max-w-fit">
            {symbolData.symbol.map((symbol, index) => {
              return (
                <div key={index} className="flex flex-col items-center space-y-1">
                  {/* 符文圖示和等級 */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex flex-col items-center space-y-1">
                          {symbol.symbol_icon && (
                            <Image
                              src={symbol.symbol_icon}
                              alt={symbol.symbol_name}
                              width={32}
                              height={32}
                              className="w-8 h-8"
                            />
                          )}
                          <Badge
                            variant="secondary"
                            className={`bg-primary text-white text-xs px-1 py-0`}
                          >
                            Lv.{symbol.symbol_level}
                          </Badge>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{symbol.symbol_name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // 渲染裝備預設的函數
  const renderEquipmentPreset = (itemList) => (
    <div className="space-y-6">
      {/* 桌面版 7x4 裝備網格 */}
      <div className="hidden md:grid grid-cols-7 gap-2 justify-items-center">
        {equipmentSlots.map((row, rowIndex) =>
          row.map((partName, colIndex) => (
            <div key={`desktop-${rowIndex}-${colIndex}`}>
              {renderEquipmentSlot(partName, itemList, equipmentData?.title)}
            </div>
          ))
        )}
      </div>

      {/* 手機版 4x7 裝備網格 */}
      <div className="grid grid-cols-4 gap-2 justify-items-center md:hidden">
        {equipmentSlotsMobile.map((row, rowIndex) =>
          row.map((partName, colIndex) => (
            <div key={`mobile-${rowIndex}-${colIndex}`}>
              {renderEquipmentSlot(partName, itemList, equipmentData?.title)}
            </div>
          ))
        )}
      </div>

      {/* 選中裝備的詳細資訊 */}
      {selectedEquipment && (
        <div className="p-4 border rounded-lg bg-card">
          <h4 className="font-semibold text-sm mb-3">裝備詳細資訊</h4>
          {renderEquipmentDetail(selectedEquipment)}
        </div>
      )}

      {/* 提示文字 */}
      {!selectedEquipment && itemList && itemList.length > 0 && (
        <div className="text-center text-gray-500 py-4">
          點擊上方裝備圖標查看詳細資訊
        </div>
      )}

      {/* 無裝備提示 */}
      {(!itemList || itemList.length === 0) && (
        <div className="text-sm text-muted-foreground text-center py-4">尚未設定任何裝備</div>
      )}

      {/* 符文區塊 */}
      <div className="border-t pt-6">
        {renderSymbolSection()}
      </div>
    </div>
  )

  if (!equipmentData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>裝備資訊</CardTitle>
          <CardDescription>無資料</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-sm text-muted-foreground">查無裝備資訊</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">裝備資訊</CardTitle>
        <CardDescription className="text-sm">
          {symbolData && symbolData.symbol && symbolData.symbol.length > 0 && (
            <>
              符文數量: {symbolData.symbol.length}
            </>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Tabs
          defaultValue={equipmentData.preset_no?.toString() || "1"}
          className="w-full"
          onValueChange={() => setSelectedEquipment(null)}
        >
          <TabsList className="grid w-full grid-cols-3 h-9">
            <TabsTrigger value="1" className="text-sm">預設 1</TabsTrigger>
            <TabsTrigger value="2" className="text-sm">預設 2</TabsTrigger>
            <TabsTrigger value="3" className="text-sm">預設 3</TabsTrigger>
          </TabsList>

          <TabsContent value="1" className="mt-3 space-y-0">
            {renderEquipmentPreset(equipmentData.item_equipment_preset_1)}
          </TabsContent>

          <TabsContent value="2" className="mt-3 space-y-0">
            {renderEquipmentPreset(equipmentData.item_equipment_preset_2)}
          </TabsContent>

          <TabsContent value="3" className="mt-3 space-y-0">
            {renderEquipmentPreset(equipmentData.item_equipment_preset_3)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}