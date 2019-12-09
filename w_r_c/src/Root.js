import React, { Component } from 'react';

import Header from './components/Header';

class Root extends Component {
	render() {
		return (
			<div>
				<Header />
				{this.props.children}
			</div>
		);
	}
}

export default Root;