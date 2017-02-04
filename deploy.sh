#!/bin/bash


echo "Building assets..."

cd web
pwd
npm run build-docs

echo "Copying assets..."

cd ..
pwd
rm -rf docs
mkdir docs
cp -r web/www/* docs