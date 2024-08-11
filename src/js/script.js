//--------------------------------------LEVEL COUNTER---------------------------------------------------------
// Initialize level from localStorage or set to 0 if not present
var level = parseInt(localStorage.getItem('level')) || 0;
var timeoutId; 
// Function to increment level and save it to localStorage
function increment() {
    level++;
    localStorage.setItem('level', level); // Persist level state across pages
    document.getElementById("counter").innerHTML = level; // Update counter display
    console.log("Level incremented to:", level); // Log for debugging
}

// Function to change text based on level and set a timeout to reset text
function changeText(elementId) {
    var paragraph = document.getElementById("levelText"); // Get the paragraph element
    if (paragraph) { // Check if paragraph exists
        paragraph.innerHTML = "You are now level " + (level+1) + " continue improving";
        resetTimer(); // Reset the timer to change text back after delay
    }
}

// Function to reset text after a specified timeout
function resetTimer(elementId) {
    var paragraph = document.getElementById("levelText"); // Re-acquire the paragraph element

    // Clear any existing timeout to prevent duplicates
    clearTimeout(timeoutId);

    // Set a new timeout to revert the text after 3000 milliseconds (3 seconds)
    timeoutId = setTimeout(function() {
        if (paragraph) { // Check if paragraph still exists
            paragraph.innerHTML = "What are you going to do next?";
        }
    }, 3000);
 
}
// Initialize the counter display when the page loads
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("counter").innerHTML = level; // Set counter display
    console.log("Page loaded. Current level is:", level); // Log for debugging
});
//--------------------------------------STAT-BAR FILLER(+ -)----------------------------------------------------
// Initialize constants and stats
const INITIAL_FILL = 0; // Initial fill percentage

// Retrieve saved stats from localStorage or initialize them if not available
let stats = JSON.parse(localStorage.getItem('stats')) || {
  strength: INITIAL_FILL,
  dexterity: INITIAL_FILL,
  intelligence: INITIAL_FILL,
  perception: INITIAL_FILL,
  endurance: INITIAL_FILL,
  luck: INITIAL_FILL
};

// Update the stat bars to reflect the saved stats on page load
Object.keys(stats).forEach(updateBarForStat);

/**
 * Updates the background of an element with a linear gradient based on the given stat percentage.
 * @param {string} stat - The name of the stat to update.
 */
function updateBarForStat(stat) {
  const elem = document.getElementById(stat);
  elem.style.background = `linear-gradient(orange 0 0) 0/${stats[stat]}% no-repeat rgb(35, 35, 43)`;
}

/**
 * Saves the current stats to localStorage.
 */
function saveStats() {
  localStorage.setItem('stats', JSON.stringify(stats));
}

/**
 * Increases the fill of a progress bar by 10% and updates its background fill.
 * @param {string} stat - The stat to be increased.
 */
function moveadd(stat) {
  // If the current stat + 10 exceeds our limit of 100, set it to 100
  stats[stat] = Math.min(stats[stat] + 10, 100);
  // Update the background fill
  updateBarForStat(stat);
  // Save the updated stats to localStorage
  saveStats();
}

/**
 * Moves the sub-bar of a progress bar by increasing its fill by 10%.
 * @param {string} stat - The stat to be decreased.
 */
function movesub(stat) {
  stats[stat] = Math.max(stats[stat] - 10, 0);
  updateBarForStat(stat);
  // Save the updated stats to localStorage
  saveStats();
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
        progressBar.style.background = `linear-gradient(var(--primary-color) 0 0) 0/${progressPercentage}% no-repeat var(--secondary-color)`;
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
//------------------------------------Point Allocation-------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // Initialize counters from localStorage or start from zero
    const attributes = ['Strength', 'Dexterity', 'Intelligence', 'Perception', 'Endurance', 'Luck'];
    const counters = {};

    // Initialize counters for each attribute
    attributes.forEach(attribute => {
        counters[attribute] = parseInt(localStorage.getItem(`${attribute.toLowerCase()}Counter`)) || 0;
        console.log(`Initial ${attribute} Points:`, counters[attribute]);
    });

    // Function to update reps and increment attribute points
    function updateReps(exerciseId) {
        // Select the list item (li) that contains the reps information
        const repsElement = document.getElementById(exerciseId);

        if (repsElement) {
            // Find the parent list item (li) and select the previous element with class 'additional-text'
            const additionalTextElement = repsElement.closest('li').previousElementSibling.querySelector('.additional-text');

            // Check if the additional text element exists
            if (additionalTextElement) {
                // Get the text inside the element
                const additionalText = additionalTextElement.textContent;

                // Check for each attribute and count the number of pluses for each
                attributes.forEach(attribute => {
                    // Create a regular expression to find the specific attribute and count its pluses
                    const regex = new RegExp(`${attribute}\\++`, 'g');
                    const match = additionalText.match(regex);

                    if (match) {
                        // Count the pluses in the matched attribute segment
                        const plusCount = match[0].length - attribute.length;

                        // Increment the counter by the number of pluses
                        counters[attribute] += plusCount;

                        // Save the updated counter value to localStorage
                        localStorage.setItem(`${attribute.toLowerCase()}Counter`, counters[attribute]);

                        // Log the updated counter value to the console
                        console.log(`Updated ${attribute} Points for ${exerciseId}:`, counters[attribute]);
                    }
                });
            } else {
                console.error('Element with class "additional-text" not found for exercise:', exerciseId);
            }
        } else {
            console.error('Element with id', exerciseId, 'not found.');
        }
    }

    // Attach click event listeners to each "next" button
    document.querySelectorAll('.updater').forEach((button, index) => {
        const exerciseIds = [
            'bench-press',
            'deadlifts',
            'squats',
            'shoulder-press',
            'bicep-curls',
            'tricep-dips',
            'pull-ups',
            'pull-upsW',
            'leg-press',
            'barbell-rows',
            'lunges'
        ];
        if (exerciseIds[index]) {
            button.addEventListener('click', () => updateReps(exerciseIds[index]));
        }
    });
});
