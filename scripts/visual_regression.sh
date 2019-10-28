#!/bin/bash
# This script is used to run tests that the application is generating pages in line with expectations.

docker build . --file Dockerfile --force-rm --tag test-vr --build-arg REACT_APP_USE_TEST_STATE=true
docker run --rm --name test-vr -i -p 8080:80 test-vr &

## Serve build/ folder over http
sleep 45

# Run visual regression tests
npm run test:visual

# Store exit code of test command
EXIT_CODE=$?

## Cleanup
## Kill local server
#kill $BUILD_PID
docker stop test-vr
docker rmi test-vr
# Return exit code of test command for CI (nb: fail the build if test fails)
[ $EXIT_CODE -eq 0 ] || exit 1
