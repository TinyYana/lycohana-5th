# AGENTS.md — lycohana-5th

彼岸花社群五週年紀念網站。給 AI agent 的常駐規則。每次進入本 repo 請先讀本檔。

## 專案本質

一次性的靜態紀念網站，2026/06/28 22:48 上線後即凍結。
目標是準時、誠實地替社群過五週年，不是技術展示。
規格以本檔與 docs/ 為準，**不要重新規劃、不要擴張範圍**。

## 鐵則（違反會被退回）

1. 規格已定。收到模糊指令時依本檔執行，不要自行發明新功能或新頁面。
2. 純 Astro + TypeScript。**不加 React、不加 UI framework**，本站無互動 state 需求。
3. 樣式用普通 CSS / CSS Modules。
4. 全靜態：讀 src/data/ 下的 JSON。**無資料庫、無後台、無 Discord API 即時呼叫。**
5. 任何 JSON 為空或缺欄位時，網站不可崩潰；section 優雅隱藏或顯示佔位。
6. 手機版優先（375px 不跑版），行高 1.7 以上，留白要多。

## 資料結構（重要，勿搞錯）

src/data/ 分兩類，**build 時用 role id 將兩邊 merge**：

- `generated/`：之後由 snapshot 腳本產生，**只含 id, name, color, memberCount**。
- `manual/`：人工維護，含 description, year, timeline, 留言, 站台文案。

snapshot 腳本**只能寫 generated/，永遠不可寫入 manual/ 或覆蓋任何手寫描述**。
（這是刻意設計，用來避免重跑 snapshot 時洗掉人工內容。）

## 視覺 token（C 輪適用，嚴格遵守勿自由發揮）

氣質：溫暖、紙張、剪貼簿、回憶冊。**禁止暗黑風、漸層、glow、大動畫、手遊活動頁感。**

- 背景 #F6F0E8 / 卡片 #FDFAF4 / 邊框 #E2D5C9
- 主文字 #4A3B38 / 次要 #7D6E67 / 提示 #9A8B83
- 主強調 霧玫瑰 #CAA0A7（色塊、圓點、底紋）；文字級強調 深玫瑰 #A6707C
- 點綴 彼岸花紅 #B3404F：僅 icon 與極小範圍重點，禁止大面積
- 標題 Noto Serif TC (500)、內文 Noto Sans TC (400)，Google Fonts 載入

## 頁面（單頁，由上到下七個 section）

Hero / 花海色彩 / 紀念徽章 / 社群年表 / 動畫推薦 / 回憶留言牆 / 未來坑洞

（動畫推薦為 2026/06/11 TinyYana 指示新增，資料在 manual/anime-picks.json）

## 完成標準

`npm run build` 必須通過。回報時附：專案結構、JSON 範例、build 結果。
