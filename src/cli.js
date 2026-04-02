#!/usr/bin/env node

import pc from "picocolors";
import fs from "fs";
import path from "path";
import os from "os";
import readline from "readline";
import { fileURLToPath } from "url";
import { LANGUAGES, MODES, getTemplate } from "./languages.js";
import { COMMANDS } from "./commands.js";

async function spin(label, fn) {
  const frames = ["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"];
  let i = 0;
  const timer = setInterval(() => {
    process.stdout.write(`\r  ${pc.cyan(frames[i++ % frames.length])}  ${label}...`);
  }, 80);
  await new Promise(r => setTimeout(r, 200));
  try { fn(); } finally {
    clearInterval(timer);
    process.stdout.write(`\r  ${pc.green("✓")}  ${label}          \n`);
  }
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CLAUDE_DIR = path.join(os.homedir(), ".claude");

// ─── Utils ────────────────────────────────────────────────────────────────────

function ask(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (a) => { rl.close(); resolve(a.trim()); });
  });
}

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
}

function detectCurrent() {
  const f = path.join(CLAUDE_DIR, "CLAUDE.md");
  if (!fs.existsSync(f)) return {};
  const t = fs.readFileSync(f, "utf8");
  const lang = t.match(/claude-code-lang:(\w+)/)?.[1];
  const mode = t.match(/claude-code-mode:(\w+)/)?.[1];
  return { lang, mode };
}

function pickNumber(max, prompt) {
  return ask(prompt).then((raw) => {
    const n = parseInt(raw, 10) - 1;
    return (isNaN(n) || n < 0 || n >= max) ? null : n;
  });
}

// ─── Chick ────────────────────────────────────────────────────────────────────
//
//   >('v')<     wings up = happy
//    ( : )
//   ^ ^ ^ ^
//

async function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

// Animate in-place using readline to clear + rewrite lines
async function animateInPlace(frames, color, times = 3, delay = 250) {
  const height = frames[0].length;

  // print first frame
  for (const line of frames[0]) {
    process.stdout.write("  " + color(line) + "\n");
  }

  for (let t = 0; t < times; t++) {
    for (const frame of frames) {
      // move cursor up `height` lines
      process.stdout.write(`\x1B[${height}A`);
      for (const line of frame) {
        // clear line then write
        process.stdout.write(`\x1B[2K  ${color(line)}\n`);
      }
      await wait(delay);
    }
  }
}

const Y = (s) => pc.yellow(pc.bold(s));

async function header() {
  console.log("");

  // Static chick — no animation, clean look
  const chick = [
    Y("   \\_/  "),
    Y("  >('.')< "),
    Y("   (   )  "),
    Y("   -\"-\"- "),
  ];

  chick.forEach(l => console.log("  " + l));
  console.log("");
  console.log("  " + pc.cyan(pc.bold("claude-code-lang  v2.0")));
  console.log("  " + pc.dim("Language · Modes · Safety · Commands"));
  console.log("");
}

async function danceChick() {
  const frames = [
    // wings up
    [
      Y("  \\('.')/ "),
      Y("   (   )  "),
      Y("   -\"-\"- "),
    ],
    // wings down
    [
      Y("   ('.')  "),
      Y("  >(   )< "),
      Y("   -\"-\"- "),
    ],
  ];

  console.log("");
  await animateInPlace(frames, s => s, 4, 220);
  // final happy frame
  process.stdout.write(`\x1B[${frames[0].length}A`);
  const happy = [
    Y("  \\(^.^)/ "),
    Y("   (   )  "),
    Y("   -\"-\"- "),
  ];
  for (const line of happy) {
    process.stdout.write(`\x1B[2K  ${line}\n`);
  }
  console.log("");
}

