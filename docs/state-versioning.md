# State Versioning Guide

This guide explains infertrade-frontend current approach for state migration between different releases of the tool.

-   [Introduction](#Introduction)
-   [Feature branches](#Feature-branches:-actions-to-be-performed-when-adding-and-removing-state-props)
-   [Release branches](#Release-branches:-actions-to-be-performed-prior-to-merging-into-the-master-branch)
-   [Hotfixes](#Release-branches:-hotfixes)

## Introduction

For users with accounts, InferTrade saves a copy of the user's state into the backend after every action. The state is normally persisted in the browser, but when a user closes their browser and the session times out, they must retrieve it from the backend.

If there is a considerable gap of time since the last time the user logged in, it is possible that we have updated the production verison of InferTrade in the meantime. This could cause problems if an old/obsolete saved state is loaded into a new version.

In order to avoid failures and bugs therefore, we require new releases to be accompanied by methods for migrating states between versions, making adjustments to state props etc.

This guide provides information on the steps necessary to maintain successful state migration when creating feature branch and creating releases.

The following files require changes to use the newer state when a new state exists:

-   `src/adjustStateVersion/handlers.js`
-   `src/adjustStateVersion/__tests__/handlers.test.js`
-   `src/adjustStateVersion/__tests__/adjustStateVersion.test.js`
-   `src/adjustStateVersion/stateSnapshots/{newVersion}.json`

## Feature branches: actions to be performed when adding and removing state props

When we adjust the props in the state in a feature branch we should also add handlers for state migration in the same branch.

Add upgrading and downgrading logic in [file with state versioning handlers](../src/adjustStateVersion/handlers.js)

We need to add upgrading and downgrading logic so that users with old states are upgraded as they log in. This must be fully historic, encompassing all versions (from when it is introduced).

##### Before

```js
// /src/adjustStateVersion/handlers.js
{
    [toolVersion]: {
        downgrade: setVersion('2.2.0'),
    },
    '2.2.0': {
        upgrade: setVersion(toolVersion),
        downgrade: setVersion('0.0.0'),
    },
}
```

##### After

```js
// /src/adjustStateVersion/handlers.js
{
    [toolVersion]: {
        downgrade: state => ({
            ...state,
            version: '2.2.0',
            newPropName: undefined,
        }),
    },
    '2.2.0': {
        upgrade: state => ({
            ...state,
            version: toolVersion,
            newPropName: 'defaultNewPropValue',
        }),
        downgrade: setVersion('0.0.0'),
    },
}
```

## Feature branches: actions to be performed when existing prop changed

If all you want is to change only default (initial) value of existing prop without performing anything on upgrade, you need to change tests instead of upgrade/downgrade handlers.

Considering you've changed default value of `testProp` from `0` to `1`:

1. Update [handlers tests](/src/adjustStateVersion/__tests__/handlers.test.js):

##### Before

```js
// /src/adjustStateVersion/__tests__/handlers.test.js
describe(toolVersion, () => {
    const handler = handlers[toolVersion];

    it(`downgrades to 2.2.0`, () =>
        expect(handler.downgrade(freshState)).toEqual(stateSnapshot220));
});

describe('2.2.0', () => {
    const handler = handlers['2.2.0'];

    it(`upgrades to ${toolVersion}`, () =>
        expect(handler.upgrade(stateSnapshot220)).toEqual(freshState));
```

##### After

```js
// /src/adjustStateVersion/__tests__/handlers.test.js
const pathedStateSnapshot220 = { ...stateSnapshot220, testProp: 1 }

describe(toolVersion, () => {
    const handler = handlers[toolVersion];

    it(`downgrades to 2.2.0`, () =>
        expect(handler.downgrade(freshState)).toEqual(pathedStateSnapshot220));
});

describe('2.2.0', () => {
    const handler = handlers['2.2.0'];

    it(`upgrades to ${toolVersion}`, () =>
        expect(handler.upgrade(pathedStateSnapshot220)).toEqual(freshState));
```

2. Fix [adjustStateVersion tests](/src/adjustStateVersion/__tests__/adjustStateVersion.test.js):

##### Before

```js
it(`upgrades state from 2.2.0 to ${toolVersion} with the new props`, () =>
	expect(adjustStateVersion(stateSnapshot220)).toEqual(freshState));
it(`downgrades state from ${toolVersion} to 2.2.0 reverting upgrade changes`, () => {
	getToolVersion.mockReturnValue('2.2.0');
	expect(adjustStateVersion(freshState)).toEqual(stateSnapshot220);
});
```

##### After

```js
const pathedStateSnapshot220 = { ...stateSnapshot220, testProp: 1 };

it(`upgrades state from 2.2.0 to ${toolVersion} with the new props`, () =>
	expect(adjustStateVersion(pathedStateSnapshot220)).toEqual(freshState));
it(`downgrades state from ${toolVersion} to 2.2.0 reverting upgrade changes`, () => {
	getToolVersion.mockReturnValue('2.2.0');
	expect(adjustStateVersion(freshState)).toEqual(pathedStateSnapshot220);
});
```

## Release branches: actions to be performed prior to merging into the master branch

When creating a release we create distinct methods for migrating to and front the prior release. This should essentially be the merged changes added by individual feature branches.

For the below steps to work you need to have already updated the version in the package.json file.

### 1. Create a default state snapshot and add to stateSnapshots:

-   Clone the release branch locally
-   Open [/src/adjustStateVersion/createFreshState.js](../src/adjustStateVersion/createFreshState.js).
-   Uncomment line 16
-   Run the local version using `npm start`.
-   Open Chrome console. (E.g. right click on page, select Inspect then click on Console tab in top right.)
-   Copy output (breadcrumbs.js) to new json in [/src/adjustStateVersion/stateSnapshots](../src/adjustStateVersion/stateSnapshots).
-   Change "version" prop to version from new release. Even if you have already updated in the package.json you need to change, as the state will have a unwanted "-dev" suffix.
-   Comment back out line 16

### 2. Update [/src/adjustStateVersion/handlers.js](../src/adjustStateVersion/handlers.js):

#### Before

```js
// /src/adjustStateVersion/handlers.js
{
    [toolVersion]: {
        downgrade: state => ({
            ...state,
            version: '2.2.0',
            newPropName: undefined,
        }),
    },
    '2.2.0': {
        upgrade: setProps({
            version: toolVersion,
            newPropName: 'defaultNewPropValue',
        }),
        downgrade: setVersion('0.0.0'),
    },
}
```

#### After

```js
// /src/adjustStateVersion/handlers.js
{
    [toolVersion]: {
        downgrade: setVersion('2.3.0'),
    }
    '2.3.0': {
        upgrade: setVersion(toolVersion),
        downgrade: setProps({
            version: '2.2.0',
            newPropName: undefined,
        }),
    },
    '2.2.0': {
        upgrade: setVersion({
            version: toolVersion,
            newPropName: 'defaultNewPropValue',
        }),
        downgrade: setVersion('0.0.0'),
    },
}
```

### 3. Update [/src/adjustStateVersion/**tests**/adjustStateVersion.test.js](../src/adjustStateVersion/__tests__/adjustStateVersion.test.js):

Add tests to reflect the new changes to state.

##### Before

```js
// /src/adjustStateVersion/__tests__/adjustStateVersion.test.js
it(`downgrades state from ${toolVersion} to 2.2.0 reverting upgrade changes`, () => {
	getToolVersion.mockReturnValue('2.2.0');
	expect(adjustStateVersion(freshState)).toEqual(stateSnapshot220);
});
it(`upgrades state from 2.2.0 to ${toolVersion} with the new props`, () =>
	expect(adjustStateVersion(stateSnapshot220)).toEqual(freshState));
```

##### After

```js
// /src/adjustStateVersion/__tests__/adjustStateVersion.test.js
import stateSnapshot230 from '../stateSnapshots/2.3.0';

...

it(`downgrades state from ${toolVersion} to 2.3.0 reverting upgrade changes`, () => {
    getToolVersion.mockReturnValue('2.3.0');
    expect(adjustStateVersion(freshState)).toEqual(stateSnapshot230);
});
it(`upgrades state from 2.3.0 to ${toolVersion} with the new props`, () =>
    expect(adjustStateVersion(stateSnapshot230)).toEqual(freshState));

it(`downgrades state from 2.3.0 to 2.2.0 reverting upgrade changes`, () => {
    getToolVersion.mockReturnValue('2.2.0');
    expect(adjustStateVersion(stateSnapshot230)).toEqual(stateSnapshot220);
});
it(`upgrades state from 2.2.0 to 2.3.0 with the new props`, () => {
    getToolVersion.mockReturnValue('2.3.0');
    expect(adjustStateVersion(stateSnapshot220)).toEqual(stateSnapshot230);
});
```

### 4. Update [/src/adjustStateVersion/**tests**/handlers.test.js](../src/adjustStateVersion/__tests__/handlers.test.js):

##### Before

```js
// /src/adjustStateVersion/__tests__/handlers.test.js
describe(toolVersion, () => {
	const handler = handlers[toolVersion];

	it(`downgrades to 2.2.0`, () =>
		expect(handler.downgrade(freshState)).toEqual(stateSnapshot220));
});

describe('2.2.0', () => {
	const handler = handlers['2.2.0'];

	it(`upgrades to ${toolVersion}`, () =>
		expect(handler.upgrade(stateSnapshot220)).toEqual(freshState));

	it(`downgrades to 0.0.0`, () =>
		expect(handler.downgrade(stateSnapshot220)).toEqual({
			...stateSnapshot220,
			version: '0.0.0',
		}));
});
```

##### After

```js
// /src/adjustStateVersion/__tests__/handlers.test.js
import stateSnapshot230 from '../stateSnapshots/2.3.0';

...

describe(toolVersion, () => {
    const handler = handlers[toolVersion];

    it(`downgrades to 2.3.0`, () =>
        expect(handler.downgrade(freshState)).toEqual(stateSnapshot230));
});

describe('2.3.0', () => {
    const handler = handlers['2.3.0'];

    it(`upgrades to ${toolVersion}`, () =>
        expect(handler.upgrade(stateSnapshot230)).toEqual(freshState));

    it(`downgrades to 2.2.0`, () =>
        expect(handler.downgrade(stateSnapshot230)).toEqual(
            stateSnapshot220
        ));
});

describe('2.2.0', () => {
    const handler = handlers['2.2.0'];

    it(`upgrades to 2.3.0`, () =>
        expect(handler.upgrade(stateSnapshot220)).toEqual(
            stateSnapshot230
        ));

    it(`downgrades to 0.0.0`, () =>
        expect(handler.downgrade(stateSnapshot220)).toEqual({
            ...stateSnapshot220,
            version: '0.0.0',
        }));
});
```

## Release branches: hotfixes

A hotfix requires the same steps applied as above. This is to keep our state versioning clear and consistent. These changes should be made in the hotfix release branch with the updated version.

Example steps:

1. Hotfix branch created from version 2.5.0 of master - e.g. a branch named `hotfix-2.5.1`.
2. Required changes made, which affect the code.
3. The package version is incremented to that named in the branch.
4. State handling logic is now added, exactly the same as for a full release.
    - Note that this is likely to be simple state handling, where the state doesn't change.
    - state handlers need to be added.
    - a new snapshot state must be saved.
    - tests must also be updated.
5. A release can be made once the necessary changes to files have been done.
