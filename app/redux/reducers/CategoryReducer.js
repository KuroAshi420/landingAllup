
import {
    FETCH_CATEGORIES,
    ADD_CATEGORY

} from '../actions/CategoryAction';


const initialState = []

const CategoryReducer = (state = initialState, action) => {

    switch (action.type) {


        case FETCH_CATEGORIES:
    
            return action.payload

        case ADD_CATEGORY:

            const newCategory = action.payload;
            return [...state, newCategory]

        default:

            return state

    };

};

export default CategoryReducer;

