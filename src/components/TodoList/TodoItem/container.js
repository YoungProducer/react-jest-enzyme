import { connect } from 'react-redux';

import {
	createDeleteTodo,
	createToggleEditorById,
} from 'store/actionCreators/TodoList';

const putDispatchToProps = dispatch => ({
	deleteTodo: id => dispatch(createDeleteTodo(id)),
	toggleEditorById: id => dispatch(createToggleEditorById(id)),
});

export default Component =>
	connect(
		null,
		putDispatchToProps
	)(Component);
