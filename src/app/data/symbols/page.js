import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Arcane_Symbol_1 from '@/assets/images/symbol/Arcane_Symbol_1.png';
import Arcane_Symbol_2 from '@/assets/images/symbol/Arcane_Symbol_2.png';
import Arcane_Symbol_3 from '@/assets/images/symbol/Arcane_Symbol_3.png';
import Arcane_Symbol_4 from '@/assets/images/symbol/Arcane_Symbol_4.png';
import Arcane_Symbol_5 from '@/assets/images/symbol/Arcane_Symbol_5.png';
import Arcane_Symbol_6 from '@/assets/images/symbol/Arcane_Symbol_6.png';
import Authentic_Symbol_1 from '@/assets/images/symbol/Authentic_Symbol_1.png';
import Authentic_Symbol_2 from '@/assets/images/symbol/Authentic_Symbol_2.png';
import Authentic_Symbol_3 from '@/assets/images/symbol/Authentic_Symbol_3.png';
import Authentic_Symbol_4 from '@/assets/images/symbol/Authentic_Symbol_4.png';
import Authentic_Symbol_5 from '@/assets/images/symbol/Authentic_Symbol_5.png';
import Authentic_Symbol_6 from '@/assets/images/symbol/Authentic_Symbol_6.png';
import Authentic_Symbol_7 from '@/assets/images/symbol/Authentic_Symbol_7.png';
import Arcane_Symbol_Select_Coupon from '@/assets/images/symbol/Arcane_Symbol_Select_Coupon.png';
import Authentic_Symbol_Select_Coupon from '@/assets/images/symbol/Authentic_Symbol_Select_Coupon.png';

