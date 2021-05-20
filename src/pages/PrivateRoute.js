import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoute = ({ children, ...rest }) => {
   const { isAuthenticated, user } = useAuth0();

   //A combination of isAuthenticated and user variables will be used to determine if a user is logged in or not.
   const isUser = isAuthenticated && user;

   return (
      <Route
         {...rest}
         render={() => {
            return isUser ? children : <Redirect to='/login'></Redirect>;
         }}
      ></Route>
   );
};

export default PrivateRoute;

//children props- are routes that the Private route will wrap around so that they are accessible to only logged in user, for Dashboard page
//...rest props- implies props like path, exact etc and other props associated with a route
