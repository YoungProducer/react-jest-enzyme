import TodoListActions from '../actionTypes/TodoList';

export const createAddTodo = ({ id, title, desc }) => ({
	type: TodoListActions.ADD_TODO,
	payload: {
		id,
		title,
		desc,
	},
});

export const createDeleteTodo = ({ id }) => ({
	type: TodoListActions.DELETE_TODO,
	payload: {
		id,
	},
});

export const createApplyChanges = ({ id, title, desc }) => ({
	type: TodoListActions.APPLY_CHANGES,
	payload: {
		id,
		title,
		desc,
	},
});

export const createToggleEditorById = ({ id }) => ({
	type: TodoListActions.TOGGLE_EDITOR,
	payload: {
		id,
	},
});
