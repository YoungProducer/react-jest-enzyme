import { connect } from 'react-redux';

import { createAddTodo } from 'store/actionCreators/TodoList';

const putDispatchToProps = dispatch => ({
    addTodo: ({title, desc}) => 
        dispatch(createAddTodo({title, desc}))
});

export default Component => 
    connect(
        null,
        putDispatchToProps
    )(Component);