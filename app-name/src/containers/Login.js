import React, { Component } from 'react';

import LooginForm from '../components/LoginForm'

import './style.scss'

class Login extends Component {
	handleLogin = (data) => {
		console.log(data)
		if (data.id == "" && data.password == "") {
			alert("아이디와 비밀번호를 확인해주세요")
		} else {
			this.props.history.push('/main?tab=getself')
		}
	}
	render() {
		return (
			<div className="bodyWrapper flex center">
				<div className="loginContainer flexColumn center">
					<p className="login_txt1"><img src={require('../img/P_login_txt1.png')} alt="간편하게 로그인하고 편리한 기능을 사용해보세요." /></p>
					<div className="loginWrap flexGrow flexColumn">
						<LooginForm
							dataCreate={this.handleLogin}
						/>
						<div className="btnWrap flex center">
							<button className="Btn_register btn_style_txt">새로운 계정</button>
							<p className="bar"></p>
							<button className="Btn_findAccount btn_style_txt">아이디/비밀번호 찾기</button>
						</div>
						<p className="flex center"><button className="Btn_register btn_style_txt btn_style_txtSize">with signup</button></p>
						<div className="snsBtnWrap flex center">
							<img src={require('../img/kakao.png')} />
							<img src={require('../img/kakao.png')} />
							<img src={require('../img/kakao.png')} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;