// =====================================================================
// 📖 DIÁRIO DIGITAL – VERSÃO COMPLETA, SIMPLES E LINDA
// Tudo aqui: memórias iniciais, regras e comentários pra você expandir.
// =====================================================================

console.log("Diário Digital carregado 💗");

const STORAGE_KEY = "loveDiaryV3";
let entries = [];
let editingId = null;

// =====================================================================
// 1. POSSIBILIDADES PARA CRIAR / EDITAR MEMÓRIAS
// =====================================================================
//
// Cada memória é um objeto com:
// {
//   id: string            → use crypto.randomUUID() nos novos
//   date: "YYYY-MM-DD"   → ex: "2024-12-09"
//   title: string        → título curtinho
//   tag: string          → tema/categoria
//   mood: string         → sentimento principal
//   highlight: string    → estilo especial (opcional)
//   text: string         → texto da lembrança
//   createdAt: string    → ISO da criação (new Date().toISOString())
// }
//
// 🔖 TAGS (exemplos, você pode inventar mais):
//   "Romance", "Viagem", "Saudade", "Rotina", "Briguinha",
//   "Filme", "Mensagem", "Data especial", "Conversa", "Carinho"
//
// 💟 MOODS (use exatamente esses valores pra bater com os selects):
//   "feliz"
//   "grata"
//   "apaixonada"
//   "com saudade"
//   "calma"
//   "ansiosa"
//
// ✨ HIGHLIGHT (opcional – visual, você pode trocar no CSS se quiser):
//   ""        → normal
//   "gold"    → muito especial
//   "calm"    → suave / noite tranquila
//   "chaos"   → dia intenso / briguinha / emoção forte
//
// Pra criar mais memórias, basta copiar um objeto em defaultEntries,
// colar, mudar o conteúdo e deixar o id como crypto.randomUUID().
// =====================================================================


