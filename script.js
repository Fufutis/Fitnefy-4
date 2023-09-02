var number = 0;

function increment() {
    number++;
    console.log(number);
    document.getElementById("counter").innerHTML = number;
}
function changeText() {
    document.querySelector("p").innerHTML = "You are now level " + (number+1) + " continue improving";
}

var width = 10; // Initial width

function moveadd() {
  var elem = document.getElementById("myBar");   
  if (width < 100) {/* OK SO YOU GOT IT WORKING JUST LATER MAKE IT SO THE THING INSIDE OF THE BAR CHANGES AND NOT THE BAR IT  SELF*/
    width += 10; // Increase by 10%
    elem.style.width = width + '%'; 
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