const display = document.getElementById("display");

function appendToDisplay(input) {
  const operators = ["+", "-", "*", "/"];
  const lastChar = display.value.slice(-1);

  // Prevent multiple leading zeros
  if (display.value === "0" && input === "0") return;

  // Allow replacing the initial zero unless adding a decimal
  if (display.value === "0" && input !== ".") {
    display.value = input;
    return;
  }

  // Prevent multiple decimals in a single number
  if (input === ".") {
    const currentNumber = display.value.split(/[\+\-\*\/]/).pop();
    if (currentNumber.includes(".")) return;
  }

  // Handle consecutive operators
  if (operators.includes(lastChar) && operators.includes(input)) {
    if (input === "-") {
      // Allow a negative sign after an operator (except another '-')
      if (lastChar !== "-" || display.value.length === 1) {
        display.value += input;
      }
    } else {
      // Replace the last operator with the new one
      display.value = display.value.replace(/[\+\-\*\/]+$/, input);
    }
    return;
  }

  // Append the input to the display value
  display.value += input;
}

function clearDisplay() {
  display.value = "0"; // Reset the display to '0'
}

function calculate() {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = "Error"; // Display error for invalid expressions
  }
}
