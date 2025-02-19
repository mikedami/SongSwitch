# Welcome to SongSwitch!

This app is a basic framework for converting playlists from Spotify into SoundCloud.

### If you're a new DJ, switching platforms, or just want to convert music, this is for you!

SongSwitch is built with TypeScript under the VITE React framework. This app utilizes principles such as Oauth 2.0/1 to verify user accounts from both Spotify and SoundCloud.

## How to Get Started

1) Obtain [Spotify Developer credentials](https://developer.spotify.com/).
2) Obtain [SoundCloud Developer credentials](https://developers.soundcloud.com/).
3) Set Spotify Redirect URI to http://localhost:5173/spotifycallback
4) Set SoundCloud Redirect URI to http://localhost:5173/callback

Inside 
```
process.env
```
Include the following values:
```
VITE_SPOTIFY_CLIENT_ID=[YOUR SPOTIFY CLIENT ID]
VITE_SPOTIFY_REDIRECT_URI=http://localhost:5173/spotifycallback
VITE_SPOTIFY_CLIENT_SECRET=[YOUR SPOTIFY CLIENT SECRET]
VITE_SOUNDCLOUD_CLIENT_ID=[YOUR SOUNDCLOUD CLIENT ID]
VITE_SOUNDCLOUD_CLIENT_SECRET=[YOUR SOUNDCLOUD CLIENT SECRET]
VITE_SOUNDCLOUD_REDIRECT_URI=http://localhost:5173/callback
```

### To Run the App

Ensure you have the latest version of [npm](https://www.npmjs.com/) installed. Inside Root App Directory Run:
```
npm run dev
```
Click on the link in the terminal to open and run the app locally!
