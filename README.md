# MapleKit 🍁

> 新楓之谷玩家的全方位工具集合，提供各種進度計算、角色查詢與遊戲資料查詢

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

## 功能介紹

### 進度計算器
- **命運武器進度計算** - 計算各階段所需決心、完成時間與週數
- **創世武器進度計算** - 計算各階段所需痕跡、完成時間與週數
- **HEXA 技能進度計算** - 計算技能核心、精通核心、強化核心和共通核心的升級進度

### 角色查詢系統
- **角色基本資料** - 查詢角色等級、職業、公會等基本信息
- **裝備資訊** - 完整的角色裝備與能力值分析
- **技能與符文** - 詳細的技能配置與符文裝備狀況
- **收藏功能** - 可收藏常查詢的角色，方便快速訪問

### 遊戲資料
- **符文系統資訊** - 完整的符文升級資料與花費計算
- **Boss 資訊查詢** - 各 Boss 的詳細資訊與掉落物

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
│   │   ├── api/               # API 路由
│   │   │   ├── character/     # 角色相關 API
│   │   │   ├── id/           # ID 查詢 API
│   │   │   └── user/         # 使用者相關 API
│   │   ├── calc/              # 計算器頁面
│   │   │   ├── destiny-weapon/ # 命運武器計算器
│   │   │   ├── genesis-weapon/ # 創世武器計算器
│   │   │   └── hexa-skill/    # HEXA 技能計算器
│   │   ├── character/         # 角色查詢頁面
│   │   ├── data/              # 資料頁面
│   │   │   ├── bosses/        # Boss 資訊
│   │   │   └── symbols/       # 符文資訊
│   │   └── faq/               # 常見問題
│   ├── components/            # React 組件
│   │   ├── ui/                # UI 基礎組件 (Radix UI)
│   │   ├── layout/            # 布局組件 (Header, Footer)
│   │   ├── navbar/            # 導航欄組件
│   │   ├── calc/              # 計算器相關組件
│   │   ├── character/         # 角色查詢相關組件
│   │   └── data/              # 資料展示組件
│   ├── assets/                # 靜態資源
│   │   └── images/            # 遊戲圖片資源
│   ├── data/                  # 遊戲資料檔案
│   │   ├── bosses/           # Boss 相關資料
│   │   ├── hexa/             # HEXA 技能資料
│   │   ├── items/            # 道具資料庫
│   │   └── symbols/          # 符文資料
│   ├── hooks/                 # React Hooks
│   ├── lib/                   # 工具函數
│   └── services/              # API 服務
├── public/                    # 公共靜態資源
└── ...配置檔案
```

## 技術棧

### 核心技術
- **框架**: [Next.js 15.5.4](https://nextjs.org/) - React 全端框架 (使用 App Router)
- **UI 框架**: [React 19.1.0](https://reactjs.org/) - 使用者介面函式庫
- **樣式**: [Tailwind CSS 4.x](https://tailwindcss.com/) - 原子化 CSS 框架
- **構建工具**: Turbopack - 高效能構建工具

### UI/UX 組件
- **UI 組件**: [Radix UI](https://www.radix-ui.com/) - 無障礙設計的 Headless UI 組件
- **圖示**: [Lucide React](https://lucide.dev/) - 現代化圖示庫
- **主題系統**: [next-themes](https://github.com/pacocoursey/next-themes) - 深色/淺色模式切換

### 開發工具
- **分析工具**: [Vercel Analytics](https://vercel.com/analytics) - 網站效能分析

### API 整合
- **新楓之谷 API**: 官方角色資料查詢介面整合

## 常用指令

```bash
npm run dev              # 啟動開發伺服器 (使用 Turbopack)
npm run dev:custom       # 啟動自定義開發伺服器 (127.0.0.1:3000)
npm run build            # 建置生產版本 (使用 Turbopack)
npm run start            # 啟動生產伺服器
npm run lint             # 執行 ESLint 檢查
```

## 部署

本專案已經優化為可直接部署到 Vercel 等平台：

1. **連接 Git Repository** - 將專案推送到 GitHub
2. **部署到 Vercel** - 在 Vercel 中匯入專案
3. **環境變數設定** - 如需要請設定相關的環境變數
4. **自動部署** - 每次推送到主分支將自動觸發部署

## 主要特色

- **響應式設計** - 支援各種裝置尺寸
- **深色模式** - 內建明暗主題切換  
- **無障礙設計** - 遵循 Web 無障礙標準
- **效能最佳化** - 使用 Next.js 最新特性與 Turbopack
- **API 整合** - 整合官方新楓之谷 API
- **即時計算** - 前端即時運算，無需後端請求
- **資料持久化** - 使用 LocalStorage 儲存使用者偏好

## 授權條款

本專案使用的授權條款 - 詳見 [LICENSE](LICENSE) 檔案

## 免責聲明

本工具僅供參考，計算結果可能因遊戲內部調整而有所變動。使用者需自行承擔使用本工具所產生的風險。

## 聯絡資訊

如有任何問題或建議，請透過以下方式聯絡：

- Google表單: [表單回覆](https://docs.google.com/forms/d/e/1FAIpQLSfHeZ6zuEVf5qaKpJis4S3fsdd_Fi5kwReoXR7EQ8Omw_5MqQ/viewform)