//List & Variables
const icons = [
  "far fa-smile", "far fa-smile",
  "far fa-surprise", "far fa-surprise",
  "far fa-meh", "far fa-meh",
  "far fa-kiss-wink-heart", "far fa-kiss-wink-heart",
  "far fa-angry", "far fa-angry",
  "far fa-dizzy", "far fa-dizzy",
  "far fa-sad-tear", "far fa-sad-tear",
  "far fa-frown", "far fa-frown",
];

const cardsContainer = document.querySelector(".deck");
let shuffCards = shuffle(icons);
let openedCards = [];
let matchedCards = [];


//Game Initization
function cardDeck() {
  for (let i = 0; i < icons.length; i++) {
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<i class = "${icons[i]}"></i>`;
    cardsContainer.appendChild(card);

    //Click event to each card
    click(card);
  }
}

//Click Event
let firstClick = true;


function click(card) {

  //Card Click Event
  card.addEventListener("click", function() {

    if (firstClick) {
      // Start our timer
      startTimer();
      firstClick = false;
    }

    const currentCard = this;
    const previousCard = openedCards[0];



    //We have an exisitng opened card
    if (openedCards.length === 1) {
      card.classList.add("open", "show", "disable");
      openedCards.push(this);

      //Compare 2 opened cards
      compare(currentCard, previousCard);

    } else {
      //Don't have any opened cards
      currentCard.classList.add("open", "show", "disable");
      openedCards.push(this);
    }

  });

}

//Compare opened Cards
function compare(currentCard, previousCard) {

  //Matcher
  if (currentCard.innerHTML === previousCard.innerHTML) {

    //Matched
    currentCard.classList.add("match");
    previousCard.classList.add("match");

    matchedCards.push(currentCard, previousCard);

    openedCards = [];

    //Check if game is over
    isItOver();

  } else {
    setTimeout(function() {
      currentCard.classList.remove("open", "show", "disable");
      previousCard.classList.remove("open", "show", "disable");

    }, 500);
    openedCards = [];
  }

  //Add New Move
  addMove();
}


//Check if game is over
function isItOver() {
  let totalStars = document.getElementsByClassName('fa fa-star').length;
  let totalTime = timerContainer.innerHTML;
  if (matchedCards.length === icons.length) {
    stopTimer();
    swal({
      title: "Nice, you've finished!",
      text: 'Play again and beat your personal best!! \n' +
        'You scored a star rating of ' + totalStars + ' with a time of ' + totalTime,
      icon: "success",
      button: "Play again!"
    }).then(function(isConfirm) {
      if (isConfirm) {
        cardsContainer.innerHTML = "";
        cardDeck();
        reset();
      }
    })

  }

}
//Add Moves
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;

function addMove() {
  moves++;
  movesContainer.innerHTML = moves;


  //Set rating
  rating();
}


//Rating
const starsContainer = document.querySelector(".stars");
starsContainer.innerHTML = `
<li><i class="fa fa-star"></i></li>
<li><i class="fa fa-star"></i></li>
<li><i class="fa fa-star"></i></li>
`;

function rating() {
  switch (moves) {
    case 18:
      starsContainer.innerHTML = `
      <li><i class="fa fa-star"></i></li>
      <li><i class="fa fa-star"></i></li>
    `;
      break;

    case 25:
      starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;
  }
}

//Timer
const timerContainer = document.querySelector(".timer");
let liveTimer,
  totalSeconds = 0;


// Set the default value to the timer's container
timerContainer.innerHTML = totalSeconds + ' sec';

function startTimer() {
  liveTimer = setInterval(function() {
    // Increase the totalSeconds by 1
    totalSeconds++;
    // Update the HTML Container with the new time
    timerContainer.innerHTML = totalSeconds + 'sec';
  }, 1000);
}

function stopTimer() {
  clearInterval(liveTimer);
}


//Restart button
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() {
  //Delete cards
  cardsContainer.innerHTML = "";
  cardDeck();
  reset();

});



function reset() {
  //Reset variables
  openedCard = [];
  matchedCards = [];
  moves = 0;
  movesContainer.innerHTML = moves;
  starsContainer.innerHTML = `
  <li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>
  `;
  let shuffCards = shuffle(icons);

  stopTimer();
  firstClick = true;
  totalSeconds = 0;
  timerContainer.innerHTML = totalSeconds + "s";

}


//Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

//Start the game for the first time
cardDeck();
