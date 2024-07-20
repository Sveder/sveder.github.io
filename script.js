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

async function initializeGame() {
    console.log('Initializing game...');
    try {
        gameData.child1.images = await getImagesFromDirectory('yoni');
        gameData.child2.images = await getImagesFromDirectory('yoav');

        totalRounds = gameData.child1.images.length + gameData.child2.images.length;
        totalRoundsElement.textContent = totalRounds;

        console.log('Total rounds:', totalRounds);
        console.log('Child 1 images:', gameData.child1.images);
        console.log('Child 2 images:', gameData.child2.images);

        startGame();
    } catch (error) {
        console.error('Error initializing game:', error);
        messageElement.textContent = "Error loading images. Please check the console for details.";
    }
}

async function getImagesFromDirectory(directory) {
    console.log(`Fetching images from ${directory}...`);
    const response = await fetch(`${directory}/`);
    const text = await response.text();
    const parser = new DOMParser();
    const html = parser.parseFromString(text, 'text/html');
    const links = Array.from(html.querySelectorAll('a'));
    return links
        .map(link => link.href)
        .filter(href => href.match(/\.(jpg|jpeg|png|gif)$/i))
        .map(href => new URL(href).pathname);
}

function startGame() {
    console.log('Starting game...');
    nextRound();
}

function nextRound() {
    console.log('Starting next round...');
    if (currentRound >= totalRounds) {
        console.log('All rounds completed. Ending game.');
        endGame();
        return;
    }

    currentRound++;
    roundElement.textContent = currentRound;
    console.log('Current round:', currentRound);

    const randomChild = Math.random() < 0.5 ? gameData.child1 : gameData.child2;
    currentChild = randomChild;
    console.log('Current child:', currentChild.name);

    if (currentChild.images.length === 0) {
        console.log('No more images for this child. Ending game.');
        endGame();
        return;
    }

    const randomIndex = Math.floor(Math.random() * currentChild.images.length);
    const imageUrl = currentChild.images.splice(randomIndex, 1)[0];
    console.log('Selected image:', imageUrl);

    imageElement.style.opacity = '0';
    setTimeout(() => {
        imageElement.src = imageUrl;
        imageElement.style.opacity = '1';
        console.log('Image displayed');
    }, 300);

    messageElement.textContent = "";
}

function checkGuess(guessedChild) {
    console.log('Checking guess...');
    console.log('Guessed child:', guessedChild.name);
    console.log('Correct child:', currentChild.name);

    const imageContainer = document.getElementById('image-container');

    if (guessedChild === currentChild) {
        score++;
        scoreElement.textContent = score;
        messageElement.textContent = "Correct!";
        imageContainer.classList.add('correct-animation');
        messageElement.style.color = '#4CAF50';
        console.log('Correct guess. New score:', score);
    } else {
        messageElement.textContent = `Incorrect. It was ${currentChild.name}.`;
        imageContainer.classList.add('incorrect-animation');
        messageElement.style.color = '#f44336';
        console.log('Incorrect guess. Score remains:', score);
    }

    setTimeout(() => {
        imageContainer.classList.remove('correct-animation', 'incorrect-animation');
        messageElement.style.color = '';
        console.log('Animations reset');
    }, 500);

    console.log('Starting next round in 1.5 seconds...');
    setTimeout(nextRound, 1500);
}

function endGame() {
    console.log('Game ended.');
    imageElement.style.display = "none";
    child1Btn.style.display = "none";
    child2Btn.style.display = "none";
    messageElement.textContent = `Game Over! Your score: ${score}/${totalRounds}`;
    console.log(`Final score: ${score}/${totalRounds}`);
}

// Initialize the game when the page loads
window.addEventListener('load', initializeGame);
console.log('Script loaded. Waiting for page load to initialize game.');