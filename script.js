const GAME_VERSION = 102;

let gameData = {
    child1: { name: "Yoni", images: [] },
    child2: { name: "Yoav", images: [] }
};

// Predefined lists of image files
const yoniImages = [
"PXL_20240509_122710380.jpg",
"PXL_20240509_145649050.jpg",
"PXL_20240510_193225095.MP.jpg",
"PXL_20240513_131904286.jpg",
"PXL_20240525_141140349.jpg",
"PXL_20240607_052304451.jpg",
"PXL_20240607_052309066.MP.jpg",
"PXL_20240607_052312435.jpg",
"PXL_20240612_131537512.jpg",
"PXL_20240612_131633302.jpg",
"PXL_20240615_153058061.jpg",
"PXL_20240615_153104973.jpg",
"PXL_20240615_153139208.jpg",
"PXL_20240615_154929333.MP.jpg",
"PXL_20240615_154931634.MP.jpg",
"PXL_20240615_154935911.jpg",
"PXL_20240615_154943946.MP.jpg",
"PXL_20240625_062935182.jpg",
"PXL_20240625_062936309.jpg",
"PXL_20240629_153845701.jpg",
"PXL_20240629_153859977.MP.jpg",
"PXL_20240629_153901405.jpg",
"PXL_20240629_153908151.jpg",
"PXL_20240629_153944800.jpg",
"PXL_20240629_154012045.jpg",
"PXL_20240629_154052662.jpg",
"PXL_20240629_160708895.jpg",
"PXL_20240701_080850161.jpg",
"PXL_20240704_081904080.MP.jpg",
"PXL_20240704_081908178.MP.jpg",
"PXL_20240708_081623806.jpg",
"PXL_20240708_134433282.jpg",
"PXL_20240708_134441432.jpg",
"PXL_20240708_134932243.jpg",
"PXL_20240712_184831347.jpg",
];

const yoavImages = [
"PXL_20220630_002300329.MP.jpg",
"PXL_20220630_002323306.MP.jpg",
"PXL_20220630_003007571.jpg",
"PXL_20220630_003009811.jpg",
"PXL_20220630_003012167.jpg",
"PXL_20220630_064458276.jpg",
"PXL_20220630_064507098.jpg",
"PXL_20220630_064513828.MP.jpg",
"PXL_20220630_065509976.PORTRAIT.jpg",
"PXL_20220630_065707567.MP.jpg",
"PXL_20220630_065709170.jpg",
"PXL_20220630_065713328.MP.jpg",
"PXL_20220630_065714363.jpg",
"PXL_20220630_065715113.MP.jpg",
"PXL_20220630_065715882.MP.jpg",
"PXL_20220630_120947459.jpg",
"PXL_20220702_135035425.jpg",
"PXL_20220702_135038530.jpg",
"PXL_20220702_135043018.jpg",
"PXL_20220702_135047737.jpg",
"PXL_20220702_135102776.jpg",
"PXL_20220703_170346313.jpg",
"PXL_20220703_170348744.jpg",
"PXL_20220703_170353796.jpg",
"PXL_20220703_170403412.jpg",
"PXL_20220704_005710022.jpg",
"PXL_20220704_005717562.MP.jpg",
"PXL_20220704_080305182.MP.jpg",
"PXL_20220704_080307305.jpg",
"PXL_20220704_080315224.LS_exported_66_1656960931625.jpg",
"PXL_20220705_113213659.jpg",
"PXL_20220706_130430941.jpg",
"PXL_20220706_130432052.jpg",
"PXL_20220708_082429133.jpg",
"PXL_20220708_082441255.jpg",
"PXL_20220708_082518577.jpg",
"PXL_20220708_082520229.jpg",
"PXL_20220709_052640930.jpg",
"PXL_20220709_052741988.MP.jpg",
"PXL_20220709_052745221.jpg",
"PXL_20220709_053425422.jpg",
"PXL_20220709_053428260.MP.jpg",
"PXL_20220711_003841345.MP.jpg",
"PXL_20220711_003844578.jpg",
"PXL_20220711_082452981.jpg",
"PXL_20220711_082507025.jpg",
"PXL_20220712_080725108.MP.jpg",
"PXL_20220712_080725896.MP.jpg",
"PXL_20220712_080729426.jpg",
"PXL_20220712_080733072.jpg",
"PXL_20220712_080736097.MP.jpg",
"PXL_20220713_214143915.jpg",
"PXL_20220714_005850635.jpg",
"PXL_20220714_005853048.jpg",
"PXL_20220714_005854048.jpg",
"PXL_20220714_010017021.jpg",
"PXL_20220714_010315025.jpg",
"PXL_20220714_010316890.jpg",
"PXL_20220716_125453002.jpg",
"PXL_20220724_105459520.MP.jpg",
"PXL_20220724_105500745.MP.jpg",
"PXL_20220724_161014460.jpg",
"PXL_20220724_161037463.jpg",
"PXL_20220726_101512738.MP.jpg",
"PXL_20220727_081801044.MP.jpg",
"PXL_20220727_081808144.jpg",
"PXL_20220727_081812014.jpg",
"PXL_20220727_081825378.jpg",
"PXL_20220727_081837613.jpg",
"PXL_20220727_081840096.jpg",
"PXL_20220727_081844097.jpg",
"PXL_20220727_081856288.jpg",
"PXL_20220727_081951421.MP.jpg",
"PXL_20220802_153546274.jpg",
"PXL_20220803_143119774.jpg",
"PXL_20220803_143122816.jpg",
"PXL_20220803_143217126.jpg",
"PXL_20220803_143223646.jpg",
"PXL_20220803_143243788.jpg",
"PXL_20220804_111418943.jpg",
"PXL_20220808_194840966.jpg",
"PXL_20220808_194845509.MP.jpg",
"PXL_20220809_145000210.jpg",
"PXL_20220809_145003258.jpg",
"PXL_20220813_080116689.jpg",
"PXL_20220813_080127673.jpg",
"PXL_20220813_080420447.jpg",
];

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

function initializeGame() {
    console.log(`Initializing game... (Version ${GAME_VERSION})`);

    gameData.child1.images = yoniImages.map(img => `yoni/${img}`);
    gameData.child2.images = yoavImages.map(img => `yoav/${img}`);

    totalRounds = gameData.child1.images.length + gameData.child2.images.length;
    totalRoundsElement.textContent = totalRounds;

    console.log('Total rounds:', totalRounds);
    console.log('Child 1 images:', gameData.child1.images);
    console.log('Child 2 images:', gameData.child2.images);

    startGame();
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
console.log(`Script loaded. Version ${GAME_VERSION}. Waiting for page load to initialize game.`);