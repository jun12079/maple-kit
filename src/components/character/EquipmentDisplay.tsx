import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Star, Package } from 'lucide-react'
import type { CharacterItemEquipment, CharacterSymbolEquipment, ItemEquipment, Title, Symbol, CharacterPetEquipment, PetEquipment, CashItemEquipment, CharacterCashItemEquipment } from '@/types/mapleAPI'
import { EquipmentDetailDialog } from './EquipmentDetailDialog'

interface EquipmentDisplayProps {
  equipmentData: CharacterItemEquipment
  symbolData?: CharacterSymbolEquipment
  petData?: CharacterPetEquipment
  cashItemData?: CharacterCashItemEquipment
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

type EquipmentItem = ItemEquipment | Title

interface PetInfo {
  name: string
  icon: string
  equipment: PetEquipment
  slotName: string
}

type DialogItem = EquipmentItem | PetInfo

// 符文常數
const ARCANE_SYMBOLS = [
  '祕法符文：消逝的旅途',
  '祕法符文：啾啾艾爾蘭',
  '祕法符文：拉契爾恩',
  '祕法符文：阿爾卡娜',
  '祕法符文：魔菈斯',
  '祕法符文：艾斯佩拉'
] as const

const AUTHENTIC_SYMBOLS = [
  '真實符文：賽爾尼溫',
  '真實符文：阿爾克斯',
  '真實符文：奧迪溫',
  '真實符文：桃源境',
  '真實符文：阿爾特利亞',
  '真實符文：卡爾西溫',
  '豪華真實符文：塔拉哈特'
] as const

// 裝備位置映射常數 (8x4 grid for desktop)
const EQUIPMENT_SLOTS_DESKTOP: string[][] = [
  ['戒指1', '臉飾', '耳環', '帽子', '披風', '稱號', '勳章', '機器心臟'],
  ['戒指2', '眼飾', '墜飾', '上衣', '手套', '武器', '輔助武器', '徽章'],
  ['戒指3', '腰帶', '墜飾2', '褲/裙', '鞋子', '寵物1', '寵物2', '寵物3'],
  ['戒指4', '胸章', '口袋道具', '肩膀裝飾', '', '寵物裝備1', '寵物裝備2', '寵物裝備3']
]

// 手機版裝備位置映射 (4x9 grid for mobile)
const EQUIPMENT_SLOTS_MOBILE: string[][] = [
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

// 現金裝備位置映射
const CASH_ITEM_SLOTS: string[][] = [
  ['戒指1', '臉飾', '帽子', '披風'],
  ['戒指2', '眼飾', '上衣', '手套'],
  ['戒指3', '耳環', '褲/裙', '鞋子'],
  ['戒指4', '', '武器', '輔助武器']
]

export function EquipmentDisplay({ equipmentData, symbolData, petData, cashItemData }: EquipmentDisplayProps) {
  const [dialogItem, setDialogItem] = useState<DialogItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activePreset, setActivePreset] = useState<string>(equipmentData.preset_no?.toString() || '1')
  const [activeCashPreset, setActiveCashPreset] = useState<string>(cashItemData?.preset_no?.toString() || equipmentData.preset_no?.toString() || '1')

  // 判斷符文類型和最大等級
  const getSymbolInfo = (symbolName: string): SymbolInfo => {
    if (ARCANE_SYMBOLS.includes(symbolName as any)) {
      return { type: 'ARC', maxLevel: 20 }
    } else if (AUTHENTIC_SYMBOLS.includes(symbolName as any)) {
      return { type: 'AUT', maxLevel: 11 }
    }
    return { type: 'UNKNOWN', maxLevel: 20 }
  }

  // 計算 ARC 和 AUT 的統計資料（使用 useMemo 優化效能）
  const symbolStats = useMemo((): SymbolStats => {
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
  }, [symbolData])

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
  const isTitle = (item: DialogItem | CashItemEquipment | null): item is Title => {
    return !!item && 'title_name' in item
  }

  const isItemEquipment = (item: DialogItem | CashItemEquipment | null): item is ItemEquipment => {
    return !!item && 'item_name' in item && !('equipment' in item)
  }

  const isPetInfo = (item: DialogItem | CashItemEquipment | null): item is PetInfo => {
    return !!item && 'equipment' in item && 'name' in item
  }

  // 根據現金裝備部位名稱找出對應的裝備
  const findCashItemByPart = (cashItemList: CashItemEquipment[] | undefined, partName: string): CashItemEquipment | null => {
    if (!partName || !cashItemList) return null
    return cashItemList.find(item => item.cash_item_equipment_slot === partName) || null
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

    return (
      <div key={partName || `empty-${slotIndex}`} className="flex flex-col items-center">
        <Button
          variant="outline"
          className={`
            h-16 w-16 p-1 relative
            ${isEmpty ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-accent/50 dark:hover:bg-accent/50'}
          `}
          onClick={() => {
            if (!isEmpty) {
              setDialogItem(currentItem)
              setIsDialogOpen(true)
            }
          }}
        >
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center">
              <Package className="h-6 w-6 text-gray-600" />
            </div>
          ) : petInfo ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="flex flex-col items-center justify-center flex-1">
                {(isPetEquipmentSlot ? petInfo.equipment.item_icon : petInfo.icon) ? (
                  <img
                    src={isPetEquipmentSlot ? petInfo.equipment.item_icon : petInfo.icon}
                    alt={isPetEquipmentSlot ? petInfo.equipment.item_name : petInfo.name}
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                    style={{ imageRendering: 'crisp-edges' }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
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
                  <img
                    src={isTitleItem ? (item as Title).title_icon : (item as ItemEquipment).item_icon}
                    alt={isTitleItem ? (item as Title).title_name : (item as ItemEquipment).item_name}
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                    style={{ imageRendering: 'crisp-edges' }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                ) : (
                  <Package className="h-6 w-6 text-gray-600" />
                )}
              </div>
              {/* 只有裝備才顯示星力和特殊戒指等級，固定在底部 */}
              {!isTitleItem && item && isItemEquipment(item) && (
                <div className="flex flex-col items-center gap-0.5 mt-0.5">
                  {/* 顯示星力 */}
                  {item.starforce && parseInt(item.starforce) > 0 && (
                    <div className="flex items-center text-yellow-600">
                      <Star className="h-3 w-3 fill-current" />
                      <span className="text-xs font-bold">{item.starforce}</span>
                    </div>
                  )}
                  {/* 顯示特殊戒指等級 */}
                  {item.special_ring_level > 0 && (
                    <div className="flex items-center text-purple-600">
                      <span className="text-xs font-bold">Lv.{item.special_ring_level}</span>
                    </div>
                  )}
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

  // 渲染符文區塊
  const renderSymbolSection = () => {
    if (!symbolData || !symbolData.symbol || symbolData.symbol.length === 0) {
      return (
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">尚未裝備任何符文</p>
        </div>
      )
    }

// symbolStats 已通過 useMemo 計算

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
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
                        <img
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
            {EQUIPMENT_SLOTS_DESKTOP.map((row, rowIndex) => (
              <div key={rowIndex} className="contents">
                {row.map((partName, colIndex) =>
                  renderEquipmentSlot(partName, itemList, equipmentData?.title, rowIndex * 8 + colIndex)
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 手機版裝備網格 */}
        <div className="flex justify-center lg:hidden">
          <div className="grid grid-cols-4 gap-2 w-fit">
            {EQUIPMENT_SLOTS_MOBILE.map((row, rowIndex) => (
              <div key={rowIndex} className="contents">
                {row.map((partName, colIndex) =>
                  renderEquipmentSlot(partName, itemList, equipmentData?.title, rowIndex * 4 + colIndex)
                )}
              </div>
            ))}
          </div>
        </div>



        {/* 無裝備提示 */}
        {(!itemList || itemList.length === 0) && (
          <div className="text-sm text-muted-foreground text-center py-4">尚未設定任何裝備</div>
        )}
      </div>
    )
  }



  // 渲染現金裝備槽位
  const renderCashItemSlot = (partName: string, cashItemList: CashItemEquipment[] | undefined, slotIndex?: number) => {
    const item = findCashItemByPart(cashItemList, partName)
    const isEmpty = !partName || !item

    return (
      <div key={partName || `empty-${slotIndex}`} className="flex flex-col items-center">
        <Button
          variant="outline"
          className={`
            h-16 w-16 p-1 relative
            ${isEmpty ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-accent/50 dark:hover:bg-accent/50'}
          `}
          onClick={() => {
            if (!isEmpty) {
              setDialogItem(item as any)
              setIsDialogOpen(true)
            }
          }}
        >
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center">
              <Package className="h-6 w-6 text-gray-600" />
            </div>
          ) : item && item.cash_item_icon ? (
            <img
              src={item.cash_item_icon}
              alt={item.cash_item_name}
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Package className="h-6 w-6 text-gray-600" />
            </div>
          )}
        </Button>
        {partName && (
          <span className="text-xs text-gray-500 mt-1 text-center">{partName}</span>
        )}
      </div>
    )
  }

  // 渲染現金裝備區塊（單個網格）
  const renderCashItemGrid = (cashItemList: CashItemEquipment[] | undefined) => {
    return (
      <div className="flex justify-center">
        <div className="grid grid-cols-4 gap-2 w-fit">
          {CASH_ITEM_SLOTS.map((row, rowIndex) => (
            <div key={rowIndex} className="contents">
              {row.map((partName, colIndex) =>
                renderCashItemSlot(partName, cashItemList, rowIndex * 4 + colIndex)
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // 渲染現金裝備預設（左右分欄）
  const renderCashItemPreset = () => {
    if (!cashItemData) return null

    return (
      <div className="space-y-4">
        {/* 左右分欄佈局 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 左邊：Base 現金裝備（固定） */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-semibold text-muted-foreground">功能裝備</h4>
            </div>
            {renderCashItemGrid(cashItemData.cash_item_equipment_base)}
          </div>

          {/* 右邊：Preset 現金裝備（可切換） */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-muted-foreground">造型預設</h4>
              <div className="flex gap-1">
                <Button
                  variant={activeCashPreset === '1' ? 'default' : 'outline'}
                  size="sm"
                  className="h-6 px-2 text-xs"
                  onClick={() => { setActiveCashPreset('1'); }}
                >
                  預設 1
                </Button>
                <Button
                  variant={activeCashPreset === '2' ? 'default' : 'outline'}
                  size="sm"
                  className="h-6 px-2 text-xs"
                  onClick={() => { setActiveCashPreset('2'); }}
                >
                  預設 2
                </Button>
                <Button
                  variant={activeCashPreset === '3' ? 'default' : 'outline'}
                  size="sm"
                  className="h-6 px-2 text-xs"
                  onClick={() => { setActiveCashPreset('3'); }}
                >
                  預設 3
                </Button>
              </div>
            </div>
            {activeCashPreset === '1' && renderCashItemGrid(cashItemData.cash_item_equipment_preset_1)}
            {activeCashPreset === '2' && renderCashItemGrid(cashItemData.cash_item_equipment_preset_2)}
            {activeCashPreset === '3' && renderCashItemGrid(cashItemData.cash_item_equipment_preset_3)}
          </div>
        </div>
      </div>
    )
  }

  if (!equipmentData) {
    return (
      <Card className="gap-3">
        <CardHeader className="pb-0">
          <div>
            <h3 className="text-sm font-semibold">裝備資訊</h3>
            <p className="text-xs text-muted-foreground">無資料</p>
          </div>
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
    <Card className="gap-3">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">裝備資訊</h3>
          <div className="flex gap-1">
            <Button
              variant={activePreset === '1' ? 'default' : 'outline'}
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => setActivePreset('1')}
            >
              預設 1
            </Button>
            <Button
              variant={activePreset === '2' ? 'default' : 'outline'}
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => setActivePreset('2')}
            >
              預設 2
            </Button>
            <Button
              variant={activePreset === '3' ? 'default' : 'outline'}
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => setActivePreset('3')}
            >
              預設 3
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-0">
          {activePreset === '1' && renderEquipmentPreset(equipmentData.item_equipment_preset_1)}
          {activePreset === '2' && renderEquipmentPreset(equipmentData.item_equipment_preset_2)}
          {activePreset === '3' && renderEquipmentPreset(equipmentData.item_equipment_preset_3)}
        </div>
        
        {/* 現金裝備資訊區塊 - 在裝備資訊下方，符文區塊上方 */}
        {cashItemData && (
          <div className="border-t pt-4 mt-6">
            <div className="mb-2">
              <h3 className="text-sm font-semibold">現金裝備資訊</h3>
            </div>
            {renderCashItemPreset()}
          </div>
        )}
        
        {/* 符文區塊 - 獨立於裝備預設之外 */}
        <div className="border-t pt-4 mt-6">
          {renderSymbolSection()}
        </div>
      </CardContent>

      {/* 裝備詳情 Dialog */}
      <EquipmentDetailDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        item={dialogItem}
      />
    </Card>
  )
}
