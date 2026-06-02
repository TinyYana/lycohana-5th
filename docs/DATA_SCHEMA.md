# DATA_SCHEMA.md

# LycoHana 五週年紀念館資料結構

## 1. 資料設計原則

本專案採用靜態 JSON 作為資料來源。

資料分成兩類：

```text
generated：由 snapshot collector 自動產生
manual：由管理者手動整理
```

目標：

```text
1. 避免資料庫
2. 避免後台
3. 避免即時同步
4. 避免長期監控 Discord
5. 避免覆蓋人工整理內容
```

---

## 2. 目錄結構

```text
src/data/
├ generated/
│  ├ guild.json
│  ├ color-roles.json
│  ├ achievement-roles.json
│  └ snapshot-meta.json
│
└ manual/
   ├ timeline.json
   ├ memory-messages.json
   ├ future-projects.json
   └ site-copy.json
```

---

## 3. TypeScript Types

建議在網站專案建立：

```text
src/types/data.ts
```

內容如下：

```ts
export interface GuildSnapshot {
  name: string;
  description?: string;
  createdAt: string;
  anniversaryAt: string;
  memberCount: number;
  iconUrl?: string;
  bannerUrl?: string;
}

export interface RoleSnapshot {
  id: string;
  name: string;
  color: string;
  memberCount: number;
  position?: number;
  description: string;
  order: number;
}

export interface AchievementRoleSnapshot {
  id: string;
  name: string;
  color?: string;
  memberCount: number;
  description: string;
  year?: string;
  source?: string;
  order: number;
}

export interface SnapshotMeta {
  generatedAt: string;
  source: string;
  note: string;
}

export interface TimelineItem {
  id: string;
  year: string;
  date?: string;
  title: string;
  description: string;
  imageUrl?: string;
  order: number;
}

export interface MemoryMessage {
  id: string;
  displayName: string;
  content: string;
  createdAt?: string;
  isAnonymous: boolean;
  source?: "discord" | "manual";
  order: number;
}

export interface FutureProject {
  id: string;
  title: string;
  description: string;
  status: "planned" | "exploring" | "paused" | "unknown";
  icon?: string;
  order: number;
}

export interface SiteCopy {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  footerText: string;
}
```

---

# 4. generated/guild.json

用途：

```text
儲存 LycoHana 社群基本資訊。
```

範例：

```json
{
  "name": "LycoHana",
  "description": "ACG Discord 社群",
  "createdAt": "2021-06-28T22:48:00+08:00",
  "anniversaryAt": "2026-06-28T22:48:00+08:00",
  "memberCount": 1234,
  "iconUrl": "https://example.com/icon.png",
  "bannerUrl": "https://example.com/banner.png"
}
```

欄位說明：

```text
name：社群正式名稱
description：簡短描述
createdAt：社群建立時間
anniversaryAt：五週年時間
memberCount：snapshot 當下成員數
iconUrl：社群 icon
bannerUrl：社群 banner
```

---

# 5. generated/color-roles.json

用途：

```text
儲存顏色身分組資料，用於花海色彩頁。
```

範例：

```json
[
  {
    "id": "role_id_1",
    "name": "霧玫瑰",
    "color": "#CAA0A7",
    "memberCount": 42,
    "position": 10,
    "description": "溫柔而低調，像霧中盛開的玫瑰色。",
    "order": 1
  },
  {
    "id": "role_id_2",
    "name": "銀色",
    "color": "#D9D9DE",
    "memberCount": 31,
    "position": 9,
    "description": "像月光落在花海上的顏色。",
    "order": 2
  }
]
```

欄位說明：

```text
id：Discord role ID
name：身分組名稱
color：十六進位顏色
memberCount：持有人數
position：Discord role 排序
description：網站顯示用描述，手動撰寫
order：網站排序
```

---

# 6. generated/achievement-roles.json

用途：

```text
儲存成就型身分組資料，用於紀念徽章頁。
```

範例：

```json
[
  {
    "id": "role_id_achievement_1",
    "name": "社群二週年紀念",
    "color": "#E7B7C8",
    "memberCount": 58,
    "description": "曾經見證 LycoHana 第二年的成員。",
    "year": "2023",
    "source": "二週年活動",
    "order": 1
  },
  {
    "id": "role_id_achievement_2",
    "name": "早期自介者",
    "color": "#F3DFA1",
    "memberCount": 36,
    "description": "在早期願意留下自我介紹的人。",
    "year": "2021-2022",
    "source": "社群自介",
    "order": 2
  }
]
```

欄位說明：

```text
id：Discord role ID
name：身分組名稱
color：身分組顏色
memberCount：持有人數
description：網站展示用描述
year：年份或期間
source：來源活動或用途
order：網站排序
```

---

# 7. generated/snapshot-meta.json

用途：

```text
記錄 snapshot 來源與產生時間，避免使用者誤以為資料即時同步。
```

範例：

```json
{
  "generatedAt": "2026-06-24T22:00:00+08:00",
  "source": "Discord API role snapshot",
  "note": "此資料為五週年前夕的身分組 snapshot，非即時資料。"
}
```

欄位說明：

```text
generatedAt：資料產生時間
source：資料來源
note：網站顯示或內部註記
```

---

# 8. manual/timeline.json

