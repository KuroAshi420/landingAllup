import axios from "axios";

import{LOGIN,LOGOUT,REGISTER,AUTH_ERROR,SET_LOADING,GET_AUTH_USER}from "../constants/authTypes"
import { authToken } from '../authToken';

//set loading action
export const setLoading =()=> dispatch =>{
    dispatch({
        type : SET_LOADING
    })

}

//login action
export const login=( FormData )=> async dispatch =>{
    dispatch(setLoading())
    try {
        let res= await axios.post("/user/login",formdata)
        
      dispatch(
         {
         type:LOGIN,
         payload:res.data
     })
    } catch (error) {
      console.dir(error);
      const { errors, msg } = error.response.data;
      if (Array.isArray(errors)) {
        errors.forEach((err) => alert(err.msg));
      }
      if (msg) {
        alert(msg);
      }
  

    dispatch({
      type: AUTH_ERROR,
    });     
    }

}


//register action
export const register =( FormData )=> async dispatch =>{
    dispatch(setLoading())
    try {
        let res= await axios.post("/user/register",FormData)
        
        dispatch({
            type:REGISTER,
            payload:res.data
        })
    } catch (error) {
      console.dir(error);
      const { errors, msg } = error.response.data;
      if (Array.isArray(errors)) {
        errors.forEach((err) => alert(err.msg));
      }
      if (msg) {
        alert(msg);
      }
          dispatch({
          type: AUTH_ERROR,
        });
        
    }

}

export const logout = () => (dispatch) => {
    dispatch({
      type: LOGOUT,
    });
  };


