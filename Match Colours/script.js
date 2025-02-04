let numCircles = 6;
let colors = [];
let pickedColor;

let circles = document.querySelectorAll(".circle");
let colorDisplay = document.querySelector("#color-display");
let messageDisplay = document.querySelector("#message");
let h1 = document.querySelector("h1");
let resetButton = document.querySelector("#reset");
let modeButtons = document.querySelectorAll(".mode");

init();

function init() {
  colorDisplay.textContent = pickedColor;
  setupCircles();
  setupMode();
  reset();
}

resetButton.addEventListener("click", function () {
  reset();
});

function setupCircles() {
  for (let i = 0; i < circles.length; i++) {
    circles[i].style.backgroundColor = colors[i];
    circles[i].addEventListener("click", function () {
      let clickedColor = this.style.backgroundColor;
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct";
        resetButton.textContent = "Play Again";
        changeColors(pickedColor);
      } else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try Again";
      }
    });
  }
}

function setupMode() {
  for (let i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function () {
      for (let i = 0; i < modeButtons.length; i++) {
        modeButtons[i].classList.remove("selected");
      }
      this.classList.add("selected");
      numCircles = this.textContent === "Easy" ? 3 : 6;
      reset();
    });
  }
}

function reset() {
  colors = getRandomColors(numCircles);
  pickedColor = chooseColor();
  colorDisplay.textContent = pickedColor;
  h1.style.backgroundColor = "#2C8E99";
  resetButton.textContent = "New Colors";
  messageDisplay.textContent = "";
  for (let i = 0; i < circles.length; i++) {
    if (colors[i]) {
      circles[i].style.display = "block";
      circles[i].style.backgroundColor = colors[i];
    } else {
      circles[i].style.display = "none";
    }
  }
}

function changeColors(color) {
  for (let i = 0; i < circles.length; i++) {
    circles[i].style.backgroundColor = color;
  }
  h1.style.backgroundColor = color;
}

function getRandomColors(num) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(makeColor());
  }
  return arr;
}

function makeColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

function chooseColor() {
  let random = Math.floor(Math.random() * colors.length);
  return colors[random];
}
