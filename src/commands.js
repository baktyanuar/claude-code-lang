// Slash commands installed into ~/.claude/commands/
// User types /explain, /check, /plan inside Claude Code

export const COMMANDS = {
  ru: {
    "объясни.md": `# Объясни этот код

Объясни следующий код простыми словами на русском языке:
- Что он делает (общая цель)
- Как работает (по шагам, без жаргона)
- Есть ли что-то необычное или важное

Код для объяснения: $ARGUMENTS
`,
    "проверь.md": `# Проверь код на ошибки

Проверь следующий код и найди:
- Ошибки которые сломают программу
- Потенциальные проблемы с безопасностью
- Места где код может работать неправильно

Отвечай на русском языке. Для каждой проблемы объясни простыми словами что не так и как исправить.

Код для проверки: $ARGUMENTS
`,
    "план.md": `# Составь план

Прежде чем начинать что-то делать — составь план на русском языке:
- Разбей задачу на конкретные шаги
- Для каждого шага скажи что именно будет изменено
- Предупреди о возможных рисках

Задача: $ARGUMENTS
`,
    "зачем.md": `# Зачем нужен этот файл или папка?

Посмотри на указанный файл или папку и объясни на русском языке:
- Зачем он нужен в проекте
- Можно ли его удалить или трогать
- С чем он связан

Файл или папка: $ARGUMENTS
`,
  },

  uk: {
    "поясни.md":   `# Поясни цей код\nПоясни наступний код простими словами українською:\n- Що він робить\n- Як працює\n- Що важливо знати\n\nКод: $ARGUMENTS\n`,
    "перевір.md":  `# Перевір код на помилки\nЗнайди помилки, проблеми з безпекою та неправильну логіку. Відповідай українською.\n\nКод: $ARGUMENTS\n`,
    "план.md":     `# Склади план\nСклади покроковий план українською перед початком роботи.\n\nЗавдання: $ARGUMENTS\n`,
  },

  kz: {
    "түсіндір.md": `# Кодты түсіндір\nКелесі кодты қарапайым тілде қазақша түсіндір:\n- Не істейді\n- Қалай жұмыс істейді\n\nКод: $ARGUMENTS\n`,
    "тексер.md":   `# Кодты тексер\nҚателерді, қауіпсіздік мәселелерін тап. Қазақша жауап бер.\n\nКод: $ARGUMENTS\n`,
    "жоспар.md":   `# Жоспар жаса\nЖұмысты бастамас бұрын қазақша қадамдық жоспар жаса.\n\nТапсырма: $ARGUMENTS\n`,
  },

  tr: {
    "açıkla.md":  `# Bu kodu açıkla\nAşağıdaki kodu Türkçe olarak basit kelimelerle açıkla:\n- Ne yapıyor\n- Nasıl çalışıyor\n\nKod: $ARGUMENTS\n`,
    "kontrol.md": `# Kodu hatalara karşı kontrol et\nHataları, güvenlik sorunlarını bul. Türkçe yanıt ver.\n\nKod: $ARGUMENTS\n`,
    "plan.md":    `# Plan yap\nİşe başlamadan önce Türkçe adım adım plan yap.\n\nGörev: $ARGUMENTS\n`,
  },

  de: {
    "erklaere.md": `# Erkläre diesen Code\nErkläre den folgenden Code auf Deutsch in einfachen Worten:\n- Was er macht\n- Wie er funktioniert\n\nCode: $ARGUMENTS\n`,
    "pruefen.md":  `# Code auf Fehler prüfen\nFinde Fehler und Sicherheitsprobleme. Antworte auf Deutsch.\n\nCode: $ARGUMENTS\n`,
    "plan.md":     `# Plan erstellen\nErstelle einen Schritt-für-Schritt-Plan auf Deutsch bevor du anfängst.\n\nAufgabe: $ARGUMENTS\n`,
  },

  fr: {
    "expliquer.md": `# Explique ce code\nExplique le code suivant en français avec des mots simples:\n- Ce qu'il fait\n- Comment il fonctionne\n\nCode: $ARGUMENTS\n`,
    "verifier.md":  `# Vérifier le code\nTrouve les erreurs et problèmes de sécurité. Réponds en français.\n\nCode: $ARGUMENTS\n`,
    "plan.md":      `# Faire un plan\nFais un plan étape par étape en français avant de commencer.\n\nTâche: $ARGUMENTS\n`,
  },

  es: {
    "explicar.md": `# Explica este código\nExplica el siguiente código en español con palabras simples:\n- Qué hace\n- Cómo funciona\n\nCódigo: $ARGUMENTS\n`,
    "revisar.md":  `# Revisar código\nEncuentra errores y problemas de seguridad. Responde en español.\n\nCódigo: $ARGUMENTS\n`,
    "plan.md":     `# Hacer un plan\nHaz un plan paso a paso en español antes de empezar.\n\nTarea: $ARGUMENTS\n`,
  },

  zh: {
    "解释.md":  `# 解释这段代码\n用简单的中文解释以下代码：\n- 它做什么\n- 它如何工作\n\n代码：$ARGUMENTS\n`,
    "检查.md":  `# 检查代码错误\n找出错误和安全问题。用中文回答。\n\n代码：$ARGUMENTS\n`,
    "计划.md":  `# 制定计划\n在开始工作前用中文制定详细计划。\n\n任务：$ARGUMENTS\n`,
  },

  en: {
    "explain.md": `# Explain this code\nExplain the following code in plain English:\n- What it does\n- How it works\n- Anything important to know\n\nCode: $ARGUMENTS\n`,
    "check.md":   `# Check code for issues\nFind bugs, security problems, and logic errors. Be specific about what's wrong and how to fix it.\n\nCode: $ARGUMENTS\n`,
    "plan.md":    `# Make a plan\nBefore doing anything, create a step-by-step plan:\n- Break the task into concrete steps\n- List what will change\n- Warn about risks\n\nTask: $ARGUMENTS\n`,
    "whatis.md":  `# What is this file or folder?\nLook at the specified file/folder and explain:\n- What it's for\n- Whether it's safe to delete or modify\n- What depends on it\n\nFile/folder: $ARGUMENTS\n`,
  },
};
