// Variable to record the number of attempts made by the user with the lowest score
let recordNumber = (localStorage.getItem("recordNumber") != null) ? parseInt(localStorage.getItem("recordNumber")) : 20; 

// Get the record element and refreshes the record display
const record = document.getElementsByTagName('span')[0];
record.innerText = `Record: ${recordNumber} essais`;

// Get the reset button element and add event listener to the reset button to reset the game when clicked
const reset = document.getElementById("reset-button");
reset.addEventListener("click", function() {
  localStorage.setItem("recordNumber", 20);
  record.innerText = `Record: 20 essais`;
  alert("Le jeu a été réinitialisé.");
});

/* Function to update the record if the current number of attempts is lower than the record
    @param {number} attempts - The current number of attempts made by the user
    @param {number} recordNumber - The current record number */
function updateRecord(attempts,recordNumber) {
  if (attempts < recordNumber) {
    localStorage.setItem("recordNumber", attempts);
    recordNumber = attempts;
  } 
  record.innerText = `Record: ${recordNumber} essais`;
}

/* [Eng] Function to check if the user's guess is correct
    @param {number} userGuess - The user's guess
    return {boolean} - True if the guess is correct, false otherwise */
function checkGuess(userGuess, numberToGuess) {
  attempts++;
  if (userGuess === numberToGuess) {
    alert(`Félicitations! Vous avez deviné le nombre correct en ${attempts} tentatives.`);
    updateRecord(attempts,recordNumber);
    return true
  } else if (userGuess < numberToGuess) {
    alert("C'est plus! Essayez encore.");
    } else {
        alert("C'est moins! Essayez encore.");
      }
  return false;
}
        
// Main loop to keep asking the user for guesses until they win or make too many attempts
function playGame() {
  let isfound = false;
  attempts = 0;

  // Get the value after each game
  recordNumber = (localStorage.getItem("recordNumber") != null) ? parseInt(localStorage.getItem("recordNumber")) : 20;

  // Definition of the number to guess
  let numberToGuess = Math.floor(Math.random() * 100) + 1;

  while (isfound === false && attempts < 20) {
    // Prompt the user for a guess and validate it
    let userGuess = parseInt(prompt("Veuillez saisir votre proposition (entre 1 et 100):"));
              
    // Check if the guess is valid and continue if not
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
      alert("Veuillez saisir un nombre entier entre 1 et 100.");
      continue;
    }
              
    // Check if the guess is correct and stop the loop if it is
    isfound = checkGuess(userGuess, numberToGuess);   
    if (attempts >= 20) {
      alert("Vous avez atteint le nombre maximum de tentatives. Le nombre à trouver était " + numberToGuess + ".");
      break;
    }
  }
  return attempts;
}

// Get the play button element and add event listener to the play button to start the game when clicked
const playButton = document.getElementById("play-button");
playButton.addEventListener("click", playGame);