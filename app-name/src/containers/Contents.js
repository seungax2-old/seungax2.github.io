import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Redirect, NavLink } from 'react-router-dom';

import ContentsMyVideo from '../components/ContentsMyVideo'
import ContentsNewVideo from '../components/ContentsNewVideo'
import ContentsPopularVideo from '../components/ContentsPopularVideo'

import Header from '../components/Header'

class Contents extends Component {
	render() {
		let thisPage = this.props.match.url
		let pathName = this.props.location.pathname;

		const TabRouteCon = () => {
			switch (pathName) {
				case "/contents":
					return (
						<Fragment>
							<Route path={`${thisPage}/popularVideo`} component={ContentsPopularVideo} />
						</Fragment>
					)
				case "/contents/newVideo":
					return (
						<Fragment>
							<Route path={`${thisPage}/:tap`} component={ContentsNewVideo} />
						</Fragment>
					)
				case "/contents/popularVideo":
					return (
						<Fragment>
							<Route path={`${thisPage}/:tap`} component={ContentsPopularVideo} />
						</Fragment>
					)
				case "/contents/myVideo":
					return (
						<Fragment>
							<Route path={`${thisPage}/:tap`} component={ContentsMyVideo} />
						</Fragment>
					)
			}
		}

		return (
			<div className="bodyWrapper flexColumn center">
				<Header
					mainHistory={this.props.history}
				/>
				<div className="subMenu flex center">
					<NavLink to={`${thisPage}/newVideo`} className="item flex center" activeClassName="active">최신영상</NavLink>
					<NavLink to={`${thisPage}/popularVideo`} className="item flex center" activeClassName="active">인기</NavLink>
					<NavLink to={`${thisPage}/myVideo`} className="item flex center" activeClassName="active">구독함</NavLink>
				</div>
				<div className="contentsContainer flexColumn flexGrow">
					<TabRouteCon />
				</div>
			</div>
		);
	}
}

export default Contents