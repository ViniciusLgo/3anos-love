// =====================================
// Game.js - Mini Engine dos Jogos do Amor 💘
// =====================================

console.log("Game.js (engine) carregado 💘");

// -------------------------------------------------
// 1. DEFAULTS (caso não exista nada no localStorage)
// -------------------------------------------------

const defaultQuizData = [
  {
    id: 1,
    texto: "Em que ano a gente começou tudo oficial?",
    alternativas: ["2019", "2020", "2021", "2022"],
    correta: 2, // índice da alternativa correta
  },
];

const defaultMemoryData = [
  "images-game/img-1.png",
  "images-game/img-2.png",
  "images-game/img-3.png",
  "images-game/img-4.png",
];

const defaultConfigData = {
  heartHunt: { tempo: 30, spawnVelocidade: 800 }, // tempo em segundos, spawn em ms
  quiz: { qtdPerguntas: 4 },                      // quantas perguntas sortear
  memory: { linhas: 4, colunas: 4 },              // grid do jogo da memória
};

const defaultMessagesData = {
  quizWin: "Você é oficialmente perita em nós dois! 💚",
  quizLose: "Quase! Mas eu ainda te amo muito. 💛",
  memoryWin: "Você arrasou! Memória perfeita! 🔥",
  memoryLose: "Quase! Tenta mais uma vez? 💕",
  heartHuntWin: "Você capturou muitos corações. Inclusive o meu 💘",
};

// -------------------------------------------------
// 2. HELPER DE STORAGE (pega do localStorage ou default)
// -------------------------------------------------

const StorageHelper = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      // se vier algo estranho, mantém fallback
      return parsed || fallback;
    } catch (e) {
      console.warn("Erro ao ler localStorage em", key, e);
      return fallback;
    }
  },
};

// -------------------------------------------------
// 3. MÓDULO PRINCIPAL: GAME ENGINE
// -------------------------------------------------

const GameEngine = {
  quizData: [],
  memoryData: [],
  config: {},
  messages: {},
  games: {},

  // Chamado no final do arquivo
  init() {
    this.loadData();
    this.initAnimations();
    this.initRouter();
    this.initGames();
  },

  // Carrega dados (vêm do admin.js via localStorage ou dos defaults)
  loadData() {
    this.quizData = StorageHelper.get("quizData", defaultQuizData);
    this.memoryData = StorageHelper.get("memoryData", defaultMemoryData);
    this.config = StorageHelper.get("configData", defaultConfigData);
    this.messages = StorageHelper.get("messagesData", defaultMessagesData);

    // Garantia de fallback caso algo venha incompleto
    this.config.heartHunt = this.config.heartHunt || defaultConfigData.heartHunt;
    this.config.quiz = this.config.quiz || defaultConfigData.quiz;
    this.config.memory = this.config.memory || defaultConfigData.memory;
  },

  // Efeito básico de fade-up nos elementos com .fade-up
  initAnimations() {
    document.querySelectorAll(".fade-up").forEach((el, i) => {
      setTimeout(() => el.classList.add("show"), 150 + i * 120);
    });
  },

  // Controle de "tabs" dos jogos (botões de escolha lá em cima)
  initRouter() {
    const buttons = document.querySelectorAll("[data-game-select]");
    const sections = document.querySelectorAll("[data-game-section]");

    if (!buttons.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const selected = btn.getAttribute("data-game-select");

        // esconde todas as sections
        sections.forEach((sec) => sec.classList.add("hidden"));

        // mostra a escolhida, se existir
        const active = document.getElementById(`game-${selected}`);
        if (active) active.classList.remove("hidden");
      });
    });
  },

  // Cria instâncias dos jogos e inicializa
  initGames() {
    this.games.heart = HeartHuntGame.create(this);
    this.games.quiz = QuizGame.create(this);
    this.games.memory = MemoryGame.create(this);

    // Se quiser já começar com quiz/memória prontos:
    this.games.quiz.start();       // Quiz já carregado
    this.games.memory.start();     // Memória já embaralhada
    // Caça corações só começa no clique do botão "Começar"
  },

  // Se no futuro quiser parar tudo ao trocar de jogo, chamar isso
  stopAllGames() {
    Object.values(this.games).forEach((g) => g.stop && g.stop());
  },
};

