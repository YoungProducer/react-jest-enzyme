import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from './TodoItem/Component';

const TodoList = ({ todos }) => {
	return todos.map(todo => (
		<TodoItem title={todo.title} desc={todo.desc} key={todo.id} />
	));
};

TodoList.propTypes = {
	todos: PropTypes.array.isRequired,
};

export default TodoList;
