const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || '';
const artifact1 = `${CDN_URL}/images/union/artifact/artifact1.png`;
const artifact2 = `${CDN_URL}/images/union/artifact/artifact2.png`;
const artifact3 = `${CDN_URL}/images/union/artifact/artifact3.png`;
const artifact4 = `${CDN_URL}/images/union/artifact/artifact4.png`;
const artifact5 = `${CDN_URL}/images/union/artifact/artifact5.png`;
const artifact6 = `${CDN_URL}/images/union/artifact/artifact6.png`;
const artifact7 = `${CDN_URL}/images/union/artifact/artifact7.png`;
const artifact8 = `${CDN_URL}/images/union/artifact/artifact8.png`;
const artifact9 = `${CDN_URL}/images/union/artifact/artifact9.png`;

export interface ArtifactDefinition {
  id: number;
  name: string;
  image: string;
}

export const ArtifactData: ArtifactDefinition[] = [
  { id: 1, name: '水晶：菇菇寶貝', image: artifact1 },
  { id: 2, name: '水晶：綠水靈', image: artifact2 },
  { id: 3, name: '水晶：刺菇菇', image: artifact3 },
  { id: 4, name: '水晶：木妖', image: artifact4 },
  { id: 5, name: '水晶：石巨人', image: artifact5 },
  { id: 6, name: '水晶：巴洛古', image: artifact6 },
  { id: 7, name: '水晶：殘暴炎魔', image: artifact7 },
  { id: 8, name: '水晶：粉豆', image: artifact8 },
  { id: 9, name: '水晶：拉圖斯', image: artifact9 },
];

export const getArtifactImage = (name: string): string | null => {
  const artifact = ArtifactData.find(a => a.name === name);
  return artifact ? artifact.image : null;
};
