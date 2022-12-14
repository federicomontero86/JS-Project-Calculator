const numberButtons = document.querySelectorAll(".num_btn");
const operatorButtons = document.querySelectorAll(".op_btn");
const clearButton = document.querySelector("#clear");
const equalButton = document.querySelector("#evaluate");
const input = document.querySelector(".input");
const answerScreen = document.querySelector(".answerScreen");
const resultScreen = document.querySelector(".resultScreen");
let displayValue = [];
let resultValue = "";

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
        resultValue = "";
      }
      if (
        number.value === "0" &&
        displayValue[0] === "0" &&
        !displayValue.includes(".")
      ) {
        return;
      }
      // console.log(displayValue[displayValue.length - 1]);
      console.log(number.value);
      if (
        number.value === "0" &&
        displayValue[displayValue.length - 1] === "0" &&
        (displayValue.includes(" * ") ||
          displayValue.includes(" / ") ||
          displayValue.includes(" - ") ||
          displayValue.includes(" + "))
      ) {
        console.log(number.value);
        console.log("hola");
        console.log(displayValue);
        const filterDots = displayValue.filter(
          (char) =>
            char === "." ||
            char === " + " ||
            char === " - " ||
            char === " * " ||
            char === " / "
        );
        console.log(filterDots);
        if (filterDots.length === 3) {
          displayValue.push(number.value);
          input.innerHTML = displayValue.join("");
        } else if (
          filterDots.length === 2 &&
          filterDots[filterDots.length - 1] === "."
        ) {
          displayValue.push(number.value);
          input.innerHTML = displayValue.join("");
        } else {
          return;
        }
      }
      if (
        number.value === "0" &&
        displayValue[displayValue.length - 1] === "0" &&
        (displayValue.includes(" * ") ||
          displayValue.includes(" / ") ||
          displayValue.includes(" - ") ||
          displayValue.includes(" + "))
      ) {
        console.log("hola");
        return;
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
    let inputValue = displayValue.join("");
    const operatorUsed = operator.value;
    if (resultValue) {
      displayValue.push(resultValue + " ");
      input.innerHTML = displayValue.join("");
      inputValue = displayValue.join("");
      resultValue = "";
    }
    if (
      inputValue.includes("+") ||
      inputValue.includes("-") ||
      inputValue.includes("/") ||
      inputValue.includes("*")
    ) {
      const operationArr = inputValue.split(" ");
      if (operationArr.includes("")) {
        operationArr.splice(1, 1);
      }
      const operationArrFixed = operationArr.map((item) => {
        if (item !== "+" && item !== "-" && item !== "/" && item !== "*") {
          return Number(item);
        } else {
          return item;
        }
      });
      const [n1, op, n2] = operationArrFixed;
      console.log(n1, op, n2);
      const result = operate(op, n1, n2);
      !result && result !== 0
        ? (resultScreen.innerHTML = "Invalid Operation")
        : (resultScreen.innerHTML = result);
      input.innerHTML = "";
      displayValue = [result];
    }
    if (operator.value === "%" || operator.id === "erase") {
      return;
    } else {
      displayValue.push(" " + operatorUsed + " ");
      input.innerHTML = displayValue.join("");
    }
    if (operator.id === "evaluate") {
      console.log(inputValue);
      const operationArr = inputValue.split(" ");
      console.log(operationArr);
      if (operationArr.includes("")) {
        operationArr.splice(1, 1);
      }
      console.log(operationArr);
      const operationArrFixed = operationArr.map((item) => {
        if (item !== "+" && item !== "-" && item !== "/" && item !== "*") {
          return Number(item);
        } else {
          return item;
        }
      });
      const [n1, op, n2] = operationArrFixed;
      console.log(n1, op, n2);
      let result = operate(op, n1, n2).toFixed(6).replace(/0+$/, "");
      const resultArr = result.split("");
      console.log(resultArr);
      resultArr[resultArr.length - 1] === "." ? resultArr.pop() : resultArr;
      result = resultArr.join("");
      !result && result !== 0
        ? (resultScreen.innerHTML = "Invalid Operation")
        : (resultScreen.innerHTML = result);
      input.innerHTML = "";
      displayValue = [];
      resultValue = result;
      console.log(resultValue);
    }
  });
});

clearButton.addEventListener("click", () => {
  input.innerHTML = "";
  resultScreen.innerHTML = "";
  displayValue = [];
  resultValue = "";
});
