/* ============================================================
   CORAÇÕES FLUTUANDO
============================================================ */
function spawnHearts() {
  const container = document.getElementById("hearts-container");

  setInterval(() => {
    const h = document.createElement("div");
    h.classList.add("heart");
    h.innerHTML = "💗";

    h.style.left = Math.random() * 100 + "vw";
    h.style.fontSize = Math.random() * 12 + 12 + "px";
    h.style.animationDuration = Math.random() * 3 + 3 + "s";

    container.appendChild(h);

    setTimeout(() => h.remove(), 7000);
  }, 450);
}
spawnHearts();

/* ============================================================
   MÚSICA GLOBAL — SOMENTE musica2 EM LOOP
============================================================ */
const playlistEnigma = new PlaylistManager({
  songs: ["../assets/audio/musica2.mp3"],
  autoplay: true,
  volume: 0.45
});

playlistEnigma.init("bg-music");

function toggleMusic() {
  playlistEnigma.toggle();
}

/* ============================================================
   SPA — CARREGAR TELAS SEM RECARREGAR A PÁGINA
============================================================ */
async function loadView(viewName) {
  const app = document.getElementById("app");

  // Efeito de fade
  app.classList.remove("fade-in");

  // Carrega HTML no container
  const html = await fetch(`views/${viewName}.html`).then(r => r.text());
  app.innerHTML = html;

  setTimeout(() => app.classList.add("fade-in"), 20);

  // Scroll para o topo quando mudar de página
  window.scrollTo(0, 0);
}

/* Carrega tela inicial ao abrir */
document.addEventListener("DOMContentLoaded", () => {
    loadView("inicio");
});

