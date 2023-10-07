const qs = require('querystring');
const { streamers } = require('./data/streamers.json');

export default async function (req, res) {
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
  const url = `https://api.twitch.tv/helix/users?login=${streamerList.join('&login=')}`;

  const request = await fetch(url,
    {
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID,
        Authorization: `Bearer ${data.access_token}`,
      },
    }
  )

  const { data: users } = await request.json();

  res.status(200).json({ users });
}
