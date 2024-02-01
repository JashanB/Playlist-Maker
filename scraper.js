
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


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//Get user id to access playlists
app.post('/spotify', async (req, res) => {
    const { username, password } = req.body;
    console.log({username, password})
    const token_url = 'https://accounts.spotify.com/api/token';
    const auth_token = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    console.log('autho', auth_token)
    try {
      const response = await axios.post(token_url, 'grant_type=client_credentials', {
        headers: {
          'Authorization': `Basic ${auth_token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
  
      const access_token = response.data.access_token;
      const user_url = 'https://api.spotify.com/v1/me';
      const user_response = await axios.get(user_url, {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      });
  
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