async function stepLanguage(current) {
  if (current.lang) {
    const l = LANGUAGES.find(x => x.code === current.lang);
    if (l) console.log(pc.yellow(`Currently: ${l.flag}  ${l.name}\n`));
  }
  console.log(pc.bold("Step 1 — Choose your language:"));
  console.log("");
  LANGUAGES.forEach((l, i) => {
    console.log(`  ${pc.yellow(pc.bold(String(i+1).padStart(2)))}   ${l.flag}  ${pc.white(l.name.padEnd(14))} ${pc.dim("("+l.english+")")}`);
  });
  console.log("");
  const idx = await pickNumber(LANGUAGES.length, pc.bold("Number: "));
  if (idx === null) { console.log(pc.red("Invalid. Try again.")); process.exit(1); }
  return LANGUAGES[idx];
}

async function stepMode(lang, current) {
  console.log("");
  console.log(pc.bold("Step 2 — Choose a mode:"));
  console.log("");
  MODES.forEach((m, i) => {
    const label = m.labels[lang.code] ?? m.labels.en;
    const desc  = m.desc[lang.code]   ?? m.desc.en;
    console.log(`  ${pc.yellow(pc.bold(i+1+"."))}  ${m.emoji}  ${pc.white(label.padEnd(16))} ${pc.dim(desc)}`);
  });
  console.log("");
  const idx = await pickNumber(MODES.length, pc.bold("Number: "));
  if (idx === null) { console.log(pc.red("Invalid. Try again.")); process.exit(1); }
  return MODES[idx];
}

async function stepHooks() {
  console.log("");
  console.log(pc.bold("Step 3 — Safety hooks:"));
  console.log("");
  console.log(`  Hooks intercept ${pc.red("dangerous commands")} before Claude runs them:`);
  console.log(`  ${pc.red("rm -rf /")}  ${pc.red("DROP TABLE")}  ${pc.red("git push --force")}  ${pc.red("fork bombs")}  ...`);
  console.log(`  Claude Code will ${pc.bold("block")} them and show a warning in your language.`);
  console.log("");
  const ans = await ask(pc.bold("Install safety hooks? [Y/n]: "));
  return ans.toLowerCase() !== "n";
}

async function stepCommands(lang) {
  console.log("");
  console.log(pc.bold("Step 4 — Slash commands:"));
  console.log("");
  const cmds = COMMANDS[lang.code] ?? COMMANDS.en;
  const names = Object.keys(cmds).map(f => "/" + f.replace(".md",""));
  console.log("  You'll get these commands inside Claude Code:");
  names.forEach(n => console.log(`  ${pc.green("•")} ${pc.cyan(n)}`));
  console.log("");
  const ans = await ask(pc.bold("Install slash commands? [Y/n]: "));
  return ans.toLowerCase() !== "n";
}

// ─── Install ──────────────────────────────────────────────────────────────────

function installClaudeMd(lang, mode) {
  const target = path.join(CLAUDE_DIR, "CLAUDE.md");

  // backup if not ours
  if (fs.existsSync(target)) {
    const existing = fs.readFileSync(target, "utf8");
    if (!existing.includes("claude-code-lang:")) {
      write(target + ".backup", existing);
      console.log(pc.dim(`  ↳ existing CLAUDE.md backed up to CLAUDE.md.backup`));
    }
  }

  const marker = `<!-- claude-code-lang:${lang.code} claude-code-mode:${mode.code} -->\n`;
  write(target, marker + getTemplate(lang.code, mode.code));
}

function installHook(lang) {
  const hookPath = path.join(CLAUDE_DIR, "hooks", "danger-check.js");
  const hookSrc  = path.join(__dirname, "danger-hook.js");
  write(hookPath, fs.readFileSync(hookSrc, "utf8"));

  // Merge into settings.json
  const settingsPath = path.join(CLAUDE_DIR, "settings.json");
  let settings = {};
  if (fs.existsSync(settingsPath)) {
    try { settings = JSON.parse(fs.readFileSync(settingsPath, "utf8")); } catch {}
  }

  // Safe auto-allow list
  settings.permissions ??= {};
  settings.permissions.allow ??= [];
  const safeAllow = [
    "Bash(git status)", "Bash(git log *)", "Bash(git diff *)",
    "Bash(ls *)", "Bash(ls)", "Bash(pwd)", "Bash(cat *)",
    "Bash(echo *)", "Bash(node --version)", "Bash(npm --version)",
    "Bash(python --version)", "Bash(which *)",
  ];
  for (const rule of safeAllow) {
    if (!settings.permissions.allow.includes(rule)) {
      settings.permissions.allow.push(rule);
    }
  }

  // Hook entry
  settings.hooks ??= {};
  settings.hooks.PreToolUse ??= [];
  const existingIdx = settings.hooks.PreToolUse.findIndex(
    h => h._ccl === true
  );
  const hookEntry = {
    _ccl: true,
    matcher: "Bash",
    hooks: [{ type: "command", command: `node "${hookPath}"` }],
  };
  if (existingIdx >= 0) settings.hooks.PreToolUse[existingIdx] = hookEntry;
  else settings.hooks.PreToolUse.push(hookEntry);

  write(settingsPath, JSON.stringify(settings, null, 2));
}

