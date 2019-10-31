import { connect } from 'react-redux';

import {
	createApplyChanges,
	createToggleEditorById,
} from 'store/actionCreators/TodoList';

const putDispatchToProps = dispatch => ({
	applyChanges: ({ id, title, desc }) =>
		dispatch(createApplyChanges({ id, title, desc })),
	toggleEditorById: ({ id }) => dispatch(createToggleEditorById({ id })),
});

export default Component =>
	connect(
		null,
		putDispatchToProps
	)(Component);
