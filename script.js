var number = 0;

function increment() {
    number++;
    console.log(number);
    document.getElementById("counter").innerHTML = number;
}
function changeText() {
    document.querySelector("p").innerHTML = "You are now level " + (number+1) + " continue improving";
}


document.addEventListener("DOMContentLoaded", function () {
    // Select all elements with the class 'progress-1'
    const progressBars = document.querySelectorAll(".progress-1");
  
    // Loop through each progress bar element
    progressBars.forEach((progressBar) => {
      const filledBlocks = parseInt(progressBar.getAttribute("data-filled"));
  
      // Create and insert the block items based on the data-filled attribute
      for (let i = 0; i < 10; i++) {
        const blockItem = document.createElement("div");
        blockItem.classList.add("block-item");
        if (i < filledBlocks) {
          blockItem.classList.add("filled");
        }
        progressBar.appendChild(blockItem);
      }
    });
  });
  