用途：

```text
儲存社群年表。
```

範例：

```json
[
  {
    "id": "2021-created",
    "year": "2021",
    "date": "2021-06-28T22:48:00+08:00",
    "title": "LycoHana 建立",
    "description": "彼岸花社群在 2021/06/28 22:48 建立，開始作為 ACG Discord 社群運作。",
    "imageUrl": "",
    "order": 1
  },
  {
    "id": "2026-5th",
    "year": "2026",
    "date": "2026-06-28T22:48:00+08:00",
    "title": "五週年",
    "description": "LycoHana 正式滿五週年，推出五週年紀念館。",
    "imageUrl": "",
    "order": 6
  }
]
```

欄位說明：

```text
id：唯一識別
year：顯示年份
date：具體日期，可省略
title：事件標題
description：事件描述
imageUrl：可選圖片
order：排序
```

---

# 9. manual/memory-messages.json

用途：

```text
儲存回憶留言牆內容。
```

範例：

```json
[
  {
    "id": "memory-001",
    "displayName": "某位成員",
    "content": "雖然平常很少講話，但偶爾回來看還是覺得這裡很熟悉。",
    "createdAt": "2026-06-20",
    "isAnonymous": true,
    "source": "discord",
    "order": 1
  }
]
```

欄位說明：

```text
id：唯一識別
displayName：顯示名稱
content：留言內容
createdAt：留言日期
isAnonymous：是否匿名
source：來源，可為 discord 或 manual
order：排序
```

注意：

```text
1. 不存 Discord ID
2. 不存完整帳號
3. 只放同意公開的內容
4. 可以人工改成匿名
```

---

# 10. manual/future-projects.json

用途：

```text
儲存未來坑洞頁資料。
```

範例：

```json
[
  {
    "id": "bot-v3",
    "title": "Bot v3",
    "description": "重新整理 LycoHana 的社群 Bot，逐步加入活動、管理與互動功能。",
    "status": "planned",
    "icon": "🤖",
    "order": 1
  },
  {
    "id": "trpg-bot",
    "title": "TRPG Bot",
    "description": "以文字冒險與社群活動為核心的未來實驗。",
    "status": "exploring",
    "icon": "🎲",
    "order": 2
  }
]
```

欄位說明：

```text
id：唯一識別
title：項目名稱
description：簡短描述
status：狀態
icon：圖示
order：排序
```

status 可用值：

```text
planned
exploring
paused
unknown
```

---

# 11. manual/site-copy.json

用途：

```text
儲存網站固定文案，方便集中修改。
```

範例：

```json
{
  "heroTitle": "LycoHana 五週年紀念館",
  "heroSubtitle": "此處仍有花開",
  "heroDescription": "2021/06/28 22:48，LycoHana 建立。五年了，這裡還在。",
  "footerText": "LycoHana 彼岸花社群 5th Anniversary 2026"
}
```

欄位說明：

```text
heroTitle：首頁主標
heroSubtitle：首頁副標
heroDescription：首頁說明
footerText：頁尾文字
```

---

# 12. Snapshot Collector 輸出規則

snapshot collector 應只負責輸出 generated 資料。

它可以讀取一份設定檔：

```text
tools/snapshot/config/roles.config.json
```

範例：

```json
{
  "guildId": "DISCORD_GUILD_ID",
  "colorRoleNames": [
    "霧玫瑰",
    "銀色",
    "淺黃",
    "橘色",
    "綠色",
    "藍色",
    "灰色"
  ],
  "achievementRoleNames": [
    "社群二週年紀念",
    "早期自介者",
    "於花海中的冀望之花",
    "社群問卷填答獎勵",
    "2024 新年快樂",
    "五年目擊者"
  ]
}
```

執行後輸出：

```text
apps/site/src/data/generated/guild.json
apps/site/src/data/generated/color-roles.json
apps/site/src/data/generated/achievement-roles.json
apps/site/src/data/generated/snapshot-meta.json
```

---

# 13. 資料更新策略

## 13.1 五週年前

```text
1. 先建立手動 mock JSON
2. 網站用 mock JSON 開發
3. 6/21 到 6/23 實作 snapshot collector
4. 6/24 前跑一次正式 snapshot
```

## 13.2 五週年後

```text
1. 網站資料可固定保存
2. 不需要定期更新
3. 若要更新，手動再跑 snapshot collector 即可
```

---

# 14. 隱私原則

```text
1. 不公開成員完整清單
2. 不公開個人發言數
3. 不展示 Discord ID
4. 不抓訊息內容
5. 不做歷史訊息搜尋
6. 不做活躍排行榜
7. 留言需同意公開
```

---

# 15. 驗收條件

資料層最低驗收：

```text
1. guild.json 可正常被網站讀取
2. color-roles.json 至少包含 5 個顏色身分組
3. achievement-roles.json 至少包含 3 個成就型身分組
4. timeline.json 至少包含 2021 到 2026 的節點
5. memory-messages.json 可以為空陣列，但網站要正常顯示
6. future-projects.json 至少包含 Bot v3 與 TRPG Bot
```

網站層最低驗收：

```text
1. 無資料時不崩潰
2. 手機版可讀
3. snapshot-meta 的非即時資料說明可顯示
4. 所有頁面可正常 build
```
