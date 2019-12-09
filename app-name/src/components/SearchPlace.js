import React, { Component, Fragment } from "react";

class SearchPlace extends Component {
	state = {
		searchTxt: '',
		pageMove: false
	}
	inputChangeHandle = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	closeSearchPop = (e, isMove) => {
		if (isMove == 'search') {
			this.state.pageMove = true;
		}
		e.preventDefault();
		this.props.searchData(this.state);
		document.querySelector(".searchPlaceContainer").style.display = "none"
	}

	render() {
		const ResultItem = ({ isState, children }) => {
			return (
				<div className="resultItem flex centerH">
					<p className="stateIc"><img src={isState == 'on' ? require('../img/ic_placeOn.png') : require('../img/ic_placeOff.png')} /></p>
					<p className="placeTxt">{children}</p>
				</div>
			);
		}
		return (
			<div className="searchPlaceContainer">
				<div className="searchPlaceWrap flexColumn centerH">
					<div className="popHeader flex center">
						<p className="Btn_back" onClick={(e) => { this.closeSearchPop(e, '') }}><img src={require('../img/ic_back.png')} /></p>
						<p className="popTit">위치검색</p>
					</div>
					<div className="popContent flexColumn center">
						<p className="icWrap flex center"><img src={require('../img/ic_phone_w.png')} /></p>
						<p className="popSubTxt">어느지역의 핸드폰을 원하시나요?</p>
					</div>
					<div className="searchInputFormWrap">
						<div className="searchInput flex centerH">
							<input className="flexGrow" type="text"
								value={this.state.searchTxt}
								onChange={this.inputChangeHandle}
								name="searchTxt"
							/>
							<p className="Btn_search flex center" onClick={(e) => { this.closeSearchPop(e, 'search') }}><img src={require('../img/ic_search.png')} /></p>
						</div>
					</div>
					<div className="searchResultListsWrap flexColumn">
						<ResultItem isState="on">서울시 강남구 논현동</ResultItem>
						<ResultItem isState="off">서울시 강남구 논현동</ResultItem>
						<ResultItem isState="of">서울시 강남구 논현동</ResultItem>
						<ResultItem isState="of">서울시 강남구 논현동</ResultItem>
					</div>
				</div>
			</div>
		);
	};
}
export default SearchPlace;