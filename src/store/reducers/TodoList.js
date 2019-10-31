import TodoListActions from '../actionTypes/TodoList';

const INITIAL_STATE = {
	todos: [
		{
			id: 1,
			title: 'Create React App',
			desc: 'Create React App 1',
			displayEditor: false,
		},
	],
};

const HANDLERS = {
	[TodoListActions.ADD_TODO]: (state, { payload: { title, desc } }) => {
		const { todos } = state;
		return {
			...state,
			todos: todos.concat([
				{
					id: todos[todos.length - 1].id + 1,
					title,
					desc,
					displayEditor: false,
				},
			]),
		};
	},
	[TodoListActions.DELETE_TODO]: (state, { payload: { id } }) => ({
		...state,
		todos: state.todos.filter(todo => todo.id !== id),
	}),
	[TodoListActions.APPLY_CHANGES]: (
		state,
		{ payload: { id, title, desc } }
	) => {
		return {
			...state,
			todos: state.todos.map(todo => ({
				...todo,
				title: todo.id === id ? title : todo.title,
				desc: todo.id === id ? desc : todo.desc,
			})),
		};
	},
	[TodoListActions.TOGGLE_EDITOR]: (state, { payload: { id } }) => ({
		...state,
		todos: state.todos.map(todo => ({
			...todo,
			displayEditor:
				todo.id === id ? !todo.displayEditor : todo.displayEditor,
		})),
	}),
};

export default (state = INITIAL_STATE, action) =>
	HANDLERS[action.type] ? HANDLERS[action.type](state, action) : state;
