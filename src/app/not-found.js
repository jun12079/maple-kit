import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center text-center min-h-96">
        <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-100 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-4">頁面不存在</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">抱歉，您要找的頁面不存在。</p>
        <Link href="/">
          <Button>回到首頁</Button>
        </Link>
      </div>
    </div>
  );
}