// DOM elements
const questionInput = document.querySelector('.question');
const answerInput = document.querySelector('.answer');
const saveButton = document.querySelector('.save');
const flashcard = document.querySelector('.flashcard');
const prevButton = document.querySelector('.left');
const nextButton = document.querySelector('.right');

// State
let flashcards = [];
let currentIndex = 0;

// Add flashcard
function addFlashcard() {
  const question = questionInput.value.trim();
  const answer = answerInput.value.trim();
  
  if (question && answer) {
    flashcards.push({ question, answer });
    questionInput.value = '';
    answerInput.value = '';
    currentIndex = flashcards.length - 1; // Show the latest added flashcard
    updateFlashcardDisplay();
  } else {
    alert('Please enter both a question and an answer.');
  }
}

// Update flashcard display
function updateFlashcardDisplay() {
  if (flashcards.length === 0) {
    flashcard.innerHTML = '<p>No flashcards yet. Add some!</p>';
    flashcard.classList.remove('flipped');
    return;
  }

  const { question, answer } = flashcards[currentIndex];
  flashcard.innerHTML = `
    <div class="flashcard-inner">
      <div class="front">${escapeHTML(question)}</div>
      <div class="back">${escapeHTML(answer)}</div>
    </div>
  `;
  flashcard.classList.remove('flipped');
}

// Flip card
function flipCard() {
  if (flashcards.length === 0) return;
  flashcard.classList.toggle('flipped');
}

// Navigate to previous card
function prevCard() {
  if (flashcards.length === 0) return;
  currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
  updateFlashcardDisplay();
}

// Navigate to next card
function nextCard() {
  if (flashcards.length === 0) return;
  currentIndex = (currentIndex + 1) % flashcards.length;
  updateFlashcardDisplay();
}

// Escape HTML to prevent XSS
function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Event listeners
saveButton.addEventListener('click', addFlashcard);
prevButton.addEventListener('click', prevCard);
nextButton.addEventListener('click', nextCard);
flashcard.addEventListener('click', flipCard);

// Optional: Handle Enter key for adding flashcards
document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    addFlashcard();
  }
});

// Initial display update
updateFlashcardDisplay();
