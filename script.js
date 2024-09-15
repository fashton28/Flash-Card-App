//DOM objects

const form = document.getElementById("flashcard-form");
//Form elements
const question = document.getElementById("question");
const answer = document.getElementById("answer");
//Flashcard
const flashcard = document.querySelector(".flash-cards");
//Save and swipe buttons
const saveButton = document.querySelector(".btn-save");
const GoRight = document.getElementById("Buttonright");
const GoLeft = document.getElementById("Buttonleft");

const FlashList = [];
let currentIndex = 0;

function CreateFlash() {
    const flashCardDiv = document.createElement('div');
    flashCardDiv.className = 'flash-cards';
    flashCardDiv.innerHTML = `
        <h3>${question.value}</h3>
        <p class="answer" style="display: none; >${answer.value}</p>
    `;
    FlashList.push(flashCardDiv);

    updateFlashcard();
    
    // Clear input fields
    question.value = '';
    answer.value = '';
}

function updateFlashcard() {
    const existingFlashcard = document.querySelector('.flash-cards');
    if (FlashList.length > 0) {
        if (existingFlashcard) {
            existingFlashcard.replaceWith(FlashList[currentIndex]);
        } else {
            flashcard.appendChild(FlashList[currentIndex]);
        }
    } else {
        if (existingFlashcard) {
            existingFlashcard.remove();
        }
    }
}

function swipeRight() {
    if (FlashList.length > 0) {
        currentIndex = (currentIndex + 1) % FlashList.length;
        updateFlashcard();
    }
}

function swipeLeft() {
    if (FlashList.length > 0) {
        currentIndex = (currentIndex - 1 + FlashList.length) % FlashList.length;
        updateFlashcard();
    }
}

function toggleAnswer() {
    
}

saveButton.addEventListener("click", CreateFlash);
GoRight.addEventListener("click", swipeRight);
GoLeft.addEventListener("click", swipeLeft);
flashcard.addEventListener("click", toggleAnswer);




