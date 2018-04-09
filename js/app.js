let card = document.querySelectorAll('.card');
let cardList = Array.from(card);

const restart = document.querySelector('.restart');
const deck = document.querySelector('.deck');
let openedCards = [];
let matchedCards = [];

/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
   var currentIndex = array.length, temporaryValue, randomIndex;

   while (currentIndex !== 0) {
       randomIndex = Math.floor(Math.random() * currentIndex);
       currentIndex -= 1;
       temporaryValue = array[currentIndex];
       array[currentIndex] = array[randomIndex];
       array[randomIndex] = temporaryValue;
   }

   return array;
}
window.onload = start();


function start() {

 cards = shuffle(cardList);

   for (let i = 0; i< cards.length; i++) {
     cards[i].classList.remove('open', 'show', 'match');
     deck.appendChild(cards[i]);
}
};

deck.addEventListener('click', function clicked (evt) {

  if (evt.target.className === "card") {
    display(evt);
    addToOpenedCards(evt);
  }  else {
    evt.stopPropagation();
  };
});

function display (evt) {
 evt.target.classList.toggle('open');
 evt.target.classList.toggle('show');
}

function addToOpenedCards (evt) {
   openedCards.push(evt.target);

   if (openedCards.length == 2) {
     if (openedCards[0].innerHTML === openedCards[1].innerHTML){
   matching ();
} else {
  unmatching();
};
};
}

function matching() {
    openedCards[0].classList.remove('open', 'show');
    openedCards[1].classList.remove('open', 'show');
    openedCards[0].classList.toggle('match');
    openedCards[1].classList.toggle('match');
    openedCards = [];
matchedCards.push(openedCards);
  removeOpened();
}

function removeOpened() {
  openedCards = [];
  openedCards.length=0;
};

function unmatching () {
  openedCards[0].classList.remove('open', 'show');
  openedCards[1].classList.remove('open', 'show');
  openedCards = [];
  removeOpened();
}
