var number = 0;

function increment() {
    number++;
    console.log(number);
    document.getElementById("counter").innerHTML = number;
}
function changeText() {
    document.querySelector("p").innerHTML = "Lol you must be gay";
}
