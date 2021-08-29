import {
     getUsers ,
     changeState

} from "../services/admin.service";


export const FETCH_USERS= "FETCH_USERS";
export const CHANGE_STATE_USER= "CHANGE_STATE_USER";


export const fetchUsers =  () => (dispatch) => {
    
   
    return getUsers().then(
        (result) => {
            if (result) {
               
                    dispatch({
                        type: FETCH_USERS,
                        payload: result,
                    });
            } 
        }

    );

};



export const changeStateUser = (user_id,state) => {
    
    return async dispatch => {
        const result = await changeState(user_id,state)
        
        result ===false  ?
        (
            
            console.log("Error in change state user")
            
        )
        : 
        (
            console.log("success change state")
        )
        
        dispatch({ type: CHANGE_STATE_USER,  payload: result })
        return result

    }

};



