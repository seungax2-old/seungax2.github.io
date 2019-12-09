import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import SideMenu from './components/SideMenu';
import Start from "./containers/Start"
import Login from "./containers/Login"
import Main from "./containers/Main"
import Notice from "./containers/Notice"
import SearchResult from './containers/SearchResult';
import Contents from './containers/Contents'

import './common.css';

let login = true;
ReactDOM.render(
	<Router>
		<SideMenu />
		{login ? <Redirect to='/main' /> : ''}
		<Switch>
			<Route exact path="/" component={Start} />
			<Route path="/login" component={Login} />
			<Route path="/main" component={Main} />
			<Route path="/searchResult" component={SearchResult} />
			<Route path="/notice" component={Notice} />
			<Route path="/contents" component={Contents} />
		</Switch>
	</Router>,
	document.getElementById('root')
);
