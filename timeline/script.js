console.log("Timeline Script Carregado!");

let todosEventos = [];

/* ============================================================
   1. CORAÇÕES FLUTUANDO
============================================================ */
function gerarCoracoes() {
    const container = document.getElementById("hearts-container");

    setInterval(() => {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.textContent = "💖";

        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = (10 + Math.random() * 20) + "px";
        heart.style.animationDuration = (4 + Math.random() * 4) + "s";

        container.appendChild(heart);

        setTimeout(() => heart.remove(), 8000);
    }, 500);
}

gerarCoracoes();

/* ============================================================
   2. MÚSICA LOCAL (audio/musica.mp3)
============================================================ */
const audio = new Audio("audio/musica.mp3");
audio.loop = true;
audio.volume = 0.4;

const musicBtn = document.getElementById("music-btn");
let tocando = false;

musicBtn.addEventListener("click", () => {
    if (tocando) {
        audio.pause();
        tocando = false;
        musicBtn.textContent = "🎵";
    } else {
        audio.play();
        tocando = true;
        musicBtn.textContent = "⏸";
    }
});

/* ============================================================
   3. CARREGAR JSON E INICIAR TIMELINE
============================================================ */
async function carregarTimeline() {
    try {
        const resposta = await fetch("data.json");
        todosEventos = await resposta.json();

        inicializarFiltros(todosEventos);
        renderizarTimeline(todosEventos);
    } catch (erro) {
        console.error("Erro ao carregar eventos:", erro);
    }
}

carregarTimeline();

/* ============================================================
   4. RENDERIZAR TIMELINE (com filtros aplicados)
============================================================ */
function renderizarTimeline(eventos) {
    const container = document.getElementById("timeline");
    container.innerHTML = "";

    // Ordenar por data
    const ordenados = [...eventos].sort(
        (a, b) => new Date(a.data) - new Date(b.data)
    );

    ordenados.forEach((evento) => {
        const item = document.createElement("div");
        item.classList.add("timeline-item");

        const dataFormatada = new Date(evento.data).toLocaleDateString("pt-BR");
        const categoria = evento.categoria || "";
        const emocao = evento.emocao || "";

        item.innerHTML = `
            <div class="timeline-card">
                <h2>${evento.titulo}</h2>
                <small>${dataFormatada}
                    ${categoria ? " • " + categoria : ""}
                    ${emocao ? " • " + emocao : ""}
                </small>
                <p>${evento.descricao}</p>
                <img class="timeline-img"
                     src="${evento.foto}"
                     alt="${evento.titulo}"
                     data-caption="${evento.descricao}">
            </div>
        `;

        container.appendChild(item);
    });

    iniciarScrollReveal();
    inicializarModal();
}

/* ============================================================
   5. FILTROS (Ano, Categoria, Emoção)
============================================================ */
function inicializarFiltros(eventos) {
    const selectAno = document.getElementById("filter-ano");
    const selectCategoria = document.getElementById("filter-categoria");
    const selectEmocao = document.getElementById("filter-emocao");

    // ANOS
    const anos = Array.from(
        new Set(
            eventos.map(e => new Date(e.data).getFullYear().toString())
        )
    ).sort();

    anos.forEach(ano => {
        const opt = document.createElement("option");
        opt.value = ano;
        opt.textContent = ano;
        selectAno.appendChild(opt);
    });

    // CATEGORIAS
    const categorias = Array.from(
        new Set(
            eventos
                .map(e => e.categoria)
                .filter(Boolean)
        )
    ).sort();

    categorias.forEach(cat => {
        const opt = document.createElement("option");
        opt.value = cat;
        opt.textContent = cat;
        selectCategoria.appendChild(opt);
    });

    // EMOÇÕES
    const emocaoList = Array.from(
        new Set(
            eventos
                .map(e => e.emocao)
                .filter(Boolean)
        )
    ).sort();

    emocaoList.forEach(em => {
        const opt = document.createElement("option");
        opt.value = em;
        opt.textContent = em;
        selectEmocao.appendChild(opt);
    });

    // Listeners
    selectAno.addEventListener("change", aplicarFiltros);
    selectCategoria.addEventListener("change", aplicarFiltros);
    selectEmocao.addEventListener("change", aplicarFiltros);
}

function aplicarFiltros() {
    const ano = document.getElementById("filter-ano").value;
    const categoria = document.getElementById("filter-categoria").value;
    const emocao = document.getElementById("filter-emocao").value;

    let filtrados = [...todosEventos];

    if (ano) {
        filtrados = filtrados.filter(e =>
            new Date(e.data).getFullYear().toString() === ano
        );
    }

    if (categoria) {
        filtrados = filtrados.filter(e => e.categoria === categoria);
    }

    if (emocao) {
        filtrados = filtrados.filter(e => e.emocao === emocao);
    }

    renderizarTimeline(filtrados);
}

/* ============================================================
   6. SCROLL REVEAL
============================================================ */
function iniciarScrollReveal() {
    const items = document.querySelectorAll(".timeline-item");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) e.target.classList.add("visible");
        });
    }, { threshold: 0.2 });

    items.forEach(i => observer.observe(i));
}

/* ============================================================
   7. PROGRESSO DA LINHA CENTRAL
============================================================ */
const progressBar = document.querySelector(".timeline-progress");

window.addEventListener("scroll", () => {
    const maxHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / maxHeight) * 100;
    progressBar.style.height = `${progress}%`;
});

/* ============================================================
   8. MODAL DE FOTO (Fase 3)
============================================================ */
function inicializarModal() {
    const imgs = document.querySelectorAll(".timeline-img");
    const modal = document.getElementById("modal-backdrop");
    const modalImg = document.getElementById("modal-img");
    const modalCaption = document.getElementById("modal-caption");
    const modalClose = document.getElementById("modal-close");

    function abrirModal(src, caption) {
        modalImg.src = src;
        modalCaption.textContent = caption || "";
        modal.classList.add("visible");
    }

    function fecharModal() {
        modal.classList.remove("visible");
        modalImg.src = "";
        modalCaption.textContent = "";
    }

    imgs.forEach(img => {
        img.addEventListener("click", () => {
            const src = img.getAttribute("src");
            const caption = img.getAttribute("data-caption") || img.alt;
            abrirModal(src, caption);
        });
    });

    modalClose.addEventListener("click", fecharModal);

    modal.addEventListener("click", (e) => {
        if (e.target === modal) fecharModal();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") fecharModal();
    });
}

/* ============================================================
   9. CARTA SECRETA (Fase 5)
============================================================ */
const secretBtn = document.getElementById("secret-btn");
const secretCard = document.getElementById("secret-card");

secretBtn.addEventListener("click", () => {
    secretCard.classList.toggle("visible");
});
