const qs = require('querystring');
const axios = require('axios');
const { streamers } = require('./data/streamers.json');

const { GAME_TITLE, STREAM_TITLE_FILTER} = process.env;

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
  const chunkSize = 100; // Twitch API only allows for 100 streams to be requested at once

  let urls = [];

  for (let i = 0; i < streamerList.length; i += chunkSize) {
    const chunk = streamerList.slice(i, i + chunkSize);
    urls.push(`https://api.twitch.tv/helix/streams?user_login=${chunk.join('&user_login=')}`);
  }

  const getStreams = () => Promise.all(urls.map((url) => axios.get(url, {
    headers: {
      'Client-ID': process.env.TWITCH_CLIENT_ID,
      Authorization: `Bearer ${data.access_token}`,
    }
  }))).then(responses => {
    let combinedData = [];

    const streamerFilter = (streamer) => {
      const hasGameTitleFilter = typeof GAME_TITLE === 'undefined' || GAME_TITLE === null;
      const hasStreamTitleFilter = typeof STREAM_TITLE_FILTER === 'undefined' || STREAM_TITLE_FILTER === null;

      let allowStreamer = true;

      if (hasGameTitleFilter) {
        allowStreamer = streamer.game_name === GAME_TITLE && allowStreamer;
      }
      if (hasStreamTitleFilter) {
        allowStreamer = streamer.title.toLowerCase().includes(STREAM_TITLE_FILTER.toLowerCase()) && allowStreamer;
      }
      return allowStreamer;
    }

    for (let i = 0; i < responses.length; i ++ ) {
      combinedData.push(responses[i].data.data);
    }

    const flattenedCombinedData = combinedData.flat(1);

    return flattenedCombinedData.filter(streamerFilter)
  }).catch(error => {
    console.log(error)
  });


  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ streams: await getStreams() }),
  })
}
