import {
    useContext,
} from "react";
import { calculationContext } from "../App"
import "./styles/Buttons.css";

function Buttons() {
    const {
        input, setInput,
        result, setResult,
        curOperator, setCurOperator,
        Operators
    } = useContext(calculationContext);

    /**
     * Process the key (for the number keys and the "." key) that the user just pressed
     * @param e 
     */
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

    /**
     * Prepares for the addition operation
     * @param e 
     */
    function plus(e) {
        e.preventDefault();

        setCurOperator(Operators.Plus);
        setInput("0");

        highlightOperator(Operators.Plus);
    };

    /**
     * Prepares the substraction operation
     * @param e 
     */
    function minus(e) {
        e.preventDefault();

        setCurOperator(Operators.Minus);
        setInput("0");

        highlightOperator(Operators.Minus);
    };

    /**
     * Prepares the multiplication operation
     * @param e 
     */
    function multiply(e) {
        e.preventDefault();

        setCurOperator(Operators.Multiply);
        setInput("0");

        highlightOperator(Operators.Multiply);
    };

    /**
     * Prepares the division operation
     * @param e 
     */
    function divide(e) {
        e.preventDefault();

        setCurOperator(Operators.Divide);
        setInput("0");

        highlightOperator(Operators.Divide);
    };

    /**
     * Calculate the result of the operations
     * @param e 
     */
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
        if (curOperator == null) {
            setResult(newValue);
        }
    };

    /**
     * Resets the calculator
     * @param e 
     */
    function reset(e) {
        e.preventDefault();

        setResult(0);
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

export default Buttons; 