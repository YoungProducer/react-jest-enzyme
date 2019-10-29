import React, { useState } from 'react';

import Hint from '../Hint/Component';

const Tab = props => {
	const [isHintVisible, setHintVisible] = useState(false);

	const toggleHintVisibility = () => {
		isHintVisible ? setHintVisible(false) : setHintVisible(true);
	};

	return (
		<div
			onMouseEnter={toggleHintVisibility}
			onMouseLeave={toggleHintVisibility}
		>
			<h1>Tab's Title</h1>
			<Hint isHintVisible={isHintVisible} title="title" />
		</div>
	);
};

export default Tab;
