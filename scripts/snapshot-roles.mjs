#!/usr/bin/env node
/**
 * Discord role snapshot script.
 * Fetches all guild members, counts per role, writes generated JSONs.
 *
 * Required env:
 *   DISCORD_BOT_TOKEN  — bot token with GUILD_MEMBERS intent
 *   DISCORD_GUILD_ID   — your server's guild ID
 *
 * Fill in the ROLE_MAP below with your actual Discord role IDs.
 * Find role IDs: Discord → Server Settings → Roles → right-click → Copy Role ID
 *                (requires Developer Mode enabled in Discord settings)
 */

import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const TOKEN = process.env.DISCORD_BOT_TOKEN;
const GUILD_ID = process.env.DISCORD_GUILD_ID;

if (!TOKEN || !GUILD_ID) {
  console.error("Missing DISCORD_BOT_TOKEN or DISCORD_GUILD_ID");
  process.exit(1);
}

// ── FILL IN YOUR ROLE IDs HERE ──────────────────────────────────────────────
// key = Discord role ID (18-digit snowflake)
// value = the slug used in generated JSON (must match manual/*.json ids)

const ACHIEVEMENT_ROLE_MAP = {
  "1122488685628235819": "badge-second-anniversary",
  "1191028861538943106": "badge-new-year-2024",
  "967096012235743312": "badge-hope-flower",
  "1110484409116803142": "badge-early-intro",
  "989524692509544548": "badge-survey",
};

const COLOR_ROLE_MAP = {
  "1139812557088096261": "role-mist-rose",
  "1139813267318001704": "role-silver",
  "1295396435470188574": "role-soft-yellow",
  "1109109798278008874": "role-orange",
  "1109109804863070239": "role-green",
  "1109109807115423854": "role-blue",
  "1109110952068132955": "role-gray",
};
// ────────────────────────────────────────────────────────────────────────────

const BASE = "https://discord.com/api/v10";
const HEADERS = { Authorization: `Bot ${TOKEN}` };

async function discordFetch(path) {
  const res = await fetch(`${BASE}${path}`, { headers: HEADERS });
  if (!res.ok) throw new Error(`Discord API ${res.status}: ${path}`);
  return res.json();
}

// Fetch all guild roles to get name + color
async function fetchRoles() {
  const roles = await discordFetch(`/guilds/${GUILD_ID}/roles`);
  return Object.fromEntries(roles.map((r) => [r.id, r]));
}

// Paginate all guild members, return list of { roles: string[] }
async function fetchAllMembers() {
  const members = [];
  let after = "0";
  while (true) {
    const page = await discordFetch(
      `/guilds/${GUILD_ID}/members?limit=1000&after=${after}`
    );
    if (!page.length) break;
    members.push(...page);
    after = page[page.length - 1].user.id;
    if (page.length < 1000) break;
  }
  return members;
}

function countRoles(members, roleIds) {
  const counts = Object.fromEntries(roleIds.map((id) => [id, 0]));
  for (const m of members) {
    for (const rid of m.roles) {
      if (rid in counts) counts[rid]++;
    }
  }
  return counts;
}

// Convert Discord color int to hex string
function intToHex(n) {
  return n === 0 ? "#000000" : `#${n.toString(16).padStart(6, "0").toUpperCase()}`;
}

function buildEntries(roleMap, counts, discordRoles) {
  return Object.entries(roleMap)
    .filter(([discordId]) => discordId in counts)
    .map(([discordId, slug]) => ({
      id: slug,
      name: discordRoles[discordId]?.name ?? slug,
      color: intToHex(discordRoles[discordId]?.color ?? 0),
      memberCount: counts[discordId],
    }))
    .sort((a, b) => b.memberCount - a.memberCount);
}

const __dir = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dir, "..", "src", "data", "generated");

(async () => {
  const achievementIds = Object.keys(ACHIEVEMENT_ROLE_MAP);
  const colorIds = Object.keys(COLOR_ROLE_MAP);
  const allTracked = [...achievementIds, ...colorIds];

  if (allTracked.length === 0) {
    console.error("ROLE_MAP is empty — fill in the role IDs in this script first.");
    process.exit(1);
  }

  console.log("Fetching guild roles…");
  const discordRoles = await fetchRoles();

  console.log("Fetching all guild members (may take a moment)…");
  const members = await fetchAllMembers();
  console.log(`  → ${members.length} members fetched`);

  const counts = countRoles(members, allTracked);

  const achievementEntries = buildEntries(ACHIEVEMENT_ROLE_MAP, counts, discordRoles);
  const colorEntries = buildEntries(COLOR_ROLE_MAP, counts, discordRoles);

  const now = new Date().toLocaleDateString("zh-TW", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).replace(/\//g, "/");

  writeFileSync(
    join(DATA_DIR, "achievement-roles.json"),
    JSON.stringify(achievementEntries, null, 2) + "\n"
  );
  writeFileSync(
    join(DATA_DIR, "color-roles.json"),
    JSON.stringify(colorEntries, null, 2) + "\n"
  );
  writeFileSync(
    join(DATA_DIR, "snapshot-meta.json"),
    JSON.stringify({ updatedAt: now }, null, 2) + "\n"
  );

  console.log(`✓ achievement-roles.json — ${achievementEntries.length} roles`);
  console.log(`✓ color-roles.json — ${colorEntries.length} roles`);
  console.log(`✓ snapshot-meta.json — updatedAt: ${now}`);
})();
