import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class MainContentTabGetself extends Component {
	render() {
		const ContentMenuItem = ({ children }) => {
			return (
				<NavLink to="/contents/popularVideo" className="contentItem flexColumn center">
					<div className="imgWrap">
					</div>
					<p className="menuTit flexGrow">{children}</p>
				</NavLink>
			);
		}

		const CategoryItem = ({ phoneData }) => {
			console.log({ phoneData })
			return (
				<div className="itemBox flex">
					<p className="mobileAgency">{phoneData.mobileAgency}</p>
					<p className="thumbnail flexGrow">{phoneData.thumbnail}</p>
					<div className="phoneDataWrap flexColumn startAlign">
						<p className="discountPercent">59% 할인</p>
						<p className="phoneData_name">{phoneData.phoneName}</p>
						<p className="phoneData_previousPrice">{phoneData.nomalPrice}</p>
						<p className="phoneData_discountPrice">{phoneData.discountPrice}</p>
					</div>
				</div>
			);
		}

		const CategoryItemLists = ({ children }) => {
			let data = [
				{
					"mobileAgency": 'KT',
					"phoneName": '갤럭시 S10',
					"nomalPrice": '473,000',
					"discountPrice": '50,000',
					"thumbnail": ''
				},
				{
					"mobileAgency": 'LG',
					"phoneName": '갤럭시 S11',
					"nomalPrice": '450,000',
					"discountPrice": '200,000',
					"thumbnail": ''
				},
			]
			return (
				<div>
					<p className="cateTitle flex centerH">{children}</p>
					<div className="itemLists">
						{data.map(function (phoneData, i) {
							return <CategoryItem phoneData={phoneData} key={i}></CategoryItem>
						})}
					</div>
				</div>
			);
		}
		return (
			<div className="mainContentTabGetselfContainer flexColumn centerH flexGrow" >
				<div className="overFlowScroll">
					<p className='bannerWrap'></p>
					<div className="flexColumn contentMenu center">
						<div className="flex contentMenuItemWrap">
							<ContentMenuItem>휴대폰컨텐츠</ContentMenuItem>
							<ContentMenuItem>용돈벌기</ContentMenuItem>
							<ContentMenuItem>스펙비교</ContentMenuItem>
						</div>
						<div className="flex contentMenuItemWrap">
							<ContentMenuItem>키즈폰</ContentMenuItem>
							<ContentMenuItem>효도폰</ContentMenuItem>
							<ContentMenuItem>공짜폰</ContentMenuItem>
						</div>
					</div>
					<div className="whiteContainer">
						<div className="noticeWrap">
							<div className="noticeItem flex centerH">
								<p className="tag flex center">공지사항</p>
								<p className="noticeTit flex centerH flexGrow">[appname]]휴대폰이 싸진다? 포인트제도 도입!</p></div>
						</div>

						<div className="categoryItemListWrap">
							<CategoryItemLists>HOT 모델</CategoryItemLists>
						</div>
					</div>
				</div>
			</div >
		);
	}
}

export default MainContentTabGetself;
