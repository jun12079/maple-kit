'use client'

import { useState, useEffect, useRef } from 'react'
import { mapleAPI } from '@/services/mapleAPI'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Loader2, Search } from 'lucide-react'

// 導入所有顯示組件
import { CharacterCard } from '@/components/character/CharacterCard'
import { StatDisplay } from '@/components/character/StatDisplay'
import { EquipmentDisplay } from '@/components/character/EquipmentDisplay'
import { SkillTabsDisplay } from '@/components/character/SkillTabsDisplay'

export default function CharacterDetailPage() {
  const [characterName, setCharacterName] = useState('')
  const [ocid, setOcid] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // 各種資料狀態
  const [basicData, setBasicData] = useState(null)
  const [symbolData, setSymbolData] = useState(null)
  const [dojangData, setDojangData] = useState(null)
  const [skillData, setSkillData] = useState(null)
  const [unionData, setUnionData] = useState(null)

  // 簡化的頻率限制狀態
  const [isSearchDisabled, setIsSearchDisabled] = useState(false)
  const cooldownTimerRef = useRef(null)

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

  const handleSearch = async () => {
    if (!characterName.trim()) {
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

    try {
      // 取得 OCID
      const ocidResponse = await mapleAPI.getCharacterOCID(characterName.trim())
      setOcid(ocidResponse.ocid)

      // 載入基本資料（包含符文和技能）
      await loadAllData(ocidResponse.ocid)
    } catch (err) {
      setError(err.message || '查詢失敗，請檢查角色名稱是否正確')
    } finally {
      setIsLoading(false)
      
      // 設定冷卻時間
      cooldownTimerRef.current = setTimeout(() => {
        setIsSearchDisabled(false)
      }, COOLDOWN_MS)
    }
  }

  const resetAllData = () => {
    setBasicData(null)
    setSymbolData(null)
    setDojangData(null)
    setSkillData(null)
    setUnionData(null)
  }

  const loadAllData = async (characterOcid) => {
    try {
      // 載入基本資料和符文資料
      const [basic, popularity, stat, hyperStat, ability, equipment, dojang, symbols, hexaMatrix, hexaMatrixStat, vMatrix, linkSkill, union] = await Promise.allSettled([
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
        mapleAPI.getUnion(characterOcid)
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

      // 設定技能資料
      const skillResults = {
        hexaMatrix: hexaMatrix.status === 'fulfilled' ? hexaMatrix.value : null,
        hexaMatrixStat: hexaMatrixStat.status === 'fulfilled' ? hexaMatrixStat.value : null,
        vMatrix: vMatrix.status === 'fulfilled' ? vMatrix.value : null,
        linkSkill: linkSkill.status === 'fulfilled' ? linkSkill.value : null
      }
      setSkillData(skillResults)
      
    } catch {
      // 完全載入失敗
    }
  }



  const handleKeyPress = (e) => {
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
                  <div className="lg:col-span-4">
                    <StatDisplay 
                      statData={basicData.stat} 
                      hyperStatData={basicData.hyperStat}
                      abilityData={basicData.ability}
                    />
                  </div>
                  <div className="lg:col-span-8">
                    <EquipmentDisplay equipmentData={basicData.equipment} symbolData={symbolData} />
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
            <SkillTabsDisplay ocid={ocid} skillData={skillData} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}