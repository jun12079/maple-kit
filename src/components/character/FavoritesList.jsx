'use client'

import { Heart, X, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function FavoritesList({ 
  favorites, 
  isLoaded, 
  onSelectFavorite, 
  onRemoveFavorite,
  className = "" 
}) {
  // 如果還沒載入完成，顯示載入狀態
  if (!isLoaded) {
    return (
      <div className={`text-sm text-muted-foreground ${className}`}>
        載入中...
      </div>
    )
  }

  // 如果沒有最愛
  if (favorites.length === 0) {
    return (
      <div className={`text-sm text-muted-foreground ${className}`}>
        <div className="flex items-center gap-2 mb-2">
          <Heart className="w-4 h-4" />
          <span>最愛角色</span>
        </div>
        <div className="text-xs opacity-70">
          查詢角色後可點擊愛心加入最愛
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Heart className="w-4 h-4 text-red-500" />
        <span>最愛角色</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {favorites.map((characterName) => (
          <div
            key={characterName}
            className="flex items-center gap-1 bg-muted/50 hover:bg-muted/80 rounded-md px-2 py-1 text-sm group transition-colors"
          >
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto font-normal text-xs hover:bg-transparent hover:underline"
              onClick={() => onSelectFavorite(characterName)}
            >
              <Users className="w-3 h-3 mr-1" />
              {characterName}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto w-4 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-transparent"
              onClick={() => onRemoveFavorite(characterName)}
            >
              <X className="w-3 h-3 text-muted-foreground hover:text-destructive" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}