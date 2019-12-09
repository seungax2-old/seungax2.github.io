import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Redirect, NavLink } from 'react-router-dom';
import YouTube from 'react-youtube';

class ContentsMyVideo extends Component {
	render() {
		const opts = {
			height: '390',
			width: '640',
			playerVars: { // https://developers.google.com/youtube/player_parameters
				autoplay: 1
			}
		};
		return (
			<YouTube
				videoId="LRUQfJLuPA8"
				opts={opts}
				onReady={this._onReady}
			/>
		);
	}

	_onReady(event) {
		// access to player in all event handlers via event.target
		event.target.pauseVideo();
	}
}

export default ContentsMyVideo