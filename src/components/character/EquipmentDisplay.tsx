import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import Image from 'next/image'
import { Star, Package } from 'lucide-react'
import type { CharacterItemEquipment, CharacterSymbolEquipment, ItemEquipment, Title, Symbol, CharacterPetEquipment, PetEquipment } from '@/types/mapleAPI'

interface EquipmentDisplayProps {
  equipmentData: CharacterItemEquipment
  symbolData?: CharacterSymbolEquipment
  petData?: CharacterPetEquipment
}

interface SymbolInfo {
  type: 'ARC' | 'AUT' | 'UNKNOWN'
  maxLevel: number
}

interface SymbolStats {
  arc: { force: number; stats: number }
  aut: { force: number; stats: number }
  total: { stats: number; dropRate: number; mesoRate: number; expRate: number }
}

interface PotentialColors {
  bg: string
  text: string
  option: string
}

interface StatBreakdown {
  total: number
  base: number
  starforce: number
  scroll: number
  flame: number
  displayName: string
}

interface EquipmentInfo {
  name: string
  value: string
}

type EquipmentItem = ItemEquipment | Title

interface PetInfo {
  name: string
  icon: string
  equipment: PetEquipment
  slotName: string
}

type SelectedItem = EquipmentItem | PetInfo

export function EquipmentDisplay({ equipmentData, symbolData, petData }: EquipmentDisplayProps) {
  const [selectedEquipment, setSelectedEquipment] = useState<SelectedItem | null>(null)
  const [activePreset, setActivePreset] = useState<string>(equipmentData.preset_no?.toString() || '1')

  // 裝備位置映射 (6x6 grid for desktop)
  const equipmentSlots: string[][] = [
    ['戒指1', '臉飾', '耳環', '帽子', '披風', '稱號', '勳章', '機器心臟'],
    ['戒指2', '眼飾', '墜飾', '上衣', '手套', '武器', '輔助武器', '徽章'],
    ['戒指3', '腰帶', '墜飾2', '褲/裙', '鞋子', '寵物1', '寵物2', '寵物3'],
    ['戒指4', '胸章', '口袋道具', '肩膀裝飾', '', '寵物裝備1', '寵物裝備2', '寵物裝備3']
  ]

  // 手機版裝備位置映射 (4x9 grid for mobile)
  const equipmentSlotsMobile: string[][] = [
    ['戒指1', '戒指2', '戒指3', '戒指4'],
    ['臉飾', '眼飾', '腰帶', '耳環'],
    ['墜飾', '墜飾2', '胸章', '勳章'],
    ['帽子', '上衣', '褲/裙', '肩膀裝飾'],
    ['披風', '手套', '鞋子', '機器心臟'],
    ['武器', '輔助武器', '徽章', '口袋道具'],
    ['稱號', '', '', ''],
    ['寵物1', '寵物裝備1', '寵物2', '寵物裝備2'],
    ['寵物3', '寵物裝備3', '', '']
  ]

  const formatNumber = (num: number | string): string => {
    if (!num) return '0'
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  // 判斷符文類型和最大等級
  const getSymbolInfo = (symbolName: string): SymbolInfo => {
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
  const calculateSymbolStats = (): SymbolStats => {
    if (!symbolData || !symbolData.symbol || symbolData.symbol.length === 0) {
      return {
        arc: { force: 0, stats: 0 },
        aut: { force: 0, stats: 0 },
        total: { stats: 0, dropRate: 0, mesoRate: 0, expRate: 0 }
      }
    }

    const stats: SymbolStats = {
      arc: { force: 0, stats: 0 },
      aut: { force: 0, stats: 0 },
      total: { stats: 0, dropRate: 0, mesoRate: 0, expRate: 0 }
    }

    symbolData.symbol.forEach(symbol => {
      const symbolInfo = getSymbolInfo(symbol.symbol_name)
      const symbolForce = parseInt(symbol.symbol_force || '0')
      const totalStats = parseInt(symbol.symbol_str || '0') +
        parseInt(symbol.symbol_dex || '0') +
        parseInt(symbol.symbol_int || '0') +
        parseInt(symbol.symbol_luk || '0')

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

  const getPotentialColors = (grade: string): PotentialColors => {
    const colorMap: Record<string, PotentialColors> = {
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
  const findEquipmentByPart = (itemList: ItemEquipment[] | undefined, partName: string, titleData?: Title): EquipmentItem | null => {
    if (!partName) return null

    // 如果是稱號，返回稱號資料
    if (partName === '稱號') {
      return titleData && titleData.title_name ? titleData : null
    }

    // 其他裝備的處理
    if (!itemList) return null
    const slot = (item: ItemEquipment) => item.item_equipment_slot

    // 直接匹配裝備槽位名稱 (使用 item_equipment_slot)
    // API 會直接返回 "戒指1", "戒指2", "戒指3", "戒指4", "墜飾1", "墜飾2" 等
    return itemList.find(item => slot(item) === partName) || null
  }

  // 根據寵物槽位找出對應的寵物資訊
  const findPetBySlot = (slotName: string): PetInfo | null => {
    if (!petData) return null

    if (slotName === '寵物1' && petData.pet_1_name) {
      return {
        name: petData.pet_1_name,
        icon: petData.pet_1_icon,
        equipment: petData.pet_1_equipment,
        slotName
      }
    } else if (slotName === '寵物裝備1' && petData.pet_1_equipment?.item_name) {
      return {
        name: petData.pet_1_name,
        icon: petData.pet_1_icon,
        equipment: petData.pet_1_equipment,
        slotName
      }
    } else if (slotName === '寵物2' && petData.pet_2_name) {
      return {
        name: petData.pet_2_name,
        icon: petData.pet_2_icon,
        equipment: petData.pet_2_equipment,
        slotName
      }
    } else if (slotName === '寵物裝備2' && petData.pet_2_equipment?.item_name) {
      return {
        name: petData.pet_2_name,
        icon: petData.pet_2_icon,
        equipment: petData.pet_2_equipment,
        slotName
      }
    } else if (slotName === '寵物3' && petData.pet_3_name) {
      return {
        name: petData.pet_3_name,
        icon: petData.pet_3_icon,
        equipment: petData.pet_3_equipment,
        slotName
      }
    } else if (slotName === '寵物裝備3' && petData.pet_3_equipment?.item_name) {
      return {
        name: petData.pet_3_name,
        icon: petData.pet_3_icon,
        equipment: petData.pet_3_equipment,
        slotName
      }
    }
    return null
  }

  // 類型守衛函數
  const isTitle = (item: SelectedItem): item is Title => {
    return 'title_name' in item
  }

  const isItemEquipment = (item: SelectedItem): item is ItemEquipment => {
    return 'item_name' in item && !('equipment' in item)
  }

  const isPetInfo = (item: SelectedItem): item is PetInfo => {
    return 'equipment' in item && 'name' in item
  }

  // 判斷是否選中
  const isSelected = (candidate: SelectedItem | null) => {
    if (!selectedEquipment || !candidate) return false
    
    // 如果是寵物，比較 slotName
    if (isPetInfo(selectedEquipment) && isPetInfo(candidate)) {
      return selectedEquipment.slotName === candidate.slotName
    }
    
    // 其他情況比較引用
    return selectedEquipment === candidate
  }

  // 渲染裝備網格中的單個裝備槽
  const renderEquipmentSlot = (partName: string, itemList: ItemEquipment[] | undefined, titleData?: Title, slotIndex?: number) => {
    // 檢查是否為寵物槽位
    const isPetSlot = partName.includes('寵物')
    const petInfo = isPetSlot ? findPetBySlot(partName) : null
    const item = isPetSlot ? null : findEquipmentByPart(itemList, partName, titleData)
    const isEmpty = !partName || (!item && !petInfo)
    const isTitleItem = item && isTitle(item)
    const isPetEquipmentSlot = partName.includes('裝備') && isPetSlot

    const currentItem = petInfo || item
    const selected = isSelected(currentItem)

    return (
      <div key={partName || `empty-${slotIndex}`} className="flex flex-col items-center">
        <Button
          variant="outline"
          className={`
            h-16 w-16 p-1 relative
            ${isEmpty ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            ${selected 
              ? 'bg-primary/10 dark:bg-primary/20 border-primary hover:bg-primary/10 dark:hover:bg-primary/20' 
              : (!isEmpty ? 'hover:bg-accent/50 dark:hover:bg-accent/50' : '')
            }
          `}
          onClick={() => !isEmpty && setSelectedEquipment(currentItem)}
        >
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center">
              <Package className="h-4 w-4 text-gray-400" />
            </div>
          ) : petInfo ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="flex flex-col items-center justify-center flex-1">
                {(isPetEquipmentSlot ? petInfo.equipment.item_icon : petInfo.icon) ? (
                  <Image
                    src={isPetEquipmentSlot ? petInfo.equipment.item_icon : petInfo.icon}
                    alt={isPetEquipmentSlot ? petInfo.equipment.item_name : petInfo.name}
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                    style={{ imageRendering: 'crisp-edges' }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                    priority={false}
                  />
                ) : (
                  <Package className="h-6 w-6 text-gray-600" />
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="flex flex-col items-center justify-center flex-1">
                {/* 根據是否為稱號選擇不同的圖片和名稱 */}
                {(isTitleItem ? (item as Title).title_icon : (item as ItemEquipment).item_icon) ? (
                  <Image
                    src={isTitleItem ? (item as Title).title_icon : (item as ItemEquipment).item_icon}
                    alt={isTitleItem ? (item as Title).title_name : (item as ItemEquipment).item_name}
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                    style={{ imageRendering: 'crisp-edges' }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                    priority={false}
                  />
                ) : (
                  <Package className="h-6 w-6 text-gray-600" />
                )}
              </div>
              {/* 只有裝備才顯示星力，固定在底部 */}
              {!isTitleItem && item && isItemEquipment(item) && item.starforce && parseInt(item.starforce) > 0 && (
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
  const renderTitleDetail = (titleItem: Title) => {
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
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
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

  // 渲染寵物裝備詳細資訊
  const renderPetEquipmentDetail = (petInfo: PetInfo) => {
    if (!petInfo || !petInfo.equipment) return null

    const equipment = petInfo.equipment

    return (
      <div className="space-y-4">
        {/* 寵物標題 */}
        <div className="flex items-start gap-3 pb-2 border-b">
          {petInfo.icon && (
            <Image
              src={petInfo.icon}
              alt={petInfo.name}
              width={32}
              height={32}
              className="w-8 h-8 flex-shrink-0"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          )}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm">{petInfo.name}</h4>
            <Badge variant="outline">寵物</Badge>
          </div>
        </div>

        {/* 寵物裝備資訊 */}
        {equipment.item_name && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              {equipment.item_icon && (
                <Image
                  src={equipment.item_icon}
                  alt={equipment.item_name}
                  width={24}
                  height={24}
                  className="w-6 h-6"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              )}
              <h5 className="font-semibold text-sm">{equipment.item_name}</h5>
            </div>

            {/* 裝備描述 */}
            {equipment.item_description && (
              <div className="bg-muted/30 p-3 rounded">
                <p className="text-xs text-muted-foreground whitespace-pre-line">
                  {equipment.item_description}
                </p>
              </div>
            )}

            {/* 裝備選項 */}
            {equipment.item_option && equipment.item_option.length > 0 && (
              <div className="space-y-2">
                <h5 className="font-semibold text-sm">裝備屬性</h5>
                <div className="space-y-1">
                  {equipment.item_option.map((option, index) => (
                    <div key={index} className="flex justify-between items-center py-1 px-2 rounded hover:bg-muted/30 transition-colors">
                      <div className="text-xs text-muted-foreground">{option.option_type}</div>
                      <div className="font-mono text-xs font-semibold text-foreground">+{option.option_value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 卷軸升級資訊 */}
            {(equipment.scroll_upgrade > 0 || equipment.scroll_upgradable > 0) && (
              <div className="space-y-2 pt-2 border-t">
                <h5 className="font-semibold text-sm">升級資訊</h5>
                <div className="space-y-1">
                  {equipment.scroll_upgrade > 0 && (
                    <div className="flex justify-between items-center py-1 px-2 rounded hover:bg-muted/30 transition-colors">
                      <div className="text-xs text-muted-foreground">已升級次數</div>
                      <div className="font-mono text-xs font-semibold text-foreground">{equipment.scroll_upgrade}次</div>
                    </div>
                  )}
                  {equipment.scroll_upgradable > 0 && (
                    <div className="flex justify-between items-center py-1 px-2 rounded hover:bg-muted/30 transition-colors">
                      <div className="text-xs text-muted-foreground">可升級次數</div>
                      <div className="font-mono text-xs font-semibold text-foreground">{equipment.scroll_upgradable}次</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  // 渲染裝備詳細資訊
  const renderEquipmentDetail = (item: SelectedItem) => {
    if (!item) return null

    // 如果是寵物，使用寵物專用渲染函數
    if (isPetInfo(item)) {
      return renderPetEquipmentDetail(item)
    }

    // 如果是稱號，使用稱號專用渲染函數
    if (isTitle(item)) {
      return renderTitleDetail(item)
    }

    // 類型斷言，現在知道是 ItemEquipment
    const equipment = item as ItemEquipment

    // 定義屬性映射
    const statMappings: Record<string, string> = {
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
    const getStatBreakdown = (): Record<string, StatBreakdown> => {
      const statBreakdowns: Record<string, StatBreakdown> = {}

      // 獲取所有可能的屬性
      const allStats = new Set<string>()

      if (equipment.item_total_option) {
        Object.keys(equipment.item_total_option).forEach(key => allStats.add(key))
      }
      if (equipment.item_base_option) {
        Object.keys(equipment.item_base_option).forEach(key => allStats.add(key))
      }
      if (equipment.item_starforce_option) {
        Object.keys(equipment.item_starforce_option).forEach(key => allStats.add(key))
      }
      if (equipment.item_etc_option) {
        Object.keys(equipment.item_etc_option).forEach(key => allStats.add(key))
      }
      if (equipment.item_add_option) {
        Object.keys(equipment.item_add_option).forEach(key => allStats.add(key))
      }

      allStats.forEach(statKey => {
        if (statKey === 'base_equipment_level' || statKey === 'equipment_level_decrease' || statKey === 'exceptional_upgrade') return

        const totalValue = parseInt((equipment.item_total_option as any)?.[statKey] || '0')
        const baseValue = parseInt((equipment.item_base_option as any)?.[statKey] || '0')
        const starforceValue = parseInt((equipment.item_starforce_option as any)?.[statKey] || '0')
        const scrollValue = parseInt((equipment.item_etc_option as any)?.[statKey] || '0')
        const flameValue = parseInt((equipment.item_add_option as any)?.[statKey] || '0')

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
    const equipmentInfo: EquipmentInfo[] = []

    // 基本資訊
    equipmentInfo.push({ name: '裝備名稱', value: equipment.item_name })
    equipmentInfo.push({ name: '裝備部位', value: equipment.item_equipment_part })

    if (equipment.starforce && parseInt(equipment.starforce) > 0) {
      equipmentInfo.push({ name: '星力', value: `${equipment.starforce}星` })
    }

    // 卷軸和升級資訊
    if (equipment.scroll_upgrade && equipment.scroll_upgrade !== '0') {
      equipmentInfo.push({ name: '卷軸升級', value: `${equipment.scroll_upgrade}次` })
    }

    if (equipment.scroll_resilience_count && equipment.scroll_resilience_count !== '0') {
      equipmentInfo.push({ name: '守護盾', value: `${equipment.scroll_resilience_count}次` })
    }

    if (equipment.scroll_upgradable_count && equipment.scroll_upgradable_count !== '0') {
      equipmentInfo.push({ name: '可升級次數', value: `${equipment.scroll_upgradable_count}次` })
    }

    if (equipment.starforce_scroll_flag && equipment.starforce_scroll_flag !== '未套用') {
      equipmentInfo.push({ name: '星力捲軸', value: equipment.starforce_scroll_flag })
    }

    // 成長等級
    if (equipment.growth_level && equipment.growth_level > 0) {
      equipmentInfo.push({ name: '成長等級', value: `Lv.${equipment.growth_level}` })
    }

    if (equipment.growth_exp && equipment.growth_exp > 0) {
      equipmentInfo.push({ name: '成長經驗', value: formatNumber(equipment.growth_exp) })
    }

    // 特殊戒指等級
    if (equipment.special_ring_level && equipment.special_ring_level > 0) {
      equipmentInfo.push({ name: '塔戒等級', value: `Lv.${equipment.special_ring_level}` })
    }

    // 到期日期
    if (equipment.date_expire && equipment.date_expire !== 'null') {
      equipmentInfo.push({ name: '到期日期', value: equipment.date_expire })
    }

    return (
      <div className="space-y-4">
        {/* 裝備標題 */}
        <div className="flex items-center gap-3 pb-2 border-b">
          {equipment.item_icon && (
            <Image
              src={equipment.item_icon}
              alt={equipment.item_name}
              width={24}
              height={24}
              className="w-6 h-6 flex-shrink-0"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          )}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm">{equipment.item_name}</h4>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs">{equipment.item_equipment_part}</Badge>
              {equipment.starforce && parseInt(equipment.starforce) > 0 && (
                <Badge variant="secondary" className="bg-yellow-50 text-yellow-700 text-xs">
                  <Star className="inline-block w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
                  {equipment.starforce}星
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
        {((equipment as any).potential_option_1 || (equipment as any).potential_option_2 || (equipment as any).potential_option_3) && (
          <div className="space-y-2 pt-2 border-t">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">潛能</span>
              {(equipment as any).potential_option_grade && (
                <Badge variant="secondary" className={`text-xs ${getPotentialColors((equipment as any).potential_option_grade).bg} ${getPotentialColors((equipment as any).potential_option_grade).text}`}>
                  {(equipment as any).potential_option_grade}
                </Badge>
              )}
            </div>
            <div className="space-y-1">
              {[(equipment as any).potential_option_1, (equipment as any).potential_option_2, (equipment as any).potential_option_3]
                .filter(Boolean)
                .map((option: string, idx: number) => (
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
        {((equipment as any).additional_potential_option_1 || (equipment as any).additional_potential_option_2 || (equipment as any).additional_potential_option_3) && (
          <div className="space-y-2 pt-2 border-t">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">附加潛能</span>
              {(equipment as any).additional_potential_option_grade && (
                <Badge variant="secondary" className={`text-xs ${getPotentialColors((equipment as any).additional_potential_option_grade).bg} ${getPotentialColors((equipment as any).additional_potential_option_grade).text}`}>
                  {(equipment as any).additional_potential_option_grade}
                </Badge>
              )}
            </div>
            <div className="space-y-1">
              {[(equipment as any).additional_potential_option_1, (equipment as any).additional_potential_option_2, (equipment as any).additional_potential_option_3]
                .filter(Boolean)
                .map((option: string, idx: number) => (
                  <div key={idx} className="flex justify-between items-center py-1 px-2 rounded hover:bg-muted/30 transition-colors">
                    <div className="text-xs text-muted-foreground">
                      附加 {idx + 1}
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
        {equipment.soul_name && (
          <div className="space-y-2 pt-2 border-t">
            <span className="text-sm font-semibold">靈魂</span>
            <div className="space-y-1">
              <div className="flex justify-between items-center py-1 px-2 rounded hover:bg-muted/30 transition-colors">
                <div className="text-xs text-muted-foreground">
                  靈魂名稱
                </div>
                <div className="font-mono text-xs font-semibold text-foreground ml-2">
                  {equipment.soul_name}
                </div>
              </div>
              {equipment.soul_option && (
                <div className="flex justify-between items-center py-1 px-2 rounded hover:bg-muted/30 transition-colors">
                  <div className="text-xs text-muted-foreground">
                    靈魂效果
                  </div>
                  <div className="font-mono text-xs font-semibold text-foreground ml-2">
                    {equipment.soul_option}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  // 渲染符文區塊
  const renderSymbolSection = () => {
    if (!symbolData || !symbolData.symbol || symbolData.symbol.length === 0) {
      return (
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">尚未裝備任何符文</p>
        </div>
      )
    }

    const symbolStats = calculateSymbolStats()

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">符文資訊</h3>
        </div>

        {/* 符文統計 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-muted/30 p-3 rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">ARC: {symbolStats.arc.force}</div>
            <div className="space-y-0.5">
              <div className="text-xs text-muted-foreground">屬性: +{symbolStats.arc.stats}</div>
            </div>
          </div>
          <div className="bg-muted/30 p-3 rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">AUT: {symbolStats.aut.force}</div>
            <div className="space-y-0.5">
              <div className="text-xs text-muted-foreground">屬性: +{symbolStats.aut.stats}</div>
            </div>
          </div>
          <div className="bg-muted/30 p-3 rounded-lg">
            <div className="space-y-0.5">
              {symbolStats.total.dropRate > 0 && <div className="text-xs text-muted-foreground">掉寶: +{symbolStats.total.dropRate}%</div>}
              {symbolStats.total.mesoRate > 0 && <div className="text-xs text-muted-foreground">楓掉: +{symbolStats.total.mesoRate}%</div>}
              {symbolStats.total.expRate > 0 && <div className="text-xs text-muted-foreground">經驗: +{symbolStats.total.expRate}%</div>}
            </div>
          </div>
        </div>

        {/* 符文列表 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {symbolData.symbol.map((symbol, index) => {
            const symbolInfo = getSymbolInfo(symbol.symbol_name)
            return (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex flex-col items-center p-2 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
                      {symbol.symbol_icon && (
                        <Image
                          src={symbol.symbol_icon}
                          alt={symbol.symbol_name}
                          width={32}
                          height={32}
                          className="w-8 h-8 object-contain mb-1"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                        />
                      )}
                      <Badge variant="secondary" className="text-xs">
                        Lv.{symbol.symbol_level}
                      </Badge>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-xs">
                    <div className="space-y-2">
                      <div className="font-semibold text-sm">{symbol.symbol_name}</div>
                      <div className="text-xs space-y-1">
                        <div>符文: {symbol.symbol_force}</div>
                        <div>等級: {symbol.symbol_level}/{symbolInfo.maxLevel}</div>
                        <div>STR: +{symbol.symbol_str}</div>
                        <div>DEX: +{symbol.symbol_dex}</div>
                        <div>INT: +{symbol.symbol_int}</div>
                        <div>LUK: +{symbol.symbol_luk}</div>
                        <div>HP: +{symbol.symbol_hp}</div>
                        {symbol.symbol_drop_rate !== '0' && <div>掉寶: +{symbol.symbol_drop_rate}</div>}
                        {symbol.symbol_meso_rate !== '0' && <div>楓幣: +{symbol.symbol_meso_rate}</div>}
                        {symbol.symbol_exp_rate !== '0' && <div>經驗: +{symbol.symbol_exp_rate}</div>}
                        <div className="pt-1 border-t">成長: {symbol.symbol_growth_count}/{symbol.symbol_require_growth_count}</div>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )
          })}
        </div>
      </div>
    )
  }

  // 渲染裝備預設
  const renderEquipmentPreset = (itemList: ItemEquipment[] | undefined) => {
    return (
      <div className="space-y-4">
        {/* 桌面版裝備網格 */}
        <div className="hidden lg:flex lg:justify-center">
          <div className="grid grid-cols-8 gap-2 w-fit">
            {equipmentSlots.map((row, rowIndex) => (
              <div key={rowIndex} className="contents">
                {row.map((partName, colIndex) =>
                  renderEquipmentSlot(partName, itemList, equipmentData?.title, rowIndex * 6 + colIndex)
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 手機版裝備網格 */}
        <div className="flex justify-center lg:hidden">
          <div className="grid grid-cols-4 gap-2 w-fit">
            {equipmentSlotsMobile.map((row, rowIndex) => (
              <div key={rowIndex} className="contents">
                {row.map((partName, colIndex) =>
                  renderEquipmentSlot(partName, itemList, equipmentData?.title, rowIndex * 4 + colIndex)
                )}
              </div>
            ))}
          </div>
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
  }

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
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">裝備資訊</CardTitle>
          <div className="flex gap-1">
            <Button
              variant={activePreset === '1' ? 'default' : 'outline'}
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => { setActivePreset('1'); setSelectedEquipment(null); }}
            >
              預設 1
            </Button>
            <Button
              variant={activePreset === '2' ? 'default' : 'outline'}
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => { setActivePreset('2'); setSelectedEquipment(null); }}
            >
              預設 2
            </Button>
            <Button
              variant={activePreset === '3' ? 'default' : 'outline'}
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => { setActivePreset('3'); setSelectedEquipment(null); }}
            >
              預設 3
            </Button>
          </div>
        </div>
        <CardDescription className="text-sm">
          {symbolData && symbolData.symbol && symbolData.symbol.length > 0 && (
            <>
              符文數量: {symbolData.symbol.length}
            </>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="mt-3 space-y-0">
          {activePreset === '1' && renderEquipmentPreset(equipmentData.item_equipment_preset_1)}
          {activePreset === '2' && renderEquipmentPreset(equipmentData.item_equipment_preset_2)}
          {activePreset === '3' && renderEquipmentPreset(equipmentData.item_equipment_preset_3)}
        </div>
      </CardContent>
    </Card>
  )
}
