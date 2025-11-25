"use client"

import { useState, useMemo } from 'react'
import Image, { StaticImageData } from 'next/image'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { bossData, BossDifficulty } from '@/data/bosses/bossData'
import { filterableItems, getDropInfo } from '@/data/items/itemDatabase'

// 轉換單位
const formatNumber = (num: number | string | null | undefined) => {
  if (num === null || num === undefined) return '0'
  if (typeof num === 'string') return num
  
  if (num >= 1e16) {
    const value = num / 1e16
    return `${value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)}京`
  }
  if (num >= 1e12) {
    const value = num / 1e12
    return `${value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)}兆`
  }
  if (num >= 1e8) {
    const value = num / 1e8
    return `${value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)}億`
  }
  if (num >= 1e4) {
    const value = num / 1e4
    return `${value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)}萬`
  }
  return num.toLocaleString()
}

// 咖凌血量特殊處理
const formatKalingHealth = (healthArray: (number | string | (number | string)[])[]) => {
  if (!healthArray || healthArray.length === 0) return '0'

  const parts: string[] = []

  healthArray.forEach((health, index) => {
    if (Array.isArray(health)) {
      // 三階
      const firstPhase = health[0]
      const secondPhase = health[1]
      const phaseText = `${formatNumber(firstPhase)}x3+${formatNumber(secondPhase)}`
      parts.push(phaseText)
    } else {
      // 一階
      if (index === 0) {
        parts.push(`${formatNumber(health)}x3`)
      } else {
        parts.push(formatNumber(health))
      }
    }
  })

  return parts.join(' / ')
}

// 轉換血量
const formatHealth = (healthArray: (number | string | (number | string)[])[] | undefined, bossName: string) => {
  if (!healthArray || healthArray.length === 0) return '0'

  if (bossName === '咖凌') {
    return formatKalingHealth(healthArray)
  }

  const formatHealthValue = (value: number | string | (number | string)[]) => {
    // 如果是 array，用 + 連接(階段有多條血的情況)
    if (Array.isArray(value)) {
      return value.map(v => formatNumber(v)).join('+')
    }

    return formatNumber(value)
  }

  if (healthArray.length === 1) {
    return formatHealthValue(healthArray[0])
  }

  return healthArray.map(health => formatHealthValue(health)).join(' / ')
}

// 等級處理
const formatLevel = (level: number | number[] | null) => {
  if (Array.isArray(level)) {
    return level.join('/')
  }
  return level
}

// 重置時間轉換
const getResetTypeText = (reset: string) => {
  switch (reset) {
    case 'daily': return '每日'
    case 'weekly': return '每週'
    case 'monthly': return '每月'
    default: return reset
  }
}

// 難度樣式
const getDifficultyDisplay = (difficulty: string) => {
  const displays: Record<string, { text: string, className: string }> = {
    easy: { text: '簡單', className: 'bg-gray-500 text-white' },
    normal: { text: '普通', className: 'bg-cyan-500 text-white' },
    hard: { text: '困難', className: 'bg-rose-500 text-white' },
    chaos: { text: '混沌', className: 'bg-black text-yellow-300 border border-yellow-300' },
    extreme: { text: '極限', className: 'bg-black text-rose-500 border border-rose-500' },
  }
  return displays[difficulty] || { text: difficulty, className: 'bg-gray-500 text-white' }
}

interface ProcessedBossDifficulty extends BossDifficulty {
  difficulty: string;
}

interface ProcessedBoss {
  key: string;
  name: string;
  image: StaticImageData;
  difficulties: ProcessedBossDifficulty[];
}

