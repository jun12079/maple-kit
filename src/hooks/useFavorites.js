'use client'

import { useState, useEffect } from 'react'

const FAVORITES_KEY = 'maple-kit-favorite-characters'

export function useFavorites() {
  const [favorites, setFavorites] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  // 從 localStorage 載入最愛清單
  useEffect(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        setFavorites(Array.isArray(parsed) ? parsed : [])
      }
    } catch {
      // 載入失敗時設為空陣列
      setFavorites([])
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // 儲存到 localStorage
  const saveFavorites = (newFavorites) => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites))
      setFavorites(newFavorites)
    } catch {
      // 儲存失敗時不做任何操作，保持當前狀態
    }
  }

  // 新增最愛
  const addFavorite = (characterName) => {
    if (!characterName?.trim()) return false
    
    const trimmedName = characterName.trim()
    
    // 檢查是否已存在
    if (favorites.includes(trimmedName)) {
      return false
    }
    
    // 限制最多 10 個最愛（可自行調整）
    const newFavorites = [trimmedName, ...favorites].slice(0, 10)
    saveFavorites(newFavorites)
    return true
  }

  // 移除最愛
  const removeFavorite = (characterName) => {
    const newFavorites = favorites.filter(name => name !== characterName)
    saveFavorites(newFavorites)
  }

  // 檢查是否為最愛
  const isFavorite = (characterName) => {
    if (!characterName?.trim()) return false
    return favorites.includes(characterName.trim())
  }

  // 切換最愛狀態
  const toggleFavorite = (characterName) => {
    if (isFavorite(characterName)) {
      removeFavorite(characterName.trim())
      return false
    } else {
      return addFavorite(characterName)
    }
  }

  // 清空所有最愛
  const clearFavorites = () => {
    saveFavorites([])
  }

  return {
    favorites,
    isLoaded,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    clearFavorites
  }
}