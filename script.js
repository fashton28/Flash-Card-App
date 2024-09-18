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
const container = document.querySelector(".flashcards-container");

const FlashList = [];
let currentIndex = 0;
let bool = true; // Change from const to let

// Load flashcards from local storage
function loadFlashcards() {
    const savedFlashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
    savedFlashcards.forEach(card => {
        const flashCardDiv = createFlashcardElement(card.question, card.answer);
        FlashList.push(flashCardDiv);
    });
    updateFlashcard();
}

// Save flashcards to local storage
function saveFlashcardsToStorage() {
    const flashcardsData = FlashList.map(card => ({
        question: card.querySelector('h3:not(.answer)').textContent,
        answer: card.querySelector('.answer').textContent
    }));
    localStorage.setItem('flashcards', JSON.stringify(flashcardsData));
}

function createFlashcardElement(questionText, answerText) {
    const flashCardDiv = document.createElement('div');
    flashCardDiv.className = 'flash-cards';
    flashCardDiv.innerHTML = `
        <h3>${questionText}</h3>
        <h3 class="answer" style="display: none;">${answerText}</h3>
    `;
    flashCardDiv.addEventListener('click', toggleAnswer);
    return flashCardDiv;
}

function CreateFlash() {
    const flashCardDiv = createFlashcardElement(question.value, answer.value);
    FlashList.push(flashCardDiv);
    updateFlashcard();
    saveFlashcardsToStorage();

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
    const currentFlashcard = FlashList[currentIndex];
    if (currentFlashcard) {
        const questionElement = currentFlashcard.querySelector('h3');
        const answerElement = currentFlashcard.querySelector('.answer');

        if (bool) {
            questionElement.style.display = 'none';
            answerElement.style.display = 'block';
            currentFlashcard.classList.toggle("flipped");

        } else {
            questionElement.style.display = 'block';
            answerElement.style.display = 'none';
            currentFlashcard.classList.toggle("flipped");
        }

        bool = !bool; // Toggle bool after changing display
    }
}

saveButton.addEventListener("click", CreateFlash);
GoRight.addEventListener("click", swipeRight);
GoLeft.addEventListener("click", swipeLeft);

// Load flashcards when the page loads
window.addEventListener('load', loadFlashcards);





