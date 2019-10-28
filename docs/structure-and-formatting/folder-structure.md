# Folder structure

```
<ROOT>/
    package.json
    node_modules/
    src/
        components/
        containers/
        routes/
        utils/
        store/
            actionCreators/
            actionTypes/
            selectors/
            middleware/
            reducers/
```

All custom code should be kept under `<ROOT>/src`. Anything importing outside will not import unless it is a dependency declared in the `package.json`.

## Naming

Files and folders should be in camelCase with the exception of ones that export a React component, which should be in PascalCase to differentiate. This is also because React makes the differentiation between DOM elements (eg: div, span) and React components via the casing of the first letter.

## Imports

All absolute imports will be resolved via the `src` root and `node_modules`.

eg:

```
import Component from "components/Component";
import library from "library";
```

This is to prevent difficult to follow relative imports like:

`import something from "../../../../folder/something";`

## React: Components, Containers, & Routes

May be further subdivided based on sensible groupings eg:

```
routes/
    home/
        SplashScreen/
        LoginScreen/
    about/
        Team/
```

Each should be a folder exporting an `index.js` with a `default export` allowing clean imports and an explicit entrypoint to the code and any supporting code.

Names & folders exporting should be in PascalCase - `ComponentName` not `componentName`, similarly `HomePage` not `homePage`, all non default exporting folders for purely strctural purposes should be in camelCase. eg:

```
src/routes/homeRoutes/HomePage.js
```

## Styling

Styling where needed and not provided by material-ui should be in the same folder named `ComponentName.module.css`, the `.module.css` suffix is important as it tells webpack which loader to use.

## Store

```
store/
    index.js
    actionCreators/
    actionTypes/
    selectors/
    middleware/
    reducers/
```

The store will export a single index.js containing all the code needed to bootstrap & configure the redux store.

The store instance should be exported as the default export of the store.

### Reducers

The reducers folder should export a default export of the combined store reducers via redux's combineReducers.

Each sub reducer aggregated via combineReducers should be placed into its own folder with a `index.js` exporting the reducer.

## Tests

As per the jest convention all tests should live in a subfolder called `__tests__`, the test names should be the name of the file under test suffixed with `.test.js` so that jest knows to run them. eg:

```
__tests__/file.test.js
file.js
```
