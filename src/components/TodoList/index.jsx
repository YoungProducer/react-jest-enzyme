import { connect } from 'react-redux';

import { putStateToProps } from './container';
import TodoList from './Component';

export default connect(
	putStateToProps,
	null
)(TodoList);
