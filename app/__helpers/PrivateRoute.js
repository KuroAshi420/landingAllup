import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import jwt_decode from "jwt-decode";



export const PrivateRoute = ({ component: Component, roles, ...rest }) => {



    const currentUser = useSelector(state => state.get("authentification").user);
    const IsLoggedIn = useSelector(state => state.get("authentification").loggedIn);

    //console.log(jwt_Token_decoded);
    //console.log(jwt_Token_decoded.exp * 1000);

    
    return (

        <Route {...rest} render={props => {
           

            if (!IsLoggedIn) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }


            var token = currentUser.token;
            var jwt_Token_decoded = jwt_decode(token);
            if (jwt_Token_decoded.exp * 1000 < Date.now()) {
                localStorage.clear();
                return <Redirect to={{ pathname: '/' }} />
            } 

            // check if route is restricted by role
            if (roles && roles.indexOf(currentUser.role) === -1) {
                // role not authorised so redirect to home page
                return <Redirect to={{ pathname: '/' }} />
            }


            

            // authorised so return component
            return <Component {...props} />
        }} />

    );
};



