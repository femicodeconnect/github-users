import React from 'react';
import { Info, Repos, User, Search, Navbar } from '../components';

const Dashboard = () => {
   return (
      <main>
         {/* <Navbar />
         <Search /> */}
         <Info />
         <User />
         <Repos />
      </main>
   );
};

export default Dashboard;

//The components were imported with the use of an index.js file in the components folder
