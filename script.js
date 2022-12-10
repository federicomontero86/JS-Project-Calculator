const numberButtons = document.querySelectorAll(".num_btn");
const operatorButtons = document.querySelectorAll(".op_btn");
const clearButton = document.querySelector("#clear");
const equalButton = document.querySelector("#evaluate");
const input = document.querySelector(".input");
const answerScreen = document.querySelector(".answerScreen");
const resultScreen = document.querySelector(".resultScreen");
let displayValue = [];

const add = (n1, n2) => n1 + n2;
const multiply = (n1, n2) => n1 * n2;
const substract = (n1, n2) => n1 - n2;
const divide = (n1, n2) => n1 / n2;

const operate = function (op, n1, n2) {
  switch (op) {
    case "+":
      return add(n1, n2);

    case "-":
      return substract(n1, n2);

    case "*":
      return multiply(n1, n2);

    case "/":
      return divide(n1, n2);

    default:
      "Invalid operator";
  }
};

const populateInput = function (numbers) {
  numbers.forEach((number) => {
    number.addEventListener("click", () => {
      if (input.value !== "") {
        resultScreen.innerHTML = "";
      }
      if (
        number.id !== "erase" ||
        number.id !== "clear" ||
        number.value !== "%"
      ) {
        displayValue.push(number.value);
        input.innerHTML = displayValue.join("");
        console.log(displayValue);
      }
    });
  });
};

populateInput(numberButtons);

operatorButtons.forEach((operator) => {
  operator.addEventListener("click", () => {
    const inputValue = displayValue.join("");
    console.log(inputValue);
    const operatorUsed = operator.value;
    if (operator.value === "%" || operator.id === "erase") {
      return;
    } else {
      displayValue.push(" " + operatorUsed + " ");
      input.innerHTML = displayValue.join("");
    }
    if (operator.id === "evaluate") {
      const operationArr = inputValue.split(" ");
      console.log(operationArr);
      const operationArrFixed = operationArr.map((item) => {
        if (item !== "+" && item !== "-" && item !== "/" && item !== "*") {
          return Number(item);
        } else {
          return item;
        }
      });
      const [n1, op, n2] = operationArrFixed;
      const result = operate(op, n1, n2);
      console.log(result);
      !result
        ? (resultScreen.innerHTML = "Invalid Operation")
        : (resultScreen.innerHTML = result);
      input.innerHTML = "";
      displayValue = [];
    }
  });
});

clearButton.addEventListener("click", () => {
  input.innerHTML = "";
  resultScreen.innerHTML = "";
  displayValue = [];
});
