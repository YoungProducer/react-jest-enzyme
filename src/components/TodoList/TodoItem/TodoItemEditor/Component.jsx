import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TodoItemEditor = ({
	id,
	title,
	desc,
	displayEditor,
	applyChanges,
	toggleEditorById,
}) => {
	const [newTitle, setNewTitle] = useState(title);
	const [newDesc, setNewDesc] = useState(desc);

	return (
		<>
			{displayEditor && (
				<div>
					<input
						type="text"
						value={newTitle}
						onChange={event => setNewTitle(event.target.value)}
					/>
					<input
						type="text"
						value={newDesc}
						onChange={event => setNewDesc(event.target.value)}
					/>
					<button
						onClick={() =>
							applyChanges({
								id,
								title: newTitle,
								desc: newDesc,
							})
						}
					>
						Apply changes
					</button>
					<button onClick={() => toggleEditorById({ id })}>
						Close editor
					</button>
				</div>
			)}
		</>
	);
};

TodoItemEditor.propTypes = {
	applyChanges: PropTypes.func.isRequired,
	toggleEditorById: PropTypes.func.isRequired,
};

export default TodoItemEditor;
