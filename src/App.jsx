import React, { useState } from 'react';

import Tab from './components/Tabs/Component';

const App = ({ title }) => {
	const [isTitleVisible, setIsTitleVisible] = useState(false);

	return (
		<>
			<div>
				{isTitleVisible && <h1 className="title">{title}</h1>}
				<button
					onClick={() => setIsTitleVisible(true)}
					data-test="show-title"
				>
					Show title
				</button>
				<button
					onClick={() => setIsTitleVisible(false)}
					data-test="hide-title"
				>
					Hide title
				</button>
			</div>
			<div>
				{[...new Array(10).keys()].map(key => (
					<Tab key={key} />
				))}
			</div>
		</>
	);
};

export default App;
