import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from "./App";
import Start from "./containers/Start"

import './common.css';

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<Route path="start" component={Start} />
		</Route>
	</Router>,
	document.getElementById('root')
);
