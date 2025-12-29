const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || '';
const noviceUnion1 = `${CDN_URL}/images/union/raider/novice-union1.png`;
const noviceUnion2 = `${CDN_URL}/images/union/raider/novice-union2.png`;
const noviceUnion3 = `${CDN_URL}/images/union/raider/novice-union3.png`;
const noviceUnion4 = `${CDN_URL}/images/union/raider/novice-union4.png`;
const noviceUnion5 = `${CDN_URL}/images/union/raider/novice-union5.png`;
const veteranUnion1 = `${CDN_URL}/images/union/raider/veteran-union1.png`;
const veteranUnion2 = `${CDN_URL}/images/union/raider/veteran-union2.png`;
const veteranUnion3 = `${CDN_URL}/images/union/raider/veteran-union3.png`;
const veteranUnion4 = `${CDN_URL}/images/union/raider/veteran-union4.png`;
const veteranUnion5 = `${CDN_URL}/images/union/raider/veteran-union5.png`;
const masterUnion1 = `${CDN_URL}/images/union/raider/master-union1.png`;
const masterUnion2 = `${CDN_URL}/images/union/raider/master-union2.png`;
const masterUnion3 = `${CDN_URL}/images/union/raider/master-union3.png`;
const masterUnion4 = `${CDN_URL}/images/union/raider/master-union4.png`;
const masterUnion5 = `${CDN_URL}/images/union/raider/master-union5.png`;
const grandmasterUnion1 = `${CDN_URL}/images/union/raider/grandmaster-union1.png`;
const grandmasterUnion2 = `${CDN_URL}/images/union/raider/grandmaster-union2.png`;
const grandmasterUnion3 = `${CDN_URL}/images/union/raider/grandmaster-union3.png`;
const grandmasterUnion4 = `${CDN_URL}/images/union/raider/grandmaster-union4.png`;
const grandmasterUnion5 = `${CDN_URL}/images/union/raider/grandmaster-union5.png`;
const supremeUnion1 = `${CDN_URL}/images/union/raider/supreme-union1.png`;
const supremeUnion2 = `${CDN_URL}/images/union/raider/supreme-union2.png`;
const supremeUnion3 = `${CDN_URL}/images/union/raider/supreme-union3.png`;
const supremeUnion4 = `${CDN_URL}/images/union/raider/supreme-union4.png`;
const supremeUnion5 = `${CDN_URL}/images/union/raider/supreme-union5.png`;
export interface UnionGradeDefinition {
  grade: string;
  image: string;
}

export const UnionGradeData: Record<string, string> = {
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

export const getUnionGradeImage = (grade: string): string | null => {
  return UnionGradeData[grade] || null;
};
