export const LANGUAGES = [
  { code: "en", flag: "🇬🇧", name: "English",    english: "English"    },
  { code: "kz", flag: "🇰🇿", name: "Қазақша",    english: "Kazakh"     },
  { code: "fr", flag: "🇫🇷", name: "Français",   english: "French"     },
  { code: "es", flag: "🇪🇸", name: "Español",    english: "Spanish"    },
  { code: "ru", flag: "🇷🇺", name: "Русский",     english: "Russian"    },
  { code: "uk", flag: "🇺🇦", name: "Українська", english: "Ukrainian"  },
  { code: "tr", flag: "🇹🇷", name: "Türkçe",     english: "Turkish"    },
  { code: "de", flag: "🇩🇪", name: "Deutsch",    english: "German"     },
  { code: "zh", flag: "🇨🇳", name: "中文",        english: "Chinese"    },
];

export const MODES = [
  {
    code: "beginner",
    emoji: "🟢",
    labels: {
      ru: "Новичок",    uk: "Початківець", kz: "Жаңадан бастаушы",
      tr: "Acemi",      de: "Anfänger",    fr: "Débutant",
      es: "Principiante", zh: "新手",       en: "Beginner",
    },
    desc: {
      ru: "Объясняй всё подробно, спрашивай подтверждение часто",
      en: "Explain everything in detail, ask for confirmation often",
    },
  },
  {
    code: "normal",
    emoji: "🟡",
    labels: {
      ru: "Нормальный",  uk: "Звичайний",  kz: "Қалыпты",
      tr: "Normal",      de: "Normal",     fr: "Normal",
      es: "Normal",      zh: "普通",        en: "Normal",
    },
    desc: {
      ru: "Баланс между объяснениями и скоростью",
      en: "Balance between explanations and speed",
    },
  },
  {
    code: "expert",
    emoji: "🔴",
    labels: {
      ru: "Эксперт",  uk: "Експерт",  kz: "Сарапшы",
      tr: "Uzman",    de: "Experte",  fr: "Expert",
      es: "Experto",  zh: "专家",      en: "Expert",
    },
    desc: {
      ru: "Просто делай, минимум объяснений",
      en: "Just do it, minimal explanations",
    },
  },
];

// ─── CLAUDE.md content per language + mode ───────────────────────────────────

