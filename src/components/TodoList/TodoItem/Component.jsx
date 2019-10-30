import React, { useState } from 'react';
import PropTypes from 'prop-types';

import classes from './styles.module.css';

const TodoItem = ({ id, title, desc, deleteTodo }) => {
	const [displayDesc, setDisplayDesc] = useState(false);

	
	return (
		<li>
			<h1 className={classes.title}>{title}</h1>
			<button onClick={() => setDisplayDesc(!displayDesc)}>
				Show desc
			</button>
			<button onClick={() => deleteTodo({id})}>Delete</button>
			{displayDesc && <p>{desc}</p>}
		</li>
	);
};

TodoItem.propTypes = {
	deleteTodo: PropTypes.func.isRequired
};

export default TodoItem;
