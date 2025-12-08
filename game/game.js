console.log("Engine do dashboard carregada 💘");

const cards = document.querySelectorAll("[data-load]");
const gameArea = document.getElementById("game-area");
const menu = document.getElementById("game-cards");

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
