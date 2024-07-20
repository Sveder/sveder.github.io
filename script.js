let gameData = {
    child1: { name: "Yoni", images: [] },
    child2: { name: "Yoav", images: [] }
};

let currentRound = 0;
let score = 0;
let currentChild;
let totalRounds = 0;

const imageElement = document.getElementById("child-image");
const child1Btn = document.getElementById("child1-btn");
const child2Btn = document.getElementById("child2-btn");
const scoreElement = document.getElementById("score-value");
const roundElement = document.getElementById("round-value");
const totalRoundsElement = document.getElementById("total-rounds");
const messageElement = document.getElementById("message");

child1Btn.addEventListener("click", () => checkGuess(gameData.child1));
child2Btn.addEventListener("click", () => checkGuess(gameData.child2));

// Load images from predefined directories
async function loadImages() {
    const loadImagesFromDir = async (dirName) => {
        const response = await fetch(`${dirName}/`);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const links = Array.from(doc.querySelectorAll('a'));
        return links
            .map(link => link.href)
            .filter(href => href.match(/\.(jpg|jpeg|png|gif)$/i));
    };

    gameData.child1.images = await loadImagesFromDir('yoni');
    gameData.child2.images = await loadImagesFromDir('yoav');

    totalRounds = gameData.child1.images.length + gameData.child2.images.length;
    totalRoundsElement.textContent = totalRounds;

    startGame();
}

function startGame() {
    nextRound();
}

function nextRound() {
    if (currentRound >= totalRounds) {
        endGame();
        return;
    }

    currentRound++;
    roundElement.textContent = currentRound;

    const randomChild = Math.random() < 0.5 ? gameData.child1 : gameData.child2;
    currentChild = randomChild;

    const randomIndex = Math.floor(Math.random() * randomChild.images.length);
    const imageUrl = randomChild.images.splice(randomIndex, 1)[0];
    
    imageElement.style.opacity = '0';
    setTimeout(() => {
        imageElement.src = imageUrl;
        imageElement.style.opacity = '1';
    }, 300);

    messageElement.textContent = "";
}

function checkGuess(guessedChild) {
    const imageContainer = document.getElementById('image-container');
    
    if (guessedChild === currentChild) {
        score++;
        scoreElement.textContent = score;
        messageElement.textContent = "Correct!";
        imageContainer.classList.add('correct-animation');
        messageElement.style.color = '#4CAF50';
    } else {
        messageElement.textContent = `Incorrect. It was ${currentChild.name}.`;
        imageContainer.classList.add('incorrect-animation');
        messageElement.style.color = '#f44336';
    }

    setTimeout(() => {
        imageContainer.classList.remove('correct-animation', 'incorrect-animation');
        messageElement.style.color = '';
    }, 500);

    setTimeout(nextRound, 1500);
}

function endGame() {
    imageElement.style.display = "none";
    child1Btn.style.display = "none";
    child2Btn.style.display = "none";
    messageElement.textContent = `Game Over! Your score: ${score}/${totalRounds}`;
}

// Start loading images when the page loads
window.addEventListener('load', loadImages);