// =====================================================================
// 2. MEMÓRIAS INICIAIS (20 MEMÓRIAS MISTURANDO ROMANCE, ROTINA, SAUDADE)
// =====================================================================
const defaultEntries = [
  {
    id: crypto.randomUUID(),
    date: "2021-03-15",
    title: "O começo oficial",
    tag: "Início",
    mood: "apaixonada",
    highlight: "gold",
    text: "Foi aqui que tudo começou. Eu tava feliz, nervosa e com aquela sensação de que algo muito bonito tava nascendo.",
    createdAt: "2021-03-15T20:00:00"
  },
  {
    id: crypto.randomUUID(),
    date: "2021-07-02",
    title: "A primeira saudade forte",
    tag: "Saudade",
    mood: "com saudade",
    highlight: "",
    text: "Tentei fingir que tava tudo bem, mas a saudade apertou diferente. Foi quando eu percebi o quanto você já fazia parte de mim.",
    createdAt: "2021-07-02T21:00:00"
  },
  {
    id: crypto.randomUUID(),
    date: "2021-10-09",
    title: "Nosso lanche favorito 🍔",
    tag: "Rotina",
    mood: "feliz",
    highlight: "calm",
    text: "Nada demais: só a gente, comida simples, briga pela batata e risada boba. Mas eu amo exatamente esse tipo de dia.",
    createdAt: "2021-10-09T18:00:00"
  },
  {
    id: crypto.randomUUID(),
    date: "2022-01-10",
    title: "A ligação que salvou meu dia",
    tag: "Conversa",
    mood: "calma",
    highlight: "calm",
    text: "Eu tava cansado(a), cabeça cheia, e você ligou. Não resolveu tudo, mas a sua voz fez o mundo ficar menos pesado.",
    createdAt: "2022-01-10T20:40:00"
  },
  {
    id: crypto.randomUUID(),
    date: "2022-03-19",
    title: "Um abraço que virou lar",
    tag: "Romance",
    mood: "apaixonada",
    highlight: "gold",
    text: "Você me abraçou e eu simplesmente entendi: é aqui que eu quero voltar sempre que o mundo pesar.",
    createdAt: "2022-03-19T19:20:00"
  },
  {
    id: crypto.randomUUID(),
    date: "2022-05-01",
    title: "Nossa primeira briguinha fofa",
    tag: "Briguinha",
    mood: "ansiosa",
    highlight: "",
    text: "A gente discutiu por uma bobagem e depois caiu na risada do nosso próprio drama. A cara da gente.",
    createdAt: "2022-05-01T16:00:00"
  },
  {
    id: crypto.randomUUID(),
    date: "2022-06-11",
    title: "O filme que virou memória",
    tag: "Filme",
    mood: "feliz",
    highlight: "",
    text: "Nem era o melhor filme do mundo. Mas eu lembro da forma como você encostou em mim, dos comentários e do clima daquele dia.",
    createdAt: "2022-06-11T23:00:00"
  },
  {
    id: crypto.randomUUID(),
    date: "2022-08-25",
    title: "A foto que eu não canso de olhar",
    tag: "Carinho",
    mood: "apaixonada",
    highlight: "",
    text: "Você tava tão você naquela foto. Natural, rindo do jeito que eu mais gosto. Às vezes eu volto nela só pra sentir de novo.",
    createdAt: "2022-08-25T14:10:00"
  },
  {
    id: crypto.randomUUID(),
    date: "2022-09-15",
    title: "A noite que rimos até doer",
    tag: "Diversão",
    mood: "feliz",
    highlight: "",
    text: "Nem lembro direito das piadas, só lembro que eu não conseguia parar de rir com você. Sério, meu rosto doía.",
    createdAt: "2022-09-15T22:50:00"
  },
  {
    id: crypto.randomUUID(),
    date: "2022-11-12",
    title: "Saudade em dia cheio",
    tag: "Saudade",
    mood: "com saudade",
    highlight: "",
    text: "Mesmo com mil coisas para fazer, em vários momentos pensei 'queria que você estivesse aqui agora'.",
    createdAt: "2022-11-12T23:40:00"
  },
  {
    id: crypto.randomUUID(),
    date: "2023-01-01",
    title: "Primeiro dia do ano com você",
    tag: "Data especial",
    mood: "feliz",
    highlight: "gold",
    text: "Começar o ano com você do meu lado foi a melhor forma de dizer pra mim mesmo(a): quero você em todos os próximos também.",
    createdAt: "2023-01-01T01:10:00"
  },
  {
    id: crypto.randomUUID(),
    date: "2023-02-14",
    title: "Nosso mini encontro",
    tag: "Romance",
    mood: "apaixonada",
    highlight: "",
    text: "Foi rápido, simples, nada de filme. Mas o jeito que você me olhou naquele dia ficou guardado em mim.",
    createdAt: "2023-02-14T20:30:00"
  },
  {
    id: crypto.randomUUID(),
    date: "2023-03-03",
    title: "Quando você cuidou de mim",
    tag: "Carinho",
    mood: "grata",
    highlight: "",
    text: "Eu não tava bem e você ficou ali, presente. Esse tipo de cuidado vale mais que qualquer palavra bonita.",
    createdAt: "2023-03-03T15:40:00"
  },
  {
    id: crypto.randomUUID(),
    date: "2023-04-20",
    title: "Nosso momento favorito",
    tag: "Rotina",
    mood: "feliz",
    highlight: "",
    text: "A gente junto, fazendo nada demais. E ainda assim parece tudo. É o tipo de coisa que eu quero repetir mil vezes.",
    createdAt: "2023-04-20T19:10:00"
  },
  {
    id: crypto.randomUUID(),
    date: "2023-06-25",
    title: "Briguinha boba + abraço forte",
    tag: "Briguinha",
    mood: "ansiosa",
    highlight: "chaos",
    text: "A gente se estranhou, o clima ficou estranho, mas depois veio o abraço que arrumou tudo. E eu lembrei que a gente sempre dá um jeito.",
    createdAt: "2023-06-25T21:20:00"
  },
  {
    id: crypto.randomUUID(),
    date: "2023-08-09",
    title: "Quando você sorriu daquele jeito",
    tag: "Carinho",
    mood: "apaixonada",
    highlight: "",
    text: "Aquele sorriso específico… você sabe qual é. Ele simplesmente fez meu coração derreter naquele momento.",
    createdAt: "2023-08-09T17:50:00"
  },
  {
    id: crypto.randomUUID(),
    date: "2023-10-01",
    title: "Conversas profundas",
    tag: "Conversa",
    mood: "calma",
    highlight: "",
    text: "A gente falou de medo, futuro, família, sonhos. Não eram respostas prontas, eram dois corações tentando se entender.",
    createdAt: "2023-10-01T22:30:00"
  },
  {
    id: crypto.randomUUID(),
    date: "2024-01-18",
    title: "A mensagem que mudou meu dia",
    tag: "Mensagem",
    mood: "feliz",
    highlight: "",
    text: "Você mandou algo tão simples, mas que mexeu comigo. Eu tava mal, e de repente fiquei leve. Obrigado(a) por isso.",
    createdAt: "2024-01-18T09:20:00"
  },
  {
    id: crypto.randomUUID(),
    date: "2024-03-09",
    title: "Dia corrido, mas com você",
    tag: "Rotina",
    mood: "grata",
    highlight: "",
    text: "Mesmo sem conseguir ficar tanto tempo junto, só saber que você tava ali, torcendo por mim, já deixou tudo mais fácil.",
    createdAt: "2024-03-09T20:10:00"
  },
  {
    id: crypto.randomUUID(),
    date: "2024-05-27",
    title: "Quando eu percebi que era amor",
    tag: "Romance",
    mood: "apaixonada",
    highlight: "gold",
    text: "Não foi num grande evento, nem numa data especial. Foi num dia qualquer, te vendo falar de algo bobo, e eu pensei: é amor.",
    createdAt: "2024-05-27T21:00:00"
  }
];

