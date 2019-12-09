//어플리케이션의 엔트리 포인트 역할을 하는데 리액트 루트 컴포넌트를 DOM에 마운팅 하는 역할
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
// Router: 이 컴포넌트는 react-router 의 주요 컴포넌트로서, 라우터의 속성을 정의하고 이 내부에서 라우트 설정.
// Route: 이 컴포넌트는 우리가 설정한 경로에서 어떤 컴포넌트를 렌더링 할 지 정하는 컴포넌트. 이 라우트 컴포넌트의 자식에 또 다른 Route 컴포넌트를 넣으면 해당 자식 컴포넌트는 부모 라우트의 서브 라우트가 됨.
// IndexRoute: 라우트에서 서브라우트가 주어지지 않았을 때, 즉 특정 라우트의 / 경로로 들어 왔을 때, 이 라우트에서 지정한 컴포넌트를 보여줌.
// browserHistory: HTML5 의 History API 를 사용하여 브라우저의 URL 변화를 주시하고, 조작.

import Root from "./Root";
import Home from './containers/Home';
import About from './containers/About';
import Posts from './containers/Posts';
import Post from './containers/Post';

import './common.css';

ReactDOM.render(
	// L23 : Router 컴포넌트를 정의하고 history 값을 browserHistory 로 설정. history 는 총 3가지
	//		 history 는 브라우저의 주소창이 어떻게 바뀌는지 주시하고 주소를 라우터에서 인식할 수 있도록 location 객체로 파싱
	// L24 : Route 컴포넌트의 path 를 "/" 로 설정. 즉, / 경로로 들어왔을땐 Root 컴포넌트를 보여주라고 설정하는 것 
	// L25 ~ : 자식들은 URL 이 매칭 하는 경우, App 컴포넌트의 자식으로 들어감. 
	//		   Ex) "/" 경로의 경우엔 IndexRoute 를 사용하여 Home 컴포넌트를 렌더링. /about 경로의 경우엔 About 컴포넌트를 렌더링
	// L30 : path 을 :id 로 설정을 하면, id 라는 파라미터가 들어가는것이라고 설정
	// 지금은 Post 컴포넌트가 Posts 내부에 위치 
	// 만약에 주소가 /post/:id 일 때 Posts 를 보여주지 않고 Post 만 보여주게 하고싶을때 아래와같이 따로하나씩 작성
	// <Route path="post" component={Posts}/>
	// <Route path="post/:id" component={Post}/>
	<Router history={browserHistory}>
		<Route path="/" component={Root}>
			<IndexRoute component={Home} />
			<Route path="about" component={About} />
			<Route path="post" component={Posts}>
				<Route path=":id" component={Post} />
			</Route>
		</Route>
	</Router>,
	document.getElementById('root')
);
