import {
    useState,
    createContext
} from "react";
import "./App.css";
import "./components/styles/NumberPad.css";
import NumberPad from "./components/NumberPad";
import DisplayPanel from "./components/DisplayPanel";

//  ！！！！！！！！！！！！！！！！！
// hover on button
// maximum input 9 digits
// if else 换 switch

// calculate 的时候also 记得track decimal place（or display 的时候round to 9 digit anyway）
// (low priority) 先C 后AC

// Next:
// 设Display value
// if value > 999999999 (9个digits)，convert scientific notation
// if value 大于99个digits， error
// if result<=99999999, 不管有几个小数位，显示最多9 digits（if前8，后round to一个小数位)

// (low priority) 符号按的时候就加入equation，先检查是否tail是符号，是的话pop，再push当前

//handle calculation error

// UseEffect: (whenever display changes) if null, display input; if not null, display result

// refactor operator buttons onclick. Combine to one function.

// refactor highlightOperator

export const calculationContext = createContext();

function App() {
    const [input, setInput] = useState("0");    // tracks the user's input value
    const [equation, setEquation] = useState([]);    // tracks the calculation
    const [result, setResult] = useState(null);     // tracks the calculation result
   
    /**
     * Represent the given number in scientific notation.
     * 
     * @param {string} number -  The number to be converted
     * @returns {string} The scientific notation of the number
     */
    function convertNumber(number) {
        const numberValue = Number(number);

        // The number of the digits of the whole number part -1
        const power = number.replace("-", "").split(".")[0].length - 1;

        let base = String(numberValue / Math.pow(10, power));

        // only keep maximum 4 decimal places
        if (base.replace("-", "").length > 6) {
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
        <calculationContext.Provider
            value={{
                input, setInput,
                equation, setEquation,
                result, setResult
        }}>

            <div className="App">
                <div>
                    <h1>Simple Calculator</h1>
                </div>

                <form>

                    <h1> Equation: {equation}</h1>

                    <input
                        pattern="[0-9]"
                        type="number"
                        placeholder="Type a number"
                    />

                    <NumberPad/>

                </form>

                <br></br><br></br><br></br>
                <h1> Input: {input}</h1>
                <DisplayPanel />
                <h1> {convertNumber("66.9")}</h1>
            </div>

        </calculationContext.Provider>
    );
}

export default App; 
