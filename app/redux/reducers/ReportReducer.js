
import {
    FETCH_REPORTS,

} from '../actions/ReportAction';


const initialState = []

const ReportReducer = (state = initialState, action) => {

    switch (action.type) {


        case FETCH_REPORTS:
    
            return action.payload
            
        default:

            return state

    };

};

export default ReportReducer;

