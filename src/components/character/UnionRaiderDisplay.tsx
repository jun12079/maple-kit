import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CharacterUnionRaider, UnionBlock } from '@/types/mapleAPI';

interface UnionRaiderDisplayProps {
  unionRaiderData: CharacterUnionRaider;
}

// 網格設定
const GRID_WIDTH = 22;
const GRID_HEIGHT = 20;
const CELL_SIZE = 20; // 每個格子的像素大小
const GRID_COLOR = '#e5e7eb'; // 網格線顏色
const AXIS_COLOR = '#9ca3af'; // 軸線顏色

// 顏色映射 (根據職業或類型)
const BLOCK_COLORS: Record<string, string> = {
  warrior: '#ef4444', // 紅色
  magician: '#3b82f6', // 藍色
  bowman: '#22c55e', // 綠色
  thief: '#a855f7', // 紫色
  pirate: '#eab308', // 黃色
  hybrid: '#a855f7', // 紫色 (傑諾)
  default: '#6b7280', // 灰色 (Lab、遠征隊)
};

// 職業關鍵字映射表
const JOB_KEYWORDS: Record<string, string[]> = {
  warrior: ['戰士', '劍士', '英雄', '聖騎士', '黑騎士', '聖魂', '米哈逸', '狂狼', '爆拳', '惡魔', '凱撒', '阿戴爾', '劍豪', '神之子'],
  magician: ['法師', '火毒', '冰雷', '主教', '烈焰', '龍魔', '夜光', '煉獄', '凱內', '琳恩', '陰陽師', '拉拉', '伊利恩'],
  bowman: ['弓箭手', '箭神', '神射手', '開拓者', '破風', '精靈', '狂豹', '該隱'],
  thief: ['盜賊', '夜使者', '暗影', '影武者', '暗夜', '幻影', '卡莉', '虎影', '卡德娜'],
  pirate: ['海盜', '拳霸', '槍神', '重砲', '閃雷', '隱月', '機甲', '天使', '亞克', '墨玄'],
  hybrid: ['傑諾'],
};

// 根據職業名稱猜測類型
const getJobType = (blockType: string, blockClass: string): string => {
  // 1. 嘗試直接匹配 blockType (如果是英文 key)
  if (blockType && BLOCK_COLORS[blockType]) return blockType;
  
  // 2. 嘗試匹配 blockType 的中文名稱
  if (blockType === '戰士') return 'warrior';
  if (blockType === '法師') return 'magician';
  if (blockType === '弓箭手') return 'bowman';
  if (blockType === '盜賊') return 'thief';
  if (blockType === '海盜') return 'pirate';
  if (blockType === '混合' || blockType === '傑諾') return 'hybrid';

  if (!blockClass) return 'default';

  // 3. 根據職業名稱關鍵字匹配
  for (const [type, keywords] of Object.entries(JOB_KEYWORDS)) {
    if (keywords.some(keyword => blockClass.includes(keyword))) {
      return type;
    }
  }
  
  return 'default';
};

const getBlockColor = (blockType: string, blockClass: string) => {
  const type = getJobType(blockType, blockClass);
  return BLOCK_COLORS[type] || BLOCK_COLORS.default;
};

