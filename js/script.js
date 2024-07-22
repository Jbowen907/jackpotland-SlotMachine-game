document.addEventListener("DOMContentLoaded", () => {
    const playButton = document.getElementById("play-button");
    const message = document.getElementById("message");
    const paytableButton = document.getElementById("paytable-button");
    const paytable = document.getElementById("paytable");
    const rulesButton = document.getElementById("rules-button");
    const rules = document.getElementById("rules");
    const scoreDisplay = document.getElementById('score');
    let score = 100;
    let currentBet = 0;
    updateScore();

    const reels = [
        document.getElementById("reel1"),
        document.getElementById("reel2"),
        document.getElementById("reel3")
    ];

    const symbols = ["🍒", "🍋", "🍉", "⭐", "🍇", "🍊"];
    const baseScores = {
        "🍒": 10,
        "🍋": 15,
        "🍉": 20,
        "⭐": 25,
        "🍇": 30,
        "🍊": 35
    };

    // Adjusted weights for symbols to achieve the desired winning probability
    const weightedSymbols = [
        "🍒", "🍋", "🍉", "⭐", "🍇", "🍊",
        "🍒", "🍋", "🍉", "⭐", "🍇", "🍊",
        "🍒", "🍋", "🍉", "⭐", "🍇", "🍊",
        "🍒", "🍋", "🍉", "⭐", "🍇", "🍊",
        "🍒", "🍋", "🍉", "⭐", "🍇", "🍊",
        "🍒", "🍋", "🍉", "⭐", "🍇", "🍊",
        "🍒", "🍋", "🍉", "⭐", "🍇", "🍊",
        "🍒", "🍋", "🍉", "⭐", "🍇", "🍊",
        "🍒", "🍋", "🍉", "⭐", "🍇", "🍊",
        "🍒", "🍒", "🍒", "🍋", "🍋", "🍋",
        "🍉", "🍉", "🍉", "🍒", "🍋", "🍉", 
        "🍒", "🍋", "🍉"
    ];

    const betButtons = document.querySelectorAll('.bet-button');

    betButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentBet = parseInt(button.dataset.bet);
            displayMessage(`You selected a bet of $${currentBet}`);
        });
    });

    playButton.addEventListener("click", () => {
        if (currentBet > 0) {
            if (score >= currentBet) {
                score -= currentBet;
                spinReels();
                checkWin();
                updateScore();
            } else {
                displayMessage("Not enough funds to place this bet. Please choose a smaller amount.");
            }
        } else {
            displayMessage("Please select a bet amount before playing.");
        }
    });

    paytableButton.addEventListener("click", () => {
        paytable.style.display = paytable.style.display === "none" ? "block" : "none";
    });

    rulesButton.addEventListener("click", () => {
        rules.style.display = rules.style.display === "none" ? "block" : "none";
    });

    function spinReels() {
        reels.forEach(reel => {
            const randomSymbol = weightedSymbols[Math.floor(Math.random() * weightedSymbols.length)];
            reel.textContent = randomSymbol;
            reel.style.animation = 'none';
            requestAnimationFrame(() => {
                reel.style.animation = '';
            });
        });
    }

    function checkWin() {
        const reel1 = reels[0].textContent;
        const reel2 = reels[1].textContent;
        const reel3 = reels[2].textContent;

        if (reel1 === reel2 && reel2 === reel3) {
            score += baseScores[reel1] * 5;
            displayMessage("You Win!");
        } else {
            displayMessage("You Lose. Try Again!");
        }
    }

    function displayMessage(msg) {
        message.textContent = msg;
    }

    function updateScore() {
        if (scoreDisplay) {
            scoreDisplay.textContent = `Balance: $${score.toFixed(2)}`;
        }
    }
});