import { isSubscribed as isSubscribedFromApi } from "../services/subscription.service";



export const isSubscribed =  (enterprise_id) => (dispatch) => {
   
    return isSubscribedFromApi(enterprise_id).then(
        (result) => {
            return result
        }

    );

};









