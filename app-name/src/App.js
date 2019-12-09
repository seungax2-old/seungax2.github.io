import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Start from "./containers/Start"
import Login from "./containers/Login"
import Main from "./containers/Main"


const App = () => {
	return (
		<Router>
			<Switch>
				<Route path="/" component={Start} />
				<Route path="/login" component={Login} />
				<Route path="/main" component={Main} />
			</Switch>
		</Router>
	);
}

export default App;