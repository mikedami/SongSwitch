const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = "http://localhost:5173/spotifycallback";
const SCOPES = import.meta.env.VITE_SPOTIFY_SCOPES || "user-read-private user-read-email playlist-read-private";

export const getSpotifyAuthURL = () => {
  return `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=${SCOPES.split(" ").join("%20")}`;
};