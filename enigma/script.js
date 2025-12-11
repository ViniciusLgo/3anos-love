// Referência global para o player
let playlistManager = null;

let lastView = null;
let currentView = null;

document.addEventListener("DOMContentLoaded", () => {
  // Inicia os corações de fundo
  initHearts();

  // Inicia o player de música
  try {
    playlistManager = new PlaylistManager();
  } catch (e) {
    console.error("Erro ao iniciar PlaylistManager:", e);
  }

  const toggleBtn = document.getElementById("musicToggle");
  if (toggleBtn && playlistManager) {
    toggleBtn.addEventListener("click", () => {
      playlistManager.toggle();
      // Alterna o emoji para dar um feedback visual
      toggleBtn.textContent = playlistManager.isPlaying ? "🎶" : "🎵";
    });
  }

  // Carrega a primeira tela (inicio.html)
  loadView("inicio");
});

/**
 * Carrega um arquivo HTML da pasta /enigma/views
 * e injeta dentro do <main id="app">
 */
function loadView(viewName) {
  const container = document.getElementById("app");
  if (!container) return;

  // Atualiza histórico interno
  lastView = currentView;
  currentView = viewName;

  fetch(`views/${viewName}.html`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`View ${viewName} não encontrada`);
      }
      return response.text();
    })
    .then((html) => {
      container.innerHTML = html;
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Inicializa funções específicas da view
      if (typeof initReveal === "function") initReveal();
    })

    .catch((err) => {
      console.error("Erro ao carregar view:", err);

      container.innerHTML = `
                <div class="center-box fade-in fade-in-glow">
                    <h2>Ops…</h2>
                    <p>Não consegui carregar essa parte do enigma.</p>
                    <a onclick="goBack()" class="next-btn">⬅ Voltar</a>
                </div>
            `;
    });
}

/**
 * Corações flutuando no fundo
 */
function initHearts() {
  const heartsContainer = document.getElementById("hearts-container");
  if (!heartsContainer) return;

  function createHeart() {
    const el = document.createElement("div");
    el.className = "heart";
    el.textContent = "💗";
    el.style.left = Math.random() * 100 + "vw";
    el.style.animationDuration = 6 + Math.random() * 4 + "s";
    heartsContainer.appendChild(el);

    setTimeout(() => el.remove(), 11000);
  }

  // Alguns iniciais
  for (let i = 0; i < 15; i++) {
    setTimeout(createHeart, i * 400);
  }

  // Depois continua gerando
  setInterval(createHeart, 1200);
}

function goBack() {
  if (lastView) {
    loadView(lastView);
  } else {
    loadView("inicio");
  }
}

window.go = function (step) {
  document
    .querySelectorAll(".step")
    .forEach((s) => s.classList.remove("active"));
  const el = document.getElementById(step);
  if (el) el.classList.add("active");
};

window.initReveal = function () {
  let blur = 35;
  const img = document.getElementById("reveal-img");
  const btn = document.getElementById("final-btn");

  if (!img) return; // se a view ainda não carregou

  img.onclick = () => {
    blur -= 12;
    if (blur < 0) blur = 0;

    img.style.filter = `blur(${blur}px)`;

    if (blur === 0 && btn) {
      btn.style.display = "inline-block";
    }
  };
};

window.goBack = goBack;

// Expõe a função para ser usada em onclick="loadView('desafio1')"
window.loadView = loadView;
