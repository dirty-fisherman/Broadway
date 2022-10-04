# Broadway

[![Netlify Status](https://api.netlify.com/api/v1/badges/5b572a21-28e3-48ff-820a-8b95aafc2ba8/deploy-status)](https://app.netlify.com/sites/enchanting-blancmange-3bcee2/deploys)

![image](https://user-images.githubusercontent.com/88380778/193450723-968ea1f6-71bc-4abd-9883-be58cadba45b.png)

Based on the Next + Netlify Starter and inspired by https://www.neutralcafe.tv/, this is an open-source project for online communities to launch their own websites to showcase any specified streamers who are currently live on Twitch.

- [Quick(ish) Start Guide](#quick-ish--start-guide)
- [Development](#development)
  * [Running Locally](#running-locally)
  * [Editing the streamer list](#editing-the-streamer-list)
  * [Deployment](#deployment)
  * [Streamer List](#streamer-list)
- [Contributions](#contributions)

## Quick(ish) Start Guide

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/dirty-fisherman/Broadway#NEXT_PUBLIC_LOGO_URL=https://i.imgur.com/Kd6rnLN.png&NEXT_PUBLIC_BACKGROUND=2e2b38&NEXT_PUBLIC_NAME=Broadway)

Click this button to automatically set up a website on Netlify. You'll be guided through the steps to create a GitHub account (if you don't have one), a Netlify account, and all the information needed to make your website yours!

You will need the following things:

- An Twitch developer account (sign up here https://dev.twitch.tv/)
- An app registered on Twitch (https://dev.twitch.tv/console/apps)
- Your Twitch app credentials

Here's a screenshot of what config options Netlify will ask you...

![image](https://user-images.githubusercontent.com/88380778/193448761-3167806d-6e58-4cb9-a49a-df0d04836350.png)

... and what these things mean:

**Repository Name**

Netlify will create a place for editing the code in your GitHub account, this will be the name for it, change this to whatever you want

**Twitch client ID & Twitch Client Secret**

These are what you'll find once you've created your app on Twitch, try not to leak any of this information!

**List of streamers**

This is the list of the streamers you want to display on your website, this should be one long string of usernames separated by commas like `streamer1,streamer2,streamer3`

**Discord URL**

This is used to add a button in the header to your Discord, make sure you use a link that won't expire for this otherwise you'll have to update it later

**Logo URL**

This is a URL to a logo that'll be used for the logo in the header. Recommend using a small image for this. Imgur or Discord image links should work fine

**Background colour hex**

This is the 6-character long HTML colour code for what you want the background of your site to be. Recommend using darker shades for this. Make sure you do **not** include the `#` symbol in this. https://htmlcolorcodes.com/color-picker/ is a good resource for choosing a colour.

**Name for your website**

This will be used in the browser tab title and as alt text for your logo, spaces in here work fine.

## Development

This guide assumes that you have some knowledge of web development, working with APIs, and Netlify's platform.

Broadway relies on Netlify Functions to make calls to Twitch's APIs as they currently require authentication to fetch public streamer data.

You will need to add the following locally to a `.env` file in the root directory of the project (and to add these environment variables to your Netilify account). If you pressed the quick start button above, you've already done this.

```env
TWITCH_CLIENT_ID=your-twitch-client-id
TWITCH_CLIENT_SECRET=your-twitch-client-secret
```

If you have a Twitch developer account you can get these credentials over at https://dev.twitch.tv/console/apps by registering an application.

### Running Locally

- Clone this repo
- Install Netlify CLI `npm install netlify-cli -g`
- Install dependencies with `npm install`
- Start the dev server with `netlify dev`

### Setting up environment variables

The project is customised via environment variables, an example has been provided in the project, however you will need to copy all of these into your own `.env` file in the root directory of the project to run the project locally.

**.env.example**
```
TWITCH_CLIENT_ID=YOUR TWITCH CLIENT ID GOES HERE
TWITCH_CLIENT_SECRET=YOUR TWITCH SECRET GOES HERE
STREAMERS=streamer1,streamer2,streamer3
NEXT_PUBLIC_DISCORD_URL=https://discord.com/
NEXT_PUBLIC_LOGO_URL=https://i.imgur.com/Kd6rnLN.png
NEXT_PUBLIC_BACKGROUND=2e2b38
NEXT_PUBLIC_NAME=Broadway Demo Site
GAME_TITLE=Grand Theft Auto V
STREAM_TITLE_FILTER=WildRP
```

### Streamer list

By default the list of streamers comes from the `STREAMERS` environment variable, however it's possible to override this with a JSON file located at `functions/data/streamers.json`.

Here is an example of a populated streamers.json file:

```json
{
	"streamers": ["streamer1", "streamer2", "streamer3"]
}
```

### Deployment

Deployment is all handled by Netlify once you've got your account all set up - you just push your changes via GitHub and BOOM the site is updated. That's right, BOOM.

## Contributions

Contributions are welcome! Open up a PR if you want to add tests, if you want to fix things, if you want to make this any easier for people to deploy. I'll do my best to review when I have the time and/or the energy.

My dream for this project was to create something as simple as possible for community owners to set up, sadly it's a bit more involved than I had initially thought, but hopefully this will give you a good starting point!
