import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CharacterUnionRaider, UnionBlock, CharacterUnionArtifact, CharacterUnion, CharacterUnionChampion } from '@/types/mapleAPI';
import { getArtifactImage } from '@/data/union/artifactData';
import { getUnionGradeImage } from '@/data/union/raiderData';
import { getJobTypeByName, getChampionImage, getChampionTypeByJobName } from '@/data/job/jobData';
import { BADGE_ORDER, getBadgeImage } from '@/data/union/championBadgeData';

interface UnionChampionDetail {
  champion_name: string;
  character_image: string;
  character_level: number;
}

interface UnionRaiderDisplayProps {
  unionRaiderData: CharacterUnionRaider;
  unionArtifactData?: CharacterUnionArtifact | null;
  unionData?: CharacterUnion | null;
  unionChampionData?: CharacterUnionChampion | null;
  unionChampionDetails?: UnionChampionDetail[] | null;
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
  return getJobTypeByName(blockClass);
};

const getBlockColor = (blockType: string, blockClass: string) => {
  const type = getJobType(blockType, blockClass);
  return BLOCK_COLORS[type] || BLOCK_COLORS.default;
};

export const UnionRaiderDisplay: React.FC<UnionRaiderDisplayProps> = ({ 
  unionRaiderData, 
  unionArtifactData, 
  unionData, 
  unionChampionData,
  unionChampionDetails 
}) => {
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
        <div className="pl-6 text-xs text-muted-foreground space-y-1">
          {typeBlocks.map((block, idx) => (
            <div key={idx} className="flex justify-start items-center gap-2 border-slate-200 dark:border-slate-700 last:border-0 last:pb-0">
              <span className="bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded inline-flex justify-center min-w-[3.5rem]">Lv.{block.block_level}</span>
              <span>{block.block_class || block.block_type}</span>
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
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <CardTitle>戰地攻擊隊</CardTitle>
              {unionData && (
                <CardDescription className="mt-1 flex items-center gap-2">
                  <span>聯盟等級: {unionData.union_level}</span>
                  {getUnionGradeImage(unionData.union_grade) && (
                    <img
                      src={getUnionGradeImage(unionData.union_grade)!}
                      alt={unionData.union_grade}
                      className="w-6 h-6 object-contain"
                    />
                  )}
                  <span>{unionData.union_grade}</span>
                </CardDescription>
              )}
            </div>
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
            {/* 左側：拼圖和職業圖例 */}
            <div className="flex flex-col gap-6 flex-shrink-0">
              <div className="overflow-auto max-w-full p-4 rounded-lg bg-white dark:bg-slate-900 mx-auto lg:mx-0">
                <svg
                  width={GRID_WIDTH * CELL_SIZE}
                  height={GRID_HEIGHT * CELL_SIZE}
                  viewBox={`0 0 ${GRID_WIDTH * CELL_SIZE} ${GRID_HEIGHT * CELL_SIZE}`}
                >
                  {renderGrid()}
                  {renderBlocks()}
                </svg>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm w-full">
                {renderLegendItem('warrior', '戰士')}
                {renderLegendItem('magician', '法師')}
                {renderLegendItem('bowman', '弓箭手')}
                {renderLegendItem('thief', '盜賊')}
                {renderLegendItem('pirate', '海盜')}
                {renderLegendItem('default', 'LAB / 遠征隊')}
              </div>
            </div>

            {/* 右側：攻擊隊效果 */}
            <div className="flex-grow w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 攻擊隊員效果 */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    攻擊隊員效果
                  </h3>
                  <div className="space-y-1">
                    {raiderStats.length > 0 ? (
                      raiderStats.map((stat, index) => (
                        <div key={`raider-${index}`} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>•</span>
                          <span>{stat}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-muted-foreground text-center py-2 text-xs">無攻擊隊員效果</div>
                    )}
                  </div>
                </div>

                {/* 攻擊隊佔領效果 */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    攻擊隊佔領效果
                  </h3>
                  <div className="space-y-1">
                    {occupiedStats.length > 0 ? (
                      occupiedStats.map((stat, index) => (
                        <div key={`occupied-${index}`} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>•</span>
                          <span>{stat}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-muted-foreground text-center py-2 text-xs">無佔領效果</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {unionArtifactData && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>聯盟神器</CardTitle>
            {unionData && (
              <CardDescription>
                神器等級: {unionData.union_artifact_level}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Crystals */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  神器水晶
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {unionArtifactData.union_artifact_crystal.map((crystal, index) => {
                    const artifactImage = getArtifactImage(crystal.name);
                    return (
                      <div key={index} className="flex flex-col items-center gap-2 text-center bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3">
                        <div className="text-blue-500 text-[10px] tracking-tighter leading-none">
                          {'◆'.repeat(crystal.level)}
                          <span className="text-slate-300 dark:text-slate-600">{'◇'.repeat(5 - crystal.level)}</span>
                        </div>
                        <div className="flex items-center justify-center">
                          {artifactImage ? (
                            <img
                              src={artifactImage}
                              alt={crystal.name}
                              className="w-12 h-12 object-contain"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-xs text-muted-foreground">
                              ?
                            </div>
                          )}
                        </div>
                        <div className="text-xs font-medium">{crystal.name}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right: Effects */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  神器效果
                </h3>
                <div className="text-xs text-muted-foreground bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 space-y-2">
                  {unionArtifactData.union_artifact_effect.length > 0 ? (
                    unionArtifactData.union_artifact_effect.map((effect, index) => (
                      <div key={index} className="flex justify-start items-center gap-2 border-slate-200 dark:border-slate-700 last:border-0 last:pb-0">
                        <span className="bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded inline-flex justify-center min-w-[3.5rem]">Lv.{effect.level}</span>
                        <span>{effect.name}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-muted-foreground text-center py-2">無神器效果</div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 聯盟冠軍 */}
      {unionChampionData && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>聯盟冠軍</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Champion List */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  冠軍角色
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {unionChampionData.union_champion.map((champion, index) => {
                    const championImage = getChampionImage(getChampionTypeByJobName(champion.champion_class));
                    // 直接從 unionChampionDetails 中查找對應的角色詳細資料
                    const championDetail = unionChampionDetails?.find(detail => detail.champion_name === champion.champion_name);
                    const characterImage = championDetail?.character_image;
                    const characterLevel = championDetail?.character_level;
                    const characterName = championDetail?.champion_name || champion.champion_name;

                    return (
                      <div key={index} className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 relative overflow-hidden min-h-[200px]">
                        {/* Background: Champion Image */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-30 dark:opacity-15 pointer-events-none overflow-hidden">
                          <img
                            src={championImage}
                            alt={champion.champion_class}
                            className="object-cover scale-125 translate-y-4 w-full h-full"
                          />
                        </div>

                        {/* Grade at top-left */}
                        <div className="absolute top-2 left-2 z-10">
                          <span className={`font-bold text-sm text-slate-500 dark:text-slate-400`}>
                            {champion.champion_grade}
                          </span>
                        </div>

                        <div className="relative z-10 flex flex-col items-center gap-2 pt-4">
                          {/* Character Image Container */}
                          <div className="relative flex items-center justify-center">
                            {/* 前景：Character Image */}
                            {characterImage ? (
                              <img
                                src={characterImage}
                                alt={champion.champion_name}
                                className="object-contain max-w-full max-h-full drop-shadow-md"
                              />
                            ) : (
                              <div className="text-xs text-muted-foreground text-center font-medium">
                                {champion.champion_name}
                              </div>
                            )}
                          </div>

                          {/* Character Info */}
                          <div className="flex flex-col items-center gap-1">
                            <div className="text-xs font-bold text-center">{characterName}</div>
                            <div className="flex items-center gap-2 text-[10px] text-muted-foreground bg-white/50 dark:bg-black/20 px-2 py-0.5 rounded backdrop-blur-sm">
                              <span>Lv.{characterLevel || '?'}</span>
                              <span>|</span>
                              <span>{champion.champion_class}</span>
                            </div>
                          </div>

                          {/* Badge Icons - 5個固定能力圖示 */}
                          <div className="flex items-center justify-center gap-0.5">
                            {BADGE_ORDER.map((badgeType, badgeIndex) => {
                              const badgeImage = getBadgeImage(badgeType);
                              // 檢查該能力是否完成（根據 champion_badge_info 陣列長度）
                              const isCompleted = badgeIndex < champion.champion_badge_info.length;

                              return (
                                <div
                                  key={badgeType}
                                  className={`relative flex items-center justify-center ${!isCompleted ? 'opacity-30 grayscale' : ''}`}
                                  title={champion.champion_badge_info[badgeIndex]?.stat || '未完成'}
                                >
                                  <img
                                    src={badgeImage}
                                    alt={badgeType}
                                    className="object-contain"
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 總計能力 */}
              <div className="space-y-2">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  冠軍徽章效果
                  </h3>
                  <div className="space-y-1">
                    {unionChampionData.champion_badge_total_info.length > 0 ? (
                      unionChampionData.champion_badge_total_info.map((badge, index) => (
                        <div key={`occupied-${index}`} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>•</span>
                          <span>{badge.stat}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-muted-foreground text-center py-2 text-xs">無佔領效果</div>
                    )}
                  </div>
                </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
