import React from 'react';

import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import Hint from '../Component';

describe('<Hint />', () => {
	const defaultProps = {
		title: 'Bob no mercy',
	};

	it('is matches snapshot', () => {
		const tree = shallow(<Hint {...defaultProps} />);

		expect(tree).toMatchSnapshot();
	});

	it('display when mouse is over the title', () => {
		const hint = mount(<Hint {...defaultProps} />);

		hint.find('[data-test="title-hover"]').simulate('mouseenter');

		expect(hint.find('.hint').exists()).toEqual(true);

		hint.find('[data-test="title-hover"]').simulate('mouseleave');

		expect(hint.find('.hint').exists()).toEqual(false);
	});
});
