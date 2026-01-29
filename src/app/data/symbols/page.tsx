import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { arcaneSymbols, authenticSymbols, symbolCoupons, symbolUpgradeData, SymbolDefinition } from "@/data/symbols/symbolData";
import { SymbolCard } from "@/components/data/SymbolCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "符文系統",
  description: "新楓之谷符文系統查詢表格，包含秘法符文、真實符文的升級成本與升級數量資訊",
  keywords: "新楓之谷, 符文系統, 秘法符文, 真實符文, 豪華真實符文, 符文升級",
};

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