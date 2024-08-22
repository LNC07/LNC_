let score = 0;
let botPurchased = false;
let lastClaimTime = 0;
let clickBoostLevel = 1;
let limitBoostLevel = 1;

function startGame() {
    document.getElementById('clicker-game').style.display = 'flex';
    document.getElementById('start-container').style.display = 'none';
    saveGameState();
}

function clickGame() {
    score += clickBoostLevel;
    updateScoreDisplay();
    saveGameState();
}

function updateScoreDisplay() {
    document.getElementById('score').innerHTML = `<span>🪙 LNC Coin</span>LNC: ${score}`;
}

function withdrawal() {
    document.getElementById('withdrawal-msg').innerText = "Coming Soon";
}

function doTask() {
    score += 100;
    updateScoreDisplay();
    saveGameState();
}

function buyBot() {
    if (score >= 5000 && !botPurchased) {
        score -= 5000;
        botPurchased = true;
        document.getElementById('buy-bot-btn').innerText = "Claim (2000 coins)";
        updateScoreDisplay();
        saveGameState();
    } else if (botPurchased) {
        let currentTime = Date.now();
        if (currentTime - lastClaimTime >= 5 * 60 * 60 * 1000) {
            score += 2000 * limitBoostLevel;
            lastClaimTime = currentTime;
            updateScoreDisplay();
            saveGameState();
        } else {
            alert("You need to wait for 5 hours to claim again!");
        }
    }
}

function showBoostOptions() {
    document.getElementById('boost-overlay').style.display = 'flex';
    document.getElementById('current-level').innerText = clickBoostLevel;
}

function buyClickBoost() {
    let cost = 200 * Math.pow(2, clickBoostLevel - 1);
    if (score >= cost) {
        score -= cost;
        clickBoostLevel++;
        updateScoreDisplay();
        saveGameState();
        alert("Click Boost upgraded!");
        closeBoostOverlay();
    } else {
        alert("Not enough coins to upgrade Click Boost!");
    }
}

function buyLimitBoost() {
    let cost = 200 * Math.pow(2, limitBoostLevel - 1);
    if (score >= cost) {
        score -= cost;
        limitBoostLevel++;
        updateScoreDisplay();
        saveGameState();
        alert("Limit Boost upgraded!");
        closeBoostOverlay();
    } else {
        alert("Not enough coins to upgrade Limit Boost!");
    }
}

function closeBoostOverlay() {
    document.getElementById('boost-overlay').style.display = 'none';
}

function saveGameState() {
    localStorage.setItem('score', score);
    localStorage.setItem('botPurchased', botPurchased);
    localStorage.setItem('lastClaimTime', lastClaimTime);
    localStorage.setItem('clickBoostLevel', clickBoostLevel);
    localStorage.setItem('limitBoostLevel', limitBoostLevel);
}

function loadGameState() {
    score = parseInt(localStorage.getItem('score')) || 0;
    botPurchased = localStorage.getItem('botPurchased') === 'true';
    lastClaimTime = parseInt(localStorage.getItem('lastClaimTime')) || 0;
    clickBoostLevel = parseInt(localStorage.getItem('clickBoostLevel')) || 1;
    limitBoostLevel = parseInt(localStorage.getItem('limitBoostLevel')) || 1;

    updateScoreDisplay();

    if (botPurchased) {
        document.getElementById('buy-bot-btn').innerText = "Claim (2000 coins)";
    }
}

// Load game state as soon as the page loads
loadGameState();
