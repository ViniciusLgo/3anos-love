console.log("Engine do dashboard carregada 💘");

const cards = document.querySelectorAll("[data-load]");
const gameArea = document.getElementById("game-area");
const menu = document.getElementById("game-cards");


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
            .catch(err => console.log("Autoplay bloqueado no game, aguardando clique...", err));
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

// Fade-up inicial
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".fade-up").forEach((el, i) => {
        setTimeout(() => el.classList.add("show"), 120 + i * 120);
    });
});

// Abrir módulo
cards.forEach(btn => {
    btn.addEventListener("click", () => {
        const module = btn.dataset.load;

        menu.classList.add("hidden");
        gameArea.classList.remove("hidden");

        if (module === "heart") loadHeartGame();
        if (module === "quiz") loadQuizGame();
        if (module === "memory") loadMemoryGame();
    });
});


// =====================================
// PLAYLIST NO GAME
// =====================================
const playlistGame = new PlaylistManager({
  songs: [
    "../assets/audio/musica3.mp3",
    "../assets/audio/musica4.mp3",
    "../assets/audio/musica5.mp3",
  ],
  autoplay: true,
  volume: 0.4
});

playlistGame.init();

// Botão (se quiser usar o player)
const btnMusic = document.getElementById("music-btn");

btnMusic.addEventListener("click", () => {
  playlistGame.toggle();
  btnMusic.textContent = playlistGame.isPlaying ? "⏸" : "🎵";
});

// Autoplay desbloqueado
document.addEventListener("click", () => {
  if (!playlistGame.isPlaying) {
    playlistGame.play();
    btnMusic.textContent = "⏸";
  }
}, { once: true });
