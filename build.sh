set -x

# build client
cd ./client && npm run build

cd ..

# build server
cd ./server && npm run build