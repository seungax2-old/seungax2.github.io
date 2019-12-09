import React, { Component } from 'react';

class LoginForm extends Component {
	state = {
		id: '',
		password: ''
	}
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	handleSubmit = (e) => {
		// 페이지 리로딩 방지
		e.preventDefault();
		// 상태값을 onCreate 를 통하여 부모에게 전달
		console.log()
		this.props.dataCreate(this.state);
		// 상태 초기화
		this.setState({
			name: '',
			phone: ''
		})
	}
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div className="inputWrap flexColumn center">
					<p className="flex center">
						<img src={require('../img/kakao.png')} />
						<input type="text"
							placeholder="Username@gmail.com"
							value={this.state.id}
							onChange={this.handleChange}
							name="id"
						/>
					</p>
					<p className="flex center">
						<img src={require('../img/kakao.png')} />
						<input type="password"
							placeholder="********"
							value={this.state.password}
							onChange={this.handleChange}
							name="password"
						/>
					</p>
				</div>
				<p className="flex center"><button type="submit" className="Btn_login btn_style_big flex center" >로그인</button></p>
			</form >
		);
	}
}

export default LoginForm;