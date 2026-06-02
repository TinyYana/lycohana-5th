# PLAN.md

# LycoHana 五週年紀念館企劃

## 1. 專案定位

LycoHana 五週年紀念館是一個為彼岸花社群五週年製作的靜態紀念網站。

這次企劃的目標是留下社群存在五年的痕跡，包含顏色身分組、成就型身分組、社群年表、回憶留言牆與未來坑洞。

網站氣質應接近「社群紀念館」與「回憶展示冊」，避免做成商業宣傳頁、遊戲大型活動頁或 Discord 數據看板。

核心句：

```text
五年了，這裡還在。
```

正式名稱：

```text
LycoHana 五週年紀念館
```

副標語：

```text
此處仍有花開
```

正式發布時間：

```text
2026/06/28 22:48
```

社群建立時間：

```text
2021/06/28 22:48
```

---

## 2. 核心交付物

本專案只交付以下內容：

```text
1. Astro 靜態網站
2. Discord role snapshot JSON
3. 花海色彩頁
4. 紀念徽章頁
5. 社群年表頁
6. 回憶留言牆頁
7. 未來坑洞頁
8. Discord 五週年專區
9. 五週年限定身分組
10. 6/28 22:48 正式公告
```

---

## 3. 明確不做

為了控制範圍，本次五週年前不做以下內容：

```text
1. 全服歷史總訊息數統計
2. 所有成員歷史發言排行榜
3. 回溯五年 Discord 訊息
4. 長期記錄每則訊息
5. 資料庫與後台系統
6. 即時同步 Discord 資料
7. Bot v3 完整重構
8. 經濟系統
9. 完整 TRPG Bot 正式發布
10. tinyyana.com 完整重建
11. 大規模頻道重構
12. 複雜動畫或大型互動效果
```

---

## 4. 技術選型

## 4.1 網站

使用：

```text
Astro + TypeScript
```

部署：

```text
Cloudflare Pages
```

資料來源：

```text
靜態 JSON
```

樣式：

```text
普通 CSS 或 CSS Modules
```

選擇 Astro 的原因：

```text
1. 適合內容型紀念網站
2. 靜態輸出簡單
3. 不需要伺服器
4. 不需要資料庫
5. 比 Next.js / Nuxt 更輕
6. 適合 Cloudflare Pages 部署
```

---

## 4.2 Snapshot Collector

使用：

```text
Node.js + TypeScript
```

可用套件：

```text
@discordjs/rest
discord-api-types
dotenv
tsx
```

用途：

```text
一次性抓取 Discord Guild 與 Role 資料，輸出網站使用的 JSON。
```

它不是常駐 Bot，不監聽訊息，不記錄成員行為。

---

## 5. 資料來源分工

## 5.1 自動資料

由 snapshot collector 取得：

```text
1. 社群名稱
2. 社群 icon
3. 社群成員數
4. 身分組名稱
5. 身分組顏色
6. 指定身分組持有人數
7. snapshot 產生時間
```

---

## 5.2 手動資料

由管理者整理：

```text
1. 身分組描述
2. 社群年表
3. 回憶留言牆內容
4. 未來坑洞
5. 網站文案
6. Discord 正式公告
```

---

## 6. 網站頁面規劃

## 6.1 首頁

目的：

```text
建立紀念感與網站主題。
```

內容：

```text
LycoHana
五週年紀念館

五年了，這裡還在。

建立於 2021/06/28 22:48
```

首頁可顯示：

```text
1. 社群成員數
2. 顏色身分組數
3. 紀念徽章數
4. 回憶留言數
5. 五週年日期
```

視覺方向：

```text
1. 暗色背景
2. 低飽和紅
3. 米白文字
4. 紀念冊感
5. 展示櫃感
6. 紙張、標籤、徽章、花瓣元素
```

---

## 6.2 花海色彩

目的：

```text
展示成員選擇的顏色身分組，讓它成為 LycoHana 的花海色彩。
```

資料來源：

```text
src/data/generated/color-roles.json
```

顯示內容：

```text
1. 身分組名稱
2. 顏色
3. 持有人數
4. 簡短描述
5. 比例條或色票卡
```

範例身分組：

```text
霧玫瑰
銀色
淺黃
橘色
綠色
藍色
灰色
```

呈現方式：

```text
色票卡片
標本卡片
紙片展示
低調比例條
```

---

## 6.3 紀念徽章

目的：

```text
展示社群過去留下的成就型身分組。
```

資料來源：

```text
src/data/generated/achievement-roles.json
```

