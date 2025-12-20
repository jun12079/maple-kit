import noviceUnion1 from '@/assets/images/union/raider/novice-union1.png';
import noviceUnion2 from '@/assets/images/union/raider/novice-union2.png';
import noviceUnion3 from '@/assets/images/union/raider/novice-union3.png';
import noviceUnion4 from '@/assets/images/union/raider/novice-union4.png';
import noviceUnion5 from '@/assets/images/union/raider/novice-union5.png';
import veteranUnion1 from '@/assets/images/union/raider/veteran-union1.png';
import veteranUnion2 from '@/assets/images/union/raider/veteran-union2.png';
import veteranUnion3 from '@/assets/images/union/raider/veteran-union3.png';
import veteranUnion4 from '@/assets/images/union/raider/veteran-union4.png';
import veteranUnion5 from '@/assets/images/union/raider/veteran-union5.png';
import masterUnion1 from '@/assets/images/union/raider/master-union1.png';
import masterUnion2 from '@/assets/images/union/raider/master-union2.png';
import masterUnion3 from '@/assets/images/union/raider/master-union3.png';
import masterUnion4 from '@/assets/images/union/raider/master-union4.png';
import masterUnion5 from '@/assets/images/union/raider/master-union5.png';
import grandmasterUnion1 from '@/assets/images/union/raider/grandmaster-union1.png';
import grandmasterUnion2 from '@/assets/images/union/raider/grandmaster-union2.png';
import grandmasterUnion3 from '@/assets/images/union/raider/grandmaster-union3.png';
import grandmasterUnion4 from '@/assets/images/union/raider/grandmaster-union4.png';
import grandmasterUnion5 from '@/assets/images/union/raider/grandmaster-union5.png';
import supremeUnion1 from '@/assets/images/union/raider/supreme-union1.png';
import supremeUnion2 from '@/assets/images/union/raider/supreme-union2.png';
import supremeUnion3 from '@/assets/images/union/raider/supreme-union3.png';
import supremeUnion4 from '@/assets/images/union/raider/supreme-union4.png';
import supremeUnion5 from '@/assets/images/union/raider/supreme-union5.png';
import { StaticImageData } from 'next/image';

export interface UnionGradeDefinition {
  grade: string;
  image: StaticImageData;
}

export const UnionGradeData: Record<string, StaticImageData> = {
  '新手戰地聯盟 1': noviceUnion1,
  '新手戰地聯盟 2': noviceUnion2,
  '新手戰地聯盟 3': noviceUnion3,
  '新手戰地聯盟 4': noviceUnion4,
  '新手戰地聯盟 5': noviceUnion5,
  '老手戰地聯盟 1': veteranUnion1,
  '老手戰地聯盟 2': veteranUnion2,
  '老手戰地聯盟 3': veteranUnion3,
  '老手戰地聯盟 4': veteranUnion4,
  '老手戰地聯盟 5': veteranUnion5,
  '大師戰地聯盟 1': masterUnion1,
  '大師戰地聯盟 2': masterUnion2,
  '大師戰地聯盟 3': masterUnion3,
  '大師戰地聯盟 4': masterUnion4,
  '大師戰地聯盟 5': masterUnion5,
  '宗師戰地聯盟 1': grandmasterUnion1,
  '宗師戰地聯盟 2': grandmasterUnion2,
  '宗師戰地聯盟 3': grandmasterUnion3,
  '宗師戰地聯盟 4': grandmasterUnion4,
  '宗師戰地聯盟 5': grandmasterUnion5,
  '總司令聯盟 1': supremeUnion1,
  '總司令聯盟 2': supremeUnion2,
  '總司令聯盟 3': supremeUnion3,
  '總司令聯盟 4': supremeUnion4,
  '總司令聯盟 5': supremeUnion5,
};

export const getUnionGradeImage = (grade: string): StaticImageData | null => {
  return UnionGradeData[grade] || null;
};