const BASE = {
  ru: {
    beginner: `# 🌐 Язык: Русский · Режим: 🟢 Новичок

Всегда отвечай **только на русском языке**.

## Режим «Новичок» — правила поведения

Ты помогаешь человеку который не обязан разбираться в программировании.

**Перед каждой bash-командой обязательно:**
- Объясни простыми словами что она делает
- Скажи зачем она нужна прямо сейчас
- Предупреди если есть хоть малейший риск
- Спроси "Продолжить?" перед выполнением

**Перед удалением чего угодно:**
- Перечисли конкретно что будет удалено
- Объясни зачем
- Спроси подтверждение ОБЯЗАТЕЛЬНО

**Стиль:**
- Говори как обычный человек, не как технарь
- Никаких аббревиатур без объяснения (git, npm, bash, hash — объясняй)
- Если я написал что-то непонятно — переспроси
- После каждого крупного шага скажи что сделано и что дальше
`,
    normal: `# 🌐 Язык: Русский · Режим: 🟡 Нормальный

Всегда отвечай **только на русском языке**.

## Режим «Нормальный» — правила поведения

**Перед bash-командой:**
- Одна строка: что делает и зачем
- Спроси подтверждение только если команда изменяет файлы или настройки

**Перед удалением:**
- Скажи что именно удаляется
- Спроси подтверждение

**Стиль:**
- Простой язык, без лишнего жаргона
- Технические термины объясняй при первом использовании
- Кратко, по делу
`,
    expert: `# 🌐 Язык: Русский · Режим: 🔴 Эксперт

Всегда отвечай **только на русском языке**.

## Режим «Эксперт» — правила поведения

- Минимум объяснений, максимум действий
- Не спрашивай подтверждение на стандартные операции
- Спрашивай только перед необратимыми действиями (удаление, reset --hard)
- Технические термины использовать можно
`,
  },

  uk: {
    beginner: `# 🌐 Мова: Українська · Режим: 🟢 Початківець\n\nЗавжди відповідай **тільки українською мовою**.\n\n**Перед кожною командою:** поясни що робить, навіщо, попроси підтвердження.\n**Перед видаленням:** перелічи що саме, обов'язково попроси підтвердження.\n**Стиль:** проста мова, без жаргону, пояснюй терміни.\n`,
    normal:   `# 🌐 Мова: Українська · Режим: 🟡 Звичайний\n\nЗавжди відповідай **тільки українською мовою**.\n\n**Перед командою:** одним реченням що робить.\n**Перед видаленням:** що видаляється, попроси підтвердження.\n**Стиль:** простий, без зайвого жаргону.\n`,
    expert:   `# 🌐 Мова: Українська · Режим: 🔴 Експерт\n\nЗавжди відповідай **тільки українською мовою**.\nМінімум пояснень. Підтвердження тільки перед незворотними діями.\n`,
  },

  kz: {
    beginner: `# 🌐 Тіл: Қазақша · Режим: 🟢 Жаңадан бастаушы\n\nМенімен **тек қазақ тілінде** сөйлес.\n\n**Команда алдында:** не істейтінін, неге керек екенін айт, растауды сұра.\n**Жоюдан бұрын:** нені жоятынын айт, міндетті түрде растауды сұра.\n**Стиль:** қарапайым тіл, терминдерді түсіндір.\n`,
    normal:   `# 🌐 Тіл: Қазақша · Режим: 🟡 Қалыпты\n\nМенімен **тек қазақ тілінде** сөйлес.\n\n**Команда алдында:** бір сөйлеммен не істейтінін айт.\n**Жоюдан бұрын:** нені жоятынын айт, растауды сұра.\n`,
    expert:   `# 🌐 Тіл: Қазақша · Режим: 🔴 Сарапшы\n\nМенімен **тек қазақ тілінде** сөйлес.\nТүсіндірмені азайт. Тек қайтарылмайтын әрекеттер алдында растауды сұра.\n`,
  },

  tr: {
    beginner: `# 🌐 Dil: Türkçe · Mod: 🟢 Acemi\n\nBenimle **yalnızca Türkçe** konuş.\n\n**Her komuttan önce:** ne yaptığını, neden gerektiğini açıkla, onay iste.\n**Silmeden önce:** neyin silineceğini söyle, onay ZORUNLU.\n**Stil:** sade dil, jargonsuz, terimleri açıkla.\n`,
    normal:   `# 🌐 Dil: Türkçe · Mod: 🟡 Normal\n\nBenimle **yalnızca Türkçe** konuş.\n\n**Komuttan önce:** tek cümleyle ne yaptığını söyle.\n**Silmeden önce:** neyin silineceğini belirt, onay iste.\n`,
    expert:   `# 🌐 Dil: Türkçe · Mod: 🔴 Uzman\n\nBenimle **yalnızca Türkçe** konuş.\nMinimum açıklama. Sadece geri alınamaz işlemler için onay iste.\n`,
  },

  de: {
    beginner: `# 🌐 Sprache: Deutsch · Modus: 🟢 Anfänger\n\nKommuniziere immer **nur auf Deutsch**.\n\n**Vor jedem Befehl:** erkläre was er tut, warum, bitte um Bestätigung.\n**Vor dem Löschen:** was genau gelöscht wird, Bestätigung PFLICHT.\n**Stil:** einfache Sprache, keine Abkürzungen ohne Erklärung.\n`,
    normal:   `# 🌐 Sprache: Deutsch · Modus: 🟡 Normal\n\nKommuniziere immer **nur auf Deutsch**.\n\n**Vor Befehlen:** ein Satz was er tut.\n**Vor dem Löschen:** was gelöscht wird, Bestätigung einholen.\n`,
    expert:   `# 🌐 Sprache: Deutsch · Modus: 🔴 Experte\n\nKommuniziere immer **nur auf Deutsch**.\nMinimale Erklärungen. Bestätigung nur bei unwiderruflichen Aktionen.\n`,
  },

  fr: {
    beginner: `# 🌐 Langue: Français · Mode: 🟢 Débutant\n\nCommunique toujours **uniquement en français**.\n\n**Avant chaque commande:** explique ce qu'elle fait, pourquoi, demande confirmation.\n**Avant de supprimer:** liste ce qui sera supprimé, confirmation OBLIGATOIRE.\n**Style:** langage simple, pas de jargon, explique les termes.\n`,
    normal:   `# 🌐 Langue: Français · Mode: 🟡 Normal\n\nCommunique toujours **uniquement en français**.\n\n**Avant une commande:** une phrase sur ce qu'elle fait.\n**Avant de supprimer:** ce qui sera supprimé, demande confirmation.\n`,
    expert:   `# 🌐 Langue: Français · Mode: 🔴 Expert\n\nCommunique toujours **uniquement en français**.\nExplications minimales. Confirmation uniquement pour les actions irréversibles.\n`,
  },

  es: {
    beginner: `# 🌐 Idioma: Español · Modo: 🟢 Principiante\n\nComunícate siempre **solo en español**.\n\n**Antes de cada comando:** explica qué hace, por qué, pide confirmación.\n**Antes de eliminar:** lista qué se eliminará, confirmación OBLIGATORIA.\n**Estilo:** lenguaje simple, sin jerga, explica los términos.\n`,
    normal:   `# 🌐 Idioma: Español · Modo: 🟡 Normal\n\nComunícate siempre **solo en español**.\n\n**Antes de un comando:** una frase sobre qué hace.\n**Antes de eliminar:** qué se eliminará, pide confirmación.\n`,
    expert:   `# 🌐 Idioma: Español · Modo: 🔴 Experto\n\nComunícate siempre **solo en español**.\nExplicaciones mínimas. Confirmación solo para acciones irreversibles.\n`,
  },

  zh: {
    beginner: `# 🌐 语言：中文 · 模式：🟢 新手\n\n始终**只用中文**与我交流。\n\n**每条命令前：** 解释它做什么、为什么需要，请求确认。\n**删除前：** 列出将被删除的内容，确认必须。\n**风格：** 简单语言，解释术语。\n`,
    normal:   `# 🌐 语言：中文 · 模式：🟡 普通\n\n始终**只用中文**与我交流。\n\n**命令前：** 一句话说明做什么。\n**删除前：** 说明删除内容，请求确认。\n`,
    expert:   `# 🌐 语言：中文 · 模式：🔴 专家\n\n始终**只用中文**与我交流。\n最少解释。只在不可逆操作前请求确认。\n`,
  },

  en: {
    beginner: `# 🌐 Language: English · Mode: 🟢 Beginner\n\nAlways respond **in English only**.\n\n**Before every command:** explain what it does, why, ask for confirmation.\n**Before deleting:** list what will be deleted, confirmation REQUIRED.\n**Style:** plain language, no jargon, explain all terms.\n`,
    normal:   `# 🌐 Language: English · Mode: 🟡 Normal\n\nAlways respond **in English only**.\n\n**Before a command:** one sentence on what it does.\n**Before deleting:** what will be deleted, ask confirmation.\n`,
    expert:   `# 🌐 Language: English · Mode: 🔴 Expert\n\nAlways respond **in English only**.\nMinimal explanations. Confirmation only for irreversible actions.\n`,
  },
};

export function getTemplate(langCode, modeCode) {
  return BASE[langCode]?.[modeCode] ?? BASE.en.normal;
}
