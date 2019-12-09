import React, { Component, Fragment } from "react";
import Header from '../components/Header'
class StoreLists extends Component {
	state = {
		searchTxt: new URLSearchParams(location.search).get('searchPlace'),
		selectStoreData: ''
	}

	selectStoreInMap = (e, selectStoreData) => {
		e.preventDefault();
		document.querySelector('.storeListsWrap').style.display = 'none';
		document.querySelector('.storeSimpleWrap').style.display = 'block';
		document.querySelector('.storeListsContainer').classList.add('flexColumn', 'flexGrow');
		this.setState({
			selectStoreData: selectStoreData
		});
	}
	render() {
		const StoreItems = () => {
			return (
				<div className="flex centerH storeItem">
					<p className="storeData_tumb flex center"><img src={require('../img/dumbImg.png')} /></p>
					<p className="storeData_name">매장A</p>
					<p className="storeData_distance">430m</p>
					<p className="storeData_star"><img src={require('../img/dumbStar.png')} /></p>
					<button className="Btn_goStoreDetail" onClick={() => { this.props.history.push(`/storeDetail?searchPlace=${this.state.searchTxt}`) }}>매장가기</button>
					<p className="flag flex center">+9</p>
				</div>
			);
		}
		return (
			<Fragment>
				<Header
					mainHistory={this.props.history}
					searchTxt={this.state.searchTxt}
					style="white"
				/>
				<div className="searchListsContainer flexColumn flexGrow">
					<div className="storeListsContainer overFlowScroll">
						<div className="mapWrap flexGrow">
							<p className="placePin" onClick={(e) => { this.selectStoreInMap(e, "A상점") }}><img src={require('../img/placePin.png')} /></p>
							<p className="placePin dumi" onClick={(e) => { this.selectStoreInMap(e, "B상점") }}><img src={require('../img/placePin.png')} /></p>
						</div>
						<div className="storeListsWrap">
							<div className="flex orderbyBtnWrap centerH">
								<p className="flex center">거리순</p>
								<p className="flex center">평점순</p>
								<p className="flex center">리뷰순</p>
							</div>
							<div className="flexColumn center storeItemListsWrap">
								<StoreItems />
							</div>
						</div>
						<div className="storeSimpleWrap">
							<div className="flex storeSimpleData_top">
								<div className="flex flexGrow">
									<p className="storeData_name">{this.state.selectStoreData}</p>
									<p className="storeData_distance flex centerH">430m</p>
								</div>
								<button className="Btn_goStoreDetail" onClick={() => { this.props.history.push(`/storeDetail?searchPlace=${this.state.searchTxt}`) }}>바로가기</button>
							</div>
							<div className="flex centerH storeSimpleData_middle">
								<p className="storeData_grade">5.0</p>
								<p className="storeData_star"><img src={require('../img/dumbStar.png')} /></p>
								<p className="storeData_giveGradePeopleCt">(43)</p>
								<p className="storeData_reviews">리뷰 90</p>
							</div>
							<div className="flex centerH storeSimpleData_bottom">
								<p className="icPin"><img src={require('../img/placePin.png')} /></p>
								<div className="flexColumn centerH flexGrow storePlaceWrap">
									<p className="storeData_place">서울시 강남구 강남대로 128길 61무 061114</p>
									<p className="storeData_placeNo">지번 : 논현동 143-2</p>
								</div>
							</div>
							<div className="flex center storeSimpleData_btnWrap">
								<button><img src={require('../img/ic_phone.png')} /></button>
								<button><img src={require('../img/ic_place.png')} /></button>
								<button><img src={require('../img/ic_square.png')} /></button>
								<button><img src={require('../img/ic_heart.png')} /></button>
							</div>
						</div>
					</div >
				</div>
			</Fragment>
		);
	}
}
export default StoreLists