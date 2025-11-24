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
const audio = new Audio("./audio/musica.mp3");
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
const title = "Nosso universo em 6 projetos 💘";
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
// 4. Contador de dias juntos
// =====================================
const contador = document.getElementById("contador");

function calcularDias() {
    const inicio = new Date(2021, 2, 15); // 15/03/2021
    const hoje = new Date();
    const diff = hoje - inicio;
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    contador.textContent = `Estamos juntos há ${dias} dias ❤️`;
}
calcularDias();

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

// Data inicial do relacionamento
const dataInicial = new Date("2022-12-12");

// Elemento onde irá aparecer o texto
const contadorEl = document.getElementById("contador");

// Função para calcular automaticamente
function atualizarContador() {
    const hoje = new Date();

    // Cálculo da diferença em milissegundos
    const diffTime = hoje - dataInicial;

    // Converter para dias
    const diffDias = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Atualizar o texto exibido
    contadorEl.textContent = `Estamos juntos há ${diffDias} dias.`;
}

// Rodar ao carregar a página
atualizarContador();
