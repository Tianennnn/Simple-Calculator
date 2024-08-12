import {
    useState,
    createContext
} from "react";
import "./Calculator.css";
import NumberPad from "./components/NumberPad";
import DisplayPanel from "./components/DisplayPanel";

//  ！！！！！！！！！！！！！！！！！
// if else 换 switch

// (low priority) 先C 后AC

// (low priority) 符号按的时候就加入equation，先检查是否tail是符号，是的话pop，再push当前


export const calculationContext = createContext();

function Calculator() {
    const [input, setInput] = useState("0");    // tracks the user's input value
    const [equation, setEquation] = useState([]);    // tracks the calculation

    return (
        <calculationContext.Provider
            value={{
                input, setInput,
                equation, setEquation,
        }}>

            <div className="calculator">
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
            </div>

        </calculationContext.Provider>
    );
}

export default Calculator; 
