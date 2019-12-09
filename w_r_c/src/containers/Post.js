import React from 'react';
import BigText from '../components/BigText';

// 라우트에서의 파라미터 값은, 컴포넌트에서 params props 에 접근하여 얻어 낼 수 있음
const Post = ({ params }) => {
	return (
		<div>
			<BigText>{params.id}</BigText>
		</div>
	);
};

export default Post;