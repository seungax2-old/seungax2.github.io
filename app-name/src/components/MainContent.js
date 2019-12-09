/* import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import MainContentTabGetself from './MainContentTabGetself';
import MainContentTabGetDelivery from './MainContentTabGetDelivery';



const MainContent = ({ tab }) => {
	return (
		<Router>
			<Redirect to={tab ? '/main/' + tab : '/main/getself'} />
			<Switch>
				<Route exact path="/main/getself" component={MainContentTabGetself} />
				<Route path="/main/getdelivery" component={MainContentTabGetDelivery} />
			</Switch>
		</Router>
	);
}

export default MainContent; */