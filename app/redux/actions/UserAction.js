import {
    login as loginFromAPI,
    register as registerFromAPI,
   
    registerEmployee as registerEmployeeFromAPI,
    updateUser as updateUserFromApi
    

} from "../services/user.service";

export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const REGISTER = "REGISTER";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";



export const LOGOUT = "LOGOUT";
export const UPDATE_USER = "UPDATE_USER";



export const login = (userName, password) => (dispatch) => {


    return loginFromAPI(userName, password)
        .then(

            (result) => {
                if (result) {

                    if (!result.isActive) {
                        dispatch({
                            type: LOGIN_FAIL,
                            payload: {},
                        });


                    }
                    else {

                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('user', JSON.stringify(result));
                        dispatch({
                            type: LOGIN_SUCCESS,
                            payload: result,
                        });

                    }

                    return result

                } else {
                    dispatch({
                        type: LOGIN_FAIL,
                        payload: {},
                    });


                    return false

                }

            }

        );

};

export const register = (values) => (dispatch) => {

    return registerFromAPI(values).then(
        (result) => {

            if (result.error === false) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(result.data));
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: result.data,
                });
                
               
                return true

            } else {
                dispatch({
                    type: REGISTER_FAIL,
                    payload: {},
                });
                return result.data

            }
        }

    );



};

export const registerEmployee = (values) => (dispatch) => {

    return registerEmployeeFromAPI(values).then(
        (result) => {

            if (result.error === false) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(result.data));
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: result.data,
                });
                
               
                return true

            } else {
                dispatch({
                    type: REGISTER_FAIL,
                    payload: {},
                });
                return result.data

            }
        }

    );



};



export const updateUser = (values) => (dispatch) => {

    return updateUserFromApi(values).then(
        (result) => {

            if (result.error === false) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(result.data));
                dispatch({
                    type: UPDATE_USER,
                    payload: result.data,
                });
                
               
                return true

            } else {

                return result.data

            }
        }

    );



};



