import {
    getEmployees,
    addEmployee as addEmployeeFromApi,
    deleteUser
}
    from "../services/employee.service";


import {
    assignRH as assignRhFromApi,
    unassignRH as unassignRhFromApi,
} from "../services/user.service";


export const FETCH_EMPLOYEES = "FETCH_EMPLOYEES";
export const ADD_EMPLOYEE = "ADD_EMPLOYEE";
export const DELETE_EMPLOYEE = "DELETE_EMPLOYEE";

export const ASSIGN_RH = "ASSIGN_RH";
export const UNASSIGN_RH = "UNASSIGN_RH";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const fetchEmployees = (enterprise_id, user_id) => (dispatch) => {

    return getEmployees(enterprise_id, user_id).then(
        (result) => {
            if (result) {

                dispatch({
                    type: FETCH_EMPLOYEES,
                    payload: result,
                });
            }
        }

    );

};

export const addEmployee = (values) => {

    return async dispatch => {
        const result = await addEmployeeFromApi(values)

        result.error === false ?
            (
                dispatch({ type: ADD_EMPLOYEE, payload: result.user })

            )
            :
            (
                console.log("Error in add employee")

            )

        return result

    }

};

export const deleteEmployee = (user_id) => (dispatch) => {

    return deleteUser(user_id).then(
        (result) => {
            if (result) {

                dispatch({
                    type: DELETE_EMPLOYEE,
                    payload: result,
                });
            }
        }

    );

};


export const assignRH = (user_id, enterprise_id) => {

    return async dispatch => {
        const result = await assignRhFromApi(user_id, enterprise_id)

        if (result.error === false) {

            dispatch({ type: ASSIGN_RH, payload: result.data })

            //update role user in localStorage
            let user = JSON.parse(localStorage.getItem('user'));
            user.role = "OWNER"
            localStorage.setItem('user', JSON.stringify(user));
            // update state user 
            dispatch({
                type: LOGIN_SUCCESS,
                payload: user,
            });

        }
        else {
            console.log("Error in assign rh manager")
        }


        return result

    }

};

export const unassignRH = (user_id, enterprise_id) => {

    return async dispatch => {
        const result = await unassignRhFromApi(user_id, enterprise_id)

        if (result.error === false) {


            dispatch({ type: UNASSIGN_RH, payload: result.data })

            //update role user in localStorage
            let user = JSON.parse(localStorage.getItem('user'));
            user.role = "RH_OWNER"
            localStorage.setItem('user', JSON.stringify(user));

            // update state user 
            dispatch({
                type: LOGIN_SUCCESS,
                payload: user,
            });


        }
        else {
            console.log("Error in unassign rh manager")
        }

        return result

    }

};



