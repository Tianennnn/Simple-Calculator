import {
    useContext,
    useState,
    useEffect
} from "react";
import { calculationContext } from "../App"

function DisplayPanel() {
    const {
        input, setInput,
    } = useContext(calculationContext);

    const [display, setDisplay] = useState("0");

    useEffect(() => {
        setDisplay(input);
    }, [input]);

    return (
        <div>
            <h1> Display: {display}</h1>
        </div>
    );
}

export default DisplayPanel; 