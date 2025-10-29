import CharacterSearch from "@/components/character/CharacterSearch";

export const metadata = {
  title: "角色查詢 | Maple Kit",
  description: "新楓之谷角色資訊查詢工具，查詢角色基本資料、裝備、技能、符文等詳細資訊",
  keywords: "新楓之谷, 角色查詢, 角色資訊, 裝備, 技能, 符文",
  openGraph: {
    title: "角色查詢 | Maple Kit",
    description: "查詢新楓之谷角色的詳細資訊和裝備狀況",
  },
};

export default function CharacterPage() {
  return <CharacterSearch />;
}
