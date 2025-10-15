# MapleKit 🍁

> 新楓之谷玩家的工具集合，提供各種進度計算與資料查詢

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

## 功能介紹

### 進度計算器
- **命運武器進度計算** - 計算各階段所需決心、完成時間與週數
- **創世武器進度計算** - 計算各階段所需痕跡、完成時間與週數

### 遊戲資料庫
- **符文系統資訊** - 完整的符文升級 & 花費資訊
- **Boss 資訊查詢** - 各種 Boss 的詳細資訊

## 快速開始

### 環境需求
- Node.js 18.0 或更高版本

### 安裝與執行

1. **下載專案**
   ```bash
   git clone https://github.com/jun12079/maple-kit.git
   cd maple-kit
   ```

2. **安裝依賴**
   ```bash
   npm install
   ```

3. **啟動開發伺服器**
   ```bash
   npm run dev
   ```

4. **訪問網站**
   
   開啟瀏覽器並訪問 [http://localhost:3000](http://localhost:3000) 即可開始使用

## 專案結構

```
maple-kit/
├── src/
│   ├── app/                    # Next.js App Router 頁面
│   │   ├── calc/              # 計算器頁面
│   │   │   ├── destiny-weapon/ # 命運武器計算器
│   │   │   └── genesis-weapon/ # 創世武器計算器
│   │   ├── data/              # 資料頁面
│   │   │   ├── bosses/        # Boss 資訊
│   │   │   └── symbols/       # 符文資訊
│   │   └── faq/               # 常見問題
│   ├── components/            # React 組件
│   │   ├── ui/                # UI 基礎組件
│   │   ├── layout/            # 布局組件
│   │   └── calc/              # 計算器相關組件
│   ├── assets/                # 靜態資源
│   │   └── images/            # 圖片資源
│   ├── data/                  # 資料檔案
│   └── lib/                   # 工具函數
├── public/                    # 公共靜態資源
└── ...配置檔案
```

## 技術棧

- **框架**: [Next.js 15.5.4](https://nextjs.org/) - React 全端框架
- **UI 框架**: [React 19.1.0](https://reactjs.org/) - 使用者介面函式庫
- **樣式**: [Tailwind CSS 4.x](https://tailwindcss.com/) - CSS 框架
- **UI 組件**: [Radix UI](https://www.radix-ui.com/) - 無障礙 UI 組件
- **圖示**: [Lucide React](https://lucide.dev/) - 圖示庫
- **主題**: [next-themes](https://github.com/pacocoursey/next-themes) - 深色/淺色模式切換
- **分析**: [Vercel Analytics](https://vercel.com/analytics) - 網站分析工具

## 常用指令

- `npm run dev` - 啟動開發伺服器（使用 Turbopack）
- `npm run dev:custom` - 啟動自定義開發伺服器 (127.0.0.1:3000)
- `npm run build` - 建置生產版本
- `npm run start` - 啟動生產伺服器
- `npm run lint` - 執行 ESLint 檢查

## 授權條款

本專案使用的授權條款 - 詳見 [LICENSE](LICENSE) 檔案

## 免責聲明

本工具僅供參考，計算結果可能因遊戲內部調整而有所變動。使用者需自行承擔使用本工具所產生的風險。

## 聯絡資訊

如有任何問題或建議，請透過以下方式聯絡：

- Google表單: [表單回覆](https://docs.google.com/forms/d/e/1FAIpQLSfHeZ6zuEVf5qaKpJis4S3fsdd_Fi5kwReoXR7EQ8Omw_5MqQ/viewform)