// -------------------------------------------------
// 4. JOGO 1 – CAÇA CORAÇÕES (HEART HUNT)
// -------------------------------------------------

const HeartHuntGame = {
  create(engine) {
    const state = {
      engine,
      score: 0,
      timeLeft: engine.config.heartHunt.tempo,
      spawnInterval: null,
      timerInterval: null,
      heartsArea: document.getElementById("hearts-area"),
      scoreEl: document.getElementById("heart-score"),
      timerEl: document.getElementById("heart-timer"),
      resultEl: document.getElementById("heart-result"),
      startBtn: document.getElementById("start-heart-game"),
    };

    // Se não tiver elementos no DOM, não faz nada
    if (!state.heartsArea || !state.startBtn) {
      return {
        start() {},
        stop() {},
      };
    }

    // Clique no botão "Começar"
    state.startBtn.addEventListener("click", () => {
      HeartHuntGame.start(state);
    });

    return {
      start() {
        HeartHuntGame.start(state);
      },
      stop() {
        HeartHuntGame.stop(state);
      },
    };
  },

  start(state) {
    const cfg = state.engine.config.heartHunt || defaultConfigData.heartHunt;

    // Reset básico
    state.score = 0;
    state.timeLeft = cfg.tempo;
    state.scoreEl.textContent = `Pontos: ${state.score}`;
    state.timerEl.textContent = `Tempo: ${state.timeLeft}s`;
    state.resultEl.textContent = "";
    state.heartsArea.innerHTML = "";

    // Limpa timers antigos
    HeartHuntGame.stop(state, { clearText: false });

    // Timer de contagem regressiva
    state.timerInterval = setInterval(() => {
      state.timeLeft--;
      state.timerEl.textContent = `Tempo: ${state.timeLeft}s`;
      if (state.timeLeft <= 0) {
        HeartHuntGame.finish(state);
      }
    }, 1000);

    // Interval de spawn de corações
    state.spawnInterval = setInterval(() => {
      HeartHuntGame.spawnHeart(state);
    }, cfg.spawnVelocidade);
  },

  spawnHeart(state) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = "💖";

    // posição aleatória dentro da área
    heart.style.left = Math.random() * 90 + "%";
    heart.style.top = Math.random() * 60 + "%";
    heart.style.fontSize = Math.random() * 20 + 20 + "px";

    heart.addEventListener("click", () => {
      state.score++;
      state.scoreEl.textContent = `Pontos: ${state.score}`;
      heart.remove();
    });

    state.heartsArea.appendChild(heart);

    // coração some sozinho depois de um tempinho
    setTimeout(() => heart.remove(), 1500);
  },

  finish(state) {
    HeartHuntGame.stop(state);
    const msg =
      state.engine.messages.heartHuntWin ||
      defaultMessagesData.heartHuntWin;
    state.resultEl.textContent = `${msg} — Pontos: ${state.score}`;
  },

  stop(state, options = { clearText: true }) {
    clearInterval(state.spawnInterval);
    clearInterval(state.timerInterval);
    state.spawnInterval = null;
    state.timerInterval = null;
    state.heartsArea.innerHTML = "";
    if (options.clearText && state.resultEl) {
      state.resultEl.textContent = "";
    }
  },
};

// -------------------------------------------------
// 5. JOGO 2 – QUIZ DOS 3 ANOS
// -------------------------------------------------

