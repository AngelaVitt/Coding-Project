

## Table of Contents
- [What is this?](#what-is-this)
- [Why](#why)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)
- [How To Use](#how-to-use)



## What is this?

This is a simple react javascipt web application that displays locations based of a feed of known, active and non-sinkholed C&C IP addresses, from Bambenek Consulting. It reterives this text file from http://osint.bambenekconsulting.com/feeds/c2-ipmasterlist.txt. The app then parses, converts, and send the data to a table and map to display. 
Features of this application include but are not limited to:
  Map if you are visualizing geo-location data that can zoom in/out
  Grid control (aka…a table of data) to present the data presented in the map
  Search of data to change the presentation in the map and grid.

## Why

This was my first independt react javascript project. I love learning and challenging myself to try things. 

## Getting Started

You should run npm install to update packages. I had to install this google chrome plugin 
https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi
This plugin removes error messages to APIs that require the header "allow-control-allow-origin". Without this plugin, I can not transform IP Address to Latatiude and Longitude. 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `npm test`

Launches the test runner in the interactive watch mode.<br>

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

## How To Use

You can move around the map by using your mouse to drag. You may have to do this to see all the markers on the page. You can zoom in and out of the map if you wish by using the plus/minus buttons. You can search IP Addresses by typing numbers into the search bar that is below the map. If the table is updated with new infomration, then the map will update as well.
