import React from 'react';
import { BrowserRouter as Router, Route, Redirect, NavLink } from 'react-router-dom';

import Header from '../components/Header'
import MainContentTabGetself from '../components/MainContentTabGetself';
import MainContentTabGetDelivery from '../components/MainContentTabGetDelivery';

import './style.scss'

const Main = ({ match, history, location }) => {
	let thisPage = match.url
	return (
		<div className="bodyWrapper flexColumn center">
			<Header
				mainHistory={history}
			/>
			<div className="mainContainer flexColumn flexGrow">
				<div className="subMenu flex center">
					<NavLink to={`${thisPage}/getself`} className="item flex center" activeClassName="active">찾아가기</NavLink>
					<NavLink to={`${thisPage}/getdelivery`} className="item flex center" activeClassName="active">택배로받기</NavLink>
				</div>
				{
					location.pathname == '/main' ? <Redirect to={`${thisPage}/getself`} /> : ''
				}
				{
					location.pathname == '/main/getself' ?
						<Route path={`${thisPage}/:tap`} component={MainContentTabGetself} />
						:
						<Route path={`${thisPage}/:tap`} component={MainContentTabGetDelivery} />
				}
			</div>
		</div >
	);
}

export default Main;