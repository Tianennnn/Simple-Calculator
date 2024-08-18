import {
    useContext,
    useState
} from "react";
import Decimal from 'decimal.js';
import { calculationContext } from "../Calculator"
import "./styles/NumberPad.css";

let equalBtnLastClicked = false;

function NumberPad() {
    const {
        input, setInput,
        equation, setEquation,
    } = useContext(calculationContext);

    const [curOperator, setCurOperator] = useState(null);
    const Operators = {
        Plus: " + ",
        Divide: " ÷ ",
        Minus: " - ",
        Multiply: " x "
    };

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
            
            // reset the operator and the "=" button
            setCurOperator(null);
            equalBtnLastClicked = false;
            
            // start new input
            if(keyPressed === "."){
                newValue = "0.";
            }
            else{
                newValue = keyPressed;
            }
        }
        else if (equalBtnLastClicked || isNaN(input) || !isFinite(input)) {
            // start new calculation
            if (keyPressed === ".") {
                newValue = "0.";
            }
            else {
                newValue = keyPressed;
            }
            equalBtnLastClicked = false;
        }
        else if (input.replace("-", "").length >= 9){
            // only allow user to input numbers with digits less than 9
            newValue = input;
        }
        else if (input === "0" && keyPressed !== ".") {
            // discard the default "0"
            newValue = keyPressed;
        }
        else if (keyPressed === "." && input.includes(".")) {
            // if a user presses multiple "." for a value, 
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
    };

    /**
     * Handles the event when a operator button is clicked.
     * @param e 
     */
    function handleOperation(e, clickedOperator) {
        e.preventDefault();

        // if the user click on the same operator buttton 
        if (curOperator === clickedOperator) {
            // deselect the operator
            setCurOperator(null);
            highlightOperator(null);
        }
        else{
            if (!isDivisionByZero()) {
                setCurOperator(clickedOperator);
                highlightOperator(clickedOperator);
            }
        }
    };

    /**
     * Calculates the result of the operations
     * @param e 
     */
    function equal(e) {
        e.preventDefault();

        if (!isDivisionByZero()) {
            // save the previous Input and curOperator
            equation.push(Number(input));
            if (curOperator !== null) {
                equation.push(curOperator);
                equation.push(Number(input));
            }
            setEquation(equation.slice());

            let result = calculate();
            setInput(String(result));
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

        if (curOperator !== null) {
            // save the previous input and previous operator
            equation.push(Number(input));
            equation.push(curOperator);
            setEquation(equation.slice());

            // reset the operator
            setCurOperator(null);
            highlightOperator(null);

            // start new input
            newValue = "0";
        }
        else if (input === "0" || isNaN(input) || !isFinite(input)) {
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
        equalBtnLastClicked = false;

        // reset the color of operator buttons
        highlightOperator(null);
    };

    /**
     * Discards the last input digit
     * @param e 
     */
    function backSpace(e) {
        e.preventDefault();

        if (curOperator !== null || equalBtnLastClicked) {
            // do nothing
            return
        }

        let newInput = input.substring(0, input.length - 1);
        if (newInput === "" || newInput === "-" || isNaN(input) || !isFinite(input)) {
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
            let numA = new Decimal(Number(equation[i - 1]));
            let numB = new Decimal(Number(equation[i + 1]));
            if (equation[i] === Operators.Multiply) {
                operationResult = numA.times(numB);
                // update the equation
                equation.splice(i - 1, 3, operationResult.toNumber());
            }
            else if (equation[i] === Operators.Divide) {
                operationResult = numA.dividedBy(numB);
                // update the equation
                equation.splice(i - 1, 3, operationResult.toNumber());
            }
            else {
                // check the next operator
                i += 2;
            }
        }

        // Then, calculate additions and substractions
        i = 1;      // reset the pointer
        while (i < equation.length) {
            let numA = new Decimal(Number(equation[i - 1]));
            let numB = new Decimal(Number(equation[i + 1]));
            if (equation[i] === Operators.Plus) {
                operationResult = numA.plus(numB);
                // update the equation
                equation.splice(i - 1, 3, operationResult.toNumber());
            }
            else if (equation[i] === Operators.Minus) {
                operationResult = numA.minus(numB);
                // update the equation
                equation.splice(i - 1, 3, operationResult.toNumber());
            }
            else {
                // check the next operator
                i += 2;
            }
        }

        return equation[0];
    };


    /**
     * Checks if a user is trying to divide a number by 0.
     * If so, alert the user.
     * 
     * @returns {boolean} 
     */
    function isDivisionByZero() {
        let result = false;

        if (equation.length >= 2 &&
            equation[equation.length - 1] === Operators.Divide && 
            (input === "0" || input === ".") ) {
            alert("Cannot divide by 0!")
            result = true;
        }
        // edge case: when a user has clicked only the "÷" button before clicking
        //            the "=" button, the equation defaults to: 0 ÷ 0
        else if (curOperator === Operators.Divide && input === "0") {
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
        plusBtn.className = "operators";
        let minusBtn = document.getElementById("minus");
        minusBtn.className = "operators";
        let multiplyBtn = document.getElementById("multiply");
        multiplyBtn.className = "operators";
        let divideBtn = document.getElementById("divide");
        divideBtn.className = "operators";

        // Then, hightlight only the specified operator button
        if (operator === Operators.Plus) {
            plusBtn.className = "clickedOperators";
        }
        else if (operator === Operators.Minus) {
            minusBtn.className = "clickedOperators";
        }
        else if (operator === Operators.Multiply) {
            multiplyBtn.className = "clickedOperators";
        }
        else if (operator === Operators.Divide) {
            divideBtn.className = "clickedOperators";
        }
    };

    return (
        <div className="numberpad">
            <button onClick={reset} className="specials">AC</button>
            <button onClick={flip} className="specials">±</button>
            <button data-value="backspace" onClick={backSpace} className="specials">⌫</button>
            <button id="divide" onClick={(e) => { handleOperation(e, Operators.Divide); }} className="operators"> <span className="operatorPosition">÷</span> </button>
            <button data-value="7" onClick={updateInput} className="numbers">7</button>
            <button data-value="8" onClick={updateInput} className="numbers">8</button>
            <button data-value="9" onClick={updateInput} className="numbers">9</button>
            <button id="multiply" onClick={(e) => { handleOperation(e, Operators.Multiply); }} className="operators"><span className="operatorPosition">x</span></button>
            <button data-value="4" onClick={updateInput} className="numbers">4</button>
            <button data-value="5" onClick={updateInput} className="numbers">5</button>
            <button data-value="6" onClick={updateInput} className="numbers">6</button>
            <button id="minus" onClick={ (e) => {handleOperation(e, Operators.Minus);} } className="operators"><span className="operatorPosition">-</span></button>
            <button data-value="1" onClick={updateInput} className="numbers">1</button>
            <button data-value="2" onClick={updateInput} className="numbers">2</button>
            <button data-value="3" onClick={updateInput} className="numbers">3</button>
            <button id="plus" onClick={(e) => { handleOperation(e, Operators.Plus); }} className="operators"><span className="operatorPosition">+</span></button>
            <button data-value="0" onClick={updateInput} id="zero" className="numbers">0</button>
            <button data-value="." onClick={updateInput} className="numbers">.</button>
            <button onClick={equal} className="operators"><span className="operatorPosition">=</span></button>
        </div>
    );
}

export default NumberPad; 