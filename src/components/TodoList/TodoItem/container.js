import { connect } from 'react-redux';

import { createDeleteTodo } from 'store/actionCreators/TodoList';

const putDispatchToProps = dispatch => ({
    deleteTodo: id =>
        dispatch(createDeleteTodo(id))
});

export default Component => 
    connect(
        null,
        putDispatchToProps
    )(Component);