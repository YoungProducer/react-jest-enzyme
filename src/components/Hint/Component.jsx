import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Hint = ({ title, isHintVisible }) => {
	useEffect(() => {
		console.log(isHintVisible);
	}, [isHintVisible]);

	return <div>{isHintVisible && <h1 className="hint">{title}</h1>}</div>;
};

Hint.propTypes = {
	title: PropTypes.string.isRequired,
	isHintVisible: PropTypes.bool.isRequired,
};

export default Hint;
