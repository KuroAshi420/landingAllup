import {
     getReports ,
     sendReport as sendReportFromApi

} from "../services/admin.service";


export const FETCH_REPORTS= "FETCH_REPORTS";



export const fetchReports =  () => (dispatch) => {
   
    return getReports().then(
        (result) => {
            if (result) {
               
                    dispatch({
                        type: FETCH_REPORTS,
                        payload: result,
                    });
            } 
        }

    );

};

export const sendReport = (deal_id,enterprise_id,comment) => {
    
    return async dispatch => {
        const result = await sendReportFromApi(deal_id,enterprise_id,comment)
        
        result ===false  ?
        (
            
            console.log("Error in send report")
            
        )
        : 
        (
            console.log("success send report")
        )
        
        return result

    }

};





