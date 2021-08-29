
import {
    FETCH_ENTERPRISES,
    CONFIRM_REGISTRATION
    
} from '../actions/EnterpriseAction';


const initialState = []

const EnterpriseReducer = (state = initialState, action) => {

    switch (action.type) {


        case FETCH_ENTERPRISES:
    
            return action.payload

        case CONFIRM_REGISTRATION:

            const index_update = state.findIndex(enterprise => enterprise._id === action.payload._id)
            state[index_update] = action.payload
            return [...state]
    
            
        default:

            return state

    };

};

export default EnterpriseReducer;

