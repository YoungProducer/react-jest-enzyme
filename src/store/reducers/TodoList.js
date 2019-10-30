import TodoListActions from '../actionTypes/TodoList';

const INITIAL_STATE = {
	todos: [
		{
			id: 1,
			title: 'Create React App',
			desc: 'Create React App 1',
		},
	],
};

const HANDLERS = {
	[TodoListActions.ADD_TODO]: (state, { payload: { title, desc } }) => ({
		...state,
		todos: Object.assign(todos, {
			id: todos[todos.length - 1].id + 1,
			title,
			desc,
		}),
	}),
};

export default (state = INITIAL_STATE, action) =>
	HANDLERS[action.type] ? HANDLERS[action.type](state, action) : state;
