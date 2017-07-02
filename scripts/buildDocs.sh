rm -rf ./docs
mkdir ./docs
npm run build
cp -R ./packages/react/dist/* ./docs
cp -R ./packages/react/test/examples/dark-side/* ./docs
