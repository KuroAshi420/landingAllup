
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  UPDATE_USER

} from '../actions/UserAction';

let user = JSON.parse(localStorage.getItem('user'));

const initialState = user ? { loggedIn: true, user } : {};

const AuthenticationReducer = (state = initialState, action) => {

  switch (action.type) {

    case LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.payload
      };
    case LOGIN_FAIL:
      return {};

    case REGISTER_SUCCESS:
      
      return {
        loggedIn: true,
        user: action.payload
      };

    case REGISTER_FAIL:
      return {};

    case LOGOUT:
      return {};

    case UPDATE_USER:
      
      return {
        loggedIn: true,
        user: action.payload
      };
      
    default:
      return state
  }
}

export default AuthenticationReducer;
