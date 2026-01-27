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
  maxMembers: number;
}

export const UnionGradeData: Record<string, { image: string; maxMembers: number }> = {
  '新手戰地聯盟 1': { image: noviceUnion1, maxMembers: 9 },
  '新手戰地聯盟 2': { image: noviceUnion2, maxMembers: 10 },
  '新手戰地聯盟 3': { image: noviceUnion3, maxMembers: 11 },
  '新手戰地聯盟 4': { image: noviceUnion4, maxMembers: 12 },
  '新手戰地聯盟 5': { image: noviceUnion5, maxMembers: 13 },
  '老手戰地聯盟 1': { image: veteranUnion1, maxMembers: 18 },
  '老手戰地聯盟 2': { image: veteranUnion2, maxMembers: 19 },
  '老手戰地聯盟 3': { image: veteranUnion3, maxMembers: 20 },
  '老手戰地聯盟 4': { image: veteranUnion4, maxMembers: 21 },
  '老手戰地聯盟 5': { image: veteranUnion5, maxMembers: 22 },
  '大師戰地聯盟 1': { image: masterUnion1, maxMembers: 27 },
  '大師戰地聯盟 2': { image: masterUnion2, maxMembers: 28 },
  '大師戰地聯盟 3': { image: masterUnion3, maxMembers: 29 },
  '大師戰地聯盟 4': { image: masterUnion4, maxMembers: 30 },
  '大師戰地聯盟 5': { image: masterUnion5, maxMembers: 31 },
  '宗師戰地聯盟 1': { image: grandmasterUnion1, maxMembers: 36 },
  '宗師戰地聯盟 2': { image: grandmasterUnion2, maxMembers: 37 },
  '宗師戰地聯盟 3': { image: grandmasterUnion3, maxMembers: 38 },
  '宗師戰地聯盟 4': { image: grandmasterUnion4, maxMembers: 39 },
  '宗師戰地聯盟 5': { image: grandmasterUnion5, maxMembers: 40 },
  '總司令聯盟 1': { image: supremeUnion1, maxMembers: 41 },
  '總司令聯盟 2': { image: supremeUnion2, maxMembers: 42 },
  '總司令聯盟 3': { image: supremeUnion3, maxMembers: 43 },
  '總司令聯盟 4': { image: supremeUnion4, maxMembers: 44 },
  '總司令聯盟 5': { image: supremeUnion5, maxMembers: 45 },
};

export const getUnionGradeImage = (grade: string): string | null => {
  return UnionGradeData[grade]?.image || null;
};

export const getUnionGradeMaxMembers = (grade: string): number | null => {
  return UnionGradeData[grade]?.maxMembers || null;
};
