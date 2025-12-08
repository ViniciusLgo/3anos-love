function loadHeartGame() {
    gameArea.innerHTML = `
        <div class="text-center mb-4">
            <h2 class="text-3xl font-bold text-pink-300 flex items-center justify-center gap-2">
                Caça Corações 💓
            </h2>
            <p class="text-slate-400 text-sm">Pegue o máximo de corações!</p>
        </div>

        <!-- Painel superior -->
        <div class="flex justify-between text-xs px-1 mb-2">
            <span id="heart-score" class="font-semibold">Pontos: 0</span>
            <span id="heart-timer" class="font-semibold">Tempo: 30s</span>
        </div>

        <!-- Área de jogo -->
        <div id="hearts-area"
            class="relative bg-slate-900/70 border border-slate-700 rounded-xl h-80 overflow-hidden mb-4"></div>

        <!-- Resultado -->
        <p id="heart-result" class="text-center text-pink-200 text-sm font-semibold"></p>

        <!-- Botões inferiores -->
        <div class="flex flex-col items-center gap-3 mt-4">

            <button id="start-heart-game"
                class="px-6 py-2 bg-pink-500 hover:bg-pink-400 text-white text-sm rounded-full transition">
                Começar
            </button>

            <div class="flex gap-3">
                <button id="back-to-games"
                    class="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs rounded-full border border-slate-600">
                    ← Voltar aos Jogos
                </button>

                <a href="../home/index.html"
                    class="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs rounded-full border border-slate-600">
                    🏠 Voltar ao Dashboard
                </a>
            </div>
        </div>
    `;

    // VARIÁVEIS DO JOGO
    let score = 0;
    let time = 30;
    let timer = null;
    let spawn = null;

    const btnStart = document.getElementById("start-heart-game");

    // INICIAR / REINICIAR
    btnStart.onclick = () => start();

    function start() {
        score = 0;
        time = 30;

        document.getElementById("heart-score").textContent = "Pontos: 0";
        document.getElementById("heart-timer").textContent = "Tempo: 30s";
        document.getElementById("heart-result").textContent = "";
        document.getElementById("hearts-area").innerHTML = "";

        btnStart.textContent = "Reiniciar"; // ⬅ NOVO

        clearInterval(timer);
        clearInterval(spawn);

        timer = setInterval(() => {
            time--;
            document.getElementById("heart-timer").textContent = `Tempo: ${time}s`;

            if (time <= 0) finish();
        }, 1000);

        spawn = setInterval(spawnHeart, 600);
    }

    function spawnHeart() {
        const el = document.createElement("div");
        el.className = "heart";
        el.textContent = "💖";

        el.style.left = Math.random() * 85 + "%";
        el.style.top = Math.random() * 75 + "%";
        el.style.fontSize = (20 + Math.random() * 25) + "px";

        el.onclick = () => {
            score++;
            document.getElementById("heart-score").textContent = `Pontos: ${score}`;
            el.remove();
        };

        document.getElementById("hearts-area").appendChild(el);

        setTimeout(() => el.remove(), 1300);
    }

    // FINAL DO JOGO
    function finish() {
        clearInterval(timer);
        clearInterval(spawn);

        document.getElementById("heart-result").innerHTML =
            `Você pegou <strong>${score}</strong> corações 💘<br>
            Assim como você também conquistou o meu. <br> TE AMO💘`;

        btnStart.textContent = "Jogar de novo";
    }

    // VOLTAR AOS JOGOS
    document.getElementById("back-to-games").onclick = () => {
        gameArea.classList.add("hidden");
        document.getElementById("game-cards").classList.remove("hidden");
    };
}
