const numberButtons = document.querySelectorAll(".num_btn");
const operatorButtons = document.querySelectorAll(".op_btn");
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
// console.log(operate("*", "6", "3"));
// console.log(equalButton);

const populateNumbers = function (numbers) {
  numbers.forEach((number) => {
    number.addEventListener("click", () => {
      if (input.value !== "") {
        resultScreen.innerHTML = "";
      }
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
    // console.log(firstValue, operatorUsed);
    if (operator.value === "%" || operator.id === "erase") {
      return;
    } else {
      // console.log(operator.value);
      displayValue.push(" " + operatorUsed + " ");
      input.innerHTML = displayValue.join("");
    }

    if (operator.id === "evaluate") {
      const operationArr = firstValue.split(" ");
      console.log(operationArr);
      const operationArrFixed = operationArr.map((item) => {
        if (item !== "+" && item !== "-" && item !== "/" && item !== "*") {
          return Number(item);
        } else {
          return item;
        }
      });
      // console.log(operationArrFixed);
      const [n1, op, n2] = operationArrFixed;
      // console.log(n1, op, n2);
      const result = operate(op, n1, n2);
      console.log(result);
      resultScreen.innerHTML = result;
      input.innerHTML = "";
      displayValue = [];
    }
  });
});
