import {
    useState,
    useRef
} from "react";
import "./App.css";
import "./components/styles/Buttons.css";
import Button from "./components/Buttons";

//  ！！！！！！！！！！！！！！！！！
// hover on button
// maximum input 9 digits
// if else 换 switch
// 再次点击operator，先默认等于？   prev_operator    prev_num
//      如果cur是乘除，prev是加减，先乘除，后加减
//      如果cur是加减，prev是加减，直接加减
//       如果cur是乘除，prev是乘除，直接乘除
//      如果cur是加减，prev是乘除，直接加减
// 先C 后AC
// 加减乘除顺序

// equal以后input 等于result
// 设isEqualBtnLastClicked
// 数字键按的时候查isEqualBtnLastClicked

// 设Display value
// if value > 999999999 (9个digits)，convert scientific notation
// if value 大于99个digits， error
// if result<=99999999, 不管有几个小数位，显示最多9 digits（if前8，后round to一个小数位)


function App() {
    const inputRef = useRef(null);
    const [input, setInput] = useState("0");    // tracks the user's input value
    const [result, setResult] = useState(0);    // tracks the calculation result
    const [curOperator, setCurOperator] = useState(null);
    const Operators = {
        Plus: "Plus",
        Divide: "Divide",
        Minus: "Minus",
        Multiply: "Multiply"
    }

    function updateInput(e) {
        e.preventDefault();

        let newValue;
        // get the pressed number
        let keyPressed = e.currentTarget.getAttribute("data-value");

        if (input === "0") {
            // discard the default "0"
            newValue = keyPressed;
        }
        else if (keyPressed === "." && input.includes(".")) {
            // if users pressed multiple "." for a value, 
            // only keeping one "." is necessary
            // ignore the extra "."
            newValue = input;
        }
        else {
            newValue = input + keyPressed;
        }

        //update the values
        setInput(newValue);
        if (curOperator == null) {
            setResult(newValue);
        }
    }

    function plus(e) {
        e.preventDefault();

        setCurOperator(Operators.Plus);
        setInput("0");

        highlightOperator(Operators.Plus);
    };

    function minus(e) {
        e.preventDefault();

        setCurOperator(Operators.Minus);
        setInput("0");

        highlightOperator(Operators.Minus);
    };

    function multiply(e) {
        e.preventDefault();

        setCurOperator(Operators.Multiply);
        setInput("0");

        highlightOperator(Operators.Multiply);
    };

    function divide(e) {
        e.preventDefault();

        setCurOperator(Operators.Divide);
        setInput("0");

        highlightOperator(Operators.Divide);
    };

    function equal(e) {
        e.preventDefault();

        const inputValue = Number(input);

        if (curOperator == Operators.Plus) {
            setResult(Number(result) + inputValue);
        }
        else if (curOperator == Operators.Minus) {
            setResult(Number(result) - inputValue);
        }
        else if (curOperator == Operators.Multiply) {
            setResult(Number(result) * inputValue);
        }
        else if (curOperator == Operators.Divide) {
            if (inputValue == 0) {
                alert("Cannot divide by 0!")
                return;
            }
            else {
                setResult(Number(result) / inputValue);
            }
        }

        // reset
        setInput("0");
        setCurOperator(null);
        highlightOperator(null);
    };

    function flip(e) {
        e.preventDefault();

        let newValue;

        if (input === "0") {
            // Do nothing
            return;
        }
        else if (input.charAt(0) === "-") {
            newValue = input.substring(1, input.length);
        }
        else {
            newValue = "-" + input;
        }

        setInput(newValue);
        if (curOperator == null) {
            setResult(newValue);
        }
    };

    function reset(e) {
        e.preventDefault();

        setResult(0);
        setInput("0");
        setCurOperator(null);

        // reset the color of operator buttons
        highlightOperator(null);
    };

    function backSpace(e) {
        e.preventDefault();

        let newInput = input.substring(0, input.length - 1);
        if (newInput === "" || newInput === "-") {
            // input by default is 0
            newInput = "0";
        }
        setInput(newInput);

        if (curOperator == null) {
            setResult(newInput);
        }
    };


    /**
     * Highlight the specified operator button
     * @param {Operators} operator - The operator button to be highlighted. 
     *                               If value if null, no operator button will be highlighted.
     */
    function highlightOperator(operator) {
        // First, dim all the operator buttons
        let plusBtn = document.getElementById("plus");
        plusBtn.className = "btn operators";
        let minusBtn = document.getElementById("minus");
        minusBtn.className = "btn operators";
        let multiplyBtn = document.getElementById("multiply");
        multiplyBtn.className = "btn operators";
        let divideBtn = document.getElementById("divide");
        divideBtn.className = "btn operators";

        // Then, hightlight only the specified operator button
        if (operator == Operators.Plus) {
            plusBtn.className = "btn clickedOperators";
        }
        else if (operator == Operators.Minus) {
            minusBtn.className = "btn clickedOperators";
        }
        else if (operator == Operators.Multiply) {
            multiplyBtn.className = "btn clickedOperators";
        }
        else if (operator === Operators.Divide) {
            divideBtn.className = "btn clickedOperators";
        }
    };


    /**
     * Represent the given number in scientific notation.
     * 
     * @param {string} number -  The number to be converted
     * @returns {string} The scientific notation of the number
     */
    function convertNumber(number) {
        const numberValue = Number(number);
        
        // The number of the digits of the whole number part -1
        const power = number.replace("-","").split(".")[0].length - 1;
        
        let base = String(numberValue / Math.pow(10, power));

        // only keep maximum 4 decimal places
        if (base.replace("-", "").length > 6){
            base = roundToDecimalPlaces(base, 4);
        }

        let convertedNum = base + "E" + String(power);
        return convertedNum;
    };

    /**
    * Round the given number to a specific number of decimal places.
    * 
    * @param {number} number -  The number to be rounded
    * @param {number} number -  The number of decimal places to round to 
    * @returns {number} The rounded number
    */
    function roundToDecimalPlaces(number, decimals) {
        const factor = Math.pow(10, decimals);
        return Math.round(number * factor) / factor;
    }


    return (
        <div className="App">
            <div>
                <h1>Simplest Working Calculator</h1>
            </div>

            <form>

                <h1> Result: {result}</h1>

                <input
                    pattern="[0-9]"
                    ref={inputRef}
                    type="number"
                    placeholder="Type a number"
                />

                <Button
                    plus={plus}
                    minus={minus}
                    multiply={multiply}
                    divide={divide}
                    equal={equal}
                    flip={flip}
                    resetResult={reset}
                    updateInput={updateInput}
                    backSpace={backSpace}
                />

            </form>

            <br></br><br></br><br></br>
            <h1> Input: {input}</h1>
            <h1> {convertNumber("66.9")}</h1>
        </div>
    );
}

export default App; 
