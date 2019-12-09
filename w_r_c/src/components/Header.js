import React from 'react';
import { Link } from 'react-router'
import PropTypes from 'prop-types';
import './Header.scss';

//(param1, param2, …, paramN) => { return(statements) }
//(param1, param2, …, paramN) => (statements)
//다음과 동일함 :  => { return expression; }
//화살표 함수는 항상 익명. 이  함수 표현은 메소드 함수가 아닌 곳에 가장 적합

const MenuItem = ({ active, children, to }) => (
	<Link to={to} className={`menu-item flex center ${active ? 'active' : ''}`}>
		{children}
	</Link>
)

// router 객체 내부의 isActive 함수는 현재 브라우저의 경로가 주어진 경로와 매칭이 되는지 확인
const Header = (props, context) => {
	const { router } = context;
	return (
		<div id="Header" className="flexColumn centerH">
			<div className="logo flex center">
				ReactPage
			</div>
			<div className="menu flex centerH">
				<MenuItem to={'/'} active={router.isActive('/', true)}>홈</MenuItem>
				<MenuItem to={'/about'} active={router.isActive('/about')}>소개</MenuItem>
				<MenuItem to={'/post'} active={router.isActive('/post')}>포스트</MenuItem>
			</div>
		</div>
	);
}

// context 는 React 프로젝트에서 전역적으로 사용 될 수 있는 객체. 컴포넌트마다 props 로 전달하기 힘든 경우에 이 기능이 사용.
Header.contextTypes = {
	router: PropTypes.object
}

export default Header;
