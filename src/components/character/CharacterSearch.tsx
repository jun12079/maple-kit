'use client'

import { useState, useEffect, useRef, type KeyboardEvent } from 'react'
import { mapleAPI } from '@/services/mapleAPI'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Loader2, Search, Heart } from 'lucide-react'

// 導入所有顯示組件
import { CharacterCard } from '@/components/character/CharacterCard'
import { StatDisplay } from '@/components/character/StatDisplay'
import { EquipmentDisplay } from '@/components/character/EquipmentDisplay'
import { SkillDisplay } from '@/components/character/SkillDisplay'
import { FavoritesList } from '@/components/character/FavoritesList'
import { UnionRaiderDisplay } from '@/components/character/UnionRaiderDisplay'

// 導入最愛管理 hook
import { useFavorites } from '@/hooks/useFavorites'

// 導入型別
import type {
  CharacterBasic,
  CharacterPopularity,
  CharacterStat,
  CharacterHyperStat,
  CharacterAbility,
  CharacterItemEquipment,
  CharacterDojang,
  CharacterSymbolEquipment,
  CharacterSkill,
  CharacterHexaMatrixStat,
  CharacterLinkSkill,
  CharacterUnion,
  CharacterUnionRaider,
  CharacterUnionArtifact,
  CharacterUnionChampion,
  CharacterPetEquipment,
  CharacterCashItemEquipment,
  AllCharacterData
} from '@/types/mapleAPI'

interface BasicData {
  basic: CharacterBasic
  popularity: CharacterPopularity
  stat: CharacterStat
  hyperStat: CharacterHyperStat
  ability: CharacterAbility
  itemEquipment: CharacterItemEquipment
  cashItemEquipment?: CharacterCashItemEquipment
}

interface SkillData {
  hexaMatrix: CharacterSkill | null
  hexaMatrixStat: CharacterHexaMatrixStat | null
  vMatrix: CharacterSkill | null
  linkSkill: CharacterLinkSkill | null
}

// 注意：mapleAPI 的 getCharacterHexaMatrix 和 getCharacterVMatrix 實際返回 CharacterSkill
// 因為它們都是調用 /character/skill API，只是 character_skill_grade 參數不同

interface ExperienceDataPoint {
  date: string
  fullDate: string
  exp: number
  level: number
}

