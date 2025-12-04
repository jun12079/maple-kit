import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";
import { arcaneSymbols, authenticSymbols, symbolCoupons, symbolUpgradeData, SymbolUpgradeInfo, SymbolDefinition } from "@/data/symbols/symbolData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "符文系統",
  description: "新楓之谷符文系統查詢表格，包含秘法符文、真實符文的升級成本與升級數量資訊",
  keywords: "新楓之谷, 符文系統, 秘法符文, 真實符文, 符文升級",
};

const formatNumber = (num: number) => {
  return num.toLocaleString('zh-TW');
};

interface SymbolCardProps {
  title: string;
  icon: StaticImageData | string;
  data: SymbolUpgradeInfo[];
  viewMode: "cost" | "count";
}

const SymbolCard = ({ title, icon, data, viewMode }: SymbolCardProps) => {
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
            {Object.entries(arcaneSymbols).map(([key, symbol]: [string, SymbolDefinition]) => (
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
            {Object.entries(authenticSymbols).map(([key, symbol]: [string, SymbolDefinition]) => (
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
              icon={symbolCoupons.arcane}
              data={symbolUpgradeData.arcane}
              viewMode="count"
            />
            <SymbolCard
              title="真實符文"
              icon={symbolCoupons.authentic}
              data={symbolUpgradeData.authentic}
              viewMode="count"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}