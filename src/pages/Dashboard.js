import React, { useState, useContext } from 'react';
import { GithubContext } from '../context/context';
import { Info, Repos, User, Search, Navbar } from '../components';
import loadingImage from '../images/preloader.gif';

const Dashboard = () => {
   const { loading } = useContext(GithubContext);

   if (loading) {
      return (
         <main>
            <Navbar />
            <Search />
            <img src={loadingImage} alt='Loading...' className='loading-img' />
         </main>
      );
   }

   return (
      <main>
         <Navbar />
         <Search />
         <Info />
         <User />
         <Repos />
      </main>
   );
};

export default Dashboard;

//The components were imported with the use of an index.js file in the components folder
