import React, { useState, createContext, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

//initiate/create a context
const GithubContext = createContext();

//create the context provider component
const GithubProvider = ({ children }) => {
   const [githubUser, setGithubUser] = useState(mockUser);
   const [repos, setRepos] = useState(mockRepos);
   const [followers, setFollowers] = useState(mockFollowers);

   //number of requests that can still be made before the hourly reset by the api - only 60 requests allowed per hour by the api
   const [requests, setRequests] = useState(0);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState({ show: false, msg: '' });

   //function to get the number of requests that can still be made before the hourly reset by the api - only 60 requests allowed per hour by the api
   const checkRequests = () => {
      axios(`${rootUrl}/rate_limit`)
         .then(({ data }) => {
            let {
               rate: { remaining },
            } = data;
            //console.log(remaining);
            setRequests(remaining);

            if (remaining === 0) {
               //throw an error
               toggleError(
                  true,
                  'sorry, you have exceeded your hourly rate limit!'
               );
            }
         })
         .catch((error) => {
            console.log(error);
         });
   };

   //function to get the details of a github user
   const searchGithubUser = async (user) => {
      toggleError(); //default values used here
      setLoading(true);
      const response = await axios(`${rootUrl}/users/${user}`).catch((error) =>
         console.log(error)
      );
      console.log(response);
      if (response) {
         setGithubUser(response.data);
      } else {
         //no data from returned response - response.data = undefined.
         toggleError(true, 'there is no user with that username');
      }

      checkRequests();
      setLoading(false);
   };

   //function to show/hide error
   const toggleError = (show = false, msg = '') => {
      setError({ show, msg });
   };

   //execute checkRequests function immediately the app loads
   useEffect(checkRequests, []);

   return (
      <GithubContext.Provider
         value={{
            githubUser,
            repos,
            followers,
            requests,
            error,
            searchGithubUser,
            loading,
         }}
      >
         {children}
      </GithubContext.Provider>
   );
};

export { GithubContext, GithubProvider };

/* 
How checkRequests function works
================================
1. Send a request with axios to the api.
2. if api request is successful, extract (destructure) 'data' from the response received - that is, response.data
3. extract 'rate' from 'data'; extract 'remaining' from 'rate'
4. store 'remaining' in 'requests' state
5. If 'remaining' is 0, call toggleError function
6. If api request fails, ----

checkRequests=()=>{
   axios(`${rootUrl}/rate_limit`)         
      .then((data) => { console.log(error); })          
      .catch((error) => { console.log(error); });
}
*/
