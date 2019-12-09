import React from 'react';
import BigText from '../components/BigText';

const Posts = ({ children }) => {
	return (
		<div>
			<BigText>포스트</BigText>
			{children}
		</div>
	)
}

export default Posts;
