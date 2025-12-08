function loadMemoryGame() {

    // ===============================
    // CONFIGURAÇÃO DAS IMAGENS (EDITÁVEL)
    // ===============================

    // Coloque suas imagens aqui. Só trocar nomes.
    const images = [
        "img1.png",
        "img2.png",
        "img3.png",
        "img4.png",
        "img5.png",
        "img6.png",
        "img7.png",
        "img8.png"
    ];

    // Embaralha e cria pares
    let deck = [...images, ...images].sort(() => Math.random() - 0.5);

    // ===============================
    // HTML DO JOGO
    // ===============================
    gameArea.innerHTML = `
        <div class="text-center mb-4">
            <h2 class="text-3xl font-bold text-sky-300">Memória do Amor 🃏</h2>
            <p class="text-slate-400 text-sm">Encontre os pares românticos ✨</p>
        </div>

        <div id="memory-grid" class="grid grid-cols-4 gap-3 mb-4"></div>

        <p id="memory-status" class="text-center text-sky-300 font-semibold text-sm"></p>

        <div class="flex flex-col items-center gap-3 mt-4">
            <button id="restart-memory"
                class="px-6 py-2 bg-sky-500 hover:bg-sky-400 text-white text-sm rounded-full transition">
                Começar
            </button>

            <div class="flex gap-3">
                <button id="back-to-games"
                    class="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs rounded-full border border-slate-600">
                    ← Voltar aos Jogos
                </button>

                <a href="../home/index.html"
                    class="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs rounded-full border border-slate-600">
                    🏠 Dashboard
                </a>
            </div>
        </div>
    `;

    const grid = document.getElementById("memory-grid");

    let first = null;
    let second = null;
    let lock = false;
    let matched = 0;

    function renderBoard() {
        matched = 0;
        lock = false;
        first = null;
        second = null;

        deck = [...images, ...images].sort(() => Math.random() - 0.5);

        grid.innerHTML = "";

        deck.forEach(img => {
            const card = document.createElement("div");
            card.className = "memory-card bg-slate-900/60 border border-slate-700 rounded-xl p-2 flex items-center justify-center";
            card.dataset.img = img;

            card.innerHTML = `
                <img src="./assets/memory/${img}" 
                     class="w-full h-full object-contain opacity-0 transition-all duration-300" />
            `;

            card.onclick = () => flip(card);
            grid.appendChild(card);
        });
    }

    // ===============================
    // FLIP DA CARTA
    // ===============================
    function flip(card) {
        if (lock || card.classList.contains("matched") || card === first) return;

        const img = card.querySelector("img");
        img.style.opacity = 1;
        card.classList.add("flipped");

        if (!first) {
            first = card;
        } else {
            second = card;
            check();
        }
    }

    // ===============================
    // VERIFICAÇÃO DE PAR
    // ===============================
    function check() {
        const img1 = first.dataset.img;
        const img2 = second.dataset.img;

        if (img1 === img2) {
            first.classList.add("matched");
            second.classList.add("matched");
            matched++;

            first = null;
            second = null;

            if (matched === images.length) finish();
        } else {
            lock = true;
            setTimeout(() => {
                first.querySelector("img").style.opacity = 0;
                second.querySelector("img").style.opacity = 0;

                first.classList.remove("flipped");
                second.classList.remove("flipped");

                first = null;
                second = null;
                lock = false;
            }, 700);
        }
    }

    // ===============================
    // FINAL DO JOGO
    // ===============================
    function finish() {
        document.getElementById("memory-status").innerHTML = `
            Você completou todos os pares! 💙<br>
            Assim como nossas lembranças também combinam perfeitamente.
        `;
    }

    document.getElementById("restart-memory").onclick = () => renderBoard();

    document.getElementById("back-to-games").onclick = () => {
        gameArea.classList.add("hidden");
        document.getElementById("game-cards").classList.remove("hidden");
    };

    renderBoard();
}
