# LycoHana 五週年紀念館

彼岸花社群五週年紀念網站。

這個 repo 最重要的事情並不是「把網站做得很大」，是把 2021/06/28 22:48 到 2026/06/28 22:48 之間留下來的東西，好好整理成一頁可以慢慢看的紀念剪貼簿。它是一次性的靜態網站，預計在五週年上線後凍結，所以這裡刻意不做後台、不接資料庫，也不在 build 時即時打 Discord API。

講白一點，這個專案的目標是準時、誠實地替社群過生日。技術只是用來把資料穩穩放上去，不要讓未來的我突然多養一個看起來很正式、但其實沒人想維護的系統。

## 專案方向

- 純 Astro + TypeScript。
- 樣式使用普通 CSS，沒有 React，沒有 UI framework。
- 全站單頁，由 `src/pages/index.astro` 組出七個 section。
- 資料都放在 `src/data/`，build 時讀 JSON。
- `generated/` 放之後 snapshot 腳本產生的資料。
- `manual/` 放人工寫的描述、文案、留言與推薦。
- 任何 JSON 為空或缺欄位時，頁面應該優雅隱藏區塊或顯示佔位文字，不應該直接炸掉。

## 頁面內容

目前單頁由上到下是這七段：

1. Hero
2. 花海色彩
3. 紀念徽章
4. 社群年表
5. 動畫推薦
6. 回憶留言牆
7. 未來坑洞

再來如果要補內容，我會優先補 JSON，而不是先改版型。因為這頁的骨架其實已經夠用了，真正還會變動的是資料和文字。

## 專案結構

```txt
.
├── public/
│   └── lycoris-mark.svg
├── src/
│   ├── data/
│   │   ├── generated/
│   │   │   ├── achievement-roles.json
│   │   │   └── color-roles.json
│   │   └── manual/
│   │       ├── achievement-role-details.json
│   │       ├── anime-picks.json
│   │       ├── color-role-details.json
│   │       ├── future-projects.json
│   │       ├── memory-messages.json
│   │       ├── site-copy.json
│   │       └── timeline.json
│   ├── lib/
│   │   └── site-data.ts
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── AGENTS.md
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## 資料維護

資料分成兩邊，這件事很重要：

- `src/data/generated/`：給 snapshot 腳本寫入，只放 Discord 端可以抓到的機械資料，例如 `id`、`name`、`color`、`memberCount`。
- `src/data/manual/`：給人手動維護，放描述、年份、年表、留言、動畫推薦、站台文案。

兩邊會在 `src/lib/site-data.ts` 裡用 role id merge。這樣做有點囉嗦，但它可以避免一個很現實的問題：之後如果重跑 snapshot，不會把我手寫的描述整個洗掉。

### generated 範例

```json
[
  {
    "id": "role-mist-rose",
    "name": "霧玫瑰",
    "color": "#EBDAE0",
    "memberCount": 298
  }
]
```

### manual 範例

```json
[
  {
    "id": "role-mist-rose",
    "description": "最多人用的顏色，多到我有點意外。但最根本的原因是這顏色真的很好看，大家看到就直接選了。"
  }
]
```

### 動畫推薦範例

```json
[
  {
    "title": "葬送的芙莉蓮",
    "meta": "2023・MADHOUSE",
    "imageSrc": "https://frieren-anime.jp/wp-content/themes/frieren_2023/assets/img/top/top/9_visual.jpg",
    "imageAlt": "葬送的芙莉蓮官方主視覺",
    "description": "就是一部非常穩定好看的旅行番（?）。步調慢但完全不悶，每一集都不會讓你失望，可以放心留著慢慢看。"
  }
]
```

## 視覺規則

這頁的氣質是溫暖、紙張、剪貼簿、回憶冊。不要把它改成暗黑風、遊戲活動頁、強烈漸層、glow 或大動畫。

目前主要 token：

- 背景：`#F6F0E8`
- 卡片：`#FDFAF4`
- 邊框：`#E2D5C9`
- 主文字：`#4A3B38`
- 次要文字：`#7D6E67`
- 提示文字：`#9A8B83`
- 主強調：`#CAA0A7`
- 文字級強調：`#A6707C`
- 小範圍點綴：`#B3404F`

字體使用 Google Fonts：

- 標題：Noto Serif TC 500
- 內文：Noto Sans TC 400

## 授權與素材說明

這個 repo 目前保留標準 MIT License，但我會把它理解成「程式碼授權」，也就是 Astro、TypeScript、CSS 和資料讀取邏輯可以依照 `LICENSE` 使用。

但素材和內容要另外看，不要直接全部當成 MIT：

- `src/data/manual/` 裡的社群文案、留言、年表描述、動畫推薦文字，是彼岸花五週年紀念內容，不代表開放給其他用途重新散布或改作。
- `src/data/manual/anime-picks.json` 裡的 `imageSrc` 多數指向動畫官方或第三方網站圖片。這些圖片只作為推薦清單的外部展示來源，本 repo 或是我沒有擁有它們，也沒有替它們重新授權。
- `public/lycoris-mark.svg` 是本站使用的彼岸花線稿裝飾素材。除非之後另外標明，先不要把它視為 MIT 授權素材。
- 彼岸花社群名稱、紀念內容、成員留言和相關敘事，屬於這個紀念網站的脈絡，不開放商用或移植到其他專案。

所以比較安全的讀法是：程式碼可以照 MIT；素材、第三方圖片連結、社群內容與手寫文案請保留原脈絡使用，若要重用或公開散布，先確認來源與授權。這段不是法律意見，只是我不想讓 `LICENSE` 看起來像把所有動畫圖、社群文字和 SVG 都一起打包授權出去，因為那樣很容易產生誤會。

## 開發

```bash
npm install
npm run dev
```

本機開發時 Astro 會啟動 dev server。實際網址以終端機輸出為準。

## 驗證

```bash
npm run build
```

上線或交付前至少要跑 build。這個專案沒有複雜測試，因為它本質上是靜態頁；所以 build 能不能過、資料缺欄位時會不會讓頁面壞掉，是目前比較實際的檢查點。

## 上線前檢查

- `npm run build` 通過。
- `src/data/generated/` 只包含 snapshot 產生資料。
- `src/data/manual/` 的手寫描述沒有被腳本覆蓋。
- 七個 section 的資料都有合理內容，空資料也有佔位或自然隱藏。
- 手機 375px 寬度不跑版。
- 行高、留白和整體氣質仍然像一本安靜的紀念冊。

所以說回到這個 repo 的定位：它不是要變成什麼大型社群平台，只是把五年裡留下來的片段整理好。這樣就夠了，而且某種程度上，這樣才比較像這個網站該有的樣子。
