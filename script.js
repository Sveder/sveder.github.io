let gameData = {
    child1: { name: "", images: [] },
    child2: { name: "", images: [] }
};

let currentRound = 0;
let score = 0;
let currentChild;
let totalRounds = 0;

const selectFoldersBtn = document.getElementById("select-folders");
const startGameBtn = document.getElementById("start-game");
const child1NameInput = document.getElementById("child1-name");
const child2NameInput = document.getElementById("child2-name");
const setupDiv = document.getElementById("setup");
const gameDiv = document.getElementById("game");
const imageElement = document.getElementById("child-image");
const child1Btn = document.getElementById("child1-btn");
const child2Btn = document.getElementById("child2-btn");
const scoreElement = document.getElementById("score-value");
const roundElement = document.getElementById("round-value");
const totalRoundsElement = document.getElementById("total-rounds");
const messageElement = document.getElementById("message");

selectFoldersBtn.addEventListener("click", selectFolders);
startGameBtn.addEventListener("click", startGame);
child1Btn.addEventListener("click", () => checkGuess(gameData.child1));
child2Btn.addEventListener("click", () => checkGuess(gameData.child2));

async function selectFolders() {
    try {
        const dirHandle1 = await window.showDirectoryPicker();
        const dirHandle2 = await window.showDirectoryPicker();

        gameData.child1.images = await loadImagesFromFolder(dirHandle1);
        gameData.child2.images = await loadImagesFromFolder(dirHandle2);

        totalRounds = gameData.child1.images.length + gameData.child2.images.length;
        startGameBtn.disabled = false;
        messageElement.textContent = "Folders selected successfully!";
    } catch (error) {
        console.error("Error selecting folders:", error);
        messageElement.textContent = "Error selecting folders. Please try again.";
    }
}

async function loadImagesFromFolder(dirHandle) {
    const images = [];
    for await (const entry of dirHandle.values()) {
        if (entry.kind === "file" && entry.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
            const file = await entry.getFile();
            const imageUrl = URL.createObjectURL(file);
            images.push(imageUrl);
        }
    }
    return images;
}

function startGame() {
    gameData.child1.name = child1NameInput.value || "Child 1";
    gameData.child2.name = child2NameInput.value || "Child 2";

    child1Btn.textContent = gameData.child1.name;
    child2Btn.textContent = gameData.child2.name;
    totalRoundsElement.textContent = totalRounds;

    setupDiv.style.display = "none";
    gameDiv.style.display = "block";

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