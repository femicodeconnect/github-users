import React from 'react';
import { Dashboard, Login, Error } from './pages';
//The line of code above imports index.js file in the pages folder. All the files imports was done in the index.js file
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
   return (
      <Router>
         <Switch>
            <Route path='/' exact={true}>
               <Dashboard></Dashboard>
            </Route>
            <Route path='/login'>
               <Login></Login>
            </Route>
            <Route path='*'>
               <Error></Error>
            </Route>
         </Switch>
      </Router>
   );
}

export default App;