const QuizGame = {
  create(engine) {
    const state = {
      engine,
      index: 0,
      correct: 0,
      shuffled: [],
      areaEl: document.getElementById("quiz-area"),
      restartBtn: document.getElementById("restart-quiz"),
    };

    if (!state.areaEl || !state.restartBtn) {
      return {
        start() {},
        stop() {},
      };
    }

    // Botão "Recomeçar"
    state.restartBtn.addEventListener("click", () => {
      QuizGame.start(state);
    });

    return {
      start() {
        QuizGame.start(state);
      },
      stop() {
        // Aqui não tem timer, só podemos limpar tela se quiser
        if (state.areaEl) state.areaEl.innerHTML = "";
      },
    };
  },

  start(state) {
    state.index = 0;
    state.correct = 0;

    const allQuestions = [...state.engine.quizData];
    const cfgQtd =
      state.engine.config.quiz?.qtdPerguntas ||
      defaultConfigData.quiz.qtdPerguntas;

    // Embaralha e pega só a quantidade desejada
    state.shuffled = allQuestions
      .sort(() => Math.random() - 0.5)
      .slice(0, cfgQtd || allQuestions.length);

    QuizGame.renderQuestion(state);
  },

  renderQuestion(state) {
    if (!state.shuffled.length) {
      state.areaEl.innerHTML = `<p class="text-sm text-slate-300">Nenhuma pergunta cadastrada 😢</p>`;
      return;
    }

    if (state.index >= state.shuffled.length) {
      QuizGame.finish(state);
      return;
    }

    const q = state.shuffled[state.index];

    state.areaEl.innerHTML = `
      <p class="text-sm font-semibold mb-2">
        ${state.index + 1}. ${q.texto}
      </p>
      ${q.alternativas
        .map(
          (alt, i) => `
        <button
          class="w-full text-left px-3 py-2 bg-slate-800/80 rounded-lg hover:bg-slate-700/70"
          data-alt="${i}">
          ${alt}
        </button>
      `
        )
        .join("")}
      <p class="text-xs text-slate-400 mt-2">
        Pergunta ${state.index + 1}/${state.shuffled.length}
      </p>
    `;

    state.areaEl.querySelectorAll("[data-alt]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const pick = parseInt(btn.getAttribute("data-alt"), 10);
        if (pick === q.correta) {
          state.correct++;
        }
        state.index++;
        QuizGame.renderQuestion(state);
      });
    });
  },

  finish(state) {
    const allCorrect = state.correct === state.shuffled.length;
    const msg = allCorrect
      ? state.engine.messages.quizWin || defaultMessagesData.quizWin
      : state.engine.messages.quizLose || defaultMessagesData.quizLose;

    state.areaEl.innerHTML = `
      <div class="text-center py-6">
        <p class="text-sm mb-3">
          ${msg}
        </p>
        <p class="text-xs text-slate-400 mb-4">
          Você acertou ${state.correct} de ${state.shuffled.length} perguntas.
        </p>
        <button id="quiz-restart-btn"
          class="px-4 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white text-xs">
          Jogar de novo
        </button>
      </div>
    `;

    const btn = document.getElementById("quiz-restart-btn");
    if (btn) {
      btn.addEventListener("click", () => QuizGame.start(state));
    }
  },
};

// -------------------------------------------------
// 6. JOGO 3 – MEMÓRIA DO AMOR
// -------------------------------------------------

