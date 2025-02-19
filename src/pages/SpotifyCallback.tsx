import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const SPOTIFY_REDIRECT_URI = "http://localhost:5173/spotifycallback";
const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

const SpotifyCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const code = searchParams.get("code");

    useEffect(() => {
        if (code) {
            getSpotifyToken(code);
        }
    }, [code]);

    const getSpotifyToken = async (authCode: string) => {
        try {
            const response = await axios.post(
                "https://accounts.spotify.com/api/token",
                new URLSearchParams({
                    grant_type: "authorization_code",
                    code: authCode,
                    redirect_uri: SPOTIFY_REDIRECT_URI,
                    client_id: SPOTIFY_CLIENT_ID,
                    client_secret: SPOTIFY_CLIENT_SECRET,
                }),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            const { access_token, refresh_token } = response.data;
            localStorage.setItem("Spotify Access Token", access_token);
            localStorage.setItem("Spotify Refresh Token", refresh_token);

            console.log("Spotify Authentication Successful");
        } catch (error) {
            console.error("Error getting Spotify token:", error);
        } finally {
            navigate("/");
        }
    };

    return <h2>Logging in with Spotify...</h2>;
};

export default SpotifyCallback;