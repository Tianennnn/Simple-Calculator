import {
    useContext,
    useEffect,
    useState
} from "react";
import { calculationContext } from "../App"
import "./styles/NumberPad.css";

let equalBtnLastClicked = false;

function NumberPad() {
    const {
        input, setInput,
        equation, setEquation,
        result, setResult
    } = useContext(calculationContext);

    const [curOperator, setCurOperator] = useState(null);
    const Operators = {
        Plus: " + ",
        Divide: " ÷ ",
        Minus: " - ",
        Multiply: " x "
    }

    /**
     * Process the key (for the number keys and the "." key) that the user just pressed
     * @param e 
     */
    function updateInput(e) {
        e.preventDefault();

        let newValue;
        // get the pressed number
        let keyPressed = e.currentTarget.getAttribute("data-value");

        if (curOperator !== null) {
            // save the previous input and previous operator
            equation.push(Number(input));
            equation.push(curOperator);
            setEquation(equation.slice());

            // reset the result value, the operator and the "=" button
            setResult(null);
            setCurOperator(null);
            if (equalBtnLastClicked) {
                equalBtnLastClicked = false;
            }

            newValue = keyPressed;
        }
        else if (equalBtnLastClicked) {
            // start new calculation
            newValue = keyPressed;
            equalBtnLastClicked = false;
            setResult(null);
        }
        else if (input === "0") {
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
        if (curOperator !== null) {
            highlightOperator(null);
        }

    }

    /**
     * Prepares for the addition operation
     * @param e 
     */
    function plus(e) {
        e.preventDefault();

        if (!isDivisionByZero()) {
            // if the user already clicked the "+" buttton
            if (curOperator === Operators.Plus) {
                // deselect the operator
                setCurOperator(null);
                highlightOperator(null);
            }
            else {
                setCurOperator(Operators.Plus);
                highlightOperator(Operators.Plus);
            }
        }
    };

    /**
     * Prepares the substraction operation
     * @param e 
     */
    function minus(e) {
        e.preventDefault();

        if (!isDivisionByZero()) {
            // if the user already clicked the "-" buttton
            if (curOperator === Operators.Minus) {
                // deselect the operator
                setCurOperator(null);
                highlightOperator(null);
            }
            else {
                setCurOperator(Operators.Minus);
                highlightOperator(Operators.Minus);
            }
        }
    };

    /**
     * Prepares the multiplication operation
     * @param e 
     */
    function multiply(e) {
        e.preventDefault();

        if (!isDivisionByZero()) {
            // if the user already clicked the "X" buttton
            if (curOperator === Operators.Multiply) {
                // deselect the operator
                setCurOperator(null);
                highlightOperator(null);
            }
            else {
                setCurOperator(Operators.Multiply);
                highlightOperator(Operators.Multiply);
            }
        }
    };

    /**
     * Prepares the division operation
     * @param e 
     */
    function divide(e) {
        e.preventDefault();

        if (!isDivisionByZero()) {
            // if the user already clicked the "÷" buttton
            if (curOperator === Operators.Divide) {
                // deselect the operator
                setCurOperator(null);
                highlightOperator(null);
            }
            else {
                setCurOperator(Operators.Divide);
                highlightOperator(Operators.Divide);
            }
        }
    };

    /**
     * Calculate the result of the operations
     * @param e 
     */
    function equal(e) {
        e.preventDefault();

        if ( !isDivisionByZero() ) {
            // save the previous Input and curOperator
            equation.push(Number(input));
            if (curOperator !== null) {
                equation.push(curOperator);
                equation.push(Number(input));
            }
            setEquation(equation.slice());

            let result = calculate();
            setInput(result);
            setResult(result);
            equalBtnLastClicked = true;

            // reset
            setEquation([]);
            setCurOperator(null);
            highlightOperator(null);
        }
    };

    /**
     * Flips the sign of the input value
     * @param e 
     */
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
    };

    /**
     * Resets the calculator
     * @param e 
     */
    function reset(e) {
        e.preventDefault();

        setEquation([]);
        setInput("0");
        setCurOperator(null);

        // reset the color of operator buttons
        highlightOperator(null);
    };

    /**
     * Discards the last input digit
     * @param e 
     */
    function backSpace(e) {
        e.preventDefault();

        let newInput = input.substring(0, input.length - 1);
        if (newInput === "" || newInput === "-") {
            // input by default is 0
            newInput = "0";
        }
        setInput(newInput);
    };

    /**
     * Process the state variable 'equation', which is a list of numbers and operators 
     * represented in strings. Calculate the result of the corresponidng equation.
     * 
     * After the function is finished, the length of the state variable 'equation' should
     * be 1, which is the result of the original equation.
     * 
     * @returns {Number} the result of calculating the equation
     */
    function calculate() {
        let operationResult;    // to temporary hold the calculation result for each operation 
        let i;      // the pointer

        // first, calculate multiplications and divisions
        i = 1;      // the index of first operator
        while (i < equation.length) {
            if (equation[i] === Operators.Multiply) {
                operationResult = Number(equation[i - 1]) * Number(equation[i + 1]);
                // update the equation
                equation.splice(i - 1, 3, operationResult);
            }
            else if (equation[i] === Operators.Divide) {
                operationResult = Number(equation[i - 1]) / Number(equation[i + 1]);
                // update the equation
                equation.splice(i - 1, 3, operationResult);
            }
            else {
                // check the next operator
                i += 2;
            }
        }

        // Then, calculate additions and substractions
        i = 1;      // reset the pointer
        while (i < equation.length) {
            if (equation[i] === Operators.Plus) {
                operationResult = Number(equation[i - 1]) + Number(equation[i + 1]);
                // update the equation
                equation.splice(i - 1, 3, operationResult);
            }
            else if (equation[i] === Operators.Minus) {
                operationResult = Number(equation[i - 1]) - Number(equation[i + 1]);
                // update the equation
                equation.splice(i - 1, 3, operationResult);
            }
            else {
                // check the next operator
                i += 2;
            }
        }

        return equation[0];
    };


    /**
     * Checks if a user tries to divide a number by 0.
     * If so, also alert the user.
     * 
     * @returns {boolean} 
     */
    function isDivisionByZero() {
        let result = false;
        const inputValue = Number(input);

        if (equation.length >= 2 &&
            equation[equation.length - 1] === Operators.Divide && inputValue === 0) {
            alert("Cannot divide by 0!")
            result = true;
        }
        // edge case: when a user has clicked only the "÷" button before clicking
        //            the "=" button, the equation defaults to: 0 ÷ 0
        else if (curOperator === Operators.Divide && inputValue === 0) {
            alert("Cannot divide by 0!")
            result = true;
        }

        return result;
    };


    /**
     * Highlights the specified operator button
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
        if (operator === Operators.Plus) {
            plusBtn.className = "btn clickedOperators";
        }
        else if (operator === Operators.Minus) {
            minusBtn.className = "btn clickedOperators";
        }
        else if (operator === Operators.Multiply) {
            multiplyBtn.className = "btn clickedOperators";
        }
        else if (operator === Operators.Divide) {
            divideBtn.className = "btn clickedOperators";
        }
    };

    return (
        <div className="numberpad">
            <button onClick={reset} className="btn specials">AC</button>
            <button onClick={flip} className="btn specials">±</button>
            <button data-value="backspace" onClick={backSpace} className="btn specials">⌫</button>
            <button id="divide" onClick={divide} className="btn operators"> <span className="operatorPosition">÷</span> </button>
            <button data-value="7" onClick={updateInput} className="btn numbers">7</button>
            <button data-value="8" onClick={updateInput} className="btn numbers">8</button>
            <button data-value="9" onClick={updateInput} className="btn numbers">9</button>
            <button id="multiply" onClick={multiply} className="btn operators"><span className="operatorPosition">x</span></button>
            <button data-value="4" onClick={updateInput} className="btn numbers">4</button>
            <button data-value="5" onClick={updateInput} className="btn numbers">5</button>
            <button data-value="6" onClick={updateInput} className="btn numbers">6</button>
            <button id="minus" onClick={minus} className="btn operators"><span className="operatorPosition">-</span></button>
            <button data-value="1" onClick={updateInput} className="btn numbers">1</button>
            <button data-value="2" onClick={updateInput} className="btn numbers">2</button>
            <button data-value="3" onClick={updateInput} className="btn numbers">3</button>
            <button id="plus" onClick={plus} className="btn operators"><span className="operatorPosition">+</span></button>
            <button data-value="0" onClick={updateInput} className="btn numbers">0</button>
            <button data-value="." onClick={updateInput} className="btn numbers">.</button>
            <button onClick={equal} className="btn operators"><span className="operatorPosition">=</span></button>
        </div>
    );
}

export default NumberPad; 