export default function CharacterSearch() {
  const [characterName, setCharacterName] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // 最愛管理
  const { favorites, isLoaded: favoritesLoaded, removeFavorite, isFavorite, toggleFavorite } = useFavorites()

  // 各種資料狀態
  const [basicData, setBasicData] = useState<BasicData | null>(null)
  const [symbolData, setSymbolData] = useState<CharacterSymbolEquipment | null>(null)
  const [dojangData, setDojangData] = useState<CharacterDojang | null>(null)
  const [skillData, setSkillData] = useState<SkillData | null>(null)
  const [unionData, setUnionData] = useState<CharacterUnion | null>(null)
  const [unionArtifactData, setUnionArtifactData] = useState<CharacterUnionArtifact | null>(null)
  const [unionRaiderData, setUnionRaiderData] = useState<CharacterUnionRaider | null>(null)
  const [unionChampionData, setUnionChampionData] = useState<CharacterUnionChampion | null>(null)
  const [unionChampionDetails, setUnionChampionDetails] = useState<Array<{ champion_name: string; character_image: string; character_level: number }> | null>(null)
  const [experienceData, setExperienceData] = useState<ExperienceDataPoint[] | null>(null)
  const [petData, setPetData] = useState<CharacterPetEquipment | null>(null)

  // 簡化的頻率限制狀態
  const [isSearchDisabled, setIsSearchDisabled] = useState<boolean>(false)
  const cooldownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // 設定：簡短的冷卻時間
  const COOLDOWN_MS = 2000 // 2秒

  // 清理定時器
  useEffect(() => {
    return () => {
      if (cooldownTimerRef.current) {
        clearTimeout(cooldownTimerRef.current)
      }
    }
  }, [])

  const resetAllData = () => {
    setBasicData(null)
    setSymbolData(null)
    setDojangData(null)
    setSkillData(null)
    setPetData(null)
    setUnionData(null)
    setUnionRaiderData(null)
    setUnionArtifactData(null)
    setUnionChampionData(null)
    setUnionChampionDetails(null)
    setExperienceData(null)
  }

  const loadAllData = (allData: AllCharacterData) => {
    // 設定基本資料
    if (allData.basic && allData.popularity && allData.stat &&
      allData.hyperStat && allData.ability && allData.itemEquipment) {
      setBasicData({
        basic: allData.basic,
        popularity: allData.popularity,
        stat: allData.stat,
        hyperStat: allData.hyperStat,
        ability: allData.ability,
        itemEquipment: allData.itemEquipment,
        cashItemEquipment: allData.cashItemEquipment ?? undefined
      })
    }

    // 設定其他資料
    setDojangData(allData.dojang ?? null)
    setUnionData(allData.union ?? null)
    setUnionRaiderData(allData.unionRaider ?? null)
    setUnionArtifactData(allData.unionArtifact ?? null)
    setUnionChampionData(allData.unionChampion ?? null)
    setUnionChampionDetails(allData.unionChampionDetails ?? null)
    setSymbolData(allData.symbolEquipment ?? null)
    setPetData(allData.petEquipment ?? null)

    // 設定技能資料
    setSkillData({
      hexaMatrix: allData.hexaMatrix ? (allData.hexaMatrix as unknown as CharacterSkill) : null,
      hexaMatrixStat: allData.hexaMatrixStat ?? null,
      vMatrix: allData.vMatrix ? (allData.vMatrix as unknown as CharacterSkill) : null,
      linkSkill: allData.linkSkill ?? null
    })

    // 處理經驗值數據
    const expData: ExperienceDataPoint[] = []
    const today = new Date()

    // 處理過去 6 天的數據
    if (Array.isArray(allData.expHistory)) {
      allData.expHistory.forEach((historyItem: { error?: string; character_exp_rate?: string; character_level?: number }, index: number) => {
        const daysAgo = 6 - index
        const d = new Date(today)
        d.setDate(d.getDate() - daysAgo)

        expData.push({
          date: `${d.getMonth() + 1}/${d.getDate()}`,
          exp: historyItem && !historyItem.error ? parseFloat(historyItem.character_exp_rate || '0') : 0,
          level: historyItem && !historyItem.error ? (historyItem.character_level || 0) : 0,
          fullDate: d.toISOString().split('T')[0]
        })
      })
    }

    // 添加今天的數據
    if (allData.basic) {
      expData.push({
        date: `${today.getMonth() + 1}/${today.getDate()}`,
        exp: parseFloat(allData.basic.character_exp_rate || '0'),
        level: allData.basic.character_level,
        fullDate: today.toISOString().split('T')[0]
      })
    }

    setExperienceData(expData)
  }

  // 修改搜尋函數，支援傳入角色名稱
  const handleSearchWithName = async (searchName: string | null = null) => {
    const nameToSearch = searchName || characterName.trim()

    if (!nameToSearch) {
      setError('請輸入角色名稱')
      return
    }

    // 如果已在搜尋中或被禁用，則返回
    if (isLoading || isSearchDisabled) {
      return
    }

    setIsSearchDisabled(true)
    setIsLoading(true)
    setError(null)
    resetAllData()

    // 如果是從最愛選擇的，更新輸入框
    if (searchName) {
      setCharacterName(searchName)
    }

    try {
      // 使用合併 API 一次獲取所有角色資料
      const allData = await mapleAPI.getCharacter(nameToSearch)

      // 載入所有資料
      loadAllData(allData)
    } catch {
      setError('查無角色，請檢查角色名稱是否正確')
    } finally {
      setIsLoading(false)

      // 設定冷卻時間
      cooldownTimerRef.current = setTimeout(() => {
        setIsSearchDisabled(false)
      }, COOLDOWN_MS)
    }
  }

  const handleSearch = () => handleSearchWithName()

  // 處理最愛角色選擇
  const handleFavoriteSelect = (favoriteName: string) => {
    setCharacterName(favoriteName)
    // 自動觸發搜尋
    if (!isSearchDisabled && !isLoading) {
      setCharacterName(favoriteName)
      // 延遲一點讓 state 更新完成再搜尋
      setTimeout(() => {
        handleSearchWithName(favoriteName)
      }, 100)
    }
  }

  // 處理最愛角色移除
  const handleFavoriteRemove = (favoriteName: string) => {
    removeFavorite(favoriteName)
  }

  // 處理愛心按鈕點擊
  const handleToggleFavorite = () => {
    if (!characterName.trim()) return

    const success = toggleFavorite(characterName.trim())
    if (success && !isFavorite(characterName.trim())) {
      // 成功添加到最愛
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isSearchDisabled && !isLoading && characterName.trim()) {
      handleSearch()
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 搜尋區域 */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            角色查詢
          </CardTitle>
          <CardDescription>
            輸入角色名稱來查詢角色資訊，包含能力、裝備、技能、符文...等
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="角色名稱"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
            </div>
            <div className="flex gap-2">
              {/* 愛心按鈕 */}
              <Button
                variant={isFavorite(characterName.trim()) ? "default" : "outline"}
                size="icon"
                onClick={handleToggleFavorite}
                disabled={!characterName.trim() || isLoading}
                title={isFavorite(characterName.trim()) ? "移除最愛" : "加入最愛"}
              >
                <Heart
                  className={`w-4 h-4 ${isFavorite(characterName.trim()) ? 'fill-current text-red-500' : ''}`}
                />
              </Button>

              {/* 搜尋按鈕 */}
              <Button
                onClick={handleSearch}
                disabled={isLoading || !characterName.trim() || isSearchDisabled}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    查詢中...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    查詢
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* 最愛清單 */}
          {favoritesLoaded && (
            <FavoritesList
              favorites={favorites}
              isLoaded={favoritesLoaded}
              onSelectFavorite={handleFavoriteSelect}
              onRemoveFavorite={handleFavoriteRemove}
              className="mt-4"
            />
          )}

          {error && (
            <div className="text-red-500 text-sm mt-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-md">
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 基本資料顯示 */}
      {basicData && (
        <div className="mb-8">
          <CharacterCard
            basicInfo={basicData.basic}
            popularityInfo={basicData.popularity}
            dojangData={dojangData}
            unionData={unionData}
            experienceData={experienceData}
          />
        </div>
      )}

      {/* 詳細資料分頁 */}
      {(basicData || isLoading) && (
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic" className="flex items-center gap-1">
              基本
            </TabsTrigger>
            <TabsTrigger value="skill" className="flex items-center gap-1">
              技能
            </TabsTrigger>
            <TabsTrigger value="union" className="flex items-center gap-1">
              戰地
            </TabsTrigger>
          </TabsList>

          {/* 基本資訊分頁 */}
          <TabsContent value="basic" className="space-y-6">
            {basicData ? (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-5">
                    <StatDisplay
                      statData={basicData.stat}
                      hyperStatData={basicData.hyperStat}
                      abilityData={basicData.ability}
                    />
                  </div>
                  <div className="lg:col-span-7">
                    <EquipmentDisplay
                      equipmentData={basicData.itemEquipment}
                      symbolData={symbolData ?? undefined}
                      petData={petData ?? undefined}
                      cashItemData={basicData.cashItemEquipment}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <Loader2 className="w-8 h-8 animate-spin mb-3" />
                <p className="text-lg font-medium">正在載入角色資料...</p>
                <p className="text-sm mt-1">請稍候片刻</p>
              </div>
            )}
          </TabsContent>

          {/* 技能分頁 */}
          <TabsContent value="skill">
            {skillData ? (
              <SkillDisplay
                hexaMatrix={skillData.hexaMatrix}
                hexaStatData={skillData.hexaMatrixStat}
                vMatrixData={skillData.vMatrix}
                linkSkillData={skillData.linkSkill}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <Loader2 className="w-8 h-8 animate-spin mb-3" />
                <p className="text-lg font-medium">正在載入技能資料...</p>
                <p className="text-sm mt-1">請稍候片刻</p>
              </div>
            )}
          </TabsContent>

          {/* 戰地分頁 */}
          <TabsContent value="union">
            {unionRaiderData ? (
              <UnionRaiderDisplay
                unionRaiderData={unionRaiderData}
                unionArtifactData={unionArtifactData}
                unionData={unionData}
                unionChampionData={unionChampionData}
                unionChampionDetails={unionChampionDetails}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                {isLoading ? (
                  <>
                    <Loader2 className="w-8 h-8 animate-spin mb-3" />
                    <p className="text-lg font-medium">正在載入戰地資料...</p>
                    <p className="text-sm mt-1">請稍候片刻</p>
                  </>
                ) : (
                  <p className="text-lg">無戰地資料</p>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