// =====================================================================
// 3. LOAD / SAVE (localStorage)
// =====================================================================
function loadEntries() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    entries = JSON.parse(raw);
  } else {
    entries = [...defaultEntries];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }
}

function saveEntries() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  renderEntries();
  updateStats();
}

// =====================================================================
// 4. RENDERIZAÇÃO DA LISTA
// =====================================================================
function renderEntries() {
  const list = document.getElementById("entries-list");
  const search = document.getElementById("search-input").value.toLowerCase();
  const moodFilter = document.getElementById("filter-mood").value;

  let filtered = entries.filter(e =>
    `${e.title} ${e.text} ${e.tag}`.toLowerCase().includes(search)
  );

  if (moodFilter) {
    filtered = filtered.filter(e => e.mood === moodFilter);
  }

  filtered.sort((a, b) => (b.date + b.createdAt).localeCompare(a.date + a.createdAt));

  if (!filtered.length) {
    list.innerHTML = `<p class="text-[11px] text-slate-400">Nenhuma memória encontrada ainda com esse filtro. 💗</p>`;
    return;
  }

  list.innerHTML = filtered.map(e => `
    <button class="entry-card" data-id="${e.id}">
      <div class="flex justify-between items-start mb-1">
        <div class="title">${e.title}</div>
        <div class="date">${formatDate(e.date)}</div>
      </div>
      <p class="text">${previewText(e.text)}</p>
      <div class="bottom">
        <span class="tag">🏷 ${e.tag}</span>
        <span class="mood">${moodLabel(e.mood)}</span>
      </div>
    </button>
  `).join("");

  list.querySelectorAll("[data-id]").forEach(btn => {
    btn.addEventListener("click", () => loadEntryIntoForm(btn.dataset.id));
  });
}

function previewText(text) {
  return text.length > 160 ? text.slice(0, 160) + "..." : text;
}

function formatDate(dateStr) {
  if (!dateStr) return "--/--/----";
  const [y, m, d] = dateStr.split("-");
  return `${d}/${m}/${y}`;
}

