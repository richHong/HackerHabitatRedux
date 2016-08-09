'use strict';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory, browserHistory } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import "isomorphic-fetch";

import SignUp from './SignUp';
import SignOut from './signout';
import CreateProfile from './createProfile';
import CreateHouse from './createHouse';
import SearchBar from './SearchBar';
import NavBar from './navigationBar';
import MainContain from './MainContain';
import SignIn from './SignInComp';
import Results from './results';
import FrontPage from './frontPage';
import SingleListing from './singlelisting';
import MyProfile from './myProfile';
import ContactForm from './contactform';

import houseListingReducer from './appReducers';

var store = createStore(houseListingReducer);

var loggedIn = function() {
  return !!localStorage.token;
};

var requireAuth = function(nextState, replace) {
  if (!loggedIn()) {
    replace({
      pathname: '/signin',
      state: { nextPathname: nextState.location.pathname }
    });
  }
};

var logout = function(nextState, replace) {
    let authToken = window.localStorage.getItem('token');
    let id = window.localStorage.getItem('i');

    if (!!localStorage.token) {
        fetch('http://localhost:3001/v1/access_tokens/'+id+'?access_token='+authToken, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => response.json());
        delete localStorage.token;
        delete localStorage.i;
        delete localStorage.userID;
        replace({
            pathname: '/signout',
            state: {
                nextPathname: nextState.location.pathname
            }
        });
    }

};


render((
    <Provider store={store}>
  <Router history={ hashHistory }>
      <Route path='/' component={ FrontPage } />
      <Route component={ MainContain }>
          <Route path='/results' component={ Results }/>
          <Route path="/createProfile" component={ CreateProfile } onEnter={requireAuth}/>
          <Route path='/signup' component={ SignUp } />
          <Route path='/createHouse' component={ CreateHouse } onEnter={requireAuth}/>
          <Route path='/signin' component={ SignIn } />
          <Route path='/singlelisting' component={ SingleListing } />
          <Route path='/signout' component={ SignOut } onEnter={logout} />
          <Route path='/profile' component={ MyProfile } onEnter={requireAuth}/>
          <Route path='/contact' component={ ContactForm } onEnter={requireAuth}/>
      </Route>
	</Router>
    </Provider>
), document.getElementById('app'));
