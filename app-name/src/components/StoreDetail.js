import React, { Component, Fragment } from "react";
import Header from '../components/Header'
class StoreDetail extends Component {
	state = {
		searchTxt: new URLSearchParams(location.search).get('searchPlace'),
	}
	openReview = (e) => {
		let parentWrap = e.currentTarget.parentElement.children[0]
		parentWrap.style.height = "auto";
		parentWrap.style.display = "block";
		e.currentTarget.style.display = "none"
	}
	render() {
		const ReviewItem = () => {
			return (
				<div className="reviewItem flex">
					<p className="profileImg"><img src={require('../img/profile_none.png')} /></p>
					<div className="reviewDataWrap flexGrow flexColumn">
						<div className="reviewDataContent">
							<p className="storeData_star flex centerH"><img src={require('../img/dumbStar.png')} /></p>
							<div className="flex review_userWrap">
								<p className="review_name">정우성</p>
								<p className="review_date">2019.08.15</p>
							</div>
							<div className="contentTxt">
								<p className="review_previewTxt">이렇게 싸고 저렴한 매장은 처음입니다. 사장님도 친절하시고 정말 대박입니다. 지인들에게 소개도 시켜줬어요.
								이렇게 싸고 저렴한 매장은 처음입니다. 사장님도 친절하시고 정말 대박입니다. 지인들에게 소개도 시켜줬어요.
								이렇게 싸고 저렴한 매장은 처음입니다. 사장님도 친절하시고 정말 대박입니다. 지인들에게 소개도 시켜줬어요.
												</p>
								<p className="Btn_moreText flex centerH" onClick={this.openReview}>...더보기</p>
							</div>

						</div>
					</div>
					<p className="Btn_menu"><img src={require('../img/ic_reviewMenu.png')} /></p>
				</div>
			)
		}
		return (
			<Fragment>
				<Header
					mainHistory={this.props.history}
					searchTxt={this.state.searchTxt}
					headerForm="simpleInputFrom"
				/>
				<div className="searchListsContainer flexColumn flexGrow">
					<div className="storeDetailContainer overFlowScroll">
						<div className="storePlaceMap">

						</div>
						<div className="storeSimpleWrap">
							<div className="flex storeSimpleData_top">
								<div className="flex flexGrow centerH">
									<p className="storeData_name">매장A</p>
									<p className="storeData_distance flex centerH">430m</p>
									<p className="storeData_star"><img src={require('../img/dumbStar.png')} /></p>
								</div>
							</div>
							<div className="flex centerH storeSimpleData_bottom">
								<p className="icPin"><img src={require('../img/placePin.png')} /></p>
								<div className="flexColumn centerH flexGrow storePlaceWrap">
									<p className="storeData_place">서울시 강남구 강남대로 128길 61무 061114</p>
									<p className="storeData_placeNo">지번 : 논현동 143-2</p>
								</div>
							</div>
							<div className="storeImgLists">
								<p className="flex center"><img src={require('../img/dumiStoreImg.png')} /></p>
								<p className="flex center"><img src={require('../img/dumiStoreImg.png')} /></p>
								<p className="flex center"><img src={require('../img/dumiStoreImg.png')} /></p>
								<p className="flex center"><img src={require('../img/dumiStoreImg.png')} /></p>
								<p className="flex center"><img src={require('../img/dumiStoreImg.png')} /></p>
								<p className="flex center moreImg"><img src={require('../img/ic_camera.png')} />230</p>
							</div>
						</div>
						<div className="reviewListsWrap">
							<ReviewItem />
							<ReviewItem />
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}
export default StoreDetail