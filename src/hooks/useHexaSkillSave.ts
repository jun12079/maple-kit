'use client'

import { useState, useEffect } from 'react'

const HEXA_SKILL_KEY = 'maple-kit-hexa-skill-data'

export interface HexaSkillSaveData {
  skillCores: { level: number }[]
  masteryCores: { level: number }[]
  reinforcedCores: { level: number }[]
  commonCores: { level: number }[]
  includeCommonCore: boolean
}

const DEFAULT_DATA: HexaSkillSaveData = {
  skillCores: [{ level: 0 }, { level: 0 }],
  masteryCores: [{ level: 0 }, { level: 0 }, { level: 0 }, { level: 0 }],
  reinforcedCores: [{ level: 0 }, { level: 0 }, { level: 0 }, { level: 0 }],
  commonCores: [{ level: 0 }],
  includeCommonCore: true
}

export function useHexaSkillSave() {
  const [data, setData] = useState<HexaSkillSaveData>(DEFAULT_DATA)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  // 從 localStorage 載入資料
  useEffect(() => {
    try {
      const saved = localStorage.getItem(HEXA_SKILL_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        setData({ ...DEFAULT_DATA, ...parsed })
      }
    } catch {
      // 載入失敗時使用預設值
      setData(DEFAULT_DATA)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // 儲存到 localStorage
  const saveData = (newData: HexaSkillSaveData) => {
    try {
      localStorage.setItem(HEXA_SKILL_KEY, JSON.stringify(newData))
      setData(newData)
    } catch {
      // 儲存失敗時不做任何操作，保持當前狀態
    }
  }

  // 重置資料
  const resetData = () => {
    saveData(DEFAULT_DATA)
  }

  return {
    data,
    isLoaded,
    saveData,
    resetData
  }
}
