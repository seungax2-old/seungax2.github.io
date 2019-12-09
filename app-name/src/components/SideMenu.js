import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

class SideMenu extends Component {
	closeMenu = (e) => {
		document.querySelector(".dimm").style.display = "none";
		document.getElementById("SideMenu").style.width = "0";
	}
	render() {
		return (
			<div id="SideMenu" >
				{/* <div className="Btn_closeSideMenu" onClick={this.closeMenu}>닫기</div> */}
				<div className="profileWrap flexColumn center">
					<p className="profile_img"><img src={require('../img/profile_none.png')} /></p>
					<p className="profile_name">name</p>
					<p className="profile_email">email@naver.com</p>
				</div>
				<div className="menuNavListWrap">
					<NavLink to="/" className="item flex centerH" onClick={this.closeMenu}>내 정보</NavLink>
					<NavLink to="/notice" className="item flex centerH" onClick={this.closeMenu}>공지사항</NavLink>
					<NavLink to="/" className="item flex centerH">고객센터</NavLink>
					<NavLink to="/" className="item flex centerH">입점신청</NavLink>
					<NavLink to="/" className="item flex centerH">광고문의 <span className="flex center">1</span></NavLink>
					<NavLink to="/" className="item flex centerH">설정</NavLink>
				</div>
			</div>
		);
	}
};

export default SideMenu;