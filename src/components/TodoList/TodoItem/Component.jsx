import React, { useState } from 'react';
import PropTypes from 'prop-types';

import TodoItemEditor from './TodoItemEditor';
import classes from './styles.module.css';

const TodoItem = ({
	id,
	title,
	desc,
	displayEditor,
	deleteTodo,
	toggleEditorById,
}) => {
	const [displayDesc, setDisplayDesc] = useState(false);

	return (
		<li>
			<h1 className={classes.title}>{title}</h1>
			<button onClick={() => toggleEditorById({ id })}>Edit</button>
			<TodoItemEditor
				displayEditor={displayEditor}
				id={id}
				title={title}
				desc={desc}
			/>
			<button onClick={() => setDisplayDesc(!displayDesc)}>
				{displayDesc ? 'Hide' : 'Show'} desc
			</button>
			<button onClick={() => deleteTodo({ id })}>Delete</button>
			{displayDesc && <p>{desc}</p>}
		</li>
	);
};

TodoItem.propTypes = {
	id: PropTypes.number.isRequired,
	deleteTodo: PropTypes.func.isRequired,
	toggleEditorById: PropTypes.func.isRequired,
};

export default TodoItem;
