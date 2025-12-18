'use client'

import { useState, useEffect, useRef } from 'react'
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
  CharacterPetEquipment
} from '@/types/mapleAPI'

interface BasicData {
  basic: CharacterBasic
  popularity: CharacterPopularity
  stat: CharacterStat
  hyperStat: CharacterHyperStat
  ability: CharacterAbility
  equipment: CharacterItemEquipment
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
  const [ocid, setOcid] = useState<string>('')
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
  const [experienceData, setExperienceData] = useState<ExperienceDataPoint[] | null>(null)
  const [petData, setPetData] = useState<CharacterPetEquipment | null>(null)

  // 簡化的頻率限制狀態
  const [isSearchDisabled, setIsSearchDisabled] = useState<boolean>(false)
  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null)

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
    setExperienceData(null)
  }

  const loadAllData = async (characterOcid: string) => {
    try {
      // 載入基本資料和符文資料
      const [basic, popularity, stat, hyperStat, ability, equipment, dojang, symbols, hexaMatrix, hexaMatrixStat, vMatrix, linkSkill, union, petEquipment] = await Promise.allSettled([
        mapleAPI.getCharacterBasic(characterOcid),
        mapleAPI.getCharacterPopularity(characterOcid),
        mapleAPI.getCharacterStat(characterOcid),
        mapleAPI.getCharacterHyperStat(characterOcid),
        mapleAPI.getCharacterAbility(characterOcid),
        mapleAPI.getCharacterItemEquipment(characterOcid),
        mapleAPI.getCharacterDojang(characterOcid),
        mapleAPI.getCharacterSymbolEquipment(characterOcid),
        mapleAPI.getCharacterHexaMatrix(characterOcid), // character_skill_grade = 6
        mapleAPI.getCharacterHexaMatrixStat(characterOcid),
        mapleAPI.getCharacterVMatrix(characterOcid), // character_skill_grade = 5
        mapleAPI.getCharacterLinkSkill(characterOcid),
        mapleAPI.getUnion(characterOcid),
        mapleAPI.getCharacterPetEquipment(characterOcid)
      ])

      // 設定基本資料
      if (basic.status === 'fulfilled' && popularity.status === 'fulfilled' &&
        stat.status === 'fulfilled' && hyperStat.status === 'fulfilled' &&
        ability.status === 'fulfilled' && equipment.status === 'fulfilled') {
        setBasicData({
          basic: basic.value,
          popularity: popularity.value,
          stat: stat.value,
          hyperStat: hyperStat.value,
          ability: ability.value,
          equipment: equipment.value
        })
      }

      // 設定道場資料
      if (dojang.status === 'fulfilled') {
        setDojangData(dojang.value)
      }

      // 設定戰地資料
      if (union.status === 'fulfilled') {
        setUnionData(union.value)
      }

      // 設定符文資料
      if (symbols.status === 'fulfilled') {
        setSymbolData(symbols.value)
      }

      // 設定寵物資料
      if (petEquipment.status === 'fulfilled') {
        setPetData(petEquipment.value)
      }

      // 設定技能資料
      // 注意：API 型別定義有誤，getCharacterHexaMatrix 和 getCharacterVMatrix 實際返回 CharacterSkill
      const skillResults: SkillData = {
        hexaMatrix: hexaMatrix.status === 'fulfilled' ? (hexaMatrix.value as unknown as CharacterSkill) : null,
        hexaMatrixStat: hexaMatrixStat.status === 'fulfilled' ? hexaMatrixStat.value : null,
        vMatrix: vMatrix.status === 'fulfilled' ? (vMatrix.value as unknown as CharacterSkill) : null,
        linkSkill: linkSkill.status === 'fulfilled' ? linkSkill.value : null
      }
      setSkillData(skillResults)

      // 獲取七天經驗值數據（在基本資料載入成功後）
      if (basic.status === 'fulfilled') {
        await loadExperienceData(characterOcid, basic.value.character_exp_rate)
      }

    } catch {
      // 完全載入失敗
    }
  }

  // 獲取七天經驗值數據
  const loadExperienceData = async (characterOcid: string, todayExpRate: string) => {
    try {
      const data: ExperienceDataPoint[] = []
      const today = new Date()
      let currentLevel = 0

      // 獲取今天的等級
      try {
        const todayBasic = await mapleAPI.getCharacterBasic(characterOcid, null)
        currentLevel = todayBasic.character_level
      } catch {
        // 如果獲取失敗，使用預設值
        currentLevel = 0
      }

      // 獲取過去6天的數據（加上今天共7天）
      for (let i = 6; i >= 1; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        const dateString = date.toISOString().split('T')[0]

        try {
          const basicInfo = await mapleAPI.getCharacterBasic(characterOcid, dateString)
          
          data.push({
            date: `${date.getMonth() + 1}/${date.getDate()}`,
            exp: parseFloat(basicInfo.character_exp_rate || '0'),
            level: basicInfo.character_level,
            fullDate: dateString
          })
        } catch {
          // 如果某天數據獲取失敗，填入0
          data.push({
            date: `${date.getMonth() + 1}/${date.getDate()}`,
            exp: 0,
            level: 0,
            fullDate: dateString
          })
        }

        // 添加延遲避免請求過快
        await new Promise(resolve => setTimeout(resolve, 100))
      }

      // 添加今天的數據（不帶 date 參數）
      data.push({
        date: `${today.getMonth() + 1}/${today.getDate()}`,
        exp: parseFloat(todayExpRate || '0'),
        level: currentLevel,
        fullDate: today.toISOString().split('T')[0]
      })

      setExperienceData(data)
    } catch {
      // 如果獲取經驗值數據失敗，設為空陣列
      setExperienceData([])
    }
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
      // 取得 OCID
      const ocidResponse = await mapleAPI.getCharacterOCID(nameToSearch)
      setOcid(ocidResponse.ocid)

      // 載入基本資料（包含符文和技能）
      await loadAllData(ocidResponse.ocid)
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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
      {ocid && (
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic" className="flex items-center gap-1">
              基本
            </TabsTrigger>
            <TabsTrigger value="skill" className="flex items-center gap-1">
              技能
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
                    <EquipmentDisplay equipmentData={basicData.equipment} symbolData={symbolData as any} petData={petData as any} />
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                搜尋中...
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
              <div className="text-center py-8 text-muted-foreground">
                搜尋中...
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
