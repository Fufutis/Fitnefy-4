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
//--------------------------------------USERNAME DISPLAY-----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // Check if the #intro element exists on the page
  const introElement = document.getElementById('intro');
  if (introElement) {
      // Retrieve the username from localStorage
      const username = localStorage.getItem('username');
      // If a username exists in localStorage, display it
      if (username) {
          introElement.textContent = `Hello, ${username}!`;
      }
  }
});
//--------------------------------------Upgrades--------------------------------------------------------->
document.addEventListener('DOMContentLoaded', () => {
    // Load saved progression and click count data when the page loads
    loadProgression();
    updateProgressBars(); // Initialize progress bars with saved data
});

let clickCounts = {};

function updateReps(id) {
    if (!clickCounts[id]) {
        // Retrieve the click count from localStorage if it exists
        clickCounts[id] = parseInt(localStorage.getItem(`clickCount-${id}`)) || 0;
    }

    const repsDiv = document.querySelector(`#${id}`);
    if (!repsDiv) {
        console.error(`Element with id "${id}" not found.`);
        return;
    }

    const currentText = repsDiv.innerText;
    const weightMatches = currentText.match(/(\d+)\s*Sets\s*of\s*(\d+)-(\d+)\s*Reps,\s*Weight:\s*(\d+\.?\d*)\s*kg/);
    const noWeightMatches = currentText.match(/(\d+)\s*Sets\s*of\s*(\d+)-(\d+)\s*Reps/);
    const enduranceMatches = currentText.match(/(\d+)\s*minutes,\s*(.*)/);
    const setsOfMinutesMatches = currentText.match(/(\d+)\s*Sets\s*of\s*(\d+)\s*minutes/);

    if (weightMatches) {
        let sets = parseInt(weightMatches[1]);
        let minReps = parseInt(weightMatches[2]);
        let maxReps = parseInt(weightMatches[3]);
        let weight = parseFloat(weightMatches[4]);

        if (clickCounts[id] % 6 < 2) { // Reps + 2
            minReps += 2;
            maxReps += 2;
        } else if (clickCounts[id] % 6 == 2) { // Set + 1 and Reps - 4
            sets += 1;
            minReps -= 4;
            maxReps -= 4;
        } else if (clickCounts[id] % 6 < 5) { // Reps + 2
            minReps += 2;
            maxReps += 2;
        } else { // Weight + 2.5kg, Set - 1, and Reps - 4
            weight += 2.5;
            sets = Math.max(1, sets - 1);
            minReps -= 4;
            maxReps -= 4;
        }

        repsDiv.innerText = `${sets} Sets of ${minReps}-${maxReps} Reps, Weight: ${weight} kg`;
    } else if (noWeightMatches) {
        let sets = parseInt(noWeightMatches[1]);
        let minReps = parseInt(noWeightMatches[2]);
        let maxReps = parseInt(noWeightMatches[3]);

        if (clickCounts[id] % 6 < 2) { // Reps + 2
            minReps += 2;
            maxReps += 2;
        } else {
            minReps += 4;
            maxReps += 4;
        }

        repsDiv.innerText = `${sets} Sets of ${minReps}-${maxReps} Reps`;
    } else if (enduranceMatches) {
        let minutes = parseInt(enduranceMatches[1]);
        let originalMinutes = parseInt(enduranceMatches[1]);
        let pace = enduranceMatches[2];

        if (clickCounts[id] % 4 == 0) { // Increase duration by 5 minutes
            minutes += 5;
        } else if (clickCounts[id] % 4 == 1) { // Increase duration by another 5 minutes
            minutes += 5;
        } else if (clickCounts[id] % 4 == 2) { // Decrease duration by 15 minutes and increase pace
            minutes -= 15;
            if (!pace.includes("Increased")) {
                pace = `Increased ${pace}`;
            }
        } else { // Increase duration by 20 minutes from the original state without the increased pace
            minutes = originalMinutes + 20;
            pace = pace.replace("Increased ", "");
        }

        repsDiv.innerText = `${minutes} minutes, ${pace}`;
    } else if (setsOfMinutesMatches) {
        let sets = parseInt(setsOfMinutesMatches[1]);
        let minutes = parseInt(setsOfMinutesMatches[2]);

        if (clickCounts[id] % 3 == 0) { // Increase minutes by 1
            minutes += 1;
        } else if (clickCounts[id] % 3 == 1) { // Increase sets by 1
            sets += 1;
        } else { // Decrease sets by 1 and increase minutes by 2
            sets = Math.max(1, sets - 1);
            minutes += 2;
        }

        repsDiv.innerText = `${sets} Sets of ${minutes} minutes`;
    }

    // Increment click count
    clickCounts[id]++;

    // Save progression and click count to localStorage
    saveProgression(id, repsDiv.innerText);
    saveClickCount(id, clickCounts[id]);

    // Update progress bar
    updateProgressBar(id);
}

/**
 * Update the progress bar's background based on the click count.
 * @param {string} id - The id of the workout.
 */
