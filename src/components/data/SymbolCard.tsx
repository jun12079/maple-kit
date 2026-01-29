import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SymbolUpgradeInfo } from "@/data/symbols/symbolData";

const formatNumber = (num: number) => {
  return num.toLocaleString('zh-TW');
};

interface SymbolCardProps {
  title: string;
  icon: string;
  data: SymbolUpgradeInfo[];
  viewMode: "cost" | "count";
}

export const SymbolCard = ({ title, icon, data, viewMode }: SymbolCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <img
            src={icon}
            alt={title}
            width={32}
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
};
