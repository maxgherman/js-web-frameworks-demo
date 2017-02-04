#!/bin/bash

echo "Building assets..."

cd web
pwd
npm run build


echo "Copying assets..."
cd ..
pwd
rm -rf build
mkdir build
cp -r web/www/* build