const arcaneSymbols = {
  vanishingJourney: {
    name: '消失的旅途',
    icon: Arcane_Symbol_1,
    data: [
      { level: '1 > 2', upgradeCost: 970000, totalCost: 970000, upgradeCount: 12, totalCount: 12 },
      { level: '2 > 3', upgradeCost: 1230000, totalCost: 2200000, upgradeCount: 15, totalCount: 27 },
      { level: '3 > 4', upgradeCost: 1660000, totalCost: 3860000, upgradeCount: 20, totalCount: 47 },
      { level: '4 > 5', upgradeCost: 2260000, totalCost: 6120000, upgradeCount: 27, totalCount: 74 },
      { level: '5 > 6', upgradeCost: 3060000, totalCost: 9180000, upgradeCount: 36, totalCount: 110 },
      { level: '6 > 7', upgradeCost: 4040000, totalCost: 13220000, upgradeCount: 47, totalCount: 157 },
      { level: '7 > 8', upgradeCost: 5220000, totalCost: 18440000, upgradeCount: 60, totalCount: 217 },
      { level: '8 > 9', upgradeCost: 6600000, totalCost: 25040000, upgradeCount: 75, totalCount: 292 },
      { level: '9 > 10', upgradeCost: 8180000, totalCost: 33220000, upgradeCount: 92, totalCount: 384 },
      { level: '10 > 11', upgradeCost: 9990000, totalCost: 43210000, upgradeCount: 111, totalCount: 495 },
      { level: '11 > 12', upgradeCost: 12010000, totalCost: 55220000, upgradeCount: 132, totalCount: 627 },
      { level: '12 > 13', upgradeCost: 14260000, totalCost: 69480000, upgradeCount: 155, totalCount: 782 },
      { level: '13 > 14', upgradeCost: 16740000, totalCost: 86220000, upgradeCount: 180, totalCount: 962 },
      { level: '14 > 15', upgradeCost: 19450000, totalCost: 105670000, upgradeCount: 207, totalCount: 1169 },
      { level: '15 > 16', upgradeCost: 22420000, totalCost: 128090000, upgradeCount: 236, totalCount: 1405 },
      { level: '16 > 17', upgradeCost: 25630000, totalCost: 153720000, upgradeCount: 267, totalCount: 1672 },
      { level: '17 > 18', upgradeCost: 29100000, totalCost: 182820000, upgradeCount: 300, totalCount: 1972 },
      { level: '18 > 19', upgradeCost: 32830000, totalCost: 215650000, upgradeCount: 335, totalCount: 2307 },
      { level: '19 > 20', upgradeCost: 36820000, totalCost: 252470000, upgradeCount: 372, totalCount: 2679 },
    ]
  },
  chewChewIsland: {
    name: '啾啾艾爾蘭',
    icon: Arcane_Symbol_2,
    data: [
      { level: '1 > 2', upgradeCost: 970000, totalCost: 970000, upgradeCount: 12, totalCount: 12 },
      { level: '2 > 3', upgradeCost: 1230000, totalCost: 2200000, upgradeCount: 15, totalCount: 27 },
      { level: '3 > 4', upgradeCost: 1660000, totalCost: 3860000, upgradeCount: 20, totalCount: 47 },
      { level: '4 > 5', upgradeCost: 2260000, totalCost: 6120000, upgradeCount: 27, totalCount: 74 },
      { level: '5 > 6', upgradeCost: 3060000, totalCost: 9180000, upgradeCount: 36, totalCount: 110 },
      { level: '6 > 7', upgradeCost: 4040000, totalCost: 13220000, upgradeCount: 47, totalCount: 157 },
      { level: '7 > 8', upgradeCost: 5220000, totalCost: 18440000, upgradeCount: 60, totalCount: 217 },
      { level: '8 > 9', upgradeCost: 6600000, totalCost: 25040000, upgradeCount: 75, totalCount: 292 },
      { level: '9 > 10', upgradeCost: 8180000, totalCost: 33220000, upgradeCount: 92, totalCount: 384 },
      { level: '10 > 11', upgradeCost: 9990000, totalCost: 43210000, upgradeCount: 111, totalCount: 495 },
      { level: '11 > 12', upgradeCost: 12010000, totalCost: 55220000, upgradeCount: 132, totalCount: 627 },
      { level: '12 > 13', upgradeCost: 14260000, totalCost: 69480000, upgradeCount: 155, totalCount: 782 },
      { level: '13 > 14', upgradeCost: 16740000, totalCost: 86220000, upgradeCount: 180, totalCount: 962 },
      { level: '14 > 15', upgradeCost: 19450000, totalCost: 105670000, upgradeCount: 207, totalCount: 1169 },
      { level: '15 > 16', upgradeCost: 22420000, totalCost: 128090000, upgradeCount: 236, totalCount: 1405 },
      { level: '16 > 17', upgradeCost: 25630000, totalCost: 153720000, upgradeCount: 267, totalCount: 1672 },
      { level: '17 > 18', upgradeCost: 29100000, totalCost: 182820000, upgradeCount: 300, totalCount: 1972 },
      { level: '18 > 19', upgradeCost: 32830000, totalCost: 215650000, upgradeCount: 335, totalCount: 2307 },
      { level: '19 > 20', upgradeCost: 36820000, totalCost: 252470000, upgradeCount: 372, totalCount: 2679 },
    ]
  },
  lacheln: {
    name: '拉契爾恩',
    icon: Arcane_Symbol_3,
    data: [
      { level: '1 > 2', upgradeCost: 970000, totalCost: 970000, upgradeCount: 12, totalCount: 12 },
      { level: '2 > 3', upgradeCost: 1230000, totalCost: 2200000, upgradeCount: 15, totalCount: 27 },
      { level: '3 > 4', upgradeCost: 1660000, totalCost: 3860000, upgradeCount: 20, totalCount: 47 },
      { level: '4 > 5', upgradeCost: 2260000, totalCost: 6120000, upgradeCount: 27, totalCount: 74 },
      { level: '5 > 6', upgradeCost: 3060000, totalCost: 9180000, upgradeCount: 36, totalCount: 110 },
      { level: '6 > 7', upgradeCost: 4040000, totalCost: 13220000, upgradeCount: 47, totalCount: 157 },
      { level: '7 > 8', upgradeCost: 5220000, totalCost: 18440000, upgradeCount: 60, totalCount: 217 },
      { level: '8 > 9', upgradeCost: 6600000, totalCost: 25040000, upgradeCount: 75, totalCount: 292 },
      { level: '9 > 10', upgradeCost: 8180000, totalCost: 33220000, upgradeCount: 92, totalCount: 384 },
      { level: '10 > 11', upgradeCost: 9990000, totalCost: 43210000, upgradeCount: 111, totalCount: 495 },
      { level: '11 > 12', upgradeCost: 12010000, totalCost: 55220000, upgradeCount: 132, totalCount: 627 },
      { level: '12 > 13', upgradeCost: 14260000, totalCost: 69480000, upgradeCount: 155, totalCount: 782 },
      { level: '13 > 14', upgradeCost: 16740000, totalCost: 86220000, upgradeCount: 180, totalCount: 962 },
      { level: '14 > 15', upgradeCost: 19450000, totalCost: 105670000, upgradeCount: 207, totalCount: 1169 },
      { level: '15 > 16', upgradeCost: 22420000, totalCost: 128090000, upgradeCount: 236, totalCount: 1405 },
      { level: '16 > 17', upgradeCost: 25630000, totalCost: 153720000, upgradeCount: 267, totalCount: 1672 },
      { level: '17 > 18', upgradeCost: 29100000, totalCost: 182820000, upgradeCount: 300, totalCount: 1972 },
      { level: '18 > 19', upgradeCost: 32830000, totalCost: 215650000, upgradeCount: 335, totalCount: 2307 },
      { level: '19 > 20', upgradeCost: 36820000, totalCost: 252470000, upgradeCount: 372, totalCount: 2679 },
    ]
  },
  arcana: {
    name: '阿爾卡娜',
    icon: Arcane_Symbol_4,
    data: [
      { level: '1 > 2', upgradeCost: 970000, totalCost: 970000, upgradeCount: 12, totalCount: 12 },
      { level: '2 > 3', upgradeCost: 1230000, totalCost: 2200000, upgradeCount: 15, totalCount: 27 },
      { level: '3 > 4', upgradeCost: 1660000, totalCost: 3860000, upgradeCount: 20, totalCount: 47 },
      { level: '4 > 5', upgradeCost: 2260000, totalCost: 6120000, upgradeCount: 27, totalCount: 74 },
      { level: '5 > 6', upgradeCost: 3060000, totalCost: 9180000, upgradeCount: 36, totalCount: 110 },
      { level: '6 > 7', upgradeCost: 4040000, totalCost: 13220000, upgradeCount: 47, totalCount: 157 },
      { level: '7 > 8', upgradeCost: 5220000, totalCost: 18440000, upgradeCount: 60, totalCount: 217 },
      { level: '8 > 9', upgradeCost: 6600000, totalCost: 25040000, upgradeCount: 75, totalCount: 292 },
      { level: '9 > 10', upgradeCost: 8180000, totalCost: 33220000, upgradeCount: 92, totalCount: 384 },
      { level: '10 > 11', upgradeCost: 9990000, totalCost: 43210000, upgradeCount: 111, totalCount: 495 },
      { level: '11 > 12', upgradeCost: 12010000, totalCost: 55220000, upgradeCount: 132, totalCount: 627 },
      { level: '12 > 13', upgradeCost: 14260000, totalCost: 69480000, upgradeCount: 155, totalCount: 782 },
      { level: '13 > 14', upgradeCost: 16740000, totalCost: 86220000, upgradeCount: 180, totalCount: 962 },
      { level: '14 > 15', upgradeCost: 19450000, totalCost: 105670000, upgradeCount: 207, totalCount: 1169 },
      { level: '15 > 16', upgradeCost: 22420000, totalCost: 128090000, upgradeCount: 236, totalCount: 1405 },
      { level: '16 > 17', upgradeCost: 25630000, totalCost: 153720000, upgradeCount: 267, totalCount: 1672 },
      { level: '17 > 18', upgradeCost: 29100000, totalCost: 182820000, upgradeCount: 300, totalCount: 1972 },
      { level: '18 > 19', upgradeCost: 32830000, totalCost: 215650000, upgradeCount: 335, totalCount: 2307 },
      { level: '19 > 20', upgradeCost: 36820000, totalCost: 252470000, upgradeCount: 372, totalCount: 2679 },
    ]
  },
  moras: {
    name: '魔菈斯',
    icon: Arcane_Symbol_5,
    data: [
      { level: '1 > 2', upgradeCost: 970000, totalCost: 970000, upgradeCount: 12, totalCount: 12 },
      { level: '2 > 3', upgradeCost: 1230000, totalCost: 2200000, upgradeCount: 15, totalCount: 27 },
      { level: '3 > 4', upgradeCost: 1660000, totalCost: 3860000, upgradeCount: 20, totalCount: 47 },
      { level: '4 > 5', upgradeCost: 2260000, totalCost: 6120000, upgradeCount: 27, totalCount: 74 },
      { level: '5 > 6', upgradeCost: 3060000, totalCost: 9180000, upgradeCount: 36, totalCount: 110 },
      { level: '6 > 7', upgradeCost: 4040000, totalCost: 13220000, upgradeCount: 47, totalCount: 157 },
      { level: '7 > 8', upgradeCost: 5220000, totalCost: 18440000, upgradeCount: 60, totalCount: 217 },
      { level: '8 > 9', upgradeCost: 6600000, totalCost: 25040000, upgradeCount: 75, totalCount: 292 },
      { level: '9 > 10', upgradeCost: 8180000, totalCost: 33220000, upgradeCount: 92, totalCount: 384 },
      { level: '10 > 11', upgradeCost: 9990000, totalCost: 43210000, upgradeCount: 111, totalCount: 495 },
      { level: '11 > 12', upgradeCost: 12010000, totalCost: 55220000, upgradeCount: 132, totalCount: 627 },
      { level: '12 > 13', upgradeCost: 14260000, totalCost: 69480000, upgradeCount: 155, totalCount: 782 },
      { level: '13 > 14', upgradeCost: 16740000, totalCost: 86220000, upgradeCount: 180, totalCount: 962 },
      { level: '14 > 15', upgradeCost: 19450000, totalCost: 105670000, upgradeCount: 207, totalCount: 1169 },
      { level: '15 > 16', upgradeCost: 22420000, totalCost: 128090000, upgradeCount: 236, totalCount: 1405 },
      { level: '16 > 17', upgradeCost: 25630000, totalCost: 153720000, upgradeCount: 267, totalCount: 1672 },
      { level: '17 > 18', upgradeCost: 29100000, totalCost: 182820000, upgradeCount: 300, totalCount: 1972 },
      { level: '18 > 19', upgradeCost: 32830000, totalCost: 215650000, upgradeCount: 335, totalCount: 2307 },
      { level: '19 > 20', upgradeCost: 36820000, totalCost: 252470000, upgradeCount: 372, totalCount: 2679 },
    ]
  },
  esfera: {
    name: '艾斯佩拉',
    icon: Arcane_Symbol_6,
    data: [
      { level: '1 > 2', upgradeCost: 970000, totalCost: 970000, upgradeCount: 12, totalCount: 12 },
      { level: '2 > 3', upgradeCost: 1230000, totalCost: 2200000, upgradeCount: 15, totalCount: 27 },
      { level: '3 > 4', upgradeCost: 1660000, totalCost: 3860000, upgradeCount: 20, totalCount: 47 },
      { level: '4 > 5', upgradeCost: 2260000, totalCost: 6120000, upgradeCount: 27, totalCount: 74 },
      { level: '5 > 6', upgradeCost: 3060000, totalCost: 9180000, upgradeCount: 36, totalCount: 110 },
      { level: '6 > 7', upgradeCost: 4040000, totalCost: 13220000, upgradeCount: 47, totalCount: 157 },
      { level: '7 > 8', upgradeCost: 5220000, totalCost: 18440000, upgradeCount: 60, totalCount: 217 },
      { level: '8 > 9', upgradeCost: 6600000, totalCost: 25040000, upgradeCount: 75, totalCount: 292 },
      { level: '9 > 10', upgradeCost: 8180000, totalCost: 33220000, upgradeCount: 92, totalCount: 384 },
      { level: '10 > 11', upgradeCost: 9990000, totalCost: 43210000, upgradeCount: 111, totalCount: 495 },
      { level: '11 > 12', upgradeCost: 12010000, totalCost: 55220000, upgradeCount: 132, totalCount: 627 },
      { level: '12 > 13', upgradeCost: 14260000, totalCost: 69480000, upgradeCount: 155, totalCount: 782 },
      { level: '13 > 14', upgradeCost: 16740000, totalCost: 86220000, upgradeCount: 180, totalCount: 962 },
      { level: '14 > 15', upgradeCost: 19450000, totalCost: 105670000, upgradeCount: 207, totalCount: 1169 },
      { level: '15 > 16', upgradeCost: 22420000, totalCost: 128090000, upgradeCount: 236, totalCount: 1405 },
      { level: '16 > 17', upgradeCost: 25630000, totalCost: 153720000, upgradeCount: 267, totalCount: 1672 },
      { level: '17 > 18', upgradeCost: 29100000, totalCost: 182820000, upgradeCount: 300, totalCount: 1972 },
      { level: '18 > 19', upgradeCost: 32830000, totalCost: 215650000, upgradeCount: 335, totalCount: 2307 },
      { level: '19 > 20', upgradeCost: 36820000, totalCost: 252470000, upgradeCount: 372, totalCount: 2679 },
    ]
  },
};

