import generatedColorRoles from "../data/generated/color-roles.json";
import generatedAchievementRoles from "../data/generated/achievement-roles.json";
import colorRoleDetails from "../data/manual/color-role-details.json";
import achievementRoleDetails from "../data/manual/achievement-role-details.json";
import timelineData from "../data/manual/timeline.json";
import memoryMessagesData from "../data/manual/memory-messages.json";
import futureProjectsData from "../data/manual/future-projects.json";
import siteCopyData from "../data/manual/site-copy.json";

type GeneratedRole = {
  id?: unknown;
  name?: unknown;
  color?: unknown;
  memberCount?: unknown;
};

type RoleDetail = {
  id?: unknown;
  description?: unknown;
  year?: unknown;
};

type TimelineItem = {
  year?: unknown;
  title?: unknown;
  description?: unknown;
};

type MemoryMessage = {
  displayName?: unknown;
  content?: unknown;
  isAnonymous?: unknown;
};

type FutureProject = {
  title?: unknown;
  description?: unknown;
  status?: unknown;
};

const asArray = <T>(value: unknown): T[] => Array.isArray(value) ? value as T[] : [];

const asText = (value: unknown, fallback: string) => {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
};

const asCount = (value: unknown) =>
  typeof value === "number" && Number.isFinite(value) && value >= 0 ? Math.round(value) : 0;

const asColor = (value: unknown) => {
  const color = asText(value, "#CAA0A7");
  return /^#[0-9a-fA-F]{6}$/.test(color) ? color : "#CAA0A7";
};

const mergeRoles = (generated: unknown, manual: unknown, fallbackDescription: string) => {
  const details = new Map(
    asArray<RoleDetail>(manual)
      .map((detail) => [asText(detail.id, ""), detail] as const)
      .filter(([id]) => id.length > 0)
  );

  return asArray<GeneratedRole>(generated)
    .map((role) => {
      const id = asText(role.id, "");
      const name = asText(role.name, "");
      if (!id || !name) return null;

      const detail = details.get(id);
      const year = asText(detail?.year, "");

      return {
        id,
        name,
        color: asColor(role.color),
        memberCount: asCount(role.memberCount),
        description: asText(detail?.description, fallbackDescription),
        year: year || undefined
      };
    })
    .filter((role) => role !== null);
};

export const colorRoles = mergeRoles(
  generatedColorRoles,
  colorRoleDetails,
  "這個顏色還在等一段手寫描述。"
);

export const achievementRoles = mergeRoles(
  generatedAchievementRoles,
  achievementRoleDetails,
  "這枚徽章的故事還在整理中。"
);

export const timeline = asArray<TimelineItem>(timelineData)
  .map((item) => ({
    year: asText(item.year, ""),
    title: asText(item.title, "尚未命名的節點"),
    description: asText(item.description, "這一年還在等待補上更完整的記憶。")
  }))
  .filter((item) => item.year);

export const memoryMessages = asArray<MemoryMessage>(memoryMessagesData)
  .map((message) => ({
    displayName: Boolean(message.isAnonymous) ? "匿名花瓣" : asText(message.displayName, "未署名"),
    content: asText(message.content, "")
  }))
  .filter((message) => message.content);

export const futureProjects = asArray<FutureProject>(futureProjectsData).map((project) => ({
  title: asText(project.title, "還沒取名的坑洞"),
  description: asText(project.description, "這個方向還在慢慢長出輪廓。"),
  status: asText(project.status, "未定")
}));

export const siteCopy = {
  heroTitle: asText(siteCopyData.heroTitle, "LycoHana"),
  heroSubtitle: asText(siteCopyData.heroSubtitle, "此處仍有花開"),
  heroDescription: asText(siteCopyData.heroDescription, "五年了，這裡還在。"),
  foundedAt: asText(siteCopyData.foundedAt, "2021/06/28 22:48"),
  footerText: asText(siteCopyData.footerText, "LycoHana 五週年紀念館。")
};
