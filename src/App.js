import {
    useState,
    useRef,
    createContext
} from "react";
import "./App.css";
import "./components/styles/Buttons.css";
import Buttons from "./components/Buttons";

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

export const calculationContext = createContext();

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
                result, setResult,
                curOperator, setCurOperator,
                Operators
        }}>

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

                    <Buttons/>

                </form>

                <br></br><br></br><br></br>
                <h1> Input: {input}</h1>
                <h1> {convertNumber("66.9")}</h1>
            </div>

        </calculationContext.Provider>
    );
}

export default App; 
