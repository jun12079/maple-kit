import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'
import type { ItemEquipment, Title, PetEquipment, CashItemEquipment } from '@/types/mapleAPI'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

interface PetInfo {
  name: string
  icon: string
  equipment: PetEquipment
  slotName: string
}

type SelectedItem = ItemEquipment | Title | PetInfo | CashItemEquipment

interface EquipmentDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: SelectedItem | null
}

interface StatBreakdown {
  total: number
  base: number
  starforce: number
  scroll: number
  flame: number
  displayName: string
}

export function EquipmentDetailDialog({ open, onOpenChange, item }: EquipmentDetailDialogProps) {
  if (!item) return null

  const formatNumber = (num: number | string): string => {
    if (!num) return '0'
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  // 格式化日期時間
  const formatDateTime = (dateString: string): string => {
    try {
      const date = new Date(dateString)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = date.getHours()
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const seconds = String(date.getSeconds()).padStart(2, '0')
      const period = hours >= 12 ? '下午' : '上午'
      const displayHours = hours % 12 || 12

      return `${year}/${month}/${day} ${period}${displayHours}:${minutes}:${seconds}`
    } catch {
      return dateString
    }
  }

  // 取得等級顏色
  const getGradeColor = (grade: string): string => {
    switch (grade) {
      case '傳說':
        return 'text-green-500'
      case '罕見':
        return 'text-orange-500'
      case '稀有':
        return 'text-purple-500'
      case '特殊':
        return 'text-blue-500'
      default:
        return 'text-gray-500'
    }
  }

  // 取得裝備icon的border顏色
  const getIconBorderColor = (grade: string): string => {
    switch (grade) {
      case '傳說':
        return 'border-green-500'
      case '罕見':
        return 'border-orange-500'
      case '稀有':
        return 'border-purple-500'
      case '特殊':
        return 'border-blue-500'
      default:
        return 'border-gray-700'
    }
  }

  // 取得潛在能力等級標記
  const getPotentialBadge = (grade: string): { label: string; color: string } => {
    const badgeMap: Record<string, { label: string; color: string }> = {
      '傳說': { label: 'L', color: 'bg-green-500' },
      '罕見': { label: 'U', color: 'bg-yellow-500' },
      '稀有': { label: 'E', color: 'bg-purple-500' },
      '特殊': { label: 'R', color: 'bg-blue-500' }
    }
    return badgeMap[grade] || { label: '?', color: 'bg-gray-600' }
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

  const isCashItemEquipment = (item: SelectedItem): item is CashItemEquipment => {
    return 'cash_item_name' in item
  }

  // 渲染星力顯示（每5個一組，共2排，30個位置）
  const renderStarforce = (starforce: string) => {
    const stars = parseInt(starforce || '0')
    const starsPerGroup = 5
    const groupsPerRow = 3
    const starsPerRow = starsPerGroup * groupsPerRow // 15
    const maxStars = 30 // 總共30個位置

    const renderStarGroup = (startIndex: number) => {
      const groupStars = []
      for (let i = 0; i < starsPerGroup; i++) {
        const starIndex = startIndex + i
        // 只要在30個位置內就顯示
        if (starIndex < maxStars) {
          const isFilled = starIndex < stars
          groupStars.push(
            <Star
              key={starIndex}
              className={`w-3 h-3 ${isFilled ? 'fill-yellow-500 text-yellow-500' : 'fill-none text-gray-700'}`}
            />
          )
        }
      }
      return <div className="flex gap-0.5">{groupStars}</div>
    }

    const rows = []
    for (let row = 0; row < 2; row++) {
      const groups = []
      for (let group = 0; group < groupsPerRow; group++) {
        const startIndex = row * starsPerRow + group * starsPerGroup
        groups.push(
          <div key={group}>
            {renderStarGroup(startIndex)}
          </div>
        )
      }
      rows.push(
        <div key={row} className="flex gap-2 justify-center">
          {groups}
        </div>
      )
    }

    return <div className="flex flex-col gap-1">{rows}</div>
  }

  // 渲染稱號詳細資訊
  const renderTitleDetail = (title: Title) => {
    return (
      <div className="space-y-1.5 text-white">
        {/* 稱號名稱 */}
        <div className="text-left">
          <h4 className="font-semibold text-sm">{title.title_name}</h4>
        </div>

        {/* 稱號 icon */}
        <div className="flex items-start gap-3 pb-2 border-b border-gray-800">
          {title.title_icon && (
            <div className="w-16 h-16 flex-shrink-0 border border-gray-700 rounded bg-gray-900/50 flex items-center justify-center">
              <img
                src={title.title_icon}
                alt={title.title_name}
                className="w-8"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <Badge variant="outline" className="text-xs border-gray-700 text-white">稱號</Badge>
            {title.date_option_expire && title.date_option_expire !== 'null' && (
              <div className="mt-1">
                <span className="font-mono text-xs md:text-sm">{formatDateTime(title.date_option_expire)}</span>
              </div>
            )}
          </div>
        </div>

        {/* 稱號描述 */}
        {title.title_description && (
          <p className="text-xs md:text-sm whitespace-pre-wrap">{title.title_description}</p>
        )}

        {/* 日期資訊 */}
        {title.date_expire && title.date_expire !== 'null' && (
          <div className="pt-0.5 border-t border-gray-800">
            <div className="flex items-center gap-1.5 pt-0.5">
              <span className="text-xs md:text-sm">到期日期</span>
              <span className="font-mono text-xs md:text-sm">{title.date_expire}</span>
            </div>
          </div>
        )}
      </div>
    )
  }

  // 渲染寵物裝備詳細資訊
  const renderPetEquipmentDetail = (petInfo: PetInfo) => {
    const equipment = petInfo.equipment

    // 如果是寵物本體
    if (petInfo.slotName.includes('寵物') && !petInfo.slotName.includes('裝備')) {
      return (
        <div className="space-y-1.5 text-white">
          {/* 寵物名稱 */}
          <div className="text-center">
            <h4 className="font-semibold text-sm">{petInfo.name}</h4>
          </div>

          {/* 寵物 icon */}
          <div className="flex items-start gap-3 pb-2 border-gray-800">
            {petInfo.icon && (
              <div className="w-16 h-16 flex-shrink-0 border border-gray-700 rounded bg-gray-900/50 flex items-center justify-center">
                <img
                  src={petInfo.icon}
                  alt={petInfo.name}
                  className="w-8"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <Badge variant="outline" className="text-xs border-gray-700 text-white">寵物</Badge>
            </div>
          </div>
        </div>
      )
    }

    // 如果是寵物裝備
    if (!equipment || !equipment.item_name) {
      return (
        <div className="text-center py-6 text-white">
          未裝備任何寵物裝備
        </div>
      )
    }

    return (
      <div className="space-y-1.5 text-white">
        {/* 裝備名稱 */}
        <div className="text-center">
          <h4 className="font-semibold text-sm">
            {equipment.item_name}
            {equipment.scroll_upgrade > 0 && (
              <span className="text-blue-400"> (+{equipment.scroll_upgrade})</span>
            )}
          </h4>
        </div>

        {/* 裝備 icon */}
        <div className="flex items-start gap-2 pb-1.5">
          {equipment.item_icon && (
            <div className="w-16 h-16 flex-shrink-0 border border-gray-700 rounded bg-gray-900/50 flex items-center justify-center">
              <img
                src={equipment.item_icon}
                alt={equipment.item_name}
                className="w-8"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <Badge variant="outline" className="text-xs border-gray-700 text-white">寵物裝備</Badge>
          </div>
        </div>

        {/* 裝備屬性 */}
        {equipment.item_option && Array.isArray(equipment.item_option) && equipment.item_option.length > 0 && (
          <div className="space-y-0.5 border-t border-gray-800">
            <div className="space-y-0">
              {equipment.item_option.map((option: { option_type: string; option_value: string }, index: number) => {
                if (!option.option_value || option.option_value === '0') return null
                return (
                  <div key={index} className="flex items-center gap-1.5 pt-0.5">
                    <span className="text-xs md:text-sm">{option.option_type}：</span>
                    <span className="font-mono text-xs md:text-sm">+{option.option_value}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    )
  }

  // 渲染現金裝備詳細資訊
  const renderCashItemDetail = (cashItem: CashItemEquipment) => {
    return (
      <div className="space-y-1.5 text-white">
        {/* 現金裝備名稱 */}
        <div className="text-center">
          <h4 className="font-semibold text-sm">{cashItem.cash_item_name}</h4>
        </div>

        {/* 現金裝備 icon */}
        <div className="flex items-start gap-2 pb-1.5">
          {cashItem.cash_item_icon && (
            <div className="w-16 h-16 flex-shrink-0 border-2 border-gray-700 rounded bg-gray-900/50 flex items-center justify-center">
              <img
                src={cashItem.cash_item_icon}
                alt={cashItem.cash_item_name}
                className="w-8"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline" className="text-xs border-gray-700 text-white">現金裝備</Badge>
              {cashItem.cash_item_equipment_part && (
                <Badge variant="outline" className="text-xs border-gray-700 text-white">
                  {cashItem.cash_item_equipment_part}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* 現金裝備屬性 */}
        {cashItem.cash_item_option && Array.isArray(cashItem.cash_item_option) && cashItem.cash_item_option.length > 0 && (
          <div className="space-y-0.5 border-t border-gray-800">
            <div className="space-y-0">
              {cashItem.cash_item_option.map((option, index) => {
                if (!option.option_value || option.option_value === '0') return null
                return (
                  <div key={index} className="flex items-center gap-1.5 pt-0.5">
                    <span className="text-xs md:text-sm">{option.option_type}：</span>
                    <span className="font-mono text-xs md:text-sm">+{option.option_value}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* 到期日期 */}
        {cashItem.date_expire && cashItem.date_expire !== 'null' && (
          <div className="pt-0.5 border-t border-gray-800">
            <div className="flex items-center gap-1.5 pt-1">
              <span className="text-xs md:text-sm">到期日期：</span>
              <span className="font-mono text-xs md:text-sm">{cashItem.date_expire}</span>
            </div>
          </div>
        )}
      </div>
    )
  }

  // 渲染裝備詳細資訊
  const renderEquipmentDetail = (equipment: ItemEquipment) => {
    // 定義屬性映射
    const statMappings: Record<string, string> = {
      str: 'STR',
      dex: 'DEX',
      int: 'INT',
      luk: 'LUK',
      max_hp: 'HP',
      max_mp: 'MP',
      attack_power: '物理攻擊力',
      magic_power: '魔法攻擊力',
      armor: '防禦力',
      speed: '移動速度',
      jump: '跳躍力',
      boss_damage: 'BOSS傷害',
      ignore_monster_armor: '無視防禦率',
      all_stat: '全屬性',
      damage: '傷害',
      max_hp_rate: '最大HP',
      max_mp_rate: '最大MP'
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

    return (
      <div className="space-y-1.5 text-white">
        {/* 第一排：星力顯示 - 只有星力大於0時才顯示 */}
        {equipment.starforce && parseInt(equipment.starforce) > 0 && (
          <div className="py-1">
            {renderStarforce(equipment.starforce)}
          </div>
        )}

        {/* 第二排：裝備名稱 */}
        <div className="text-center">
          <h4 className="font-semibold text-sm">
            {equipment.item_name}
            {equipment.scroll_upgrade && equipment.scroll_upgrade !== '0' && (
              <span className="text-blue-400"> (+{equipment.scroll_upgrade})</span>
            )}
          </h4>
        </div>

        {/* 第三排：裝備 icon 和基本資訊 */}
        <div className="flex items-start gap-2 pb-1.5 border-b border-gray-800">
          {equipment.item_icon && (
            <div className={`w-16 h-16 flex-shrink-0 border-2 ${getIconBorderColor((equipment as any).potential_option_grade || '')} rounded bg-gray-900/50 flex items-center justify-center`}>
              <img
                src={equipment.item_icon}
                alt={equipment.item_name}
                className="w-8"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline" className="text-xs border-gray-700 text-white">{equipment.item_equipment_part}</Badge>
              {equipment.item_base_option?.base_equipment_level && (
                <Badge variant="outline" className="text-xs border-gray-700 text-white">
                  Lv.{equipment.item_base_option.base_equipment_level}
                </Badge>
              )}
              {equipment.special_ring_level && equipment.special_ring_level > 0 && (
                <Badge variant="secondary" className="text-xs bg-purple-600 text-white">
                  Lv.{equipment.special_ring_level}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* 屬性詳細分解 */}
        {Object.keys(statBreakdowns).length > 0 && (
          <div className="space-y-0">
            {Object.entries(statBreakdowns).map(([statKey, breakdown]) => {
              // 需要%符號的屬性
              const needsPercent = ['boss_damage', 'ignore_monster_armor', 'all_stat', 'damage', 'max_hp_rate', 'max_mp_rate'].includes(statKey)
              // 判斷是否有提升（有括號）
              const hasUpgrade = breakdown.starforce > 0 || breakdown.scroll > 0 || breakdown.flame > 0
              // 根據是否有提升決定顏色
              const textColor = hasUpgrade ? 'text-cyan-300' : 'text-white'

              return (
                <div key={statKey} className="flex items-center gap-1.5">
                  <span className={`text-xs md:text-sm ${textColor}`} title={breakdown.displayName}>{breakdown.displayName}：</span>
                  <div className="font-mono text-xs md:text-sm flex items-center gap-1">
                    <span className={textColor}>+{formatNumber(breakdown.total)}{needsPercent ? '%' : ''}</span>
                    {hasUpgrade && (
                      <>
                        <span className="text-gray-400">(</span>
                        <span>{breakdown.base}{needsPercent ? '%' : ''}</span>
                        <span className="text-gray-400">+</span>
                        {breakdown.starforce > 0 && <span className="text-yellow-400">{breakdown.starforce}{needsPercent ? '%' : ''}</span>}
                        {breakdown.starforce > 0 && (breakdown.scroll > 0 || breakdown.flame > 0) && <span className="text-gray-400">+</span>}
                        {breakdown.scroll > 0 && <span className="text-blue-400">{breakdown.scroll}{needsPercent ? '%' : ''}</span>}
                        {breakdown.scroll > 0 && breakdown.flame > 0 && <span className="text-gray-400">+</span>}
                        {breakdown.flame > 0 && <span className="text-green-400">{breakdown.flame}{needsPercent ? '%' : ''}</span>}
                        <span className="text-gray-400">)</span>
                      </>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* 潛能 */}
        {((equipment as any).potential_option_1 || (equipment as any).potential_option_2 || (equipment as any).potential_option_3) && (
          <div className="space-y-0 pt-0.5 border-t border-gray-800">
            <div className="flex items-center gap-1.5 pt-0.5">
              {(equipment as any).potential_option_grade && (
                <div className="flex items-center gap-1">
                  <span className={`inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white ${getPotentialBadge((equipment as any).potential_option_grade).color} rounded`}>
                    {getPotentialBadge((equipment as any).potential_option_grade).label}
                  </span>
                  <h5 className={`text-xs md:text-sm font-semibold ${getGradeColor((equipment as any).potential_option_grade)}`}>潛在能力：{(equipment as any).potential_option_grade}</h5>
                </div>
              )}
            </div>
            {[(equipment as any).potential_option_1, (equipment as any).potential_option_2, (equipment as any).potential_option_3]
              .filter(Boolean)
              .map((option: string, idx: number) => (
                <div key={idx}>
                  <span className="text-xs md:text-sm font-medium">
                    {option}
                  </span>
                </div>
              ))}
          </div>
        )}

        {/* 附加潛能 */}
        {((equipment as any).additional_potential_option_1 || (equipment as any).additional_potential_option_2 || (equipment as any).additional_potential_option_3) && (
          <div className="space-y-0 pt-0.5 border-t border-gray-800">
            <div className="flex items-center gap-1.5 pt-0.5">
              {(equipment as any).additional_potential_option_grade && (
                <div className="flex items-center gap-1">
                  <span className={`inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white ${getPotentialBadge((equipment as any).additional_potential_option_grade).color} rounded`}>
                    {getPotentialBadge((equipment as any).additional_potential_option_grade).label}
                  </span>
                  <h5 className={`text-xs md:text-sm font-semibold ${getGradeColor((equipment as any).additional_potential_option_grade)}`}>附加潛在能力：{(equipment as any).additional_potential_option_grade}</h5>
                </div>
              )}
            </div>
            {[(equipment as any).additional_potential_option_1, (equipment as any).additional_potential_option_2, (equipment as any).additional_potential_option_3]
              .filter(Boolean)
              .map((option: string, idx: number) => (
                <div key={idx}>
                  <span className="text-xs md:text-sm font-medium">
                    {option}
                  </span>
                </div>
              ))}
          </div>
        )}

        {/* 靈魂 */}
        {equipment.soul_name && (
          <div className="space-y-0.5 pt-0.5 border-t border-gray-800">
            <div className="flex items-center gap-1.5 pt-0.5">
              <h5 className="text-xs md:text-sm font-semibold text-yellow-500">{equipment.soul_name}</h5>
            </div>
            {equipment.soul_option && (
              <span className="text-xs md:text-sm">{equipment.soul_option}</span>
            )}
          </div>
        )}
      </div>
    )
  }

  // 主要渲染邏輯
  const renderContent = () => {
    if (isTitle(item)) {
      return renderTitleDetail(item)
    }

    if (isPetInfo(item)) {
      return renderPetEquipmentDetail(item)
    }

    if (isCashItemEquipment(item)) {
      return renderCashItemDetail(item)
    }

    if (isItemEquipment(item)) {
      return renderEquipmentDetail(item)
    }

    return null
  }

  // 取得標題文字
  const getDialogTitle = (): string => {
    if (isTitle(item)) {
      return item.title_name
    }
    if (isPetInfo(item)) {
      return item.name
    }
    if (isCashItemEquipment(item)) {
      return item.cash_item_name
    }
    if (isItemEquipment(item)) {
      return item.item_name
    }
    return '裝備詳細資訊'
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto bg-black/80 border-gray-800" showCloseButton={false}>
        <VisuallyHidden>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
          <DialogDescription>裝備詳細資訊</DialogDescription>
        </VisuallyHidden>
        {renderContent()}
      </DialogContent>
    </Dialog>
  )
}