const authenticSymbols = {
  cernium: {
    name: '賽爾尼溫',
    icon: Authentic_Symbol_1,
    data: [
      { level: '1 > 2', upgradeCost: 36500000, totalCost: 36500000, upgradeCount: 29, totalCount: 29 },
      { level: '2 > 3', upgradeCost: 91200000, totalCost: 127700000, upgradeCount: 76, totalCount: 105 },
      { level: '3 > 4', upgradeCost: 160700000, totalCost: 288400000, upgradeCount: 141, totalCount: 246 },
      { level: '4 > 5', upgradeCost: 241900000, totalCost: 530300000, upgradeCount: 224, totalCount: 470 },
      { level: '5 > 6', upgradeCost: 331500000, totalCost: 861800000, upgradeCount: 325, totalCount: 795 },
      { level: '6 > 7', upgradeCost: 426200000, totalCost: 1288000000, upgradeCount: 444, totalCount: 1239 },
      { level: '7 > 8', upgradeCost: 522900000, totalCost: 1810900000, upgradeCount: 581, totalCount: 1820 },
      { level: '8 > 9', upgradeCost: 618200000, totalCost: 2429100000, upgradeCount: 736, totalCount: 2556 },
      { level: '9 > 10', upgradeCost: 709000000, totalCost: 3138100000, upgradeCount: 909, totalCount: 3465 },
      { level: '10 > 11', upgradeCost: 792000000, totalCost: 3930100000, upgradeCount: 1100, totalCount: 4565 }
    ]
  },
  hotelArcus: {
    name: '飯店阿爾克斯',
    icon: Authentic_Symbol_2,
    data: [
      { level: '1 > 2', upgradeCost: 41700000, totalCost: 41700000, upgradeCount: 29, totalCount: 29 },
      { level: '2 > 3', upgradeCost: 104800000, totalCost: 146500000, upgradeCount: 76, totalCount: 105 },
      { level: '3 > 4', upgradeCost: 186100000, totalCost: 332600000, upgradeCount: 141, totalCount: 246 },
      { level: '4 > 5', upgradeCost: 282200000, totalCost: 614800000, upgradeCount: 224, totalCount: 470 },
      { level: '5 > 6', upgradeCost: 390000000, totalCost: 1004800000, upgradeCount: 325, totalCount: 795 },
      { level: '6 > 7', upgradeCost: 506100000, totalCost: 1510900000, upgradeCount: 444, totalCount: 1239 },
      { level: '7 > 8', upgradeCost: 627400000, totalCost: 2138300000, upgradeCount: 581, totalCount: 1820 },
      { level: '8 > 9', upgradeCost: 750700000, totalCost: 2889000000, upgradeCount: 736, totalCount: 2556 },
      { level: '9 > 10', upgradeCost: 872600000, totalCost: 3761600000, upgradeCount: 909, totalCount: 3465 },
      { level: '10 > 11', upgradeCost: 990000000, totalCost: 4751600000, upgradeCount: 1100, totalCount: 4565 }
    ]
  },
  odium: {
    name: '奧迪溫',
    icon: Authentic_Symbol_3,
    data: [
      { level: '1 > 2', upgradeCost: 46900000, totalCost: 46900000, upgradeCount: 29, totalCount: 29 },
      { level: '2 > 3', upgradeCost: 118500000, totalCost: 165400000, upgradeCount: 76, totalCount: 105 },
      { level: '3 > 4', upgradeCost: 211500000, totalCost: 376900000, upgradeCount: 141, totalCount: 246 },
      { level: '4 > 5', upgradeCost: 322500000, totalCost: 699400000, upgradeCount: 224, totalCount: 470 },
      { level: '5 > 6', upgradeCost: 448500000, totalCost: 1147900000, upgradeCount: 325, totalCount: 795 },
      { level: '6 > 7', upgradeCost: 586000000, totalCost: 1733900000, upgradeCount: 444, totalCount: 1239 },
      { level: '7 > 8', upgradeCost: 732000000, totalCost: 2465900000, upgradeCount: 581, totalCount: 1820 },
      { level: '8 > 9', upgradeCost: 883200000, totalCost: 3349100000, upgradeCount: 736, totalCount: 2556 },
      { level: '9 > 10', upgradeCost: 1036200000, totalCost: 4385300000, upgradeCount: 909, totalCount: 3465 },
      { level: '10 > 11', upgradeCost: 1188000000, totalCost: 5573300000, upgradeCount: 1100, totalCount: 4565 }
    ]
  },
  shangriLa: {
    name: '桃源境',
    icon: Authentic_Symbol_4,
    data: [
      { level: '1 > 2', upgradeCost: 52200000, totalCost: 52200000, upgradeCount: 29, totalCount: 29 },
      { level: '2 > 3', upgradeCost: 132200000, totalCost: 184400000, upgradeCount: 76, totalCount: 105 },
      { level: '3 > 4', upgradeCost: 236800000, totalCost: 421200000, upgradeCount: 141, totalCount: 246 },
      { level: '4 > 5', upgradeCost: 362800000, totalCost: 784000000, upgradeCount: 224, totalCount: 470 },
      { level: '5 > 6', upgradeCost: 507000000, totalCost: 1291000000, upgradeCount: 325, totalCount: 795 },
      { level: '6 > 7', upgradeCost: 666000000, totalCost: 1957000000, upgradeCount: 444, totalCount: 1239 },
      { level: '7 > 8', upgradeCost: 836600000, totalCost: 2793600000, upgradeCount: 581, totalCount: 1820 },
      { level: '8 > 9', upgradeCost: 1015600000, totalCost: 3809200000, upgradeCount: 736, totalCount: 2556 },
      { level: '9 > 10', upgradeCost: 1199800000, totalCost: 5009000000, upgradeCount: 909, totalCount: 3465 },
      { level: '10 > 11', upgradeCost: 1386000000, totalCost: 6395000000, upgradeCount: 1100, totalCount: 4565 }
    ]
  },
  arteria: {
    name: '阿爾特利亞',
    icon: Authentic_Symbol_5,
    data: [
      { level: '1 > 2', upgradeCost: 57400000, totalCost: 57400000, upgradeCount: 29, totalCount: 29 },
      { level: '2 > 3', upgradeCost: 145900000, totalCost: 203300000, upgradeCount: 76, totalCount: 105 },
      { level: '3 > 4', upgradeCost: 262200000, totalCost: 465500000, upgradeCount: 141, totalCount: 246 },
      { level: '4 > 5', upgradeCost: 403200000, totalCost: 868700000, upgradeCount: 224, totalCount: 470 },
      { level: '5 > 6', upgradeCost: 565500000, totalCost: 1434200000, upgradeCount: 325, totalCount: 795 },
      { level: '6 > 7', upgradeCost: 745900000, totalCost: 2180100000, upgradeCount: 444, totalCount: 1239 },
      { level: '7 > 8', upgradeCost: 941200000, totalCost: 3121300000, upgradeCount: 581, totalCount: 1820 },
      { level: '8 > 9', upgradeCost: 1148100000, totalCost: 4269400000, upgradeCount: 736, totalCount: 2556 },
      { level: '9 > 10', upgradeCost: 1363500000, totalCost: 5632900000, upgradeCount: 909, totalCount: 3465 },
      { level: '10 > 11', upgradeCost: 1584000000, totalCost: 7216900000, upgradeCount: 1100, totalCount: 4565 }
    ]
  },
  carcion: {
    name: '卡爾西溫',
    icon: Authentic_Symbol_6,
    data: [
      { level: '1 > 2', upgradeCost: 62600000, totalCost: 62600000, upgradeCount: 29, totalCount: 29 },
      { level: '2 > 3', upgradeCost: 159600000, totalCost: 222200000, upgradeCount: 76, totalCount: 105 },
      { level: '3 > 4', upgradeCost: 287600000, totalCost: 509800000, upgradeCount: 141, totalCount: 246 },
      { level: '4 > 5', upgradeCost: 443500000, totalCost: 953300000, upgradeCount: 224, totalCount: 470 },
      { level: '5 > 6', upgradeCost: 624000000, totalCost: 1577300000, upgradeCount: 325, totalCount: 795 },
      { level: '6 > 7', upgradeCost: 825800000, totalCost: 2403100000, upgradeCount: 444, totalCount: 1239 },
      { level: '7 > 8', upgradeCost: 1045800000, totalCost: 3448900000, upgradeCount: 581, totalCount: 1820 },
      { level: '8 > 9', upgradeCost: 1280600000, totalCost: 4729500000, upgradeCount: 736, totalCount: 2556 },
      { level: '9 > 10', upgradeCost: 1527100000, totalCost: 6256600000, upgradeCount: 909, totalCount: 3465 },
      { level: '10 > 11', upgradeCost: 1782000000, totalCost: 8038600000, upgradeCount: 1100, totalCount: 4565 }
    ]
  },
  tallahart: {
    name: '塔拉哈特',
    icon: Authentic_Symbol_7,
    data: [
      { level: '1 > 2', upgradeCost: 113600000, totalCost: 113600000, upgradeCount: 29, totalCount: 29 },
      { level: '2 > 3', upgradeCost: 293300000, totalCost: 406900000, upgradeCount: 76, totalCount: 105 },
      { level: '3 > 4', upgradeCost: 535800000, totalCost: 942700000, upgradeCount: 141, totalCount: 246 },
      { level: '4 > 5', upgradeCost: 837700000, totalCost: 1780400000, upgradeCount: 224, totalCount: 470 },
      { level: '5 > 6', upgradeCost: 1196000000, totalCost: 2976400000, upgradeCount: 325, totalCount: 795 },
      { level: '6 > 7', upgradeCost: 1607200000, totalCost: 4583600000, upgradeCount: 444, totalCount: 1239 },
      { level: '7 > 8', upgradeCost: 2068300000, totalCost: 6651900000, upgradeCount: 581, totalCount: 1820 },
      { level: '8 > 9', upgradeCost: 2576000000, totalCost: 9227900000, upgradeCount: 736, totalCount: 2556 },
      { level: '9 > 10', upgradeCost: 3126900000, totalCost: 12354800000, upgradeCount: 909, totalCount: 3465 },
      { level: '10 > 11', upgradeCost: 3718000000, totalCost: 16072800000, upgradeCount: 1100, totalCount: 4565 }
    ]
  }
};

