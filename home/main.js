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
// 2. Música
// =====================================
const audio = new Audio("./assets/audio/musica.mp3");
audio.loop = true;
audio.volume = 0.4;

const musicBtn = document.getElementById("music-btn");
let tocando = false;

musicBtn.addEventListener("click", () => {
    if (tocando) {
        audio.pause();
        musicBtn.textContent = "🎵";
    } else {
        audio.play();
        musicBtn.textContent = "⏸";
    }
    tocando = !tocando;
});

// =====================================
// 3. Typewriter no título
// =====================================
const title = "Nosso universo em 5 projetos 💘";
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

links.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const url = e.currentTarget.href;

        pageFade.classList.add("active");

        setTimeout(() => {
            window.location.href = url;
        }, 350);
    });
});
