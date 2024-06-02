
import "./styles/Buttons.css";


function Button(props) {
    return (
        <div className="numberpad">
            <button onClick={props.reset} className="btn specials">AC</button>
            <button onClick={props.flip} className="btn specials">±</button>
            <button data-value="backspace" onClick={props.backSpace} className="btn specials">⌫</button>
            <button id="divide" onClick={props.divide} className="btn operators"> <span className="operatorPosition">÷</span> </button>
            <button data-value="7" onClick={props.updateInput} className="btn numbers">7</button>
            <button data-value="8" onClick={props.updateInput} className="btn numbers">8</button>
            <button data-value="9" onClick={props.updateInput} className="btn numbers">9</button>
            <button id="multiply" onClick={props.multiply} className="btn operators"><span className="operatorPosition">x</span></button>
            <button data-value="4" onClick={props.updateInput} className="btn numbers">4</button>
            <button data-value="5" onClick={props.updateInput} className="btn numbers">5</button>
            <button data-value="6" onClick={props.updateInput} className="btn numbers">6</button>
            <button id="minus" onClick={props.minus} className="btn operators"><span className="operatorPosition">-</span></button>
            <button data-value="1" onClick={props.updateInput} className="btn numbers">1</button>
            <button data-value="2" onClick={props.updateInput} className="btn numbers">2</button>
            <button data-value="3" onClick={props.updateInput} className="btn numbers">3</button>
            <button id="plus" onClick={props.plus} className="btn operators"><span className="operatorPosition">+</span></button>
            <button data-value="0" onClick={props.updateInput} className="btn numbers">0</button>
            <button data-value="." onClick={props.updateInput} className="btn numbers">.</button>
            <button onClick={props.equal} className="btn operators"><span className="operatorPosition">=</span></button>
        </div>
    );
}

export default Button; 