export default function BossTable() {

  const [searchTerm, setSearchTerm] = useState('')
  const [resetFilter, setResetFilter] = useState('all')
  const [itemFilter, setItemFilter] = useState('all')

  // 轉換資料格式，將每個 boss 的不同難度合併並倒轉順序
  const processedData = useMemo<ProcessedBoss[]>(() => {
    const data: ProcessedBoss[] = []

    Object.entries(bossData).reverse().forEach(([bossKey, boss]) => {
      data.push({
        key: bossKey,
        name: boss.name,
        image: boss.image,
        difficulties: Object.entries(boss.difficulties).reverse().map(([diffKey, diff]) => ({
          difficulty: diffKey,
          level: diff.level,
          defense: diff.defense,
          symbol: diff.symbol,
          health: diff.health,
          reset: diff.reset,
          drops: diff.drops || [],
          mesos: diff.mesos,
          solErda: diff.solErda
        }))
      })
    })

    return data
  }, [])

  // 篩選資料
  const filteredData = useMemo(() => {
    return processedData.filter(boss => {
      // 搜尋篩選
      const matchesSearch = boss.name.toLowerCase().includes(searchTerm.toLowerCase())

      // 重置類型篩選
      const matchesReset = resetFilter === 'all' ||
        boss.difficulties.some(diff => diff.reset === resetFilter)

      // 掉落物篩選
      const matchesItem = itemFilter === 'all' ||
        boss.difficulties.some(diff =>
          diff.drops && diff.drops.some(drop => drop && drop.src === itemFilter)
        )

      return matchesSearch && matchesReset && matchesItem
    })
  }, [processedData, searchTerm, resetFilter, itemFilter])


  return (
    <Card>
      <CardHeader>
        <CardTitle className="sr-only">Boss 資料表</CardTitle>
        {/* 搜尋和篩選控制項 */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          {/* 搜尋框 */}
          <div className="flex-1">
            <Input
              placeholder="搜尋 Boss 名稱..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>

          {/* 重置類型篩選 */}
          <Select value={resetFilter} onValueChange={setResetFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="重置類型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有重置類型</SelectItem>
              <SelectItem value="daily">每日</SelectItem>
              <SelectItem value="weekly">每週</SelectItem>
              <SelectItem value="monthly">每月</SelectItem>
            </SelectContent>
          </Select>

          {/* 掉落物篩選 */}
          <Select value={itemFilter} onValueChange={setItemFilter}>
            <SelectTrigger className="w-full sm:w-[240px]">
              <SelectValue placeholder="選擇掉落物" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有掉落物</SelectItem>
              {filterableItems.map((item, index) => (
                <SelectItem key={index} value={item.image?.src ?? ''}>
                  <div className="flex items-center gap-2">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        style={{ width: '20px', height: 'auto' }}
                        className="rounded-sm"
                      />
                    )}
                    <span className="text-sm">{item.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      {/* 滾動提示 */}
      <div className="text-xs text-muted-foreground text-center md:hidden">
        <span className="inline-flex items-center gap-1">
          ← 左右滑動查看所有欄位 →
        </span>
      </div>

      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-muted dark:bg-muted">
              <TableRow>
                <TableHead className="text-left">Boss</TableHead>
                <TableHead className="text-center">難度</TableHead>
                <TableHead className="text-center">等級</TableHead>
                <TableHead className="text-center">防禦</TableHead>
                <TableHead className="text-left">血量</TableHead>
                <TableHead className="text-center">符文</TableHead>
                <TableHead className="text-center">重置</TableHead>
                <TableHead className="text-left">掉落物</TableHead>
                <TableHead className="text-right">結晶石</TableHead>
                <TableHead className="text-center">靈魂艾爾達</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((boss) => (
                <TableRow key={boss.key}>
                  {/* Boss Icon 和名稱 */}
                  <TableCell className="font-medium text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 relative flex-shrink-0">
                        <Image
                          src={boss.image}
                          alt={boss.name}
                          style={{ width: '48px', height: 'auto' }}
                          className="rounded-md"
                        />
                      </div>
                      <span className="font-semibold">{boss.name}</span>
                    </div>
                  </TableCell>

                  {/* 難度 */}
                  <TableCell className="text-center">
                    <div className="flex flex-col gap-1 items-center">
                      {boss.difficulties.map((diff, index) => {
                        const display = getDifficultyDisplay(diff.difficulty)
                        return (
                          <div key={index} className="min-h-[32px] flex items-center justify-center">
                            <Badge className={`w-fit ${display.className}`}>
                              {display.text}
                            </Badge>
                          </div>
                        )
                      })}
                    </div>
                  </TableCell>

                  {/* 等級 */}
                  <TableCell className="text-center">
                    <div className="flex flex-col gap-1">
                      {boss.difficulties.map((diff, index) => (
                        <div key={index} className="text-sm py-1 min-h-[32px] flex items-center justify-center">
                          {formatLevel(diff.level)}
                        </div>
                      ))}
                    </div>
                  </TableCell>

                  {/* 防禦 */}
                  <TableCell className="text-center">
                    <div className="flex flex-col gap-1">
                      {boss.difficulties.map((diff, index) => (
                        <div key={index} className="text-sm py-1 min-h-[32px] flex items-center justify-center">
                          {diff.defense}
                        </div>
                      ))}
                    </div>
                  </TableCell>

                  {/* HP */}
                  <TableCell className="text-left">
                    <div className="flex flex-col gap-1">
                      {boss.difficulties.map((diff, index) => (
                        <div key={index} className="text-sm py-1 min-h-[32px] flex items-center justify-start">
                          {formatHealth(diff.health, boss.name)}
                        </div>
                      ))}
                    </div>
                  </TableCell>

                  {/* 符文 */}
                  <TableCell className="text-center">
                    <div className="flex flex-col gap-1">
                      {boss.difficulties.map((diff, index) => (
                        <div key={index} className="text-sm py-1 min-h-[32px] flex items-center justify-center">
                          {diff.symbol ? formatLevel(diff.symbol) : '-'}
                        </div>
                      ))}
                    </div>
                  </TableCell>

                  {/* 重置 */}
                  <TableCell className="text-center">
                    <div className="flex flex-col gap-1">
                      {boss.difficulties.map((diff, index) => (
                        <div key={index} className="text-sm py-1 min-h-[32px] flex items-center justify-center">
                          {getResetTypeText(diff.reset)}
                        </div>
                      ))}
                    </div>
                  </TableCell>

                  {/* 掉落物 */}
                  <TableCell className="min-w-[120px] text-left">
                    <div className="flex flex-col gap-2">
                      {boss.difficulties.map((diff, index) => {
                        // 檢查是否有掉落物（非 null 且非空字串）
                        const validDrops = diff.drops ? diff.drops.filter((drop): drop is StaticImageData => drop !== null) : []

                        return (
                          <div key={index} className="flex gap-1 py-1 min-h-[32px] items-end justify-start overflow-x-auto">
                            {validDrops.length === 0 ? (
                              <span className="text-xs text-gray-400">-</span>
                            ) : (
                              validDrops.map((drop, dropIndex) => {
                                const itemInfo = getDropInfo(drop)
                                return (
                                  <div
                                    key={dropIndex}
                                    className="w-6 h-6 relative flex-shrink-0 flex items-end justify-center"
                                    title={itemInfo.name}
                                  >
                                    <Image
                                      src={drop}
                                      alt={itemInfo.name}
                                      style={{ width: '24px', height: 'auto' }}
                                      className="rounded-sm"
                                    />
                                  </div>
                                )
                              })
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </TableCell>

                  {/* 結晶石 */}
                  <TableCell className="text-right">
                    <div className="flex flex-col gap-1">
                      {boss.difficulties.map((diff, index) => (
                        <div key={index} className="text-sm py-1 min-h-[32px] flex items-center justify-end">
                          {diff.mesos ? formatNumber(diff.mesos) : '-'}
                        </div>
                      ))}
                    </div>
                  </TableCell>

                  {/* Sol Erda */}
                  <TableCell className="text-center">
                    <div className="flex flex-col gap-1">
                      {boss.difficulties.map((diff, index) => (
                        <div key={index} className="text-sm py-1 min-h-[32px] flex items-center justify-center">
                          {diff.solErda ? formatNumber(diff.solErda) : '-'}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
