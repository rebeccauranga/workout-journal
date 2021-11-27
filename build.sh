set -x

cd ./client 
npm run build

cd ../server
NODE_ENV=production npm run build