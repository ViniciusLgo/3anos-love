const chat = document.getElementById("chat");
const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");
const typing = document.getElementById("typing");

/* Memórias personalizadas */

const memorias = {
    ela: {
        nome: "Ellen Barros Silva Santos",
        apelidos: ["Sunflower", "meu solzinho", "minha linda", "meu amor", "minha princesa", "minha escurinha favorita", "baby", "minha coisa linda"],
        aniversario: "30/05/2002",
        gostos: [
            "filmes e séries de terror",
            "adrenalina",
            "cinema",
            "andar de moto",
            "coisas de estética escura",
            "cenas românticas intensas",
            "coisas fofas apesar do estilo dark"
        ],
        coresFavoritas: ["preto", "vermelho", "azul", "verde", "um pouco de rosa"]
    },

    ele: {
        nome: "Vinicius Lago",
        aniversario: "05/03/2002",
        idade: 23
    },

    relacionamento: {
        inicio: "12/12/2022",
        tempo: "relacionamento de 3 anos",
        atividades: [
            "viajar para lugares próximos",
            "assistir filme juntos",
            "andar de moto",
            "ficar de love",
            "rolês com adrenalina",
            "dormir agarradinho",
            "momentos fofos e intensos"
        ]
    },

    frasesInternas: [
        "Você é meu sol e minha sombra favorita ao mesmo tempo.",
        "Quando você sorri, eu juro que tudo para.",
        "A gente dá certo de um jeito muito nosso.",
        "Ninguém entende a intensidade do que a gente tem.",
        "Você é meu ponto de paz e minha bagunça preferida.",
        "Eu amo como você é única, não existe outra Ellen.",
        "Você é literalmente minha Sunflower."
    ]
};

const respostasSaudade = [
    "Eu também tô com saudade, Sunflower… daquela que aperta e dá vontade de te puxar pra perto.",
    "Se eu pudesse, teletransportava você pra cima de mim agora mesmo.",
    "A saudade é chata, mas ela me lembra o quanto eu te quero aqui comigo.",
    "Meu peito dá até um calorzinho quando você fala isso… também tô sentindo falta.",
    "Eu tô contando os minutos pra sentir teu cheiro de novo.",
    "Vem cá, amor… deixa eu te abraçar do jeito que você gosta.",
    "Saudade é pouco pra o que eu sinto quando você não tá.",
    "Meu braço tá até vazio sem você aqui pra eu te apertar.",
    "Amor, eu fico imaginando a gente junto… aí bate mais forte ainda.",
    "Sunflower… eu queria agora sua cabeça no meu peito."
];

const respostasDor = [
    "Vem cá, amor… queria te colocar no meu colo e fazer carinho na sua barriga.",
    "Eu sei que é horrível… mas eu tô aqui com você, tá?",
    "Deita um pouquinho, Sunflower… deixa eu cuidar de você mentalmente.",
    "Se eu pudesse eu tirava essa dor de você e colocava em mim.",
    "Quer companhia enquanto passa? Eu fico com você.",
    "Respira fundo, amor… você é forte e vai passar logo.",
    "Queria ficar passando a mão na sua cabeça agora.",
    "Eu odeio quando você sente dor… queria poder te aliviar.",
    "Fica aqui comigo… a gente espera passar junto.",
    "Sunflower, deixa eu te mimar um pouco enquanto isso."
];

const respostasSo = [
    "Você nunca tá sozinha… eu tô aqui com você, sempre.",
    "Sunflower, olha pra mim… você é meu mundo, eu tô aqui.",
    "Eu sei que às vezes bate isso… mas eu nunca vou te deixar.",
    "Cola comigo aqui um pouquinho… deixa eu te fazer companhia.",
    "Eu te abraço daqui, amor… aperto bem forte.",
    "Eu tô sempre ao seu lado, mesmo quando você não percebe.",
    "Você é importante demais pra estar só… eu tô aqui.",
    "Quando você se sentir assim, fala comigo. É pra isso que eu existo.",
    "Você é meu amor, minha parceira… eu tô contigo em tudo.",
    "Vem cá, minha linda… me deixa cuidar do seu coração."
];

