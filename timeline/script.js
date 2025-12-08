console.log("Timeline carregada 💞");

let todosEventos = [];
let paginaAtual = 1;
const POR_PAGINA = 4;

// Carregar JSON
async function carregarEventos() {
    try {
        const resposta = await fetch("./assets/data.json");
        todosEventos = await resposta.json();
        paginaAtual = 1;

        renderTimeline();
        animarHearts();
        initLoadMore();

    } catch (erro) {
        console.error("Erro ao carregar timeline:", erro);
    }
}

// Renderizar timeline
function renderTimeline() {
    const container = document.getElementById("timeline-content");
    container.innerHTML = "";

    const limite = paginaAtual * POR_PAGINA;
    const eventosParaMostrar = todosEventos.slice(0, limite);

    montarTimeline(eventosParaMostrar);
    ativarScrollFade();
    ativarModal();
    ativarVerMais();
    controlarBotaoCarregarMais();
}

// Montar cada card
function montarTimeline(eventos) {
    const container = document.getElementById("timeline-content");

    eventos.forEach((evento, index) => {
        const item = document.createElement("div");
        item.classList.add("timeline-item");

        const ladoEsquerdo = index % 2 === 0;

        item.style.left = ladoEsquerdo ? "0" : "50%";
        item.style.textAlign = ladoEsquerdo ? "right" : "left";

        const textoCompleto = evento.texto || "";
        const LIMITE = 160;
        const textoCurto =
            textoCompleto.length > LIMITE
                ? textoCompleto.slice(0, LIMITE) + "..."
                : textoCompleto;

        const precisaVerMais = textoCompleto.length > LIMITE;

        item.innerHTML = `
            <div class="timeline-card">
                <p class="text-xs text-slate-400 mb-1">${evento.data}</p>
                <h3 class="text-lg text-pink-300 font-semibold mb-2">${evento.titulo}</h3>

                <p class="text-sm text-slate-200 leading-relaxed timeline-text"
                   data-full="${textoCompleto.replace(/"/g, "&quot;")}">
                   ${textoCurto}
                </p>

                ${
                    precisaVerMais
                        ? `<button class="ver-mais-btn">ver mais</button>`
                        : ""
                }

                ${
                    evento.imagem
                        ? `<img src="./assets/image/${evento.imagem}"
                               class="timeline-img"
                               data-caption="${evento.titulo}">
                           `
                        : ""
                }
            </div>
        `;

        container.appendChild(item);
    });
}

// Fade nos cards
function ativarScrollFade() {
    const itens = document.querySelectorAll(".timeline-item");
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(e => {
                if (e.isIntersecting) e.target.classList.add("visible");
            });
        },
        { threshold: 0.2 }
    );
    itens.forEach(item => observer.observe(item));
}

// Modal da imagem
function ativarModal() {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const modalCaption = document.getElementById("modal-caption");
    const close = document.querySelector(".modal-close");

    document.querySelectorAll(".timeline-img").forEach(img => {
        img.addEventListener("click", () => {
            modal.classList.add("visible");
            modalImg.src = img.src;
            modalCaption.textContent = img.dataset.caption;
        });
    });

    close.addEventListener("click", () => modal.classList.remove("visible"));
    modal.addEventListener("click", e => {
        if (e.target === modal) modal.classList.remove("visible");
    });
}

// Ver mais / Ver menos
function ativarVerMais() {
    document.querySelectorAll(".ver-mais-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const p = btn.previousElementSibling;
            const FULL = p.dataset.full;
            const LIMITE = 160;

            if (btn.dataset.expandido === "true") {
                p.textContent = FULL.slice(0, LIMITE) + "...";
                btn.textContent = "ver mais";
                btn.dataset.expandido = "false";
            } else {
                p.textContent = FULL;
                btn.textContent = "ver menos";
                btn.dataset.expandido = "true";
            }
        });
    });
}

// Botão carregar mais
function initLoadMore() {
    const btn = document.getElementById("load-more");
    btn.addEventListener("click", () => {
        paginaAtual++;
        renderTimeline();
    });
}

function controlarBotaoCarregarMais() {
    const btn = document.getElementById("load-more");
    const totalPaginas = Math.ceil(todosEventos.length / POR_PAGINA);

    if (paginaAtual < totalPaginas) btn.classList.remove("hidden");
    else btn.classList.add("hidden");
}

// Corações flutuando
function animarHearts() {
    const container = document.getElementById("hearts-container");

    setInterval(() => {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.textContent = "❤";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = (6 + Math.random() * 4) + "s";

        container.appendChild(heart);
        setTimeout(() => heart.remove(), 10000);
    }, 500);
}

// Carta secreta
document.getElementById("secret-btn").addEventListener("click", () => {
    document.getElementById("secret-card").classList.toggle("visible");
});


// ===============================
// PLAYER DE MÚSICA
// ===============================
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");
const musicIcon = document.getElementById("music-icon");
const fallbackIcon = document.getElementById("fallback-music-icon");

// Volume agradável
music.volume = 0.45;

// Tenta autoplay ao carregar
window.addEventListener("load", () => {
    music.play()
        .then(() => {
            // Se tocar, mantém ícone "on"
            if (musicIcon) musicIcon.src = "./assets/icons/music-on.png";
        })
        .catch(() => {
            // Se bloquear autoplay, mostra ícone de "off"
            if (musicIcon) musicIcon.src = "./assets/icons/music-off.png";
        });
});

// Alternar play/pause
musicBtn.addEventListener("click", () => {
    if (music.paused) {
        music.play();
        if (musicIcon) musicIcon.src = "./assets/icons/music-on.png";
        fallbackIcon.textContent = "🎵";
    } else {
        music.pause();
        if (musicIcon) musicIcon.src = "./assets/icons/music-off.png";
        fallbackIcon.textContent = "⏸";
    }
});



carregarEventos();
