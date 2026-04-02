#!/usr/bin/env node
/**
 * claude-code-lang · danger hook
 * Runs before every bash command. Blocks dangerous ones with a warning
 * in the user's language.
 *
 * Installed at: ~/.claude/hooks/danger-check.js
 * Called by:    ~/.claude/settings.json → hooks.PreToolUse
 */

import fs from "fs";
import path from "path";
import os from "os";

// ─── Read what Claude Code is about to run ───────────────────────────────────

let input = "";
process.stdin.setEncoding("utf8");
for await (const chunk of process.stdin) input += chunk;

let payload;
try { payload = JSON.parse(input); } catch { process.exit(0); }

const command = payload?.tool_input?.command ?? "";

// ─── Dangerous patterns ──────────────────────────────────────────────────────

const DANGER = [
  // Filesystem nukes
  { re: /rm\s+-rf?\s+\/(?!\w)/,           level: "🔴 КРИТИЧНО" },
  { re: /rm\s+-rf?\s+~\//,               level: "🔴 КРИТИЧНО" },
  { re: /rm\s+-rf?\s+\*/,                level: "🔴 КРИТИЧНО" },
  { re: /rm\s+-rf?\s+\.\s*$/,            level: "🔴 КРИТИЧНО" },
  // Git destructive
  { re: /git\s+reset\s+--hard/,          level: "🟠 ОПАСНО"   },
  { re: /git\s+push\s+.*--force/,        level: "🟠 ОПАСНО"   },
  { re: /git\s+clean\s+-fd/,             level: "🟠 ОПАСНО"   },
  // DB destructive
  { re: /DROP\s+TABLE/i,                 level: "🔴 КРИТИЧНО" },
  { re: /DROP\s+DATABASE/i,              level: "🔴 КРИТИЧНО" },
  { re: /TRUNCATE\s+TABLE/i,             level: "🟠 ОПАСНО"   },
  { re: /DELETE\s+FROM\s+\w+\s*;?\s*$/i, level: "🟠 ОПАСНО"   },
  // System
  { re: /chmod\s+-R\s+777/,              level: "🟠 ОПАСНО"   },
  { re: /:\s*\(\s*\)\s*\{.*\|\s*:\s*&/,  level: "🔴 КРИТИЧНО" }, // fork bomb
  { re: /mkfs\./,                        level: "🔴 КРИТИЧНО" },
  { re: /dd\s+if=.*of=\/dev/,            level: "🔴 КРИТИЧНО" },
];

const match = DANGER.find(({ re }) => re.test(command));
if (!match) process.exit(0); // safe — let Claude Code proceed

// ─── Load user's language ────────────────────────────────────────────────────

const claudeMd = path.join(os.homedir(), ".claude", "CLAUDE.md");
let lang = "en";
if (fs.existsSync(claudeMd)) {
  const m = fs.readFileSync(claudeMd, "utf8").match(/claude-code-lang:(\w+)/);
  if (m) lang = m[1];
}

// ─── Warning messages ────────────────────────────────────────────────────────

const WARN = {
  ru: (cmd, lvl) => `
${lvl} — Опасная команда заблокирована

Команда: ${cmd}

Эта команда может необратимо удалить данные или сломать систему.
Claude Code не будет её выполнять автоматически.

Если ты уверен — запусти команду ВРУЧНУЮ в терминале.
`,
  uk: (cmd, lvl) => `
${lvl} — Небезпечну команду заблоковано

Команда: ${cmd}

Ця команда може незворотньо видалити дані або зламати систему.
Якщо ти впевнений — запусти команду ВРУЧНУ в терміналі.
`,
  kz: (cmd, lvl) => `
${lvl} — Қауіпті команда бұғатталды

Команда: ${cmd}

Бұл команда деректерді қайтарымсыз жоюы мүмкін.
Егер сенімді болсаң — командаты ҚОЛМЕН терминалда іске қос.
`,
  tr: (cmd, lvl) => `
${lvl} — Tehlikeli komut engellendi

Komut: ${cmd}

Bu komut verileri kalıcı olarak silebilir veya sistemi bozabilir.
Eminseniz komutu MANUEL olarak terminalde çalıştırın.
`,
  de: (cmd, lvl) => `
${lvl} — Gefährlicher Befehl blockiert

Befehl: ${cmd}

Dieser Befehl kann Daten unwiderruflich löschen oder das System beschädigen.
Wenn Sie sicher sind — führen Sie den Befehl MANUELL im Terminal aus.
`,
  fr: (cmd, lvl) => `
${lvl} — Commande dangereuse bloquée

Commande: ${cmd}

Cette commande peut supprimer des données de façon irréversible.
Si vous êtes sûr — exécutez la commande MANUELLEMENT dans le terminal.
`,
  es: (cmd, lvl) => `
${lvl} — Comando peligroso bloqueado

Comando: ${cmd}

Este comando puede eliminar datos de forma irreversible.
Si está seguro — ejecute el comando MANUALMENTE en el terminal.
`,
  zh: (cmd, lvl) => `
${lvl} — 危险命令已被拦截

命令: ${cmd}

此命令可能会不可逆地删除数据或损坏系统。
如果您确定 — 请在终端中手动运行该命令。
`,
  en: (cmd, lvl) => `
${lvl} — Dangerous command blocked

Command: ${cmd}

This command can irreversibly delete data or break the system.
If you're sure — run the command MANUALLY in your terminal.
`,
};

const warn = (WARN[lang] ?? WARN.en)(command, match.level);
process.stderr.write(warn);
process.exit(2); // exit 2 = block the command and show message to Claude