function moodLabel(mood) {
  return {
    feliz: "😊 Feliz",
    grata: "🙏 Grata",
    apaixonada: "💘 Apaixonada",
    "com saudade": "🥹 Com saudade",
    calma: "🫧 Calma",
    ansiosa: "😵 Ansiosa"
  }[mood] || "✨ Sentindo muitas coisas";
}

// =====================================================================
// 5. ESTATÍSTICAS (contagem + última memória)
// =====================================================================
function updateStats() {
  const statsCount = document.getElementById("stats-count");
  const statsLast = document.getElementById("stats-last");

  const total = entries.length;
  statsCount.textContent = total === 1 ? "1 memória" : `${total} memórias`;

  if (!total) {
    statsLast.textContent = "—";
    return;
  }

  const sorted = [...entries].sort((a, b) =>
    (b.date + b.createdAt).localeCompare(a.date + a.createdAt)
  );
  const last = sorted[0];
  statsLast.textContent = `${formatDate(last.date)} — ${last.title}`;
}

// =====================================================================
// 6. FORMULÁRIO (criar / editar / limpar / excluir)
// =====================================================================
function clearForm() {
  const form = document.getElementById("entry-form");
  form.reset();
  editingId = null;
  document.getElementById("btn-delete").classList.add("hidden");
}

function loadEntryIntoForm(id) {
  const entry = entries.find(e => e.id === id);
  if (!entry) return;

  editingId = id;
  const form = document.getElementById("entry-form");

  form.date.value = entry.date || "";
  form.tag.value = entry.tag || "";
  form.title.value = entry.title || "";
  form.mood.value = entry.mood || "";
  form.highlight.value = entry.highlight || "";
  form.text.value = entry.text || "";

  document.getElementById("btn-delete").classList.remove("hidden");

  form.scrollIntoView({ behavior: "smooth", block: "start" });
}

function setupFormHandlers() {
  const form = document.getElementById("entry-form");
  const btnClear = document.getElementById("btn-clear");
  const btnDelete = document.getElementById("btn-delete");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());

    const hasContent =
      (data.title && data.title.trim()) ||
      (data.text && data.text.trim()) ||
      (data.date && data.date.trim());

    if (!hasContent) {
      alert("Coloca pelo menos uma data, um título ou um texto para salvar a memória. 💗");
      return;
    }

    if (editingId) {
      // update
      const idx = entries.findIndex(e => e.id === editingId);
      if (idx !== -1) {
        entries[idx] = { ...entries[idx], ...data };
      }
    } else {
      // create
      entries.push({
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...data
      });
    }

    saveEntries();
    clearForm();
  });

  btnClear.addEventListener("click", () => clearForm());

  btnDelete.addEventListener("click", () => {
    if (!editingId) return;
    const confirmDelete = confirm("Tem certeza que quer excluir essa lembrança do diário? 💔");
    if (!confirmDelete) return;

    entries = entries.filter(e => e.id !== editingId);
    saveEntries();
    clearForm();
  });
}

// =====================================================================
// 7. FILTROS (busca + sentimento)
// =====================================================================
function setupFilters() {
  const searchInput = document.getElementById("search-input");
  const filterMood = document.getElementById("filter-mood");

  searchInput.addEventListener("input", () => renderEntries());
  filterMood.addEventListener("change", () => renderEntries());
}

// =====================================================================
// 8. MÚSICA DE FUNDO (best effort – alguns browsers só tocam após clique)
// =====================================================================
function initMusic() {
  const audio = document.getElementById("bg-music");
  if (!audio) return;

  audio.volume = 0.4;
  audio.play().catch(() => {
    // Se o navegador bloquear o autoplay, ele começa a tocar
    // automaticamente depois que a pessoa interagir com a página.
  });
}

// =====================================================================
// 9. BOOTSTRAP
// =====================================================================
document.addEventListener("DOMContentLoaded", () => {
  loadEntries();
  setupFormHandlers();
  setupFilters();
  renderEntries();
  updateStats();
  initMusic();
});
