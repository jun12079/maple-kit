'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { SkillDisplay } from './SkillDisplay'
import { mapleAPI } from '@/services/mapleAPI'

/**
 * 綜合技能顯示組件 - 包含 HEXA技能、V矩陣 和 連結技能的垂直顯示
 * @param {Object} props
 * @param {string} props.ocid - 角色 OCID
 * @param {Object} props.skillData - 預載入的技能資料
 * @returns {JSX.Element}
 */
export function SkillTabsDisplay({ ocid, skillData }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  
  // 各種技能資料狀態 - 如果有傳入 skillData 就使用，否則為 null
  const [hexaData, setHexaData] = useState(skillData?.hexaMatrix || null)
  const [hexaStatData, setHexaStatData] = useState(skillData?.hexaMatrixStat || null)
  const [vmatrixData, setVmatrixData] = useState(skillData?.vMatrix || null)
  const [linkSkillData, setLinkSkillData] = useState(skillData?.linkSkill || null)

  // 載入所有技能資料
  const loadAllSkillData = async () => {
    if (!ocid) return

    setIsLoading(true)
    setError(null)
    
    try {
      const [hexaResult, hexaStatResult, vmatrixResult, linkSkillResult] = await Promise.allSettled([
        mapleAPI.getCharacterHexaMatrix(ocid), // 現在使用 character_skill_grade = 6
        mapleAPI.getCharacterHexaMatrixStat(ocid),
        mapleAPI.getCharacterVMatrix(ocid), // 現在使用 character_skill_grade = 5
        mapleAPI.getCharacterLinkSkill(ocid)
      ])

      if (hexaResult.status === 'fulfilled') {
        setHexaData(hexaResult.value)
      }
      
      if (hexaStatResult.status === 'fulfilled') {
        setHexaStatData(hexaStatResult.value)
      }
      
      if (vmatrixResult.status === 'fulfilled') {
        setVmatrixData(vmatrixResult.value)
      }
      
      if (linkSkillResult.status === 'fulfilled') {
        setLinkSkillData(linkSkillResult.value)
      }

      // 檢查是否有任何失敗的請求
      const failedRequests = [hexaResult, hexaStatResult, vmatrixResult, linkSkillResult]
        .filter(result => result.status === 'rejected')
        .map(result => result.reason?.message || '未知錯誤')

      if (failedRequests.length > 0) {
        setError(`部分資料載入失敗: ${failedRequests.join(', ')}`)
      }
    } catch (err) {
      setError(`載入技能資料失敗: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  // 當 skillData 變化時更新狀態
  useEffect(() => {
    if (skillData) {
      setHexaData(skillData.hexaMatrix || null)
      setHexaStatData(skillData.hexaMatrixStat || null)
      setVmatrixData(skillData.vMatrix || null)
      setLinkSkillData(skillData.linkSkill || null)
      setError(null)
    } else if (ocid && !skillData) {
      // 如果沒有傳入 skillData 但有 ocid，則自行載入
      setHexaData(null)
      setHexaStatData(null)
      setVmatrixData(null)
      setLinkSkillData(null)
      loadAllSkillData()
    }
  }, [ocid, skillData])

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Loader2 className="w-8 h-8 mx-auto animate-spin mb-4" />
          <p className="text-muted-foreground">正在載入技能資料...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="text-red-500 text-sm p-3 bg-red-50 dark:bg-red-900/20 rounded-md">
          {error}
        </div>
      )}

      {/* 統一顯示所有技能資料 */}
      <SkillDisplay 
        skillData={hexaData}
        hexaStatData={hexaStatData}
        vMatrixData={vmatrixData}
        linkSkillData={linkSkillData}
        type="unified"
      />
    </div>
  )
}