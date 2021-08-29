import {
     confirmRegistration as confirmRegistrationFromApi,
     addNotes as addNotesFromApi,
     getEnterprises,
} from "../services/admin.service";



export const CONFIRM_REGISTRATION= "CONFIRM_REGISTRATION";
export const FETCH_ENTERPRISES= "FETCH_ENTERPRISES";


export const fetchEnterprises =  () => (dispatch) => {
    
   
    return getEnterprises().then(
        (result) => {
            if (result) {
               
                    dispatch({
                        type: FETCH_ENTERPRISES,
                        payload: result,
                    });
            } 
        }

    );

};



export const confirmRegistration = (enterprise_id) => {
    
    return async dispatch => {
        const result = await confirmRegistrationFromApi(enterprise_id)
        
        result ===false  ?
        (
            
            console.log("Error in confirm registration")
            
        )
        : 
        (
            console.log("success confirm registration")
        )
        
        dispatch({ type: CONFIRM_REGISTRATION,  payload: result })
        return result

    }

};

export const addNotes = (enterprise_id,details) => {
    
    return async dispatch => {
        const result = await addNotesFromApi(enterprise_id,details)
        
        result ===false  ?
        (
            
            console.log("Error in add notes")
            
        )
        : 
        (
            console.log("success add note")
        )
        
        return result

    }

};


