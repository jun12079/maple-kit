import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import Image from 'next/image'
import { Mars, Venus } from 'lucide-react'

/**
 * 角色基本資訊卡片組件
 * @param {Object} props
 * @param {Object} props.basicInfo - 角色基本資訊
 * @param {Object} props.popularityInfo - 名聲資訊
 * @param {Object} props.dojangData - 武陵道場資訊
 * @param {Object} props.unionData - 戰地資訊
 * @returns {JSX.Element}
 */
export function CharacterCard({ basicInfo, popularityInfo, dojangData, unionData }) {
  const formatNumber = (num) => {
    if (!num) return '0'
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const formatTime = (seconds) => {
    if (!seconds) return '00:00'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const formatDate = (dateString) => {
    if (!dateString) return '未知'
    return new Date(dateString).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }

  const renderGenderIcon = (gender) => {
    if (gender === '여' || gender === '女') {
      return <Mars className="w-4 h-4 text-pink-500" />
    } else if (gender === '남' || gender === '男') {
      return <Venus className="w-4 h-4 text-blue-500" />
    }
    return null
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* 角色圖片 */}
          <div className="lg:col-span-2 flex flex-col items-center">
            {basicInfo.character_image && (
              <img
                src={basicInfo.character_image}
                alt={basicInfo.character_name}
                className="w-20 h-20 object-cover"
              />
            )}
            <h1 className="text-xl lg:text-xl font-medium">
              {basicInfo.character_name}
            </h1>
          </div>

          {/* 基本資訊 */}
          <div className="lg:col-span-5 space-y-3">
            <div>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="outline" className="text-xs px-2 py-1">
                  {basicInfo.world_name}
                  {basicInfo.character_guild_name && ` | ${basicInfo.character_guild_name}`}
                </Badge>
                <Badge variant="outline" className="text-xs px-2 py-1">{basicInfo.character_class}</Badge>
                <Badge variant="outline" className="flex items-center gap-1 text-xs px-2 py-1">
                  {renderGenderIcon(basicInfo.character_gender)}
                  {basicInfo.character_gender}
                </Badge>
                <Badge variant="outline" className="text-xs px-2 py-1">
                  創建: {new Date(basicInfo.character_date_create).toLocaleDateString('zh-TW')}
                </Badge>
                <Badge variant="outline" className="text-xs px-2 py-1">
                  名聲: {formatNumber(popularityInfo.popularity)}
                </Badge>
              </div>
            </div>

            {/* 等級與經驗值 */}
            <div className="space-y-2">
              <div className="flex items-end justify-start">
                <span className="text-lg lg:text-xl font-semibold">
                  Lv. {formatNumber(basicInfo.character_level)}
                </span>
                <span className="text-xs ml-2">
                  ({basicInfo.character_exp_rate}%)
                </span>
              </div>
              {/* 經驗值進度條 */}
              <div className="w-2/3">
                <Progress value={parseFloat(basicInfo.character_exp_rate)} className="h-2" />
              </div>
            </div>
          </div>

          {/* 統計資訊區域 */}
          <div className="lg:col-span-5 space-y-3">
            {/* 武陵道場和戰地資訊 - 水平佈局 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* 武陵道場資訊 */}
              {dojangData && (
                <div className="bg-muted/50 p-3 rounded-lg">
                  <h3 className="flex items-center gap-2 mb-2 text-xs font-semibold">
                    武陵道場最高紀錄
                  </h3>
                  <div className="space-y-0.5">
                    <div className="text-xs text-muted-foreground">最高樓層: {dojangData.dojang_best_floor}F</div>
                    <div className="text-xs text-muted-foreground">最快時間: {formatTime(dojangData.dojang_best_time)}</div>
                    <div className="text-xs text-muted-foreground">記錄日期: {formatDate(dojangData.date_dojang_record)}</div>
                  </div>
                </div>
              )}

              {/* 戰地資訊 */}
              {unionData && (
                <div className="bg-muted/50 p-3 rounded-lg">
                  <h3 className="flex items-center gap-2 mb-2 text-xs font-semibold">
                    戰地資訊
                  </h3>
                  <div className="space-y-0.5">
                    <div className="text-xs text-muted-foreground">戰地等級: {formatNumber(unionData.union_level)}</div>
                    <div className="text-xs text-muted-foreground">戰地階級: {unionData.union_grade}</div>
                    <div className="text-xs text-muted-foreground">神器等級: {formatNumber(unionData.union_artifact_level)}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}