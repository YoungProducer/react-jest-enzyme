import TodoListActions from '../actionTypes/TodoList';

export const createAddTodo = ({ id, title, desc }) => ({
	type: TodoListActions.ADD_TODO,
	payload: {
		id,
		title,
		desc,
	},
});
