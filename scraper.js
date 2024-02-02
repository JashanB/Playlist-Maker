
//Get playlist id to access playlists

//Get tracks from the playlist 

//Api variables
require('dotenv').config();
const clientId = process.env.CLIENTID;
const clientSecret = process.env.CLIENTSECRET;

//Setup app
const express = require('express');
const app = express();
const axios = require('axios');
const fetch = require('node-fetch');



app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//Get user id to access playlists
app.post('/spotify', async (req, res) => {
    const { username, password } = req.body;
    const token_url = 'https://accounts.spotify.com/api/token';
    const auth_token = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  
    try {
    //   const response = await axios.post(token_url, 'grant_type=client_credentials', {
    //     headers: {
    //       'Authorization': `Basic ${auth_token}`,
    //       'Content-Type': 'application/x-www-form-urlencoded'
    //     }
    //   });
      async function getSpotifyToken() {
        const url = 'https://accounts.spotify.com/api/token';
        response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64')),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials',
            json: true
        });
        if (response.ok) {
            const jsonResponse = await response.json();
           return jsonResponse.access_token;
        } else {
            console.log(response.statusText);
            throw new Error(`Request failed! Status code: ${response.status} ${response.statusText}`);
        }
    }
    
    // getSpotifyToken()
    //   const access_token = response.data.access_token;
      const access_token = getSpotifyToken()
      const user_url = 'https://api.spotify.com/v1/me';
      const user_response = await axios.get(user_url, {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      });
      console.log('******response', user_response)
      const user_id = user_response.data.id;
      console.log(`User ID: ${user_id}`);
      res.send(`User ID: ${user_id}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error');
    }
  });
  
  app.listen(8000, () => {
    console.log('Server started on port 8000');
  });