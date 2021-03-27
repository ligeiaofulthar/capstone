# Capstone – Travel App
travel app for udacity

## Table of Contents

* [Instructions](#instructions)
* [Api Keys](#keys)
* [Project Description](#description)
* [Extend Project](#project)
* [Technologies](#technologies)
* [Credits](#credits)

## Instructions

To look at my project, run the following command in the root of the project folder in the terminal
`npm run start` and in a second terminal `npm run prod` then `npm run dev`

Then go to http://localhost:5000 for production code and http://localhost:8080 for dev

## Api Keys
The api keys are hidden in an .env, you can see in the dotenv.example what their names are and insert your own.

## Project Description

This travel app takes the user input of city and country and inserts it into the geonames api. This api returns longitude and latitude, which are then passed to the next api called weatherbit api. The weather api returns temperature, an icon code, and a description. The pixabay api returns an image of the location.

## Extend Project

* Incorporated icons into forecast

## Technologies

* HTML5
* CSS3
* Javascript ES6
* server
    * node.js
    * express
    * node-fetch
    * cors
    * bodyparser
    * weatherbit api
    * geonames api
    * pixabay api
* webpack
    * babel
    * clean-webpack
    * copy-webpack
    * file loader
    * css-loader
    * html-webpack
    * mini-css-extract
    * sass-loader
    * style-loader
    * optimize-css-assets-webpack
    * terser-webpack-plugin
* unit-testing
    * jest
    * supertest

## Credits
made by Yulia, project by udacity

If you find bugs, write me an email to office@yulia.graphics
