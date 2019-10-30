import { getTodos } from '../../store/selectors/TodoList';

export const putStateToProps = state => ({
	todos: getTodos(state),
});