const formatNumber = (num) => {
  return num.toLocaleString('zh-TW');
};

const SymbolCard = ({ title, icon, data, viewMode }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Image
            src={icon}
            alt={title}
            style={{ width: '32px', height: 'auto' }}
            className="mr-3"
          />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <Table>
          <TableHeader className="bg-muted dark:bg-muted">
            <TableRow>
              <TableHead className="w-1/3">等級</TableHead>
              {viewMode === "cost" ? (
                <>
                  <TableHead className="w-1/3">升級花費</TableHead>
                  <TableHead className="w-1/3">總花費</TableHead>
                </>
              ) : (
                <>
                  <TableHead className="w-1/3">升級數量</TableHead>
                  <TableHead className="w-1/3">總數量</TableHead>
                </>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map(
              (
                { level, upgradeCost, totalCost, upgradeCount, totalCount },
                index
              ) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{level}</TableCell>
                  {viewMode === "cost" ? (
                    <>
                      <TableCell>{formatNumber(upgradeCost)}</TableCell>
                      <TableCell>{formatNumber(totalCost)}</TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{formatNumber(upgradeCount)}</TableCell>
                      <TableCell>{formatNumber(totalCount)}</TableCell>
                    </>
                  )}
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default function Symbols() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">符文系統</h1>
      </div>

      <Tabs defaultValue="arcane" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-4 bg-muted">
          <TabsTrigger
            value="arcane"
            className="data-[state=active]:bg-background data-[state=active]:text-foreground dark:data-[state=active]:bg-background dark:data-[state=active]:text-foreground border-0"
          >
            秘法符文
          </TabsTrigger>
          <TabsTrigger
            value="authentic"
            className="data-[state=active]:bg-background data-[state=active]:text-foreground dark:data-[state=active]:bg-background dark:data-[state=active]:text-foreground border-0"
          >
            真實符文
          </TabsTrigger>
          <TabsTrigger
            value="count"
            className="data-[state=active]:bg-background data-[state=active]:text-foreground dark:data-[state=active]:bg-background dark:data-[state=active]:text-foreground border-0"
          >
            升級數量
          </TabsTrigger>
        </TabsList>

        <TabsContent value="arcane" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {Object.entries(arcaneSymbols).map(([key, symbol]) => (
              <SymbolCard
                key={key}
                title={symbol.name}
                icon={symbol.icon}
                data={symbol.data}
                viewMode="cost"
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="authentic" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {Object.entries(authenticSymbols).map(([key, symbol]) => (
              <SymbolCard
                key={key}
                title={symbol.name}
                icon={symbol.icon}
                data={symbol.data}
                viewMode="cost"
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="count" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 justify-center max-w-4xl mx-auto">
            <SymbolCard
              title="秘法符文"
              icon={Arcane_Symbol_Select_Coupon}
              data={Object.values(arcaneSymbols)[0]?.data || []}
              viewMode="count"
            />
            <SymbolCard
              title="真實符文"
              icon={Authentic_Symbol_Select_Coupon}
              data={Object.values(authenticSymbols)[0]?.data || []}
              viewMode="count"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}