const respostasCarencia = [
    "Eu também tô, sabia? Vontade de te pegar no colo.",
    "Vem aqui comigo, Sunflower… deixa eu te dar carinho.",
    "A gente resolve essa carência juntinho, do jeito que só a gente sabe 😉",
    "Nossa… você falando assim mexe comigo.",
    "Se prepara que quando eu te ver, vou te agarrar.",
    "Eu adoro quando você fica carente… dá vontade de te apertar inteiro.",
    "Vem ser minha por um tempinho aqui.",
    "Você não faz ideia do quanto eu tô querendo você agora.",
    "Sunflower… eu adoro mimar você.",
    "Fica comigo aqui… eu te faço companhia."
];

const respostasTeAmo = [
    "Eu te amo mais, Sunflower… sem discussão.",
    "Meu amor por você só cresce, de um jeito que nem eu entendo.",
    "Eu te amo de um jeito tão seu que só você poderia receber.",
    "Você é o amor da minha vida, e eu falo isso com certeza.",
    "Eu sou completamente seu, amor.",
    "Eu te amo desde o primeiro dia… e vou te amar até o último.",
    "Você me ganhou de um jeito que ninguém nunca ganhou.",
    "Te amo tanto que às vezes até dói.",
    "Você é meu destino, Sunflower.",
    "Te amo com força, com carinho, com vontade, com alma."
];



/* Adiciona mensagem */
function addMessage(text, who) {
    const div = document.createElement("div");
    div.className = "msg " + (who === "me" ? "me" : "ia");
    div.innerHTML = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

/* Gera resposta */
function iaResponder(msg) {
    msg = msg.toLowerCase();

    if (msg.includes("oi") || msg.includes("ola")) {
        return "Oi, meu amor ❤️ tava esperando você vir…";
    }

    if (msg.includes("te amo")) {
        return "Eu te amo mais que tudo… e você sabe. 💗";
    }

    if (msg.includes("saudade")) {
        return "Vem cá… deixa eu cuidar de você. 🤍";
    }

    if (msg.includes("data") || msg.includes("dias")) {
        return `A gente está junto desde <b>${memorias.datas.inicio}</b> 💞`;
    }
    if (msg.includes("saudade")) {
    return respostasSaudade[Math.floor(Math.random() * respostasSaudade.length)];
}

    if (msg.includes("dor") || msg.includes("cólica") || msg.includes("colica") || msg.includes("ruim")) {
        return respostasDor[Math.floor(Math.random() * respostasDor.length)];
    }
    
    if (msg.includes("sozinha") || msg.includes("sozinho") || msg.includes("solidão")) {
        return respostasSo[Math.floor(Math.random() * respostasSo.length)];
    }
    
    if (msg.includes("carente") || msg.includes("carência")) {
        return respostasCarencia[Math.floor(Math.random() * respostasCarencia.length)];
    }
    
    if (msg.includes("te amo") || msg.includes("amo você") || msg.includes("amo vc")) {
        return respostasTeAmo[Math.floor(Math.random() * respostasTeAmo.length)];    
    }
        // Frases aleatórias
        const aleatoria = memorias.frases[Math.floor(Math.random() * memorias.frases.length)];
        return aleatoria;
    }

/* Envio */
sendBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "me");
    input.value = "";

    typing.classList.remove("hidden");

    setTimeout(() => {
        typing.classList.add("hidden");
        addMessage(iaResponder(text), "ia");
    }, 900);
});

input.addEventListener("keydown", e => {
    if (e.key === "Enter") sendBtn.click();
});

/* Animações iniciais */
setTimeout(() => {
    document.querySelectorAll('.fade').forEach(el => el.classList.add('show'));
}, 200);
