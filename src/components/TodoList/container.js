import { connect } from 'react-redux';

import { getTodos } from '../../store/selectors/TodoList';

const putStateToProps = state => ({
	todos: getTodos(state),
});

export default Component => 
	connect(
		putStateToProps,
		null
	)(Component);
