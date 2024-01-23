import { ACTIONS } from "./Button";

export default function NumberBtn({dispatch, digit}){
    return(
        <button className="btn" onClick={()=>dispatch({type:ACTIONS.CALCULATE_NUMBER, payload:{digit}})}>{digit}</button>
    )
}