function loadQuizGame() {

    // ==============================
    //  PERGUNTAS (EDITÁVEIS)
    // ==============================
    const questions = [
        { q: "Em que ano nosso relacionamento começou oficialmente?", a: ["2019", "2020", "2021", "2022"], c: 3 },
        { q: "Quem tomou a iniciativa em um dos nossos primeiros momentos importantes?", a: ["Eu - Ellen", "Você - Vini", "Foi natural", "Não lembro 😂"], c: 1 },
        { q: "Qual desses lugares tem um significado para nós?", a: ["Guarajuba", "Shopping", "Roles de Moto", "Todas as opções"], c: 3 },
        { q: "Qual sentimento melhor descreve o início da nossa história?", a: ["Calmaria", "Borboletas", "Ansiedade boa", "Eu - Ellen nem esperava"], c: 3 },
        { q: "Qual é um hábito nosso que mais combina com a gente?", a: ["Conversar por horas", "Dar risada à toa", "Ficar abraçadinho", "Jurar de dedinho"], c: 3 },
        { q: "Quem é mais carinhoso(a)?", a: ["Eu - Ellen", "Você - Vini", "Depende do dia", "Os dois"], c: 2 },
        { q: "Qual presente deixaria você mais feliz?", a: ["Carta", "Comida", "Beijo surpresa", "Todos"], c: 3 },
        { q: "Qual dessas datas é especial pra nós?", a: ["03/08", "12/10", "01/11", "Nenhuma dessas"], c: 3 }, 
        { q: "Como você me descreveria em uma palavra?", a: ["Incrível", "Chato kkk", "Teimoso", "Amor, incrivel e maravilhoso, vou casa e ter 2 filhos contigo"], c: 3 },
        { q: "Qual desses rolês é mais a nossa cara?", a: ["Café da manhã em um role de moto", "Ver filme", "Todas opções", "Ficar juntinho"], c: 2 },
        { q: "O que você mais gosta em nós dois?", a: ["Conexão", "Química", "Leveza", "Tudo"], c: 3 },
        { q: "Quem sente mais saudade?", a: ["Eu - Ellen", "Você - Vini", "Os dois juntos 😍", "Um pouquinho cada"], c: 2 },
        { q: "Qual dessas cores lembra a gente?", a: ["Vinho", "Rosa", "Branco", "Preto, Vermelho, Azul e Verde "], c: 3 },
        { q: "O que não pode faltar no nosso dia a dia?", a: ["Mensagem", "Carinho", "Sorriso seu", "Tudo isso"], c: 3 },
        { q: "Se nosso amor fosse uma música, seria do…", a: ["Matue", "Pablo", "Djavan", "Todos eles e muitos outros"], c: 3 }
    ];

    // ==============================
    //  HTML DO QUIZ
    // ==============================
    gameArea.innerHTML = `
        <div class="text-center mb-4">
            <h2 class="text-3xl font-bold text-emerald-300">Quiz dos 3 Anos 🧠</h2>
            <p class="text-slate-400 text-sm">Mostre o quanto conhece a nossa história 💞</p>
        </div>

        <div id="quiz-box"
             class="bg-slate-900/70 border border-slate-700 rounded-xl p-4 mb-4 min-h-[180px]"></div>

        <p id="quiz-result" class="text-center text-emerald-300 text-sm font-semibold"></p>

        <div class="flex flex-col items-center gap-3 mt-4">
            <button id="start-quiz"
                class="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-white text-sm rounded-full transition">
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

    // ==============================
    //  LÓGICA
    // ==============================
    let index = 0;
    let correct = 0;

    const btnStart = document.getElementById("start-quiz");

    btnStart.onclick = () => {
        index = 0;
        correct = 0;
        btnStart.textContent = "Reiniciar";
        render();
    };

    function render() {
        if (index >= questions.length) return finish();

        const q = questions[index];

        let html = `<p class="mb-3 font-semibold text-sm">${index + 1}. ${q.q}</p>`;

        q.a.forEach((alt, i) => {
            html += `
                <button data-i="${i}"
                    class="quiz-option w-full px-3 py-2 mb-2 bg-slate-800/60 rounded-lg text-left transition">
                    ${alt}
                </button>`;
        });

        document.getElementById("quiz-box").innerHTML = html;

        const options = document.querySelectorAll(".quiz-option");

        options.forEach(btn => {
            btn.onclick = () => {
                const chosen = parseInt(btn.dataset.i);

                // MARCAR CORRETA
                options[q.c].classList.add("bg-emerald-600", "text-white");

                if (chosen === q.c) {
                    correct++;
                    btn.classList.add("bg-emerald-500");
                } else {
                    btn.classList.add("bg-red-500", "text-white");
                }

                // BLOQUEAR TODAS
                options.forEach(b => (b.style.pointerEvents = "none"));

                // PRÓXIMA PERGUNTA COM DELAY
                setTimeout(() => {
                    index++;
                    render();
                }, 800);
            };
        });
    }

    function finish() {
        document.getElementById("quiz-box").innerHTML = `
            <div class="text-center py-4">
                <p class="text-lg mb-2">✨ Resultado ✨</p>
                <p class="text-sm text-slate-300 mb-3">
                    Você acertou <strong>${correct}</strong> de <strong>${questions.length}</strong> perguntas 🥰
                </p>
                <p class="text-emerald-300 font-semibold">
                    Assim como nas perguntas...<br>
                    você também acertou em cheio o meu coração 💚
                </p>
            </div>
        `;

        btnStart.textContent = "Jogar de novo";
    }

    document.getElementById("back-to-games").onclick = () => {
        gameArea.classList.add("hidden");
        document.getElementById("game-cards").classList.remove("hidden");
    };
}
