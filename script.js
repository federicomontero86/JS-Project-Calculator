const add = (n1, n2) => n1 + n2;
const multiply = (n1, n2) => n1 * n2;
const substract = (n1, n2) => n1 - n2;
const divide = (n1, n2) => n1 / n2;

const operate = function (op, n1, n2) {
  switch (op) {
    case "+":
      add(n1, n2);
      break;
    case "-":
      substract(n1, n2);
      break;
    case "*":
      multiply(n1, n2);
      break;
    case "/":
      divide(n1, n2);
      break;
    default:
      "Invalid operator";
  }
};

const numberButtons = document.querySelectorAll(".num_btn");
const operatorButtons = document.querySelectorAll(".op_btn");
const equalButton = document.querySelector("#evaluate");
const input = document.querySelector(".input");
const answerScreen = document.querySelector(".answerScreen");
const displayValue = [];
// console.log(equalButton);

const populateNumbers = function (numbers) {
  numbers.forEach((number) => {
    number.addEventListener("click", () => {
      if (number.value === "." && displayValue.includes(number.value)) {
        return;
      }
      if (!number.id.match("erase")) {
        displayValue.push(number.value);
        input.innerHTML = displayValue.join("");
      }
    });
  });
};

populateNumbers(numberButtons);

operatorButtons.forEach((operator) => {
  operator.addEventListener("click", () => {
    const firstValue = displayValue.join("");
    const operatorUsed = operator.value;
    console.log(firstValue, operatorUsed);
    if (operator.value === "%" || operator.id === "erase") {
      return;
    } else {
      // console.log(operator.value);
      displayValue.push(" " + operator.value + " ");
      input.innerHTML = displayValue.join("");
    }

    if (operator.value === "=") {
      const resultUnfixed = displayValue.join("");
      console.log(resultUnfixed);
      const resultArr = resultUnfixed.split(" ");
      console.log(resultArr);
    }
  });
});
