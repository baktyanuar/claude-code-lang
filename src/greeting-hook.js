#!/usr/bin/env node
/**
 * claude-code-lang · greeting hook
 * Runs at SessionStart — shows a beautiful banner in the user's language.
 * Installed at: ~/.claude/hooks/greeting.js
 */

import fs from "fs";
import path from "path";
import os from "os";

// ─── Read config ──────────────────────────────────────────────────────────────

const claudeMd = path.join(os.homedir(), ".claude", "CLAUDE.md");
let lang = "en", mode = "normal";
if (fs.existsSync(claudeMd)) {
  const t = fs.readFileSync(claudeMd, "utf8");
  lang = t.match(/claude-code-lang:(\w+)/)?.[1] ?? "en";
  mode = t.match(/claude-code-mode:(\w+)/)?.[1] ?? "normal";
}

// ─── Content per language ─────────────────────────────────────────────────────

const GREETINGS = {
  ru: { hello: "Привет!", ready: "Готов к работе", change: "npx claude-code-lang — сменить язык или режим" },
  uk: { hello: "Привіт!",  ready: "Готовий до роботи", change: "npx claude-code-lang — змінити мову або режим" },
  kz: { hello: "Сәлем!",   ready: "Жұмысқа дайынмын", change: "npx claude-code-lang — тіл немесе режимді өзгерту" },
  tr: { hello: "Merhaba!", ready: "Çalışmaya hazırım", change: "npx claude-code-lang — dil veya modu değiştir" },
  de: { hello: "Hallo!",   ready: "Bereit für die Arbeit", change: "npx claude-code-lang — Sprache oder Modus ändern" },
  fr: { hello: "Bonjour!", ready: "Prêt à travailler", change: "npx claude-code-lang — changer la langue ou le mode" },
  es: { hello: "¡Hola!",   ready: "Listo para trabajar", change: "npx claude-code-lang — cambiar idioma o modo" },
  zh: { hello: "你好！",    ready: "准备好工作了", change: "npx claude-code-lang — 更改语言或模式" },
  en: { hello: "Hello!",   ready: "Ready to work", change: "npx claude-code-lang — change language or mode" },
};

const FLAGS = { ru:"🇷🇺", uk:"🇺🇦", kz:"🇰🇿", tr:"🇹🇷", de:"🇩🇪", fr:"🇫🇷", es:"🇪🇸", zh:"🇨🇳", en:"🇬🇧" };

const MODES = {
  beginner: { ru:"🟢 Новичок",    uk:"🟢 Початківець", kz:"🟢 Жаңадан бастаушы", tr:"🟢 Acemi",
              de:"🟢 Anfänger",   fr:"🟢 Débutant",    es:"🟢 Principiante",      zh:"🟢 新手",   en:"🟢 Beginner" },
  normal:   { ru:"🟡 Нормальный", uk:"🟡 Звичайний",   kz:"🟡 Қалыпты",          tr:"🟡 Normal",
              de:"🟡 Normal",     fr:"🟡 Normal",      es:"🟡 Normal",            zh:"🟡 普通",    en:"🟡 Normal" },
  expert:   { ru:"🔴 Эксперт",    uk:"🔴 Експерт",     kz:"🔴 Сарапшы",          tr:"🔴 Uzman",
              de:"🔴 Experte",    fr:"🔴 Expert",      es:"🔴 Experto",           zh:"🔴 专家",    en:"🔴 Expert" },
};

const g    = GREETINGS[lang] ?? GREETINGS.en;
const flag = FLAGS[lang] ?? "🌐";
const modeLabel = MODES[mode]?.[lang] ?? MODES.normal.en;

// ─── ANSI colors (no deps) ────────────────────────────────────────────────────

const c = {
  reset:  "\x1b[0m",
  bold:   "\x1b[1m",
  dim:    "\x1b[2m",
  cyan:   "\x1b[36m",
  green:  "\x1b[32m",
  yellow: "\x1b[33m",
  blue:   "\x1b[34m",
  white:  "\x1b[97m",
};
const b  = s => c.bold + s + c.reset;
const cy = s => c.cyan + s + c.reset;
const gr = s => c.green + s + c.reset;
const yw = s => c.yellow + s + c.reset;
const dm = s => c.dim + s + c.reset;

// ─── Banner ───────────────────────────────────────────────────────────────────

const W = 52; // box width (inner)

function pad(text, width) {
  // strip ANSI for length calc
  const plain = text.replace(/\x1b\[[0-9;]*m/g, "");
  const spaces = Math.max(0, width - [...plain].length); // handle emoji width
  return text + " ".repeat(spaces);
}

function row(content, width = W) {
  return cy("│") + " " + pad(content, width - 2) + " " + cy("│");
}

function divider(char = "─") {
  return cy("├" + char.repeat(W) + "┤");
}

const banner = [
  "",
  cy("╭" + "─".repeat(W) + "╮"),
  row(""),
  row(b(c.cyan + "  ██████╗ ██████╗ █████████╗" + c.reset)),
  row(b(c.cyan + " ██╔════╝██╔════╝ ██║  ████║" + c.reset)),
  row(b(c.cyan + " ██║     ██║      ██║  ████║" + c.reset)),
  row(b(c.cyan + " ██║     ██║      ██║  ████║" + c.reset)),
  row(b(c.cyan + " ╚██████╗╚██████╗ █████████║" + c.reset)),
  row(b(c.cyan + "  ╚═════╝ ╚═════╝ ╚════════╝" + c.reset) + ""),
  row(dm("                  claude-code-lang")),
  row(""),
  divider(),
  row(""),
  row(`  ${flag}  ${b(g.hello)}   ${gr(g.ready)}`),
  row(`      ${dm("Mode:")}  ${modeLabel}`),
  row(""),
  divider("─"),
  row(""),
  row(`  ${dm(g.change)}`),
  row(""),
  cy("╰" + "─".repeat(W) + "╯"),
  "",
].join("\n");

process.stdout.write(banner + "\n");
process.exit(0);
