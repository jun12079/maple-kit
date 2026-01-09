import BossTable from "@/components/data/BossTable";

export const metadata = {
  title: "Boss 資訊",
  description: "新楓之谷 Boss 資訊查詢表格，包含難度、等級、血量、防禦、掉落物、結晶石等詳細資訊",
  keywords: "新楓之谷, Boss資訊, Boss資料, Boss掉落, Boss結晶石, TMS",
};

export default function BossesDataPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">Boss 資訊</h1>
      </div>
      <BossTable />
    </div>
  );
}