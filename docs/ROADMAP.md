# ROADMAP.md

# LycoHana 五週年紀念館 Roadmap

## 1. 總體原則

六月上半以學校期末任務為主，LycoHana 五週年只做規格與文件。

六月中後開始實作。

6/24 後進入凍結期，只修問題，不追加新功能。

正式發布時間：

```text
2026/06/28 22:48
```

---

# 2. 階段總覽

```text
Phase 0：6/17 前，文件與規格
Phase 1：6/18 到 6/20，網站骨架
Phase 2：6/21 到 6/23，資料與 Discord 專區
Phase 3：6/24 到 6/27，凍結與部署
Phase 4：6/28，正式發布
Phase 5：6/29 後，整理與後續延伸
```

---

# 3. Phase 0：文件與規格

時間：

```text
現在到 2026/06/17
```

目標：

```text
只定義，不開發。
```

任務：

```text
1. 完成 PLAN.md
2. 完成 DATA_SCHEMA.md
3. 完成 ROADMAP.md
4. 確認網站頁面
5. 確認資料來源
6. 確認不做清單
7. 找 3 到 5 個視覺參考
8. 確認 repo 名稱
```

建議 repo 名稱：

```text
lycohana-5th
```

這階段不要做：

```text
1. 不開 Astro
2. 不寫 Discord API
3. 不做 CSS 細節
4. 不整理大量素材
5. 不進行 Bot v3 重構
```

驗收條件：

```text
1. docs/PLAN.md 存在
2. docs/DATA_SCHEMA.md 存在
3. docs/ROADMAP.md 存在
4. 專案範圍明確
5. 不做項目明確
```

---

# 4. Phase 1：網站骨架

時間：

```text
2026/06/18 到 2026/06/20
```

目標：

```text
建立 Astro 網站骨架，讓所有主要頁面可以打開。
```

任務：

```text
1. 建立 Astro + TypeScript 專案
2. 建立 repo 結構
3. 建立首頁
4. 建立花海色彩頁
5. 建立紀念徽章頁
6. 建立社群年表頁
7. 建立回憶留言牆頁
8. 建立未來坑洞頁
9. 建立共用 Layout
10. 建立基礎 CSS
11. 建立 mock JSON
```

頁面路由建議：

```text
/
/colors
/badges
/timeline
/memories
/future
```

或單頁式網站：

```text
/
```

目前建議：

```text
單頁式網站優先
```

原因：

```text
1. 比較像紀念館
2. 比較好部署
3. 比較容易保證手機版體驗
4. 內容量不大
```

驗收條件：

```text
1. npm run dev 可正常啟動
2. npm run build 可正常通過
3. 首頁可看到 mock 資料
4. 所有 section 已建立
5. 手機版不會嚴重跑版
```

---

# 5. Phase 2：資料與 Discord 專區

時間：

```text
2026/06/21 到 2026/06/23
```

目標：

```text
完成 snapshot collector、整理手動內容、建立 Discord 五週年專區。
```

---

## 5.1 Snapshot Collector

任務：

```text
1. 建立 tools/snapshot
2. 建立 .env.example
3. 建立 roles.config.json
4. 實作 fetchGuild
5. 實作 fetchRoles
6. 實作 role count 取得
7. 實作 JSON 輸出
8. 測試輸出到 apps/site/src/data/generated
```

最低輸出：

```text
guild.json
color-roles.json
achievement-roles.json
snapshot-meta.json
```

如果 Discord API 端點不順，備案：

```text
手動填 generated JSON
```

驗收條件：

```text
1. snapshot script 可以執行
2. 可以產生 JSON
3. 網站可以讀取產生的 JSON
4. 不需要 Message Content Intent
5. 不需要常駐 Bot
```

---

## 5.2 手動內容整理

任務：

```text
1. 補 color-roles description
2. 補 achievement-roles description
3. 撰寫 timeline.json
4. 撰寫 future-projects.json
5. 建立 memory-messages.json 空資料或初版資料
6. 撰寫 site-copy.json
```

驗收條件：

```text
1. 花海色彩頁內容可讀
2. 紀念徽章頁內容可讀
3. 年表至少有 2021 到 2026
4. 未來坑洞至少有 Bot v3 與 TRPG Bot
```

---

## 5.3 Discord 五週年專區

建立分類：

```text
🌺 LycoHana 五週年
```

建立頻道：

```text
📢｜五週年公告
💬｜回憶留言牆
📜｜網站與年表
```

建立身分組：

```text
五年目擊者
```

發放方式：

```text
成員在回憶留言牆留下一句話後，由管理員人工發放。
```

驗收條件：

```text
1. 分類建立完成
2. 頻道權限檢查完成
3. 身分組建立完成
4. 留言牆可使用
5. 投稿頻道可使用
```

---

# 6. Phase 3：凍結與部署

時間：

```text
2026/06/24 到 2026/06/27
```

目標：

```text
只修問題，不追加功能。
```

任務：

