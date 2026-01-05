"use client";

import { useState, useEffect } from "react";

export const DomainNotice = () => {
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    // 只有在 maple-kit.com 域名上不顯示，其餘都顯示
    const isNewDomain =
      window.location.hostname === "www.maple-kit.com" ||
      window.location.hostname === "maple-kit.com";

    if (!isNewDomain) {
      setShowNotice(true);
    }
  }, []);

  if (!showNotice) return null;

  return (
    <div className="bg-orange-500 dark:bg-orange-600 text-white py-2 px-4 text-center text-sm">
      <div className="max-w-7xl mx-auto">
        <span className="font-medium">
          ⚠️ 重要通知：我們已遷移至新域名{" "}
          <a
            href="https://www.maple-kit.com"
            className="underline font-bold hover:text-orange-100"
          >
            www.maple-kit.com
          </a>
          ，此域名將於 1 月 31 日 關閉，請更新您的書籤！
        </span>
      </div>
    </div>
  );
};
