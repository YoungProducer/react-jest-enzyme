# Coding standards

These standards are enforced where possible via eslint rules in each repository which in turn are run via CI to ensure the robustness & consistency of the code, any deviation from these base rules on a project-by-project basis will be documented in the `.eslintrc` file in each repository's root.

## JavaScript

We follow [airbnb's](https://github.com/airbnb/javascript) _"mostly reasonable approach to JavaScript"_ coding standards for Javascript on both our node services & front end code.

https://github.com/airbnb/javascript

It contains a considerable breadth of detail on a large aspect of the language and should be seen as a good reference point for any InferStat JavaScript coding.

## React

We also follow [airbnb's](https://github.com/airbnb/javascript/tree/master/react) coding standards for React code.

https://github.com/airbnb/javascript/tree/master/react

These rules extend and supplement the base JavaScript rules but enforce more tailored rules and linting curated for the React ecosystem.

## Imports/Require

For both server-side `require` statements and client side `import` statements we should split them into external & InferStat.

EG:

```
// External imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//InferStat imports
import logo from '../../../../logo.svg';
import FormValidator from '../../../components/Common/FormValidator';
```

This allows quick at-a-glance readability on the inter-project dependencies as well as the external library dependencies.

External dependencies should appear before any local dependencies as per [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md).

## Type Documentation

For type annotations we should use [jsdoc-style](https://devhints.io/jsdoc) annotations above the relevant functions in both Node & Browser code.

EG:

```
/**
 * /path/to/file.js
 *
 * Retrieve partial redux state, unlocked via email & password
 *
 * @async
 * @param {Object} options
 * @param {String} options.uuid The uuid of the state partial
 * @param {Object} options.loginData
 * @param {String} options.loginData.email The user email
 * @param {String} options.loginData.password The user password
 * @return {Promise<Object>}
 */
async function retrievePartialState(options) {
	const {
		uuid,
		loginData: { email, password },
	} = options;

	...implementation
}
```

JSDoc enables a wealth of tools both in the IDE in terms of code completion, and autogeneration of documentation via libraries like [documentationjs](https://www.npmjs.com/package/documentation). It also gives a clear indication of the type requirements of funtions without having to read or know the implementation of the function.

JSDoc is used in preference over other more opinionated typing systems like [Flow](https://flow.org/) or [Typescript](https://www.typescriptlang.org/) because it can be used without a preprocessor and subsequently is the same syntax for both our frontend (processed via babel & webpack) and our node backend which runs natively on V8. It also encourages comments and has an easier barrier to entry compared with the superset of new syntax both Flow & Typescript adds to codebases. Regression on types and their compatability should be enforced with stringent unit & integration tests and monitored via code coverage reports.

### Material UI

Where possible we should endeavour to utilise the Material UI component library for all UI work, this helps prevent duplication of functionality and leverages a consistent approach to building UIs.

https://material-ui.com/

It's worth familiarising yourself with what components are on offer, and the API of those components before tackling UI work.

## Styling

### Theming

Under most circumstances we should be utilising theming on top of Material UI for styling

https://material-ui.com/customization/themes/

For example a theme configuration would contain our specific InferStat customisations that describe the deviations from the base Material UI.

```
import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
	typography: {
		useNextVariants: true,
	},
	palette: {
		primary: {
			light: '#29ABE2',
			main: '#19465B',
		},
	},
});
```

This gives us the flexibility in reusing existing solutions in Material UI, while allowing us a declarative solution to our brand look and feel that we can maintain and change easily across the entire codebase.

### CSS Modules

For where we do need CSS we should utilise css modules on a component-by-component basis.

See https://github.com/css-modules/css-modules for a good overview of CSS modules.

```
// Component.module.css
.wrapper {
	color: red;
}
```

```
// Component.js

import styles from './Component.module.css';

export default () => <div className={styles.wrapper} />
```

#### Global CSS styles

For global CSS (CSS that is not imported into a component) it should still be processed via CSS modules and use the `:global(xxx)` declaration.

https://github.com/css-modules/css-modules#exceptions

This makes it explicit that a piece of styling is in the global namespace and deviates from the CSS modules architecture. The concept behind this is that global styles are typically bad and pollute the CSS namespace so should be rarely used - making it an explicit choice forces a developer to consider the potential ramifications of this action.

## File headings

All InferStat specific JavaScript should contain a file heading that at a glance describes the file and what it does.

It should take the format of:

```
/*
<NAME OF FILE>
<WHAT THE FILE DOES>

© Copyright 2019 InferStat
This source code may not be distributed, copied or re-used without the express, written authorisation of a director of InferStat Ltd.

Created by: <WHO CREATED>
Created: <DATE CREATED>
*/
```
