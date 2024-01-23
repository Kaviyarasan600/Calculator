import { ACTIONS } from "./Button";

export default function OperationBtn({dispatch, operation}){
    return(
        <button className="btn" onClick={()=>dispatch({type:ACTIONS.CHOOSE_OPERATION, payload:{operation}})}>{operation}</button>
    )
}


