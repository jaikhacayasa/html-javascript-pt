const symbols = ["🍎","🍌","🍇","🍒","🍍","🥝","🍉","🍓"];
let cards = [...symbols, ...symbols]; // duplicate

cards.sort(() => 0.5 - Math.random()); // shuffle

const board = document.getElementById("gameBoard");

// score system
let score = 0;
const scoreDisplay = document.getElementById("score");

let firstCard = null;
let secondCard = null;
let lockBoard = false;

// create cards
cards.forEach(symbol => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.symbol = symbol;
  card.innerHTML = "?";

  card.addEventListener("click", flipCard);

  board.appendChild(card);
});

function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.classList.add("flipped");
  this.innerHTML = this.dataset.symbol;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  checkMatch();
}

function checkMatch() {
  if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    score += 10; // correct match
    updateScore();

    resetBoard();
    checkWin();
  } else {
    score -= 2; // wrong match
    updateScore();

    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");

      firstCard.innerHTML = "?";
      secondCard.innerHTML = "?";

      resetBoard();
    }, 1000);
  }
}

function updateScore() {
  scoreDisplay.textContent = score;
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

function checkWin() {
  const matchedCards = document.querySelectorAll(".matched");
  if (matchedCards.length === cards.length) {
    setTimeout(() => {
      alert("🎉 You Win! Final Score: " + score);
    }, 300);
  }
}