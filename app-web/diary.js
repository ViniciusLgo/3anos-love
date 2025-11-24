// ===============================
// Nosso Diário Digital - diary.js
// ===============================
console.log("Diário Digital carregado 💌");

// Storage key
const STORAGE_KEY = "loveDiaryEntries";

// Estado em memória
let entries = [];
let editingId = null;

// -------------------------------
// 1. Defaults iniciais
// -------------------------------
const defaultEntries = [
  {
    id: 1,
    date: "2021-03-15",
    title: "O começo oficial",
    tag: "Início",
    mood: "apaixonada",
    highlight: "gold",
    text:
      "Foi aqui que tudo começou pra valer. Eu tava nervosa, feliz e com aquela sensação de 'é isso'. " +
      "Talvez a gente não tivesse ideia de tudo que viria depois, mas eu já sentia que era diferente.",
    createdAt: "2021-03-15T20:00:00",
  },
  {
    id: 2,
    date: "2022-07-09",
    title: "Dia comum, mas especial",
    tag: "Rotina",
    mood: "feliz",
    highlight: "",
    text:
      "Não teve viagem, nem festa, nem nada gigante. Mas teve a gente, rindo de coisa boba, comendo, " +
      "falando da vida. E eu gosto demais desses dias que parecem simples, mas ficam na memória.",
    createdAt: "2022-07-09T22:10:00",
  },
  {
    id: 3,
    date: "2023-11-12",
    title: "Saudade apertando",
    tag: "Saudade",
    mood: "com saudade",
    highlight: "calm",
    text:
      "Teve aquele dia que a saudade bateu forte. A gente não conseguiu se ver, mas ficou na chamada, " +
      "falando até tarde. Não é a mesma coisa, mas ainda assim me acalmou.",
    createdAt: "2023-11-12T23:40:00",
  },
];

// -------------------------------
// 2. Utils
// -------------------------------
function loadEntries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      entries = [...defaultEntries];
      saveEntries(); // já grava o default
      return;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      entries = [...defaultEntries];
      saveEntries();
      return;
    }
    entries = parsed;
  } catch (err) {
    console.warn("Erro ao carregar diário, usando defaults:", err);
    entries = [...defaultEntries];
  }
}

function saveEntries() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  updateStats();
}

function moodToLabel(mood) {
  switch (mood) {
    case "feliz":
      return "😊 Feliz";
    case "grata":
      return "🙏 Grata";
    case "apaixonada":
      return "💘 Apaixonada";
    case "com saudade":
      return "🥹 Com saudade";
    case "calma":
      return "🫧 Calma";
    case "ansiosa":
      return "😵 Ansiosa";
    default:
      return "✨ Sentindo muitas coisas";
  }
}

function highlightClasses(highlight) {
  if (highlight === "gold") {
    return "border-amber-300/70 bg-amber-400/5";
  }
  if (highlight === "calm") {
    return "border-sky-300/60 bg-sky-400/5";
  }
  if (highlight === "chaos") {
    return "border-pink-400/70 bg-pink-500/5";
  }
  return "border-slate-700/70 bg-slate-900/70";
}

function formatDate(dateStr) {
  if (!dateStr) return "Sem data";
  const [y, m, d] = dateStr.split("-");
  if (!y || !m || !d) return dateStr;
  return `${d}/${m}/${y}`;
}

// -------------------------------
// 3. Renderização
// -------------------------------
function renderEntries() {
  const listEl = document.getElementById("entries-list");
  const searchInput = document.getElementById("search-input");
  const filterMood = document.getElementById("filter-mood");

  if (!listEl) return;

  const term = (searchInput?.value || "").toLowerCase();
  const moodFilter = filterMood?.value || "";

  let filtered = [...entries];

  if (term) {
    filtered = filtered.filter((e) => {
      const blob =
        `${e.title} ${e.text} ${e.tag} ${e.mood}`.toLowerCase();
      return blob.includes(term);
    });
  }

  if (moodFilter) {
    filtered = filtered.filter((e) => e.mood === moodFilter);
  }

  // ordena: data + createdAt (mais recentes primeiro)
  filtered.sort((a, b) => {
    const da = (a.date || "") + (a.createdAt || "");
    const db = (b.date || "") + (b.createdAt || "");
    return db.localeCompare(da);
  });

  if (!filtered.length) {
    listEl.innerHTML =
      '<p class="text-[11px] text-slate-400">Nenhuma memória encontrada com esse filtro. Tenta mudar a busca ou criar uma nova entrada. 💗</p>';
    return;
  }

  listEl.innerHTML = filtered
    .map((entry) => {
      const classes = highlightClasses(entry.highlight);
      const preview =
        entry.text.length > 180
          ? entry.text.slice(0, 180) + "..."
          : entry.text;

      return `
        <button
          class="w-full text-left rounded-2xl px-3 py-2.5 text-xs card-hover ${classes}"
          data-entry-id="${entry.id}"
        >
          <div class="flex items-center justify-between mb-1.5">
            <div class="flex items-center gap-2">
              <span class="text-[13px]">${moodToLabel(entry.mood).split(" ")[0]}</span>
              <span class="font-semibold text-slate-100">
                ${entry.title || "(sem título)"}
              </span>
            </div>
            <span class="text-[10px] text-slate-400">
              ${formatDate(entry.date)}
            </span>
          </div>
          <p class="text-[11px] text-slate-300 mb-1">
            ${preview || "<span class='text-slate-500'>(sem texto)</span>"}
          </p>
          <div class="flex items-center justify-between text-[10px] text-slate-400">
            <span class="inline-flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-pink-400/80"></span>
              ${entry.tag || "Sem tag"}
            </span>
            <span class="italic">Clique para editar</span>
          </div>
        </button>
      `;
    })
    .join("");

  // listener de clique nos cards
  listEl.querySelectorAll("[data-entry-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.getAttribute("data-entry-id"), 10);
      loadEntryIntoForm(id);
    });
  });
}

