import { useReducer } from "react"
import NumberBtn from "./NumberBtn"
import OperationBtn from "./OperationBtn"

export const ACTIONS = {
    CALCULATE_NUMBER : 'calculate-number',
    CHOOSE_OPERATION: 'choose-operation',
    CLEAR : 'clear',
    CLEAR_CURRENT : 'clear-current',
    EVALUATE: 'evaluate',
    DELETE_DIGIT: 'delete-digit',
    PERCENTAGE1: 'percentage',
    SQUARE: 'square',
    DIVISION: 'division',
    SQUARE_ROOT: 'square-root',
    NEGATIVE_PLUSE : 'negative-pluse'
}

function reducer(state,{type,payload}){
    switch(type){
        case ACTIONS.CALCULATE_NUMBER:
            if(state.overwrite){
                return{
                    ...state,
                    CurrentValue: payload.digit,
                    overwrite:false,
                }
            }
            if(payload.digit == '0' && state.CurrentValue == '0') return state
            if(payload.digit == '.' && state.CurrentValue.includes('.')) return state
            return{
                ...state,
                CurrentValue: `${state.CurrentValue || ''}${payload.digit}` ,
            }
        case ACTIONS.CHOOSE_OPERATION:
            if(state.CurrentValue == null && state.PerviousValue == null){
                return state
            }
            if(state.CurrentValue == null){
                return{
                    ...state,
                    operation: payload.operation,
                }
            }
            if(state.PerviousValue==null){
                return{
                    ...state,
                    operation : payload.operation,
                    PerviousValue: state.CurrentValue,
                    CurrentValue: null,
                }
            }
            return{
                ...state,
                PerviousValue: evaluate(state),
                operation : payload.operation,
                CurrentValue: null,
            }
        case ACTIONS.CLEAR:
            return {}
        case ACTIONS.CLEAR_CURRENT:
            return{
                ...state,
                CurrentValue : null, 
            }
        case ACTIONS.EVALUATE:
            if(state.CurrentValue == null || state.PerviousValue == null || state.operation == null){
                return state
            }
            return{
                ...state,
                overwrite: true,
                PerviousValue: null,
                operation: null,
                CurrentValue: evaluate(state),
            }
        case ACTIONS.DELETE_DIGIT:
            if(state.overwrite){
                return{
                    ...state,
                    overwrite: true,
                    CurrentValue : null,
                }
            }
            if(state.CurrentValue == null) return state
            if(state.CurrentValue === +state.CurrentValue && state.CurrentValue !== (state.CurrentValue | 0)) return {}
            if(state.CurrentValue.length == 1){
                return{
                    ...state,
                    CurrentValue: null
                }
            }
            return{
                ...state,
                CurrentValue: state.CurrentValue.slice(0,-1)
            }
        case ACTIONS.PERCENTAGE1:
            if(state.CurrentValue == null){
                return state
            }
            return{
                ...state,
                overwrite: true,
                PerviousValue : null,
                operation: null,
                CurrentValue: Percentag(state),
            }
            case ACTIONS.SQUARE:
                if(state.operation != null || state.previousOperand != null){
                    return state
                }
                return{
                    ...state,
                    overwrite: true,
                    PerviousValue: null,
                    operation: null,
                    CurrentValue: SQUARE(state),
                }
            case ACTIONS.DIVISION:
                if(state.operation != null || state.previousOperand != null){
                    return state
                }
                return{
                    ...state,
                    overwrite: false,
                    PerviousValue: null,
                    operation: null,
                    CurrentValue: Divide(state),
                }
            case ACTIONS.SQUARE_ROOT:
                if(state.operation != null || state.previousOperand != null){
                    return state
                }
                return{
                    ...state,
                    overwrite: false,
                    PerviousValue: null,
                    operation: null,
                    CurrentValue: SquareRoot(state),
                }
            case ACTIONS.NEGATIVE_PLUSE:
                if(state.operation != null || state.previousOperand != null){
                    return state
                }
                return{
                    ...state,
                    overwrite: true,
                    previousOperand: null,
                    operation: null,
                    CurrentValue: PluseNegative(state),
                }
    }
}
function PluseNegative({CurrentValue}){
    const curr = parseFloat(CurrentValue)
    if(isNaN(curr)) return ''
    if(curr <0){
        let root = Math.abs(curr)
        return root
    }else{
        let root = curr * -1
        return root
    }
}
function SQUARE({CurrentValue}){
    const curr = parseFloat(CurrentValue)
    if(isNaN(curr)) return ''
    // let root = curr * curr
    let root = Math.pow(curr,2)
    return root
}

