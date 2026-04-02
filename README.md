# claude-code-lang 🐣

**One command — Claude Code speaks your language.**

```bash
npx claude-code-lang
```

---

## The problem

Claude Code writes everything in English. Uses words like *hash*, *commit*, *staging*. Runs terminal commands without explaining what they do.

If you're not a developer — it's confusing.

## What this does

```
     \_/
  >('.')< 
   (   )
   -"-"-

  claude-code-lang  v2.0
  Language · Modes · Safety · Commands

Step 1 — Choose your language:

   1   🇬🇧  English
   2   🇰🇿  Қазақша
   3   🇫🇷  Français
   4   🇪🇸  Español
   5   🇷🇺  Русский
   6   🇺🇦  Українська
   7   🇹🇷  Türkçe
   8   🇩🇪  Deutsch
   9   🇨🇳  中文

Step 2 — Choose a mode:

  1.  🟢  Beginner   — explain everything, ask often
  2.  🟡  Normal     — balance between speed and explanation  
  3.  🔴  Expert     — just do it, minimal explanations

Step 3 — Safety hooks:

  Blocks dangerous commands before Claude runs them:
  rm -rf /   DROP TABLE   git push --force ...

Step 4 — Slash commands:

  /explain  /check  /plan  /whatis
```

After setup, Claude Code will:

- ✅ Always respond in **your language**
- ✅ Explain every bash command before running it
- ✅ Warn before deleting files
- ✅ Block dangerous commands automatically
- ✅ Give you useful slash commands

---

## Install

```bash
npx claude-code-lang
```

No installation needed. Pick your language, done.

Or install globally:

```bash
npm install -g claude-code-lang
claude-code-lang
```

> Requires [Claude Code](https://claude.ai/code) and Node.js 18+

---

## How it works

Creates `~/.claude/CLAUDE.md` — a file Claude Code reads on every startup.  
Installs hooks into `~/.claude/settings.json` that intercept dangerous commands.  
Adds slash commands to `~/.claude/commands/`.

No background processes. No APIs. No subscriptions. Just config files.

---

## Switch language or mode

```bash
npx claude-code-lang
```

Run again anytime.

---

## Uninstall

```bash
rm ~/.claude/CLAUDE.md
```

---

## Add a language

1. Fork the repo
2. Add your language to `LANGUAGES` in `src/languages.js`
3. Add templates to `src/languages.js` and commands to `src/commands.js`
4. Open a Pull Request

**Languages wanted:** Arabic 🇸🇦 · Japanese 🇯🇵 · Korean 🇰🇷 · Hindi 🇮🇳 · Portuguese 🇧🇷 · Polish 🇵🇱

---

## License

MIT
