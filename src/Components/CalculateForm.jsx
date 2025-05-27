import React, { useState } from "react";
import "./CalculateForm.css";
export default function CalculateForm() {
  const [selectedOp, setSelectedOp] = useState("addition");
  const [input1, setInput1] = useState(0);
  const [input2, setInput2] = useState(0);

  function HandleReset(e) {
    e.preventDefault();
    setSelectedOp("addition");
    setInput1(0);
    setInput2(0);
    document.getElementById("result").innerHTML = "";
  }
  function HandleSubmit(e) {
    e.preventDefault();
    let result = 0;
    let resultOutput = document.getElementById("result");
    let number1 = parseFloat(input1);
    let number2 = parseFloat(input2);
    try {
      switch (selectedOp) {
        case "addition":
          result = number1 + number2;
          break;
        case "substraction":
          result = number1 - number2;
          break;
        case "multiplication":
          result = number1 * number2;
          break;
        case "division":
          if (input2 == 0) {
            throw Error("Divisor cannot be equal to zero!");
          }
          result = number1 / number2;
          break;
        default:
          throw new TypeError("Invalid operator type");
      }
    } catch (error) {
      resultOutput.innerHTML = error.message;
      resultOutput.classList.add("errorMsg");
      return;
    }
    resultOutput.innerHTML = +parseFloat(result).toFixed(2);
    resultOutput.classList.remove("errorMsg");
  }

  function handleRadioChange(e) {
    setSelectedOp(e.target.value);
    document.getElementById("symbolOperator");
  }
  function handleChange(e) {
    if (e.target.id == "input1") {
      setInput1(e.target.value);
    } else {
      setInput2(e.target.value);
    }
  }

  function getOperatorSymbol() {
    let symbol = "?";
    switch (selectedOp) {
      case "addition":
        symbol = "+";
        break;
      case "substraction":
        symbol = "-";
        break;
      case "multiplication":
        symbol = "X";
        break;
      case "division":
        symbol = "/";
        break;
      default:
        symbol = "?";
        break;
    }
    return symbol;
  }
  return (
    <>
      <form onSubmit={HandleSubmit}>
        <input
          type="number"
          name="input1"
          id="input1"
          value={input1}
          onChange={handleChange}
        />
        <span id="operatorSymbol">{getOperatorSymbol()}</span>
        <input
          type="number"
          name="input2"
          id="input2"
          value={input2}
          onChange={handleChange}
        />
        <span>=</span>
        <p id="result"></p>
        <div>
          <p>
            Select an operator, depending on the provided values, errors should
            be handled
          </p>
          <div class="rowContainer">
            <label htmlFor="addition">
              Addition
              <input
                id="addition"
                type="radio"
                value="addition"
                name="operator"
                checked={selectedOp == "addition"}
                onChange={handleRadioChange}
              />
            </label>
            <label htmlFor="substraction">
              Subtraction
              <input
                id="substraction"
                type="radio"
                value="substraction"
                name="operator"
                checked={selectedOp == "substraction"}
                onChange={handleRadioChange}
              />
            </label>
            <label htmlFor="multiplication">
              Multiplication
              <input
                id="multiplication"
                type="radio"
                value="multiplication"
                name="operator"
                checked={selectedOp == "multiplication"}
                onChange={handleRadioChange}
              />
            </label>
            <label htmlFor="division">
              Division
              <input
                id="division"
                type="radio"
                value="division"
                name="operator"
                checked={selectedOp == "division"}
                onChange={handleRadioChange}
              />
            </label>
            <label htmlFor="wrong">
              wrong operator
              <input
                id="wrong"
                type="radio"
                value="wrong"
                name="operator"
                checked={selectedOp == "wrong"}
                onChange={handleRadioChange}
              />
            </label>
          </div>
        </div>
        <div class="rowContainer">
          <input
            id="reset"
            type="reset"
            name="reset"
            value="Reset"
            onClick={HandleReset}
          />
          <input
            type="submit"
            disabled={input1.toString() == "" || input2.toString() == ""}
            name="calculate"
            value="Calculate"
          />
        </div>
      </form>
    </>
  );
}