export const UnionRaiderDisplay: React.FC<UnionRaiderDisplayProps> = ({ unionRaiderData }) => {
  const [selectedPreset, setSelectedPreset] = useState<number>(unionRaiderData.use_preset_no || 1);

  // 取得當前選擇的預設資料
  const getCurrentPresetData = () => {
    switch (selectedPreset) {
      case 1: return unionRaiderData.union_raider_preset_1;
      case 2: return unionRaiderData.union_raider_preset_2;
      case 3: return unionRaiderData.union_raider_preset_3;
      case 4: return unionRaiderData.union_raider_preset_4;
      case 5: return unionRaiderData.union_raider_preset_5;
      default: return unionRaiderData.union_raider_preset_1;
    }
  };

  const currentPreset = getCurrentPresetData();
  const blocks = currentPreset?.union_block || [];
  const raiderStats = currentPreset?.union_raider_stat || [];
  const occupiedStats = currentPreset?.union_occupied_stat || [];

  // 計算職業統計
  const jobStats = useMemo(() => {
    const stats: Record<string, Record<string, number>> = {
      warrior: { SSS: 0, SS: 0, S: 0, A: 0, B: 0 },
      magician: { SSS: 0, SS: 0, S: 0, A: 0, B: 0 },
      bowman: { SSS: 0, SS: 0, S: 0, A: 0, B: 0 },
      thief: { SSS: 0, SS: 0, S: 0, A: 0, B: 0 },
      pirate: { SSS: 0, SS: 0, S: 0, A: 0, B: 0 },
      default: { SSS: 0, SS: 0, S: 0, A: 0, B: 0 },
    };

    blocks.forEach(block => {
      let type = getJobType(block.block_type, block.block_class);
      if (type === 'hybrid') type = 'thief'; // 傑諾歸類為盜賊 (紫色)
      
      if (!stats[type]) return;

      const level = parseInt(block.block_level);
      let rank = '';
      if (level >= 250) rank = 'SSS';
      else if (level >= 200) rank = 'SS';
      else if (level >= 140) rank = 'S';
      else if (level >= 100) rank = 'A';
      else if (level >= 60) rank = 'B';

      if (rank) {
        stats[type][rank]++;
      }
    });
    return stats;
  }, [blocks]);

  // 依職業分類的區塊列表
  const blocksByType = useMemo(() => {
    const grouped: Record<string, UnionBlock[]> = {
      warrior: [],
      magician: [],
      bowman: [],
      thief: [],
      pirate: [],
      default: [],
    };

    blocks.forEach(block => {
      let type = getJobType(block.block_type, block.block_class);
      if (type === 'hybrid') type = 'thief';
      if (grouped[type]) {
        grouped[type].push(block);
      }
    });

    // 依等級降序排列
    Object.values(grouped).forEach(list => {
      list.sort((a, b) => parseInt(b.block_level) - parseInt(a.block_level));
    });

    return grouped;
  }, [blocks]);

  const renderLegendItem = (type: string, label: string) => {
    const stat = jobStats[type];
    const typeBlocks = blocksByType[type];
    const details = [];
    if (stat?.SSS > 0) details.push(`SSS: ${stat.SSS}`);
    if (stat?.SS > 0) details.push(`SS: ${stat.SS}`);
    if (stat?.S > 0) details.push(`S: ${stat.S}`);
    if (stat?.A > 0) details.push(`A: ${stat.A}`);
    if (stat?.B > 0) details.push(`B: ${stat.B}`);
    
    const detailString = details.length > 0 ? ` (${details.join(', ')})` : '';

    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 font-medium">
          <div className="w-4 h-4 rounded" style={{ background: BLOCK_COLORS[type] }}></div>
          <span>{label}{detailString}</span>
        </div>
        <div className="pl-6 text-xs text-muted-foreground space-y-1 max-h-[200px] overflow-y-auto">
          {typeBlocks.map((block, idx) => (
            <div key={idx}>
              {block.block_class || block.block_type} (Lv.{block.block_level})
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 座標轉換函數
  // 遊戲座標 (0,0) 在中心
  // SVG 座標 (0,0) 在左上角
  // Grid X: -11 ~ 10 -> SVG X: 0 ~ 21
  // Grid Y: -10 ~ 9  -> SVG Y: 19 ~ 0 (Y軸翻轉)
  
  const offsetX = GRID_WIDTH / 2; // 11
  const offsetY = GRID_HEIGHT / 2; // 10

  const transformX = (x: number) => (x + offsetX) * CELL_SIZE;
  const transformY = (y: number) => (offsetY - y) * CELL_SIZE; // 修正偏移：移除 -1，讓 Y=10 對應 0，Y=-9 對應 19

  // 繪製網格背景
  const renderGrid = () => {
    const lines = [];
    // 垂直線
    for (let i = 0; i <= GRID_WIDTH; i++) {
      lines.push(
        <line
          key={`v-${i}`}
          x1={i * CELL_SIZE}
          y1={0}
          x2={i * CELL_SIZE}
          y2={GRID_HEIGHT * CELL_SIZE}
          stroke={i === offsetX ? AXIS_COLOR : GRID_COLOR}
          strokeWidth={i === offsetX ? 2 : 1}
        />
      );
    }
    // 水平線
    for (let i = 0; i <= GRID_HEIGHT; i++) {
      lines.push(
        <line
          key={`h-${i}`}
          x1={0}
          y1={i * CELL_SIZE}
          x2={GRID_WIDTH * CELL_SIZE}
          y2={i * CELL_SIZE}
          stroke={i === offsetY ? AXIS_COLOR : GRID_COLOR}
          strokeWidth={i === offsetY ? 2 : 1}
        />
      );
    }
    return lines;
  };

  // 繪製方塊
  const renderBlocks = () => {
    if (!blocks || blocks.length === 0) return null;

    return blocks.map((block, index) => {
      const color = getBlockColor(block.block_type, block.block_class);
      
      // 建立該方塊的座標 Set，方便查詢
      const positionSet = new Set(block.block_position.map(p => `${p.x},${p.y}`));
      
      // 計算邊界路徑
      const pathCommands: string[] = [];
      
      block.block_position.forEach(pos => {
        const px = transformX(pos.x);
        const py = transformY(pos.y);
        
        // 檢查上方 (y+1)
        if (!positionSet.has(`${pos.x},${pos.y + 1}`)) {
          pathCommands.push(`M ${px} ${py} h ${CELL_SIZE}`);
        }
        // 檢查下方 (y-1)
        if (!positionSet.has(`${pos.x},${pos.y - 1}`)) {
          pathCommands.push(`M ${px} ${py + CELL_SIZE} h ${CELL_SIZE}`);
        }
        // 檢查左方 (x-1)
        if (!positionSet.has(`${pos.x - 1},${pos.y}`)) {
          pathCommands.push(`M ${px} ${py} v ${CELL_SIZE}`);
        }
        // 檢查右方 (x+1)
        if (!positionSet.has(`${pos.x + 1},${pos.y}`)) {
          pathCommands.push(`M ${px + CELL_SIZE} ${py} v ${CELL_SIZE}`);
        }
      });

      return (
        <g key={`block-${index}`} className="hover:opacity-80 transition-opacity">
          <title>{`${block.block_class} (Lv.${block.block_level})`}</title>
          {/* 填充顏色 */}
          {block.block_position.map((pos, pIndex) => (
            <rect
              key={`pos-${index}-${pIndex}`}
              x={transformX(pos.x)}
              y={transformY(pos.y)}
              width={CELL_SIZE}
              height={CELL_SIZE}
              fill={color}
              stroke="none"
            />
          ))}
          {/* 繪製外框 */}
          <path 
            d={pathCommands.join(' ')} 
            stroke="rgba(0,0,0,0.7)" 
            strokeWidth={1.5} 
            fill="none" 
            strokeLinecap="square"
          />
        </g>
      );
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <CardTitle>戰地攻擊隊</CardTitle>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((preset) => (
              <Button
                key={preset}
                variant={selectedPreset === preset ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPreset(preset)}
                className="w-8 h-8 p-0"
              >
                {preset}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-shrink-0 overflow-auto max-w-full p-4 rounded-lg bg-white dark:bg-slate-900 mx-auto lg:mx-0">
            <svg
              width={GRID_WIDTH * CELL_SIZE}
              height={GRID_HEIGHT * CELL_SIZE}
              viewBox={`0 0 ${GRID_WIDTH * CELL_SIZE} ${GRID_HEIGHT * CELL_SIZE}`}
            >
              {renderGrid()}
              {renderBlocks()}
            </svg>
          </div>
          
          <div className="flex-grow grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm w-full">
            {renderLegendItem('warrior', '戰士')}
            {renderLegendItem('magician', '法師')}
            {renderLegendItem('bowman', '弓箭手')}
            {renderLegendItem('thief', '盜賊')}
            {renderLegendItem('pirate', '海盜')}
            {renderLegendItem('default', 'LAB / 遠征隊')}
          </div>
        </div>

        {/* 戰地效果顯示 */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 攻擊隊員效果 */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <span className="w-1 h-5 bg-blue-500 rounded-full"></span>
              攻擊隊員效果
            </h3>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 text-sm max-h-[300px] overflow-y-auto">
              {raiderStats.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                  {raiderStats.map((stat, index) => (
                    <div key={`raider-${index}`} className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>{stat}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-muted-foreground text-center py-2">無攻擊隊員效果</div>
              )}
            </div>
          </div>

          {/* 攻擊隊佔領效果 */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <span className="w-1 h-5 bg-green-500 rounded-full"></span>
              攻擊隊佔領效果
            </h3>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 text-sm space-y-1 max-h-[300px] overflow-y-auto">
              {occupiedStats.length > 0 ? (
                occupiedStats.map((stat, index) => (
                  <div key={`occupied-${index}`} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>{stat}</span>
                  </div>
                ))
              ) : (
                <div className="text-muted-foreground text-center py-2">無佔領效果</div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
