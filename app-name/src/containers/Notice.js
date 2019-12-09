import React from 'react';

import Header from '../components/Header'

import './style.scss'

const Notice = ({ history }) => {
	return (
		<div className="bodyWrapper flexColumn center">
			<Header
				mainHistory={history}
				headerForm="simpleLogoFrom"
			/>
			<div className="noticeContainer flexColumn flexGrow">
				<div className="noticeWrap_header flex centerH">
					<p className="Btn_back"><img src={require("../img/Btn_back.png")} /></p>
					<p className="flexGrow noticePgeName">공지사항</p>
				</div>

				<div className="noticeBodyWrap">
					<div className="noticeTitWrap flex centerH">
						<p className="tag flex center">공지사항</p>
						<p className="noticeTit flex centerH flexGrow">[appname]]휴대폰이 싸진다? 포인트제도 도입!</p>
					</div>
					<div className="noticeTxtWrap">
						이야아아ㅏ아아ㅏㅏ아아ㅏㅏ앙ㅇ이야아아ㅏ아아ㅏㅏ아아ㅏㅏ앙ㅇ이야아아ㅏ아아ㅏㅏ아아ㅏㅏ앙ㅇ이야아아ㅏ아아ㅏㅏ아아ㅏㅏ앙ㅇ
						이야아아ㅏ아아ㅏㅏ아아ㅏㅏ앙ㅇ이야아아ㅏ아아ㅏㅏ아아ㅏㅏ앙ㅇ이야아아ㅏ아아ㅏㅏ아아ㅏㅏ앙ㅇ
						이야아아ㅏ아아ㅏㅏ아아ㅏㅏ앙ㅇ
						이야아아ㅏ아아ㅏㅏ아아ㅏㅏ앙ㅇ
					</div>
				</div>
			</div>
		</div >
	);
}

export default Notice;