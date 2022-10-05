const qs = require('querystring');
const axios = require('axios');

const { streamers } = require('./data/streamers.json');

exports.handler = async (event, context, callback) => {
  const opts = {
    client_id: process.env.TWITCH_CLIENT_ID,
    client_secret: process.env.TWITCH_CLIENT_SECRET,
    grant_type: 'client_credentials',
    scopes: '',
  }

  const streamerList = streamers.length ? streamers : process.env.STREAMERS.split(',');
  const params = qs.stringify(opts);
  const { data } = await axios.post(`https://id.twitch.tv/oauth2/token?${params}`);
  const chunkSize = 100; // Twitch API only allows for 100 users to be requested at once

  let urls = [];

  for (let i = 0; i < streamerList.length; i += chunkSize) {
    const chunk = streamerList.slice(i, i + chunkSize);
    urls.push(`https://api.twitch.tv/helix/users?login=${chunk.join('&login=')}`);
  }

  const getUsers = () => Promise.all(urls.map((url) => axios.get(url, {
    headers: {
      'Client-ID': process.env.TWITCH_CLIENT_ID,
      Authorization: `Bearer ${data.access_token}`,
    }
  }))).then(responses => {    
    let combinedData = [];

    for (let i = 0; i < responses.length; i ++ ) {
      combinedData.push(responses[i].data.data);
    }

    return combinedData.flat(1)
  });

  
  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ users: await getUsers() }),
  });
}
