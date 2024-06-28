import {
    useContext,
} from "react";
import { calculationContext } from "../App"

function DisplayPanel() {
    const {
        input, setInput,
        result, setResult
    } = useContext(calculationContext);

    return (
        <div>
            <h1> Result: {result}</h1>
        </div>
    );
}

export default DisplayPanel; 