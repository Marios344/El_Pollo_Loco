/**
 * Displays the instructions screen and hides the start screen buttons.
 */
function goToInstructions() {
  let instructions = document.getElementById("instructions");
  let buttons = document.getElementById("start-screen-layout");

  if ((instructions.style.display = "none")) {
    instructions.style.display = "block";
    buttons.style.display = "none";
  }
}

/**
 * Closes the instructions screen and displays the start screen buttons.
 */
function closeInstructions() {
  let instructions = document.getElementById("instructions");
  let buttons = document.getElementById("start-screen-layout");

  if ((instructions.style.display = "block")) {
    instructions.style.display = "none";
    buttons.style.display = "flex";
  }
}

/**
 * Returns you back to the homepage.
 */
function goBack() {
  window.location = "./index.html";
}