function updateStats() {
  const statsCount = document.getElementById("stats-count");
  const statsLast = document.getElementById("stats-last");

  if (!statsCount || !statsLast) return;

  const total = entries.length;
  statsCount.textContent =
    total === 0
      ? "Nenhuma memória ainda"
      : total === 1
      ? "1 memória"
      : `${total} memórias`;

  if (!total) {
    statsLast.textContent = "—";
    return;
  }

  const sorted = [...entries].sort((a, b) => {
    const da = (a.date || "") + (a.createdAt || "");
    const db = (b.date || "") + (b.createdAt || "");
    return db.localeCompare(da);
  });

  const last = sorted[0];
  statsLast.textContent = `${formatDate(last.date)} — ${
    last.title || "Sem título"
  }`;
}

// -------------------------------
// 4. Formulário
// -------------------------------
function clearForm() {
  const form = document.getElementById("entry-form");
  if (!form) return;

  form.reset();
  form.id.value = "";
  editingId = null;

  const btnDelete = document.getElementById("btn-delete");
  if (btnDelete) btnDelete.classList.add("hidden");
}

function loadEntryIntoForm(id) {
  const form = document.getElementById("entry-form");
  if (!form) return;

  const entry = entries.find((e) => e.id === id);
  if (!entry) return;

  editingId = id;

  form.id.value = entry.id;
  form.date.value = entry.date || "";
  form.title.value = entry.title || "";
  form.tag.value = entry.tag || "";
  form.mood.value = entry.mood || "";
  form.highlight.value = entry.highlight || "";
  form.text.value = entry.text || "";

  const btnDelete = document.getElementById("btn-delete");
  if (btnDelete) btnDelete.classList.remove("hidden");

  // scroll até o formulário em telas menores
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}

function setupFormHandlers() {
  const form = document.getElementById("entry-form");
  const btnClear = document.getElementById("btn-clear");
  const btnDelete = document.getElementById("btn-delete");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const idRaw = fd.get("id");
    const date = fd.get("date") || "";
    const title = (fd.get("title") || "").trim();
    const tag = (fd.get("tag") || "").trim();
    const mood = fd.get("mood") || "";
    const highlight = fd.get("highlight") || "";
    const text = (fd.get("text") || "").trim();

    if (!date && !title && !text) {
      alert("Coloca pelo menos uma data, um título ou um texto para salvar a memória. 💗");
      return;
    }

    const nowIso = new Date().toISOString();

    if (idRaw) {
      // update
      const id = parseInt(idRaw, 10);
      const idx = entries.findIndex((e) => e.id === id);
      if (idx !== -1) {
        entries[idx] = {
          ...entries[idx],
          date,
          title,
          tag,
          mood,
          highlight,
          text,
        };
      }
    } else {
      // create
      const newId =
        entries.length > 0
          ? Math.max(...entries.map((e) => e.id)) + 1
          : 1;

      entries.push({
        id: newId,
        date,
        title,
        tag,
        mood,
        highlight,
        text,
        createdAt: nowIso,
      });
    }

    saveEntries();
    renderEntries();
    clearForm();
  });

  if (btnClear) {
    btnClear.addEventListener("click", () => clearForm());
  }

  if (btnDelete) {
    btnDelete.addEventListener("click", () => {
      if (!editingId) return;
      const confirmDelete = confirm(
        "Tem certeza que quer excluir essa lembrança do diário?"
      );
      if (!confirmDelete) return;

      entries = entries.filter((e) => e.id !== editingId);
      saveEntries();
      renderEntries();
      clearForm();
    });
  }
}

// -------------------------------
// 5. Filtros (busca + sentimento)
// -------------------------------
function setupFilters() {
  const searchInput = document.getElementById("search-input");
  const filterMood = document.getElementById("filter-mood");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      renderEntries();
    });
  }

  if (filterMood) {
    filterMood.addEventListener("change", () => {
      renderEntries();
    });
  }
}

// -------------------------------
// 6. Animação básica de entrada
// -------------------------------
function initFadeUp() {
  document.querySelectorAll(".fade-up").forEach((el, i) => {
    setTimeout(() => el.classList.add("show"), 120 + i * 120);
  });
}

// -------------------------------
// 7. Bootstrap
// -------------------------------
document.addEventListener("DOMContentLoaded", () => {
  loadEntries();
  setupFormHandlers();
  setupFilters();
  renderEntries();
  updateStats();
  initFadeUp();
});
