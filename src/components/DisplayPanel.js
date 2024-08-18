import {
    useContext,
    useState,
    useEffect
} from "react";
import { calculationContext } from "../Calculator"
import "./styles/DisplayPanel.css";

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
            displayValue = "Error";
        }
        else {
            // if the string to display is too long 
            if (input.replace("-", "").length > 9){
                // if the number value is not too large, and not too small
                if (Math.abs(Number(input)) < Math.pow(10, 9) && 
                    Math.abs(Number(input)) >= 1){
                    // truncate the decimal places
                    displayValue = input.substring(0,10);
                    //if the last character is "."
                    if (displayValue.charAt(displayValue.length - 1) === "."){
                        // remove the "."
                        displayValue = displayValue.substring(0, displayValue.length - 1);
                    }
                }
                else{
                    // convert to the scientific notation
                    displayValue = convertNumber(input);
                    if (displayValue === "Error"){
                        setInput(NaN);
                    }
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

        let convertedNum = "";
        if(power > 999){
            convertedNum = "Error";
        }
        else if (power > 0) {
            // only keep maximum 9 digits/characters on screen
            let keepDecimalPlaces = 9 
                                    - 1         // integer part length
                                    - 1         // decimal point
                                    - 2         // "e" and "+"
                                    - power.toString().length;
            base = String(roundToDecimalPlaces(Number(base), keepDecimalPlaces));

            convertedNum = base + "e" + "+" + String(power);
        }
        else if (power < 0) {
            // only keep maximum 9 digits/characters on screen
            let keepDecimalPlaces = 9 
                                    - 1         // integer part length
                                    - 1         // decimal point
                                    - 1         // "e"
                                    - power.toString().length;
            base = String(roundToDecimalPlaces(Number(base), keepDecimalPlaces));

            convertedNum = base + "e" + String(power);
        }
        else{
            // only keep maximum 9 digits/characters on screen
            let keepDecimalPlaces = 9;
            base = String(roundToDecimalPlaces(Number(base), keepDecimalPlaces));

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
        <div className="displayPanel">
            <p className="displayValue">{display}</p>
        </div>
    );
}

export default DisplayPanel; 