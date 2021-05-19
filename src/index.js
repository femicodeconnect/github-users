import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { GithubProvider } from './context/context';
import { Auth0Provider } from '@auth0/auth0-react';

//  domain - dev-1tpiw-zp.us.auth0.com
//clientID - FYiCAg45539wKU4xvHmSOSjxTjFaYT32
//redirectUri - {window.location.origin}

ReactDOM.render(
   <React.StrictMode>
      <Auth0Provider
         domain='dev-1tpiw-zp.us.auth0.com'
         clientId='FYiCAg45539wKU4xvHmSOSjxTjFaYT32'
         redirectUri={window.location.origin}
      >
         <GithubProvider>
            <App />
         </GithubProvider>
      </Auth0Provider>
   </React.StrictMode>,
   document.getElementById('root')
);
