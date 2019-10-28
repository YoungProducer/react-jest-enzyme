# set environment variable to necessary value for test build
$env:REACT_APP_USE_TEST_STATE="true"

docker build . --file Dockerfile --force-rm --tag test-vr --build-arg REACT_APP_USE_TEST_STATE=true

# Start-Process -NoNewWindow -FilePath "docker" -ArgumentList "run --rm --name test-vr -i -p 8080:80 test-vr"
docker run -d --rm --name test-vr -i -p 8080:80 test-vr

# wait 5 seconds to allow container to start up
Start-Sleep -Seconds 45

# run the necessary visual regression tests
npm run test:visual

docker stop test-vr
docker rmi test-vr