顯示內容：

```text
1. 徽章名稱
2. 持有人數
3. 描述
4. 年份或來源
```

範例身分組：

```text
社群二週年紀念
早期自介者
於花海中的冀望之花
社群問卷填答獎勵
五年目擊者
```

呈現方式：

```text
徽章卡片
展櫃格
收藏品說明
```

---

## 6.4 社群年表

目的：

```text
用簡短年表展示 LycoHana 從 2021 到 2026 的歷程。
```

資料來源：

```text
src/data/manual/timeline.json
```

內容方向：

```text
2021：社群建立
2022：社群穩定與早期紀念
2023：日常互動與活動累積
2024：沉澱與維護
2025：Bot v3、研究室、五週年構想
2026：五週年
```

呈現方式：

```text
水平時間軸
垂直時間軸
年份卡片
展覽動線
```

---

## 6.5 回憶留言牆

目的：

```text
讓成員主動留下對 LycoHana 的回憶與祝福。
```

資料來源：

```text
src/data/manual/memory-messages.json
```

規則：

```text
1. 只展示成員同意公開的留言
2. 可以匿名
3. 不展示 Discord ID
4. 不展示完整帳號
5. 不自動同步
6. 由管理者人工挑選
```

呈現方式：

```text
紙條
明信片
留言卡
釘在牆上的回憶
```

---

## 6.6 未來坑洞

目的：

```text
展示五週年後可能延伸的方向。
```

資料來源：

```text
src/data/manual/future-projects.json
```

內容候選：

```text
1. Bot v3
2. TRPG Bot
3. 社群活動系統
4. TinyYana 研究室
5. 更多社群紀念頁
```

呈現方式：

```text
未開封的展品
封存的研究計畫
坑洞卡片
```

---

## 7. Discord 五週年專區

建議分類：

```text
🌺 LycoHana 五週年
├ 📢｜五週年公告
├ 💬｜回憶留言牆
├ 🖼｜五週年投稿
├ 🏵｜紀念身分組
└ 📜｜網站與年表
```

---

## 8. 五週年限定身分組

推薦名稱：

```text
五年目擊者
```

取得方式：

```text
在回憶留言牆留下一句話後，由管理員人工發放。
```

發放方式先採人工，不做 reaction role，避免額外開發負擔。

---

## 9. Repo 結構建議

```text
lycohana-5th/
├ apps/
│  └ site/
│     ├ src/
│     │  ├ components/
│     │  ├ data/
│     │  │  ├ generated/
│     │  │  └ manual/
│     │  ├ layouts/
│     │  ├ pages/
│     │  └ styles/
│     ├ astro.config.mjs
│     └ package.json
│
├ tools/
│  └ snapshot/
│     ├ src/
│     │  ├ index.ts
│     │  ├ fetchGuild.ts
│     │  ├ fetchRoles.ts
│     │  ├ fetchRoleCounts.ts
│     │  └ writeJson.ts
│     ├ .env.example
│     └ package.json
│
├ docs/
│  ├ PLAN.md
│  ├ DATA_SCHEMA.md
│  └ ROADMAP.md
│
├ README.md
└ package.json
```

---

## 10. 視覺方向

關鍵詞：

```text
quiet
nostalgic
archive
museum
scrapbook
memory wall
flower specimens
badge collection
low saturation
dark editorial
Japanese magazine layout
Discord community memories
```

避免：

```text
1. 手遊周年活動頁
2. 商業宣傳頁
3. 過度華麗的活動頁
4. 大型遊戲官網
5. 過度中二世界觀
6. 數據分析 Dashboard
```

---

## 11. 成功標準

最低成功：

```text
1. 2026/06/28 22:48 成功發出公告
2. 網站可正常瀏覽
3. Discord 有五週年專區
4. 成員可以留下回憶留言
5. 五年目擊者身分組可以發放
```

理想成功：

```text
1. 網站包含首頁、花海色彩、紀念徽章、社群年表、留言牆、未來坑洞
2. 至少 10 位成員留下留言
3. 至少 5 份截圖或投稿
4. 五週年後網站能長期保留
```

---

## 12. 總結

這次專案的工程核心是：

```text
Astro 靜態網站 + 一次性 Discord role snapshot collector + 人工整理內容
```

LycoHana 五週年紀念館不追求證明社群有多活躍。

它要呈現的是：

```text
這裡有人來過。
這裡有人留下過顏色。
這裡有人拿過紀念。
這裡有人偶爾回來。
五年了，這裡還在。
```
