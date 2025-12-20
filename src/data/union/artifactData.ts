import artifact1 from '@/assets/images/union/artifact/artifact1.png';
import artifact2 from '@/assets/images/union/artifact/artifact2.png';
import artifact3 from '@/assets/images/union/artifact/artifact3.png';
import artifact4 from '@/assets/images/union/artifact/artifact4.png';
import artifact5 from '@/assets/images/union/artifact/artifact5.png';
import artifact6 from '@/assets/images/union/artifact/artifact6.png';
import artifact7 from '@/assets/images/union/artifact/artifact7.png';
import artifact8 from '@/assets/images/union/artifact/artifact8.png';
import artifact9 from '@/assets/images/union/artifact/artifact9.png';
import { StaticImageData } from 'next/image';

export interface ArtifactDefinition {
  id: number;
  name: string;
  image: StaticImageData;
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

export const getArtifactImage = (name: string): StaticImageData | null => {
  const artifact = ArtifactData.find(a => a.name === name);
  return artifact ? artifact.image : null;
};
