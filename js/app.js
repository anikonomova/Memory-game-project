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


function startGame() {

 cards = shuffle(cardList);

   for (let i = 0; i< cards.length; i++) {
     cards[i].classList.remove('open', 'show', 'match');
     deck.appendChild(cards[i]);
}
};

deck.addEventListener('click', function (evt) {

  if (evt.target.className === "card" && openedCards.length < 2) {
    display(evt);
    addToOpenedCards(evt);
  }
  else {
    evt.stopPropagation();
  }
});

function display (evt) {
 evt.target.classList.toggle('open');
 evt.target.classList.toggle('show');
}

function addToOpenedCards (evt) {
   openedCards.push(evt.target);

   if (openedCards.length === 2) {
   matching ();
};
}

function matching(evt) {
  if (openedCards[0].className === openedCards[1].className){
    openedCards[0].classList.remove('open', 'show');
    openedCards[1].classList.remove('open', 'show');
    openedCards[0].classList.toggle('match');
    openedCards[1].classList.toggle('match');
    openedCards = [];
  };
  removeOpened(evt);
}

function removeOpened(evt) {
  openedCards[0].classList.remove('open', 'show');
  openedCards[1].classList.remove('open', 'show');
  openedCards = [];
  openedCards.length=0;
};
