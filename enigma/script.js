/* ============================================================
   CORAÇÕES FLUTUANDO (GERAL DO SITE)
============================================================ */
function spawnHearts() {
    const container = document.getElementById("hearts-container");

    setInterval(() => {
        const h = document.createElement("div");
        h.classList.add("heart");
        h.innerHTML = "💗";

        h.style.left = Math.random() * 100 + "vw";
        h.style.fontSize = (Math.random() * 12 + 12) + "px";
        h.style.animationDuration = (Math.random() * 3 + 3) + "s";

        container.appendChild(h);

        setTimeout(() => h.remove(), 7000);
    }, 450);
}

spawnHearts();

/* ============================================================
   MÚSICA GLOBAL
============================================================ */
function toggleMusic() {
    const audio = document.getElementById("bg-music");
    audio.muted = !audio.muted;
}


/* ============================================================
   DESAFIO FINAL — Revelar Imagem aos Poucos
============================================================ */
const revealImg = document.getElementById("reveal-img");
const finalBtn = document.getElementById("final-btn");

if (revealImg) {
    let blurLevel = 35; // começa borrado

    revealImg.onclick = () => {
        blurLevel -= 7; // cada clique revela mais

        if (blurLevel < 0) blurLevel = 0;

        revealImg.style.filter = `blur(${blurLevel}px)`;

        // quando chegar a zero → libera o botão final
        if (blurLevel === 0) {
            finalBtn.style.display = "inline-block";
        }
    };
}
