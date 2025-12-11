console.log("Love Dashboard Loaded 💖");

// =====================================
// 1. Animação fade-up
// =====================================
const fadeElements = document.querySelectorAll(".fade-up");
setTimeout(() => {
  fadeElements.forEach((el, i) => {
    setTimeout(() => el.classList.add("show"), 120 * i);
  });
}, 300);


// =====================================
// CLASS: Playlist Manager
// =====================================
class PlaylistManager {
    constructor(config) {
        this.songs = config.songs;
        this.index = 0;
        this.autoplay = config.autoplay ?? false;
        this.volume = config.volume ?? 0.5;

        this.audio = new Audio();
        this.audio.volume = this.volume;

        this.isPlaying = false;

        this.audio.addEventListener("ended", () => this.next());
    }

    init() {
        this.audio.src = this.songs[this.index];

        if (this.autoplay) {
            setTimeout(() => this.play(), 300);
        }
    }

    play() {
        this.audio.play()
            .then(() => this.isPlaying = true)
            .catch(err => console.log("Autoplay bloqueado, aguardando interação...", err));
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
    }

    toggle() {
        this.isPlaying ? this.pause() : this.play();
    }

    next() {
        this.index = (this.index + 1) % this.songs.length;
        this.audio.src = this.songs[this.index];
        this.play();
    }
}

// =====================================
// 2. Música - Playlist com 6 músicas
// =====================================
const playlistRaiz = new PlaylistManager({
  songs: [
    "./assets/audio/musica1.mp3",
    "./assets/audio/musica2.mp3",
    "./assets/audio/musica3.mp3",
    "./assets/audio/musica4.mp3",
    "./assets/audio/musica5.mp3",
    "./assets/audio/musica6.mp3",
  ],
  autoplay: true,
  volume: 0.4,
});

playlistRaiz.init();

const musicBtn = document.getElementById("music-btn");

// Estado inicial botão = pausado até tocar
musicBtn.textContent = "🎵";

musicBtn.addEventListener("click", () => {
  playlistRaiz.toggle();

  if (playlistRaiz.isPlaying) {
    musicBtn.textContent = "⏸";
  } else {
    musicBtn.textContent = "🎵";
  }
});

// Desbloquear autoplay após primeira interação
document.addEventListener(
  "click",
  () => {
    if (!playlistRaiz.isPlaying) {
      playlistRaiz.play();
      musicBtn.textContent = "⏸";
    }
  },
  { once: true }
);


// =======================================
// MINI PLAYER – CONTROLES
// =======================================

// Elementos
const mpTitle = document.getElementById("mp-title");
const mpPlay = document.getElementById("mp-play");
const mpPrev = document.getElementById("mp-prev");
const mpNext = document.getElementById("mp-next");
const mpProgress = document.getElementById("mp-progress");
const mpCurrent = document.getElementById("mp-current");
const mpDuration = document.getElementById("mp-duration");
const mpIcon = document.getElementById("mp-icon");

// Atualiza nome da música
function atualizarTitulo() {
    const nome = playlistRaiz.songs[playlistRaiz.index].split("/").pop();
    mpTitle.textContent = nome.replace(".mp3", "");
}

// Atualiza tempo formatado
function formatTime(seg) {
    const m = Math.floor(seg / 60);
    const s = Math.floor(seg % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
}

// Sincronizar barra e tempos
playlistRaiz.audio.addEventListener("timeupdate", () => {
    mpProgress.max = playlistRaiz.audio.duration;
    mpProgress.value = playlistRaiz.audio.currentTime;

    mpCurrent.textContent = formatTime(playlistRaiz.audio.currentTime);
    mpDuration.textContent = formatTime(playlistRaiz.audio.duration || 0);
});

// Mover a barra manualmente
mpProgress.addEventListener("input", () => {
    playlistRaiz.audio.currentTime = mpProgress.value;
});

// Botão Play/Pause
mpPlay.addEventListener("click", () => {
    playlistRaiz.toggle();

    mpPlay.textContent = playlistRaiz.isPlaying ? "⏸" : "▶️";
});

// Botão Next
mpNext.addEventListener("click", () => {
    playlistRaiz.next();
    atualizarTitulo();
});

// Botão Previous
mpPrev.addEventListener("click", () => {
    playlistRaiz.index =
        playlistRaiz.index === 0 ? playlistRaiz.songs.length - 1 : playlistRaiz.index - 1;

    playlistRaiz.audio.src = playlistRaiz.songs[playlistRaiz.index];
    playlistRaiz.play();
    atualizarTitulo();
});

// Atualiza título ao iniciar
playlistRaiz.audio.addEventListener("loadedmetadata", atualizarTitulo);


// =====================================
// 3. Typewriter no título
// =====================================
const title = "Nosso universo em 3 projetos 💘";
const typeElement = document.getElementById("type-title");
let i = 0;

function typeWriter() {
  if (i < title.length) {
    typeElement.textContent += title.charAt(i);
    i++;
    setTimeout(typeWriter, 50);
  }
}
typeWriter();

// =====================================
// 4. Contador de dias
// =====================================
const contador = document.getElementById("contador");
const dataInicial = new Date("2022-12-12");

function atualizarContador() {
  const hoje = new Date();
  const diff = hoje - dataInicial;
  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  contador.textContent = `Estamos juntos há ${dias} dias ❤️`;
}

atualizarContador();

// =====================================
// 5. Fade-out ao trocar de página
// =====================================
const pageFade = document.getElementById("page-fade");
const links = document.querySelectorAll("a[href]");

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const url = e.currentTarget.href;

    pageFade.classList.add("active");

    setTimeout(() => {
      window.location.href = url;
    }, 350);
  });
});
