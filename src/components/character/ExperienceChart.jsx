'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

/**
 * 角色經驗值圖表組件 - 顯示近7天的經驗值變化
 * @param {Object} props
 * @param {Array} props.experienceData - 七天經驗值數據
 * @returns {JSX.Element}
 */
export function ExperienceChart({ experienceData }) {
  const chartConfig = {
    exp: {
      label: '經驗值',
      color: 'var(--chart-1)', // 使用 CSS 變數
    },
  }

  // 計算經驗值變化百分比（當天 - 7天前）
  const calculateExpChange = () => {
    if (!experienceData || experienceData.length < 2) return null
    
    const today = experienceData[experienceData.length - 1] // 最新一筆（當天）
    const weekAgo = experienceData[0] // 最早一筆（7天前）
    
    if (!today || !weekAgo) return null
    
    const change = today.exp - weekAgo.exp
    return change >= 0 ? `+${change.toFixed(3)}%` : `${change.toFixed(3)}%`
  }

  const expChange = calculateExpChange()

  // 如果沒有數據或正在載入
  if (!experienceData) {
    return (
      <div className="bg-muted/50 p-3 rounded-lg">
        <h3 className="flex items-center gap-2 mb-2 text-xs font-semibold">
          近7天經驗值變化
        </h3>
        <div className="flex items-center justify-center h-[150px] text-muted-foreground text-xs">
          載入中...
        </div>
      </div>
    )
  }

  // 如果數據為空陣列（載入失敗）
  if (experienceData.length === 0) {
    return (
      <div className="bg-muted/50 p-3 rounded-lg">
        <h3 className="flex items-center gap-2 mb-2 text-xs font-semibold">
          近7天經驗值變化
        </h3>
        <div className="flex items-center justify-center h-[150px] text-muted-foreground text-xs">
          無法載入經驗值數據
        </div>
      </div>
    )
  }

  return (
    <div className="bg-muted/50 p-3 rounded-lg">
      <h3 className="flex items-center gap-2 mb-2 text-xs font-semibold">
        近7天經驗值變化
        {expChange && (
          <span className={`text-xs font-normal ${expChange.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
            ({expChange})
          </span>
        )}
      </h3>
      <ChartContainer config={chartConfig} className="h-[150px] w-full">
        <BarChart accessibilityLayer data={experienceData}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value}
            className="text-muted-foreground"
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
            domain={[0, 100]}
            className="text-muted-foreground"
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent
              labelFormatter={(value, payload) => {
                if (payload && payload[0]) {
                  return `日期: ${payload[0].payload.fullDate}`
                }
                return value
              }}
              formatter={(value) => ['經驗: ', `${value}%`]}
            />}
          />
          <Bar
            dataKey="exp"
            fill="var(--color-exp)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
