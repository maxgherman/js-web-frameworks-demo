#!/bin/bash


echo "Building assets..."

cd web
pwd
npm run build

echo "Copying assets..."

cd ..
pwd
rm -rf docs
mkdir docs
cp -r web/www/* docs