function SquareRoot({CurrentValue}){
    const curr = parseFloat(CurrentValue)
    if(isNaN(curr)) return ''
    let root = Math.sqrt(curr)
    return root
}

function Divide({CurrentValue}){
    const curr = parseFloat(CurrentValue)
    if(isNaN(curr)) return ''
    let div = 1 / curr
    return div
}

function Percentag({CurrentValue}){
    const CV = parseFloat(CurrentValue)
    if(isNaN(CV)) return ''
    let PVALUE = CV / 100
    return PVALUE
}


function evaluate({CurrentValue, PerviousValue, operation}){
    const CV = parseFloat(CurrentValue)
    const PV = parseFloat(PerviousValue)
    if(isNaN(PV) || isNaN(CV)) return ''
    let FinalValue = ''
    switch(operation){
        case '+':
            FinalValue = PV + CV
            break
        case '-':
            FinalValue = PV - CV
            break
        case '*':
            FinalValue = PV * CV
            break
        case '/':
            FinalValue = PV / CV
            break
    }
    return FinalValue.toString()
}


export const Button = () => {
    const [{PerviousValue, CurrentValue, operation, mathsymbol}, dispatch] = useReducer(reducer, {})
    return (
        <section className="Calculator">
        <div className="screen">
            <div className="PerviousValue">{PerviousValue} {operation}</div>
            <div className="CurrentValue">{CurrentValue}</div>
        </div>
        <div className="BTN">
            {/* <OperationBtn operation='%' dispatch={dispatch}/> */}
            <button className="btn" onClick={()=>dispatch({type: ACTIONS.PERCENTAGE1})}>%</button>
            <button className="btn" onClick={()=>dispatch({type: ACTIONS.CLEAR_CURRENT})}>CE</button>
            <button className="btn" onClick={()=>dispatch({type: ACTIONS.CLEAR})}>C</button>
            <button className="btn" onClick={()=>dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
            <button className="btn" onClick={()=>dispatch({type: ACTIONS.DIVISION})}>1/x</button>
            <button className="btn" onClick={()=>dispatch({type: ACTIONS.SQUARE})}>x <sup>2</sup></button>
            <button className="btn" onClick={()=>dispatch({type: ACTIONS.SQUARE_ROOT})}><sup>2</sup>x</button>
            <OperationBtn operation='/' dispatch={dispatch} />

            <NumberBtn digit='7' dispatch={dispatch}/>
            <NumberBtn digit='8' dispatch={dispatch}/>
            <NumberBtn digit='9' dispatch={dispatch}/>
            <OperationBtn operation='*' dispatch={dispatch} />

            <NumberBtn digit='4' dispatch={dispatch}/>
            <NumberBtn digit='5' dispatch={dispatch}/>
            <NumberBtn digit='6' dispatch={dispatch}/>
            <OperationBtn operation='-' dispatch={dispatch} />

            <NumberBtn digit='1' dispatch={dispatch}/>
            <NumberBtn digit='2' dispatch={dispatch}/>
            <NumberBtn digit='3' dispatch={dispatch}/>
            <OperationBtn operation='+' dispatch={dispatch} />

            <button className="btn" onClick={()=>dispatch({type: ACTIONS.NEGATIVE_PLUSE})}>+/-</button>
            <NumberBtn digit='0' dispatch={dispatch}/>
            <NumberBtn digit='.' dispatch={dispatch}/>
            <button className="btn" onClick={()=>dispatch({type: ACTIONS.EVALUATE})}>=</button>

{/* 
            <button>/</button>
            <button>*</button>
            <button>-</button>
            <button>+</button>
            <button>=</button>
            <button>%</button> */}
        </div>
    </section>
    )
}
