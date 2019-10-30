import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import TodoItem from './TodoItem';
import TodoWriter from './TodoWriter';

const TodoList = ({ todos }) => {
	return (
		<>
			<TodoWriter />
			{
				todos.map(todo => (
					<TodoItem {...todo} key={todo.id} />
				))
			}
		</>
	)
};

TodoList.propTypes = {
	todos: PropTypes.array.isRequired,
};

export default TodoList;
