import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Redirect, NavLink } from 'react-router-dom';
import YouTube from 'react-youtube';

class ContentsPopularVideo extends Component {
	render() {
		const opts = {
			height: '390',
			width: '640',
			playerVars: { // https://developers.google.com/youtube/player_parameters
				autoplay: 1
			}
		};
		const VideoTag = () => {
			return (
				<div className="videoWrap flexColumn centerH">
					<YouTube
						className="video"
						videoId="LRUQfJLuPA8"
						opts={opts}
						onReady={this._onReady}
					/>
					<div className="flex videoInfoWrap">
						<p className="propfileImg"><img src={require('../img/profile_none.png')} /></p>
						<p className="videoTit flexGrow">갤럭시 노트 10 플러스 vs 갤럭시 노트10 7가지 선택기준 잡아드립니다. 고민중이라면 꼭 보세요.</p>
						<p className="Btn_videoMenu"><img src={require('../img/ic_reviewMenu.png')} /></p>
					</div>
				</div>
			)
		}
		return (
			<div className="contentsPopularVideosContainer flexColumn centerH overFlowScroll">
				<VideoTag />
				<VideoTag />
			</div>
		);
	}

	_onReady(event) {
		// access to player in all event handlers via event.target
		event.target.pauseVideo();
	}
}

export default ContentsPopularVideo