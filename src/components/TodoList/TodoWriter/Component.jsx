import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TodoWriter = ({addTodo}) => {
    const [title, setTitle] = useState('');

    const addTodoAndClearTitle = () => {
        addTodo({title, desc: ''})
        setTitle('');
    };

    return (
        <div>
            <input type="text" value={title} onChange={event => setTitle(event.target.value)}/>
            <button onClick={() => addTodoAndClearTitle()} >Add todo</button>
        </div>
    )
};

TodoWriter.propTypes = {
    addTodo: PropTypes.func.isRequired
};

export default TodoWriter;