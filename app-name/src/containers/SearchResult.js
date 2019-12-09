import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';


import StoreLists from '../components/StoreLists'
import StoreDetail from '../components/StoreDetail'

import './style.scss'

class SearchResult extends Component {
	render() {
		return (
			<div className="bodyWrapper_white flexColumn center">
				<Router>
					<Switch>
						<Route exact path="/searchResult" component={StoreLists} />
						<Route path="/storeDetail" component={StoreDetail} />
					</Switch>
				</Router>
			</div>
		);
	}
}
export default SearchResult