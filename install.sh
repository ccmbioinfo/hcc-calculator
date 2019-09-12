#!/bin/bash

# Install all packages required for the HCC Calculator App

packages=(webpack webpack-cli webpack-assets-manifest webpack-bundle-analyzer @babel/core @babel/plugin-proposal-class-properties @babel/preset-env @babel/preset-react babel-loader @material-ui/core @material-ui/icons jss prop-types react react-dom react-router-dom)

for pkg in ${packages[@]}
do
    printf "\nInstalling ${pkg}\n\n"
    printf "*******************************************************************************\n"
    npm install --save ${pkg}
    printf "\n\n${pkg} finished installing\n"
    printf "*******************************************************************************\n"
done
npm run build
