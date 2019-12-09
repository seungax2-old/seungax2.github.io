import React from 'react';
import { NavLink } from 'react-router-dom';

import './style.scss'

const Start = () => {
	return (
		<div className="startContainer flexColumn center">
			<div className="imgWrap flexGrow flexColumn center">
				<img src={require('../img/P_start_txt1.svg')} alt="내가 찾는 모든 폰" />
				<img src={require('../img/P_start_txt2.svg')} alt="AppName" />
			</div>
			<button className="Btn_start btn_style_big flex center"><NavLink to="/login">시작하기</NavLink></button>
		</div>
	);
}

export default Start;