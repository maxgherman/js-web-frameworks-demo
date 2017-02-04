#!/bin/bash


if [ $1 = "dev-server" ]; then

    echo "Running development server..."

    cd web
    NODE_ENV=development node dev-server.js 

elif [ $1 = "build-web" ]; then

    echo "Building web..."

    cd web
    NODE_ENV=production node_modules/.bin/webpack --config webpack.production.config.js --display-modules --progress

else

    echo -e "Command not found.\nCommands : \n\tbuild-net, \n\tbuild-web, \n\tbuild-all, \n\trun-net, \n\tdev-server"

fi