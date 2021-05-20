import React from 'react';
import { Dashboard, Login, Error, PrivateRoute, AuthWrapper } from './pages';
//The line of code above imports index.js file in the pages folder. All the files imports was done in the index.js file
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
   return (
      <AuthWrapper>
         <Router>
            <Switch>
               <PrivateRoute path='/' exact={true}>
                  <Dashboard></Dashboard>
               </PrivateRoute>
               <Route path='/login'>
                  <Login></Login>
               </Route>
               <Route path='*'>
                  <Error></Error>
               </Route>
            </Switch>
         </Router>
      </AuthWrapper>
   );
}

export default App;

/*
Describing The Overall Process of Private Routing In The App.
==============================================================
When the App loads, it starts with the root component, AuthWrapper, which checks for 2 things - loading and error (AuthWrapper component), before rendering its children.
In rendering the children, the home page to be rendered is the Dashboard page considering the route (path ='/'), but since the Dashboard page is wrapped in the  PrivateRoute, control is transferred to the PrivateRoute which confirms if the user is authenticated (logged in) to access the Dashboard page. 
Considering the code in the PrivateRoute, if the user is authenticated, the Dashboard page is loaded, else, the user is redirected to the Login page.

If the user is redirected to the login page, a click on the login/signup button calls the loginWithRedirect() function, in auth0, which authenticates the user for login by email/password input, logging in through a google/twitter account, or otherwise allowing the user to signup.

The login/logout functionality built in to the Navbar component is just to illustrates how the login/logout functionality can be built into pieces of independent components. One use case for this is a comment component where a user must be logged in to be able to add a comment to a post. The comment component confirms if the user is logged in before he is allowed to comment.

*/
