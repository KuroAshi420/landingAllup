import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import jwt_decode from "jwt-decode";



export const RouteHome = ({ component: Component, ...rest }) => {

    const currentUser = useSelector(state => state.authentification.user);
    const IsLoggedIn = useSelector(state => state.authentification.loggedIn);

    //console.log(jwt_Token_decoded);
    //console.log(jwt_Token_decoded.exp * 1000);

    
    return (

        <Route {...rest} render={props => {
           

            if (!IsLoggedIn) {
                // not logged in so redirect to home the current components
                return <Component {...props} />
            }


            var token = currentUser.token;
            var jwt_Token_decoded = jwt_decode(token);
            if (jwt_Token_decoded.exp * 1000 < Date.now()) {
                
                localStorage.clear();
                return <Redirect to={{ pathname: '/' }} />
            } 

            // check if route is restricted by role
            if(currentUser.role === "OWNER" || currentUser.role === "RH_OWNER" || currentUser.role === "RH") {
                // role not authorised so redirect to home page
                return <Redirect to={{ pathname: '/owner/home-owner' }} />

            } else if(currentUser.role === "EMPLOYEE") {
                // role not authorised so redirect to home page
                return <Redirect to={{ pathname: '/employee/home-employee' }} />
            }
            else if(currentUser.role === "ADMIN") {
                // role not authorised so redirect to home page
                return <Redirect to={{ pathname: '/admin/home-admin' }} />
            }



            // authorised so return component
            return <Component {...props} />
        }} />

    );
};



