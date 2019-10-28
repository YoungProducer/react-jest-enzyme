# Testing strategy

Our front end tests - either browser or node should be conducted using Jest.

https://jestjs.io/

Jest provides a fully fledged solution to javascript testing, a test runner, assertion library, mocking & stubbing library.

Jest is built on top of `jasmine` and implements a BDD Behaviour Driven Development style test structure via `describe` and `it` blocks.

Behaviours can be grouped with nested describe blocks eg:

```
describe('Application', () => {
	describe('error behaviour', () => {
		it('should work', () => {
			...
		});
		it('should also work', () => {
			...
		});
	});
});
```

Jest will generate a CLI report based on these nested `describe` blocks a readable test output detailing your test cases and pass/failure.

```
PASS  Application/__tests__/Application.test.js
	Application
		error behaviour
			✓ should work (25ms)
			✓ should also work (22ms)
```

### Assertions

Jest comes built-in with `expect` and a large variety of matchers for asserting on objects, arrays, stubs, and more. It's worth a read of [expect's documentation](https://jestjs.io/docs/en/expect) to see what matchers are available that can improve the readability of your tests.

https://jestjs.io/docs/en/expect

For example `expect(anArray.length).toEqual(1)` although potentially intuitive is more succinctly written with `expect(anArray).toHaveLength(1)`.

Ideally each test should have one assertion. If a test has multiple assertions it's a good indication that there's more that one behaviour being tested.

For example:

```
it('returns correct data', () => {
	const data = getData();

	expect(data.value).toEqual(1);
	expect(data.otherValue).toEqual(2);
});
```

This test covers two separate distinct behaviours, if the first assertion fails the second assertion will not run and subsequently the test results either local or CI will not report on the second behaviour.

### React testing with Enzyme

React testing should be conducted using [enzyme](https://airbnb.io/enzyme/).

Enzyme provides a set of API utilities that allows concise traversal, interraction and assertions against React's virtual DOM.

Check out the [API reference](https://airbnb.io/enzyme/docs/api/) for usage, some of the best places to start are:

-   `componentWrapper.find(CSS_SELECTOR)` for navigation around the DOM
-   `componentWrapper.simulate(EVENT_OBJECT)` to simulate user interractions like clicking, typing, dragging, etc...

#### Shallow vs Mount

The two main exports of enzyme include `shallow` and `mount`, shallow should be preferred in almost all instances to isolate the scope of each test and prevent brittle tests that rely on multiple components and their interractions.

#### Snapshots

Snapshots are a powerful feature of jest that allows for easy to create test cases that assert on a "snapshot" of the DOM output of a React component.

```
expect(
	shallow(
		<Component/>
	)
).toMatchSnapshot();
```

Any call to `toMatchSnapshot()` will create an entry in a child directory called `__snapshots__`, these should be checked into the repository.

_With great power comes great responsibility._

Snapshots should not be used as a blanket to improve coverage, nor are they a replacement for behaviour driven tests. Snapshot tests work best on presentational components with little or no conditional behaviour in their rendering.

Snapshots should only be used on shallow mounted components, if used on fully mounted components it effectively becomes a very brittle change-detector test for all child components in the tree.

#### DOM testing hooks

Any DOM hooks needed for enzyme to find elements in the tree should be notated using a data attribute called `data-test="<NAME>"`. ids or classNames should not be used for this purpose. This is to be explicit what the hooks are used for.

eg:

```
const Component = () => <div data-test="test-hook"/>
```

```
it('Component exists', () =>
	expect(
		shallow(
			<Component/>
		)
		.find('[data-test="test-hook"]')
		.exists()
	).toBe(true)
);
```

### Directory Structure

Tests should be one directory down from the tested code in a folder called `__tests__`, this follows the jest defaults.

Example:

```
lib/
	__tests__/
		app.test.js
	app.js
```

This makes it much easier to refactor and change the directory structure without having to maintain a redundant mirror directory structure.

### Coverage

Coverage should be 100% or as close to as possible, with the noted exception of pending or stubbed code. EG: if a function is created in one story as "plumbing" for a later one that's fine.

To generate a local coverage report you can run `npm run test:coverage` which will generate a `coverage/` report directory. In this coverage report directory it includes a lcov report in both a format consumable by coveralls (our CI coverage tool) and viewable in browser.

-   coverage/lcov-report/index.html
-   coverage/lcov.info
