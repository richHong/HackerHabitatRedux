'use strict';
import React, { Component }                           from 'react';
import { render }                                     from 'react-dom';
import { Router, Route, hashHistory, browserHistory } from 'react-router';
import { createStore }                                from 'redux';
import { Provider }                                   from 'react-redux';
import "isomorphic-fetch";

import CreateProfile from './components/containers/createProfileContainer';
import CreateHouse   from './components/containers/createHouseContainer';
import MainContain   from './components/containers/mainContainer';
import MyProfile     from './components/containers/myProfileContainer';
import SignIn        from './components/containers/signInContainer';
import SignUp        from './components/containers/signUpContainer';

import FrontPage     from './components/frontPage';
import NavBar        from './components/navigationBar';
import Results       from './components/results';
import SearchBar     from './components/searchBar';
import SignOut       from './components/signout';
import SingleListing from './components/singlelisting';

import ContactForm   from './components/forms/contactform';

import houseListingReducer from './reducers/appReducers';

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
          <Route path='/singlelisting/:house_name' component={ SingleListing } />
          <Route path='/signout' component={ SignOut } onEnter={logout} />
          <Route path='/profile' component={ MyProfile } onEnter={requireAuth}/>
          <Route path='/contact' component={ ContactForm } onEnter={requireAuth}/>
      </Route>
	</Router>
    </Provider>
), document.getElementById('app'));
