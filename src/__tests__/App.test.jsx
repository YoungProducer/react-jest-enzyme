import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import App from '../App';

describe('<App />', () => {
	const requiredProps = {
		title: 'Hello world',
	};
	// it('is matches snapshot', () => {
	//     const tree = shallow(<App />);

	//     expect(tree).toMatchSnapshot();
	// });

	// it('check props', () => {
	//     const props = {
	//         title: "Hello world"
	//     };
	//     const tree = shallow(<App {...requiredProps} />);
	//     tree.setProps(props);
	//     expect(tree.instance().test).toEqual(false);
	//     expect(tree.contains(<h1 className="title">Hello world</h1>)).toEqual(true);
	// });

	it('will title be displayed when click on "Show title"', () => {
		const onButtonClick = sinon.spy();

		const app = mount(
			<App onButtonClick={onButtonClick} {...requiredProps} />
		);

		app.find('[data-test="show-title"]').simulate('click');
		expect(app.contains(<h1 className="title">Hello world</h1>)).toEqual(
			true
		);
		app.find('[data-test="hide-title"]').simulate('click');
		expect(app.contains(<h1 className="title">Hello world</h1>)).toEqual(
			false
		);
	});
});
