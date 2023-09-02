var number = 0;

function increment() {
    number++;
    console.log(number);
    document.getElementById("counter").innerHTML = number;
}
function changeText() {
    document.querySelector("p").innerHTML = "You are now level " + (number+1) + " continue improving";
}

function moveadd() {
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
}