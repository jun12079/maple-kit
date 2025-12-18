'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

interface ExperienceDataPoint {
  date: string
  fullDate: string
  exp: number
  level: number
}

interface ExperienceChartProps {
  experienceData?: ExperienceDataPoint[] | null
}

export function ExperienceChart({ experienceData }: ExperienceChartProps) {
  const chartConfig = {
    exp: {
      label: '經驗值',
      color: 'var(--chart-1)', // 使用 CSS 變數
    },
  }

  // 計算經驗值總變化（7天前到今天的經驗差異，考慮升級）
  const calculateExpChange = (): string | null => {
    if (!experienceData || experienceData.length < 2) return null
    
    const first = experienceData[0] // 7天前
    const last = experienceData[experienceData.length - 1] // 今天
    
    if (first.level === 0 || last.level === 0) return null
    
    let change: number
    if (first.level === last.level) {
      // 同等級：直接計算經驗值百分比差異
      change = last.exp - first.exp
    } else {
      // 跨等級：計算實際的經驗值變化
      // 第一天到滿級的經驗值 + 中間等級的經驗值 + 最後一天的經驗值
      const levelDiff = last.level - first.level
      change = (100 - first.exp) + (levelDiff - 1) * 100 + last.exp
    }
    
    return change >= 0 ? `+${change.toFixed(2)}%` : `${change.toFixed(2)}%`
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
