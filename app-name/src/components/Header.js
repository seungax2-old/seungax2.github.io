import React, { Component, Fragment } from "react";
import { NavLink } from 'react-router-dom';
import SearchPlace from '../components/SearchPlace';

class Header extends Component {
	state = {
		searchTxt: this.props.searchTxt ? this.props.searchTxt : ''
	}
	closeMenu = (e) => {
		document.querySelector(".dimm").style.display = "none";
		document.getElementById("SideMenu").style.width = "0";
	}
	openMenu = (e) => {
		document.querySelector(".dimm").style.display = "block";
		document.getElementById("SideMenu").style.width = "80vw";
	}
	handleSearch = (data) => {
		let searchTxt = data.searchTxt
		document.querySelector(".inputSearchValue").value = searchTxt
		this.state.searchTxt = searchTxt
		data.pageMove ? this.props.mainHistory.push(`/searchResult?searchPlace=${searchTxt}`) : '';
	}

	render() {
		const PupleHeader = ({ children }) => {
			return (
				<Fragment>
					<div className="header_top flex centerH">
						<p className="Btn_menu icMenu" onClick={this.openMenu}><img src={require('../img/ic_menu.png')} /></p>
						<p className="logo flexGrow flex center"><img src={require('../img/logo.png')} /></p>
						<p className="icMenu"></p>
					</div>
					<div className="searchWrap flex centerH" onClick={() => { document.querySelector(".searchPlaceContainer").style.display = "block" }} >
						<p className="flex center icSearch"><img src={require('../img/ic_search.png')} /></p>
						<input type="text" className="inputSearchValue flexGrow" placeholder="지역명 시/군/구 검색창" disabled value={children} />
					</div>
				</Fragment>
			);
		}

		const WhiteHeader = ({ children }) => {
			return (
				<Fragment>
					<div className="header_top flex centerH">
						<p className="Btn_menu icMenu" onClick={this.openMenu}><img src={require('../img/ic_menu.png')} /></p>
						<p className="logo flexGrow flex center"><img src={require('../img/logo_p.png')} /></p>
						<p className="Btn_menu icMenu"><img src={require('../img/ic_rightMenu.png')} /></p>
					</div>
					<div className="searchWrap style_w flex centerH" onClick={() => { document.querySelector(".searchPlaceContainer").style.display = "block" }} >
						<input type="text" className="inputSearchValue flexGrow style_w" placeholder="지역명 시/군/구 검색창" disabled value={children} />
						<p className="flex center icSearch style_w"><img src={require('../img/ic_search_b.png')} /></p>
					</div>
				</Fragment>
			);
		}

		const SimpleInputFrom = ({ children }) => {
			return (
				<Fragment>
					<div className="header_simpleInputFrom flex centerH">
						<p className="Btn_menu icMenu" onClick={this.openMenu}><img src={require('../img/ic_menu.png')} /></p>
						<div className="searchWrap flex centerH flexGrow" onClick={() => { document.querySelector(".searchPlaceContainer").style.display = "block" }} >
							<input type="text" className="inputSearchValue flexGrow" placeholder="지역명 시/군/구 검색창" disabled value={children} />
							<p className="flex center icSearch"><img src={require('../img/ic_search.png')} /></p>
						</div>
					</div>
				</Fragment>
			);
		}

		const SimpleLogoFrom = () => {
			return (
				<Fragment>
					<div className="header_top flex centerH simpleLogoFromStyle">
						<p className="Btn_menu icMenu" onClick={this.openMenu}><img src={require('../img/ic_menu.png')} /></p>
						<p className="logo flexGrow flex center"><img src={require('../img/logo.png')} /></p>
						<p className="icMenu"></p>
					</div>
				</Fragment>
			);
		}

		const HeaderStyle = () => {
			switch (this.props.headerForm) {
				case "simpleInputFrom":
					return (
						<div id="Header" className="flexColumn centerH purpleColor">
							<SimpleInputFrom>{this.state.searchTxt}</SimpleInputFrom>
						</div>
					);
				case "simpleLogoFrom":
					return (
						<div id="Header" className="flexColumn centerH purpleColor">
							<SimpleLogoFrom />
						</div>
					);
				default:

					return (
						<div id="Header" className="flexColumn centerH">

							{
								this.props.style == "white" ?
									<WhiteHeader>{this.state.searchTxt}</WhiteHeader>
									:
									<PupleHeader>{this.state.searchTxt}</PupleHeader>
							}
						</div>
					);
			}
		}

		return (
			<Fragment>
				<p className="dimm" onClick={this.closeMenu}></p>
				<SearchPlace searchData={this.handleSearch} />
				<HeaderStyle />
			</Fragment >
		);
	}
}

export default Header;