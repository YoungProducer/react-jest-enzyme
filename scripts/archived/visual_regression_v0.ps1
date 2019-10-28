# set environment variable to necessary value for test build
$env:REACT_APP_USE_TEST_STATE="true"

# build the website
npm run build

# start a process running the website on localhost
Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "run serve:build"

# run the necessary visual regression tests
npm run test:visual
