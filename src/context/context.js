import React, { useState, createContext } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
const rootUrl = 'https://api.github.com';

//initiate/create a context
const GithubContext = createContext();

//create the context provider component
const GithubProvider = ({ children }) => {
   const [githubUser, setGithubUser] = useState(mockUser);
   const [repos, setRepos] = useState(mockRepos);
   const [followers, setFollowers] = useState(mockFollowers);

   return (
      <GithubContext.Provider value={{ githubUser, repos, followers }}>
         {children}
      </GithubContext.Provider>
   );
};

export { GithubContext, GithubProvider };
