import {
    useState,
    createContext
} from "react";
import "./Calculator.css";
import NumberPad from "./components/NumberPad";
import DisplayPanel from "./components/DisplayPanel";


// Future Work: Dynamicaly adjust the size of the display values as 
//              users input more digits


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
                    {/* <h1> Equation: {equation}</h1> */}
                    <DisplayPanel />
                    <NumberPad/>
                    {/* <h1> Input: {input}</h1> */}
            </div>
        </calculationContext.Provider>
    );
}

export default Calculator; 
