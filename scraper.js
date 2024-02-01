//Get user id to access playlists

//Get playlist id to access playlists

//Get tracks from the playlist 

//Api variables
require('dotenv').config();
const clientId = process.env.CLIENTID;
const clientSecret = process.env.CLIENTSECRET;

//Setup app
const express = require('express');
const app = express();
const request = require('request');
const querystring = require('querystring');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

