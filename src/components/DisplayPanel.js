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

    /**
    * Update the display value whenever the user presses a button
    */
    useEffect(() => {
        let displayValue = "";

        if (isNaN(input) || !isFinite(input)) {
            alert(input);
            displayValue = "Error";
        }
        else {
            // if the string to display is too long 
            if (input.replace("-", "").length > 12){
                // if the number value is not too large, and not too small
                if (Math.abs(Number(input)) < Math.pow(10, 8) && 
                    Math.abs(Number(input)) >= 1){
                    // truncate the decimal places
                    displayValue = input.substring(0,12);
                }
                else{
                    // convert to the scientific notation
                    displayValue = convertNumber(input);
                }
            }
            else{
                displayValue = input;
            }
        }

        setDisplay(displayValue);
    }, [input]);

    /**
     * Represent the given number in the scientific notation.
     * 
     * @param {string} number -  The number to be converted
     * @returns {string} The scientific notation of the number
     */
    function convertNumber(number) {
        const numberValue = Number(number);

        const integerPart = number.replace("-", "").split(".")[0];
        let power;
        if (Number(integerPart) > 0){
            power = integerPart.length - 1;
        }
        else{
            let decimalPart = number.replace("-", "").split(".")[1];
            let i = 0;
            while(decimalPart[i] === "0"){
                i++;
            }
            power = -i - 1;
        }

        let base = String(numberValue / Math.pow(10, power));

        // only keep maximum 10 decimal places
        base = String(roundToDecimalPlaces(Number(base), 10));

        let convertedNum = "";
        if (power > 0) {
            convertedNum = base + "e" + "+" + String(power);
        }
        else if (power < 0) {
            convertedNum = base + "e" + String(power);
        }
        else{
            convertedNum = base;
        }
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
        <div>
            <h1> Display: {display}</h1>
        </div>
    );
}

export default DisplayPanel; 