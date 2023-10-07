const qs = require('querystring');
const { streamers } = require('./data/streamers.json');
const { GAME_TITLE, STREAM_TITLE_FILTER } = process.env;

export default async function handler(req, res) {
  const opts = {
    client_id: process.env.TWITCH_CLIENT_ID,
    client_secret: process.env.TWITCH_CLIENT_SECRET,
    grant_type: 'client_credentials',
    scopes: '',
  }

  const streamerList = streamers.length ? streamers : process.env.STREAMERS.split(',');
  const params = qs.stringify(opts);
  const response = await fetch(`https://id.twitch.tv/oauth2/token?${params}`, { method: "POST" });
  const data = await response.json();
  const url = `https://api.twitch.tv/helix/streams?user_login=${streamerList.join('&user_login=')}`;

  const request = await fetch(url,
    {
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID,
        Authorization: `Bearer ${data.access_token}`,
      },
    }
  )
  const { data: streams } = await request.json();

  const streamerFilter = (streamer) => {
    let allowStreamer = true;
    if (GAME_TITLE) {
      allowStreamer = streamer.game_name === GAME_TITLE && allowStreamer;
    }
    if (STREAM_TITLE_FILTER) {
      allowStreamer = streamer.title.toLowerCase().includes(STREAM_TITLE_FILTER.toLowerCase()) && allowStreamer;
    }
    return allowStreamer;
  }

  const filteredStreams = streams.filter(streamerFilter);

  res.status(200).json({ streams: filteredStreams });
}