function removeHook() {
  const settingsPath = path.join(CLAUDE_DIR, "settings.json");
  if (!fs.existsSync(settingsPath)) return;
  let settings;
  try { settings = JSON.parse(fs.readFileSync(settingsPath, "utf8")); } catch { return; }
  if (settings.hooks?.PreToolUse) {
    settings.hooks.PreToolUse = settings.hooks.PreToolUse.filter(h => !h._ccl);
  }
  write(settingsPath, JSON.stringify(settings, null, 2));
}

function installGreeting(lang) {
  const hookPath = path.join(CLAUDE_DIR, "hooks", "greeting.js");
  const hookSrc  = path.join(__dirname, "greeting-hook.js");
  write(hookPath, fs.readFileSync(hookSrc, "utf8"));

  const settingsPath = path.join(CLAUDE_DIR, "settings.json");
  let settings = {};
  if (fs.existsSync(settingsPath)) {
    try { settings = JSON.parse(fs.readFileSync(settingsPath, "utf8")); } catch {}
  }
  settings.hooks ??= {};
  settings.hooks.SessionStart ??= [];
  const existing = settings.hooks.SessionStart.findIndex(h => h._ccl_greeting === true);
  const entry = {
    _ccl_greeting: true,
    hooks: [{ type: "command", command: `node "${hookPath}"` }],
  };
  if (existing >= 0) settings.hooks.SessionStart[existing] = entry;
  else settings.hooks.SessionStart.push(entry);
  write(settingsPath, JSON.stringify(settings, null, 2));
}

function installCommands(lang) {
  const cmds = COMMANDS[lang.code] ?? COMMANDS.en;
  const dir  = path.join(CLAUDE_DIR, "commands");
  for (const [file, content] of Object.entries(cmds)) {
    write(path.join(dir, file), content);
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  await header();

  const current = detectCurrent();
  const lang    = await stepLanguage(current);
  const mode    = await stepMode(lang, current);
  const hooks   = await stepHooks();
  const cmds    = await stepCommands(lang);

  console.log("");

  await spin("Setting up CLAUDE.md",               () => installClaudeMd(lang, mode));
  if (hooks) await spin("Installing safety hooks",  () => installHook(lang));
  else       { removeHook(); console.log(pc.dim("  –  Safety hooks skipped")); }
  if (cmds)  await spin("Installing slash commands",() => installCommands(lang));
  else       { console.log(pc.dim("  –  Slash commands skipped")); }

  // 🐣 Dance!
  await danceChick();

  const modeName = mode.labels[lang.code] ?? mode.labels.en;
  console.log(pc.green(pc.bold(`  ✅  Done!  ${lang.flag}  ${lang.name}  ·  ${mode.emoji} ${modeName}`)));
  console.log("");

  if (cmds) {
    const cmdNames = Object.keys(COMMANDS[lang.code] ?? COMMANDS.en)
      .map(f => pc.cyan("/"+f.replace(".md","")))
      .join("  ");
    console.log(pc.bold("  Commands:") + "  " + cmdNames);
  }
  if (hooks) {
    console.log(pc.bold("  Blocked:") + pc.red("  rm -rf /  DROP TABLE  git push --force  ..."));
  }
  console.log("");
  console.log(pc.dim("  Run again to change language or mode."));
  console.log("");
}

main().catch(e => { console.error(pc.red(e.message)); process.exit(1); });