const MemoryGame = {
  create(engine) {
    const state = {
      engine,
      gridEl: document.getElementById("memory-grid"),
      statusEl: document.getElementById("memory-status"),
      restartBtn: document.getElementById("restart-memory"),
      flip1: null,
      flip2: null,
      locked: false,     // trava clique quando 2 cartas estão abertas
      matchedPairs: 0,
      totalPairs: 0,
    };

    if (!state.gridEl || !state.restartBtn) {
      return {
        start() {},
        stop() {},
      };
    }

    state.restartBtn.addEventListener("click", () => {
      MemoryGame.start(state);
    });

    return {
      start() {
        MemoryGame.start(state);
      },
      stop() {
        if (state.gridEl) state.gridEl.innerHTML = "";
        if (state.statusEl) state.statusEl.textContent = "";
      },
    };
  },

  start(state) {
    state.flip1 = null;
    state.flip2 = null;
    state.locked = false;
    state.matchedPairs = 0;
    if (state.statusEl) state.statusEl.textContent = "";

    const cfgMem = state.engine.config.memory || defaultConfigData.memory;
    const rows = cfgMem.linhas || 4;
    const cols = cfgMem.colunas || 4;

    // ajusta grid
    state.gridEl.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;

    // quantos pares cabem
    const totalSlots = rows * cols;
    const maxPairs = Math.floor(totalSlots / 2);

    // embaralha base de imagens e pega só o necessário
    let itemsBase = [...state.engine.memoryData];
    if (!itemsBase.length) {
      itemsBase = [...defaultMemoryData];
    }
    itemsBase = itemsBase.sort(() => Math.random() - 0.5).slice(0, maxPairs);

    state.totalPairs = itemsBase.length;

    // duplica para formar os pares e embaralha de novo
    let items = [...itemsBase, ...itemsBase].sort(
      () => Math.random() - 0.5
    );

    // se sobrar slot (quando slots ímpares), vira "carta vazia"
    if (items.length < totalSlots) {
      while (items.length < totalSlots) {
        items.push(null);
      }
    }

    state.gridEl.innerHTML = items
      .map((img, i) => {
        if (!img) {
          // slot vazio opcional
          return `
            <div class="memory-card bg-transparent border border-transparent rounded-xl p-2 opacity-0 pointer-events-none"
                 data-index="${i}">
            </div>
          `;
        }

        return `
          <div class="memory-card bg-slate-800/70 border border-slate-700/50 rounded-xl p-2"
               data-index="${i}" data-img="${img}">
            <img src="../${img}" class="w-full h-full opacity-0 pointer-events-none">
          </div>
        `;
      })
      .join("");

    state.gridEl.querySelectorAll(".memory-card").forEach((card) => {
      card.addEventListener("click", () => MemoryGame.flipCard(state, card));
    });
  },

  flipCard(state, card) {
    // cartas vazias ou bloqueado
    if (state.locked) return;
    if (!card.getAttribute("data-img")) return;

    if (card.classList.contains("matched")) return;
    if (card === state.flip1) return;

    const imgEl = card.querySelector("img");
    if (imgEl) imgEl.style.opacity = 1;
    card.classList.add("flipped");

    if (!state.flip1) {
      state.flip1 = card;
    } else {
      state.flip2 = card;
      MemoryGame.checkMatch(state);
    }
  },

  checkMatch(state) {
    if (!state.flip1 || !state.flip2) return;

    const img1 = state.flip1.getAttribute("data-img");
    const img2 = state.flip2.getAttribute("data-img");

    if (img1 === img2) {
      // acerto
      state.flip1.classList.add("matched");
      state.flip2.classList.add("matched");
      state.matchedPairs++;

      state.flip1 = null;
      state.flip2 = null;

      if (state.matchedPairs >= state.totalPairs) {
        MemoryGame.finish(state);
      }
    } else {
      // erro – vira de volta
      state.locked = true;
      setTimeout(() => {
        [state.flip1, state.flip2].forEach((card) => {
          if (!card) return;
          card.classList.remove("flipped");
          const imgEl = card.querySelector("img");
          if (imgEl) imgEl.style.opacity = 0;
        });
        state.flip1 = null;
        state.flip2 = null;
        state.locked = false;
      }, 600);
    }
  },

  finish(state) {
    const msg =
      state.engine.messages.memoryWin || defaultMessagesData.memoryWin;
    if (state.statusEl) {
      state.statusEl.textContent = msg;
    }
  },
};

// -------------------------------------------------
// 7. INICIALIZAÇÃO GERAL
// -------------------------------------------------

// Como o script está no final do body, o DOM já existe aqui
GameEngine.init();