function updateProgressBar(id) {
    const progressBar = document.querySelector(`.${id}-progress`);
    if (progressBar) {
        const progressPercentage = Math.min((clickCounts[id] / 10) * 100, 100);
        progressBar.style.background = `linear-gradient(orange 0 0) 0/${progressPercentage}% no-repeat var(--secondary-color)`;
    }
}

/**
 * Initialize all progress bars based on saved click counts.
 */
function updateProgressBars() {
    const workoutIds = [
        'bench-press', 'deadlifts', 'squats', 'shoulder-press', 
        'bicep-curls', 'tricep-dips', 'pull-ups', 'pull-upsW', 
        'leg-press', 'barbell-rows', 'lunges'
    ];

    workoutIds.forEach(id => {
        updateProgressBar(id);
    });
}

/**
 * Save the click count for a workout to localStorage.
 * @param {string} id - The id of the workout.
 * @param {number} count - The current click count.
 */
function saveClickCount(id, count) {
    localStorage.setItem(`clickCount-${id}`, count);
}

/**
 * Save the progression of a workout routine to localStorage.
 * @param {string} id - The id of the workout.
 * @param {string} data - The progression data to save.
 */
function saveProgression(id, data) {
    localStorage.setItem(`workout-${id}`, data);
}

/**
 * Load saved progression data and click counts from localStorage and update the DOM.
 */
function loadProgression() {
    const workoutIds = [
        'bench-press', 'deadlifts', 'squats', 'shoulder-press', 
        'bicep-curls', 'tricep-dips', 'pull-ups', 'pull-upsW', 
        'leg-press', 'barbell-rows', 'lunges'
    ];
    
    workoutIds.forEach(id => {
        const savedData = localStorage.getItem(`workout-${id}`);
        const savedClickCount = localStorage.getItem(`clickCount-${id}`);
        
        if (savedData) {
            const repsDiv = document.querySelector(`#${id}`);
            if (repsDiv) {
                repsDiv.innerText = savedData;
            }
        }

        if (savedClickCount) {
            clickCounts[id] = parseInt(savedClickCount);
        } else {
            clickCounts[id] = 0; // Initialize to 0 if no saved count
        }
    });
}
//--------------------------------------Text-Gradiant-----------------------------------------------
function getLuminance(rgb) {
    const a = rgb.map(function (v) {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}
function updateProgressBar(id) {
    const progressBar = document.querySelector(`.${id}-progress`);
    const repsDiv = document.querySelector(`#${id}`);
    if (progressBar && repsDiv) {
        const progressPercentage = Math.min((clickCounts[id] / 10) * 100, 100);
        const backgroundColor = `linear-gradient(orange 0 0) 0/${progressPercentage}% no-repeat var(--secondary-color)`;
        progressBar.style.background = backgroundColor;

        // Assuming the background changes from grey to orange, calculate the mid-point RGB values
        const greyRGB = [35, 35, 43]; // RGB for grey
        const orangeRGB = [214, 157, 0]; // RGB for orange
        const blendRatio = progressPercentage / 100;
        const blendedRGB = [
            Math.round(greyRGB[0] * (1 - blendRatio) + orangeRGB[0] * blendRatio),
            Math.round(greyRGB[1] * (1 - blendRatio) + orangeRGB[1] * blendRatio),
            Math.round(greyRGB[2] * (1 - blendRatio) + orangeRGB[2] * blendRatio)
        ];
        console.log("Blended RGB:", blendedRGB); // Debug output to see RGB values
        // Determine the luminance of the blended background color
        const lum = getLuminance(blendedRGB);
        console.log("Luminance:", lum); // Check calculated luminance value

        if (lum > 0.15) {
            repsDiv.style.color = `linear-gradient(orange 0 0) 0/${progressPercentage}% no-repeat var(--secondary-color)`; 
        } else {
            repsDiv.style.color = 'var(--secondary-color)'; 
        }
        console.log("Text color set to:", repsDiv.style.color); // Confirm text color setting
    }
}
//--------------------------------------Display-------------------------------------------------------
function displaySavedInformation() {
    const workoutIds = [
        'bench-press', 'deadlifts', 'squats', 'shoulder-press', 
        'bicep-curls', 'tricep-dips', 'pull-ups', 'pull-upsW', 
        'leg-press', 'barbell-rows', 'lunges'
    ];

    workoutIds.forEach(id => {
        const savedData = localStorage.getItem(`workout-${id}`);
        const savedClickCount = localStorage.getItem(`clickCount-${id}`);
        
        if (savedData) {
            console.log(`Progress for ${id}: ${savedData}`);
            console.log(`Click count for ${id}: ${savedClickCount}`);

            // Optionally display this information on your webpage
            const displayElement = document.getElementById(`${id}-display`);
            if (displayElement) {
                displayElement.innerText = `Saved Progress: ${savedData} (Click Count: ${savedClickCount})`;
            }
        }
    });
}

// Call this function to log the saved information to the console
displaySavedInformation();