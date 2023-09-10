var number = 0;

function increment() {
    number++;
    console.log(number);
    document.getElementById("counter").innerHTML = number;
}
function changeText() {
    document.querySelector("p").innerHTML = "You are now level " + (number+1) + " continue improving";
}
var filled = 0; // Initial fill percentage

function moveadd() {
  var elem = document.getElementById("myBar");

  if (filled <= 100) {
    filled += 10; // Increase the fill by 10%

    // Update the background fill using the data-filled attribute
    elem.style.background = `linear-gradient(orange 0 0) 0/${filled}% no-repeat rgb(35, 35, 43)`;
  }
}
function movesub() {
  var elem = document.getElementById("myBar");

  if (filled >= 1) {
    filled -= 10; // Increase the fill by 10%

    // Update the background fill using the data-filled attribute
    elem.style.background = `linear-gradient(orange 0 0) 0/${filled}% no-repeat rgb(35, 35, 43)`;
  }
}

/*function moveadd() {
  var elem = document.getElementById("myBar");
  var width = 1;
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
    } else {
      width++;
      elem.style.width = width + '%';
    }
  }
}

function movesub() {
  var elem = document.getElementById("myBar");
  var width = 1;
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
    } else {
      width++;
      elem.style.width = width + '%';
    }
  }
}*/