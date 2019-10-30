import React, { useState } from 'react';

const TodoItem = ({ title, desc }) => {
	const [displayDesc, setDisplayDesc] = useState(false);

	return (
		<li>
			<h1>{title}</h1>
			{displayDesc && <p>{desc}</p>}
			<button onClick={() => setDisplayDesc(!displayDesc)}>
				Show desc
			</button>
			<button>Delete</button>
		</li>
	);
};

export default TodoItem;
