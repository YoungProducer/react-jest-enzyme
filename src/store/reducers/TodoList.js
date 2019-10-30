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
	[TodoListActions.ADD_TODO]: (
		state,
		{ payload: { 
			title, 
			desc 
		} 
	}) => {
		const { todos } = state;
		return {
			...state,
			todos: todos.concat([{
				id: todos[todos.length - 1].id + 1,
				title,
				desc
			}])
		};
	},
	[TodoListActions.DELETE_TODO]: (
		state,
		{ payload: { id } 
	}) => ({
		...state,
		todos: state.todos.filter(todo => todo.id !== id)
	})
};

export default (state = INITIAL_STATE, action) =>
	HANDLERS[action.type] ? HANDLERS[action.type](state, action) : state;
