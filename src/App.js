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

// (low priority) 先C 后AC

// (low priority) 符号按的时候就加入equation，先检查是否tail是符号，是的话pop，再push当前

// BUG: press "=" then press "."

// BUG: flip: allow 0.   When operator clicked then click flip

// BUG: press "=", then press "backspace", then press "number"

export const calculationContext = createContext();

function App() {
    const [input, setInput] = useState("0");    // tracks the user's input value
    const [equation, setEquation] = useState([]);    // tracks the calculation

    return (
        <calculationContext.Provider
            value={{
                input, setInput,
                equation, setEquation,
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
            </div>

        </calculationContext.Provider>
    );
}

export default App; 
