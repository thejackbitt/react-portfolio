# react-portfolio

## Description
This is a **dynamic** React app that generates a portfolio website from simple JSON files.  

## Functionality
The Navigation component handles the bulk of page loading by fetching the index of pages from 'destinationDb' and then scanning the array within the file for JSON files.  The JSON files are then used to determine which page gets rendered via an object property labeled "pageType."  Once the determination is made, a component corresponding to the pageType will render.  For the sake of simplicity, I hard-coded the JSON files into the different component types.  However, I do have future plans for passing the JSON file paths in from the Navigation element.  

## Deployment
You can find the deployment of this app here:

[Netlify Deployment](https://main--keen-cocada-d4c873.netlify.app/)

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
