//--------------------------------------LEVEL COUNTER---------------------------------------------------------
var level = 0;
var timeoutId; 
function increment() {
  level++;
    console.log(level);
    document.getElementById("counter").innerHTML = level;
}
function changeText(elementId) {
  // Find the specific <p> element by its ID
  var paragraph = document.getElementById("levelText");
  
  paragraph.innerHTML = "You are now level " + (level + 1) + " continue improving";

  function resetTimer() {
    
    // Clear the previous timeout (if any)
    clearTimeout(timeoutId);

    // Set a new timeout
    timeoutId = setTimeout(function() {
        paragraph.innerHTML = "What are you going to do?";
    }, 3000);
}
resetTimer();
 
}

//--------------------------------------STAT-BAR FILLER(+ -)----------------------------------------------------
const INITIAL_FILL = 0; // Initial fill percentage
let stats = {
  strength: INITIAL_FILL,
  dexterity: INITIAL_FILL,
  intelligence: INITIAL_FILL,
  perception: INITIAL_FILL,
  endurance: INITIAL_FILL,
  luck: INITIAL_FILL
}

/**
 * Updates the background of an element with a linear gradient based on the given stat percentage.
 * @param {string} stat - The name of the stat to update.
 */
function updateBarForStat(stat) {
  const elem = document.getElementById(stat);
  elem.style.background = `linear-gradient(orange 0 0) 0/${stats[stat]}% no-repeat rgb(35, 35, 43)`;
}

/**
 * Increases the fill of a progress bar by 10% and updates its background fill.
 * @param {string} stat - The stat to be increased.
 */
function moveadd(stat) {
  // If the current stat + 10 exceeds our limit of 100, set it to 100
  stats[stat] = Math.min(stats[stat] + 10, 100);
  // Update the background fill using the data-filled attribute
  updateBarForStat(stat);
}

/**
 * Moves the sub-bar of a progress bar by increasing its fill by 10%.
 * @param {string} stat - The stat to be decreased.
 */
function movesub(stat) {
  stats[stat] = Math.max(stats[stat] - 10, 0);
  updateBarForStat(stat);
}
//---------------------------------------------------------------------------------------------------------------
