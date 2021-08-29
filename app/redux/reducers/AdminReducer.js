
import {
    FETCH_USERS,
    CHANGE_STATE_USER
} from '../actions/AdminAction';


const initialState = []

const AdminReducer = (state = initialState, action) => {

    switch (action.type) {


        case FETCH_USERS:
    
            return action.payload

        case CHANGE_STATE_USER:

            const index_update = state.findIndex(user => user._id === action.payload._id)
            state[index_update] = action.payload
            return [...state]
    
            
        default:

            return state

    };

};

export default AdminReducer;

