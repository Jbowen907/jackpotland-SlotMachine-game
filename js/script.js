document.addEventListener("DOMContentLoaded", () => {
    const playButton = document.getElementById("play-button");
    const message = document.getElementById("message");
    const reels = [
        document.getElementById("reel1"),
        document.getElementById("reel2"),
        document.getElementById("reel3")
    ];
    const symbols = ["🍒", "🍋", "🍉", "⭐", "🍇", "🍊"];

    playButton.addEventListener("click", () => {
        try {
            spinReels();
            checkWin();
        } catch (error) {
            console.error("An error occurred during the game:", error);
        }
    });

    function spinReels() {
        reels.forEach(reel => {
            const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
            reel.textContent = randomSymbol;
        });
    }

    function checkWin() {
        const reel1 = reels[0].textContent;
        const reel2 = reels[1].textContent;
        const reel3 = reels[2].textContent;

        if (reel1 === reel2 && reel2 === reel3) {
            displayMessage("You Win!");
        } else {
            displayMessage("You Lose. Try Again!");
        }
    }

    function displayMessage(msg) {
        message.textContent = msg;
    }
});