```text
1. 檢查網站手機版
2. 檢查文字可讀性
3. 檢查資料是否正確
4. 檢查所有連結
5. 檢查 Cloudflare Pages build
6. 部署正式版本
7. 準備正式公告文
8. 準備 Discord 發布流程
9. 檢查五週年分類權限
10. 檢查五年目擊者身分組位置
```

禁止事項：

```text
1. 不新增頁面
2. 不新增大型動畫
3. 不改技術棧
4. 不加入資料庫
5. 不開始 Bot v3 重構
6. 不開始 TRPG Bot 正式功能
```

驗收條件：

```text
1. 網站正式網址可開啟
2. 手機版可正常閱讀
3. Discord 專區可使用
4. 公告文準備完成
5. 6/28 發布流程明確
```

---

# 7. Phase 4：正式發布

時間：

```text
2026/06/28
```

正式時間：

```text
22:48
```

建議流程：

```text
20:00 發預告
22:48 發正式公告
22:50 開放回憶留言牆
23:00 開始發放五年目擊者
23:10 發網站連結
23:30 後自由聊天
```

---

## 7.1 20:00 預告

內容方向：

```text
今晚 22:48，LycoHana 將正式滿五週年。
稍晚會開放五週年紀念館、回憶留言牆與五年目擊者身分組。
```

---

## 7.2 22:48 正式公告

正式公告需包含：

```text
1. 社群建立時間
2. 五週年說明
3. 網站連結
4. 回憶留言牆說明
5. 五年目擊者取得方式
6. 感謝成員
```

---

## 7.3 22:50 開放留言牆

操作：

```text
1. 開放 💬｜回憶留言牆
2. pin 留言規則
3. 說明留言可能被挑選放到網站
4. 提醒可以匿名或要求不要公開
```

---

## 7.4 23:00 開始發放身分組

規則：

```text
在回憶留言牆留下一句話即可獲得五年目擊者。
```

---

## 7.5 23:10 發網站連結

內容：

```text
LycoHana 五週年紀念館已公開。
```

---

# 8. Phase 5：發布後整理

時間：

```text
2026/06/29 之後
```

任務：

```text
1. 補充回憶留言牆內容
2. 補充投稿內容
3. 修正錯字
4. 記錄五週年成果
5. 決定網站是否長期保留
6. 將五週年專區封存或移到下方
7. 將 Bot v3 / TRPG Bot 移回長期規劃
```

可選：

```text
1. 寫一篇回顧文
2. 更新 Notion 專案狀態
3. 將網站 repo 補 README
4. 整理成作品集案例
```

---

# 9. 優先順序

## 必做

```text
1. 五週年公告
2. 五週年網站首頁
3. 花海色彩
4. 紀念徽章
5. Discord 五週年專區
6. 五年目擊者身分組
```

## 應做

```text
1. 社群年表
2. 回憶留言牆
3. Cloudflare Pages 部署
4. snapshot collector
```

## 可做

```text
1. 未來坑洞
2. 投稿牆
3. 花瓣動畫
4. 視覺細節
5. 網站更多區塊
```

## 不做

```text
1. 訊息統計
2. 發言排行榜
3. 完整後台
4. 長期 Bot 監控
5. 大型動畫
6. 完整 TRPG Bot
```

---

# 10. 當時間不足時

如果時間不足，砍成最低版本：

```text
1. 單頁 Astro 網站
2. 手動 JSON
3. 首頁
4. 花海色彩
5. 紀念徽章
6. Discord 五週年公告
7. 五年目擊者身分組
```

可以延後：

```text
1. snapshot collector
2. 社群年表細節
3. 回憶留言精選
4. 未來坑洞
5. 投稿牆
```

最底線：

```text
6/28 22:48 要有公告、網站、留言牆、身分組。
```

---

# 11. Codex 工作順序建議

給 Codex 的第一輪任務：

```text
請建立 lycohana-5th 專案，使用 Astro + TypeScript，依照 docs/PLAN.md、docs/DATA_SCHEMA.md、docs/ROADMAP.md 建立靜態網站骨架。先使用 mock JSON，不實作 Discord API。請完成首頁、花海色彩、紀念徽章、社群年表、回憶留言牆、未來坑洞六個 section，並確保 npm run build 通過。
```

第二輪任務：

```text
請依照 DATA_SCHEMA.md 實作 tools/snapshot，一次性讀取 Discord Guild 與 Role 資訊，輸出 generated JSON。不要監聽訊息，不要使用資料庫，不要建立常駐 Bot。
```

第三輪任務：

```text
請依照目前視覺方向優化網站 CSS，使其接近安靜、懷舊、紀念館、社群回憶展示冊，而非手遊周年活動頁或商業宣傳頁。
```

---

# 12. 最終提醒

這個專案最重要的是準時完成。

網站可以簡單，內容可以少，但不能在 6/28 當天還沒有可發布版本。

核心策略：

```text
先可發布，再變漂亮。
先靜態資料，再自動化。
先紀念感，再技術炫技。
```
