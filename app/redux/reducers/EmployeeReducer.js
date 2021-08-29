
import {

    FETCH_EMPLOYEES,
    ADD_EMPLOYEE,
    DELETE_EMPLOYEE,
    ASSIGN_RH,
    UNASSIGN_RH,

} from '../actions/EmployeeAction';


const initialState = []

const EmployeeReducer = (state = initialState, action) => {

    switch (action.type) {


        case FETCH_EMPLOYEES:

            return action.payload

        case ADD_EMPLOYEE:

                const newEmployee = action.payload;
                return [...state, newEmployee]

        case DELETE_EMPLOYEE:

            const newEmployees = state.filter(employee => employee._id !== action.payload._id)
            return newEmployees

        case ASSIGN_RH:

            const index = state.findIndex(employee => employee._id === action.payload._id)
            state[index] = action.payload
            return [...state]

        case UNASSIGN_RH:

           
            const indexUpdate = state.findIndex(employee => employee._id === action.payload._id)
            state[indexUpdate] = action.payload
            return [...state]

        default:

            return state

    };

};

export default EmployeeReducer;

