import React, { createContext } from 'react';
const rootUrl = 'https://api.github.com';

//initiate/create a context
const GithubContext = createContext();

//create the context provider component
const GithubProvider = (props) => {
   return (
      <GithubContext.Provider value={'hello'}>
         {props.children}
      </GithubContext.Provider>
   );
};

export { GithubContext, GithubProvider };
