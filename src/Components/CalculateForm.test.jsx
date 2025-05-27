import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import CalculateForm from "./CalculateForm";
describe("CalculateForm Test", () => {
  let input1, input2, resultOutput, operatorSymbol, submitBtn;
  beforeEach(() => {
    render(<CalculateForm />);
    input1 = document.getElementById("input1");
    input2 = document.getElementById("input2");
    resultOutput = document.getElementById("result");
    operatorSymbol = document.getElementById("operatorSymbol");
    submitBtn = screen.getByText(/Calculate/i);
  });
  describe("Additions", () => {
    beforeEach(() => {
      fireEvent.click(document.getElementById("addition"));
    });
    it("UI should have an addition symbol", () => {
      expect(operatorSymbol.textContent).toBe("+");
    });
    it("should perform addition with integers", () => {
      fireEvent.change(input1, { target: { value: "5" } });
      fireEvent.change(input2, { target: { value: "5" } });
      fireEvent.click(submitBtn);
      expect(resultOutput.textContent).toStrictEqual("10");
    });
    describe("with floats", () => {
      it("should show only 2 decimals", () => {
        fireEvent.change(input1, { target: { value: "2.5" } });
        fireEvent.change(input2, { target: { value: "5.22222" } });
        fireEvent.click(submitBtn);
        expect(resultOutput.textContent).toStrictEqual("7.72");
      });
      it("should show only 1 decimal", () => {
        fireEvent.change(input1, { target: { value: "2.30" } });
        fireEvent.change(input2, { target: { value: "5.20" } });
        fireEvent.click(submitBtn);
        expect(resultOutput.textContent).toStrictEqual("7.5");
      });

      it("should show NO decimals", () => {
        fireEvent.change(input1, { target: { value: "2.00" } });
        fireEvent.change(input2, { target: { value: "5.00" } });
        fireEvent.click(submitBtn);
        expect(resultOutput.textContent).toStrictEqual("7");
      });
    });
    describe("with negative numbers", () => {
      it("first input is negative, output should be negative", () => {
        fireEvent.change(input1, { target: { value: "-5" } });
        fireEvent.change(input2, { target: { value: "3" } });
        fireEvent.click(submitBtn);
        expect(resultOutput.textContent).toStrictEqual("-2");
      });
      it("first input is negative, output should be positive", () => {
        fireEvent.change(input1, { target: { value: "-3" } });
        fireEvent.change(input2, { target: { value: "5" } });
        fireEvent.click(submitBtn);
        expect(resultOutput.textContent).toStrictEqual("2");
      });
      it("second input is negative, output should be positive", () => {
        fireEvent.change(input1, { target: { value: "5" } });
        fireEvent.change(input2, { target: { value: "-2" } });
        fireEvent.click(submitBtn);
        expect(resultOutput.textContent).toStrictEqual("3");
      });
      it("second input is negative, output should be negative", () => {
        fireEvent.change(input1, { target: { value: "2" } });
        fireEvent.change(input2, { target: { value: "-5" } });
        fireEvent.click(submitBtn);
        expect(resultOutput.textContent).toStrictEqual("-3");
      });
      it("both inputs are negative, output should be negative", () => {
        fireEvent.change(input1, { target: { value: "-5" } });
        fireEvent.change(input2, { target: { value: "-5" } });
        fireEvent.click(submitBtn);
        expect(resultOutput.textContent).toStrictEqual("-10");
      });
    });
  });
  describe("Substractions", () => {
    beforeEach(() => {
      fireEvent.click(document.getElementById("substraction"));
    });
    it("UI should have a substraction symbol", () => {
      expect(operatorSymbol.textContent).toBe("-");
    });
    describe("with positive numbers", () => {
      it("second input is smaller or equal, shows positive output", () => {
        fireEvent.change(input1, { target: { value: "5" } });
        fireEvent.change(input2, { target: { value: "5" } });
        fireEvent.click(submitBtn);
        expect(resultOutput.textContent).toStrictEqual("0");
        fireEvent.change(input1, { target: { value: "5" } });
        fireEvent.change(input2, { target: { value: "2" } });
        fireEvent.click(submitBtn);
        expect(resultOutput.textContent).toStrictEqual("3");
      });
      it("second input is bigger, shows negative output", () => {
        fireEvent.change(input1, { target: { value: "2" } });
        fireEvent.change(input2, { target: { value: "5" } });
        fireEvent.click(submitBtn);
        expect(resultOutput.textContent).toStrictEqual("-3");
      });
    });
    describe("with negative numbers", () => {
      it("only first input is negative, output should be negative", () => {
        fireEvent.change(input1, { target: { value: "-2" } });
        fireEvent.change(input2, { target: { value: "3" } });
        fireEvent.click(submitBtn);
        expect(resultOutput.textContent).toStrictEqual("-5");
      });
      it("only second input is negative, shows positive output", () => {
        fireEvent.change(input1, { target: { value: "3" } });
        // if second number is negative, it becomes positive (3 - (-2))=> (3+2)=>5
        fireEvent.change(input2, { target: { value: "-2" } });
        fireEvent.click(submitBtn);
        expect(resultOutput.textContent).toStrictEqual("5");
      });
      it("both inputs are negative, shows positive output", () => {
        fireEvent.change(input1, { target: { value: "-2" } });
        fireEvent.change(input2, { target: { value: "-3" } });
        fireEvent.click(submitBtn);
        expect(resultOutput.textContent).toStrictEqual("1");
      });
      it("both inputs are negative, shows negative output", () => {
        fireEvent.change(input1, { target: { value: "-3" } });
        fireEvent.change(input2, { target: { value: "-2" } });
        fireEvent.click(submitBtn);
        expect(resultOutput.textContent).toStrictEqual("-1");
      });
    });
  });
  describe("Multiplications", () => {
    beforeEach(() => {
      fireEvent.click(document.getElementById("multiplication"));
    });
    it("UI should have a multiplication symbol", () => {
      expect(operatorSymbol.textContent).toEqual("X");
    });
    it("with integers", () => {
      fireEvent.change(input1, { target: { value: "5" } });
      fireEvent.change(input2, { target: { value: "5" } });
      fireEvent.click(submitBtn);
      expect(resultOutput.textContent).toStrictEqual("25");
    });
    //we already tested the decimals part on the addition, this tests only wether or not it can multiply float numbers
    it("with floats", () => {
      fireEvent.change(input1, { target: { value: "2.5" } });
      fireEvent.change(input2, { target: { value: "2.0" } });
      fireEvent.click(submitBtn);
      expect(resultOutput.textContent).toStrictEqual("5");
      fireEvent.change(input1, { target: { value: "2.5" } });
      fireEvent.change(input2, { target: { value: "2" } });
      fireEvent.click(submitBtn);
      expect(resultOutput.textContent).toStrictEqual("5");
    });
    describe("with negative numbers", () => {
      it("eighter input is negative, output should be negative", () => {
        fireEvent.change(input1, { target: { value: "-5" } });
        fireEvent.change(input2, { target: { value: "3" } });
        fireEvent.click(submitBtn);
        expect(resultOutput.textContent).toStrictEqual("-15");
        fireEvent.change(input1, { target: { value: "5" } });
        fireEvent.change(input2, { target: { value: "-3" } });
        fireEvent.click(submitBtn);
        expect(resultOutput.textContent).toStrictEqual("-15");
      });
      it("both inputs are negative, output should be positive", () => {
        fireEvent.change(input1, { target: { value: "-5" } });
        fireEvent.change(input2, { target: { value: "-5" } });
        fireEvent.click(submitBtn);
        expect(resultOutput.textContent).toStrictEqual("25");
      });
    });
  });
  describe("Divisions", () => {
    beforeEach(() => {
      fireEvent.click(document.getElementById("division"));
    });
    it("UI should have a division symbol", () => {
      expect(operatorSymbol.textContent).toEqual("/");
    });
    it("with integers", () => {
      fireEvent.change(input1, { target: { value: "5" } });
      fireEvent.change(input2, { target: { value: "5" } });
      fireEvent.click(submitBtn);
      expect(resultOutput.textContent).toStrictEqual("1");
    });
    it("should show error if divisor is zero", () => {
      fireEvent.change(input1, { target: { value: "5" } });
      fireEvent.change(input2, { target: { value: "0" } });
      fireEvent.click(submitBtn);
      expect(resultOutput.textContent).toStrictEqual(
        "Divisor cannot be equal to zero!",
      );
    });
    //we already tested the decimals part on the addition, this tests only wether or not it can multiply float numbers
    it("with floats", () => {
      fireEvent.change(input1, { target: { value: "3.5" } });
      fireEvent.change(input2, { target: { value: "17.5" } });
      fireEvent.click(submitBtn);
      expect(resultOutput.textContent).toStrictEqual("0.2");
      fireEvent.change(input1, { target: { value: "17.5" } });
      fireEvent.change(input2, { target: { value: "3.5" } });
      fireEvent.click(submitBtn);
      expect(resultOutput.textContent).toStrictEqual("5");
    });
    describe("with negative numbers", () => {
      it("eighter input is negative, output should be negative", () => {
        fireEvent.change(input1, { target: { value: "-15" } });
        fireEvent.change(input2, { target: { value: "3" } });
        fireEvent.click(submitBtn);
        expect(resultOutput.textContent).toStrictEqual("-5");
        fireEvent.change(input1, { target: { value: "15" } });
        fireEvent.change(input2, { target: { value: "-3" } });
        fireEvent.click(submitBtn);
        expect(resultOutput.textContent).toStrictEqual("-5");
      });
      it("both inputs are negative, output should be positive", () => {
        fireEvent.change(input1, { target: { value: "-25" } });
        fireEvent.change(input2, { target: { value: "-5" } });
        fireEvent.click(submitBtn);
        expect(resultOutput.textContent).toStrictEqual("5");
      });
    });
  });
  //not a real operator, it should show an error if attempting to use it
  describe("Wrong operator", () => {
    beforeEach(() => {
      fireEvent.click(document.getElementById("wrong"));
    });
    it("UI should have a division symbol", () => {
      expect(operatorSymbol.textContent).toEqual("?");
    });
    it("should show an error if attempting to use it to calculate", () => {
      fireEvent.change(input1, { target: { value: "-25" } });
      fireEvent.change(input2, { target: { value: "-5" } });
      fireEvent.click(submitBtn);
      expect(resultOutput.textContent).toStrictEqual("Invalid operator type");
    });
  });
  it("should reset the form when selecting the reset button", () => {
    //fills the data
    fireEvent.change(input1, { target: { value: "-25" } });
    fireEvent.change(input2, { target: { value: "-5" } });
    fireEvent.click(document.getElementById("wrong"));
    //resets the data for testing
    fireEvent.click(document.getElementById("reset"));
    expect(operatorSymbol.textContent).toEqual("+");
    expect(input1.value).toStrictEqual("0");
    expect(input2.value).toStrictEqual("0");
    expect(resultOutput).toBeEmptyDOMElement();
  });
  it("should not accept other input than numbers", () => {
    fireEvent.change(input1, { target: { value: "abcd" } });
    //input should be empty and button disabled
    expect(input1.value).toStrictEqual("");
    expect(submitBtn).toBeDisabled();
  });
});
