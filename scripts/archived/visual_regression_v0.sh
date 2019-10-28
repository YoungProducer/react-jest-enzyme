#!/bin/bash
# This script is used to run tests that the application is generating pages in line with expectations.

# Run build
REACT_APP_USE_TEST_STATE=true npm run build

# Serve build/ folder over http
npm run serve:build &
# Store server pid for later teardown
BUILD_PID=$!

# Run visual regression tests
npm run test:visual

# Store exit code of test command
EXIT_CODE=$?

# Cleanup
# Kill local server
kill $BUILD_PID

# Return exit code of test command for CI (nb: fail the build if test fails)
[ $EXIT_CODE -eq 0 ] || exit 1
