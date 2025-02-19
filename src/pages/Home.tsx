import { getSpotifyAuthURL } from "../util/spotifyAuth"
import { getSoundCloudAuthURL } from "../util/soundcloudAuth";
import { fetchUserProfile, SpotifyUserProfile } from "../util/spotifyAPI";
import { useState, useEffect, } from "react";
import { useNavigate } from "react-router-dom";

function Home(){

    const spotifyAuthURL = getSpotifyAuthURL();
    const soundcloudAuthURL = getSoundCloudAuthURL();
    const [spotifyUser, setSpotifyUser] = useState<SpotifyUserProfile | null>(null);
    const [soundcloudUser, setSoundcloudUser] = useState(false);
    const navigate = useNavigate();

    //Check if Spotify account is connected
    useEffect(() => {
        const loadSpotifyUser = async () =>{
            const profile = await fetchUserProfile();
            if(profile){
                setSpotifyUser(profile);
            }
        };
        loadSpotifyUser();
    }, []);

    //Check if Soundcloud account is connected
    useEffect(() =>{
        const soundcloudToken = localStorage.getItem("Soundcloud Access Token")
        if(soundcloudToken){
            setSoundcloudUser(true);
        }
    }, []);

    const handleSoundCloudLogin = async () => {
        const authURL = await getSoundCloudAuthURL();
        window.location.href = authURL;
    };

    return (
        <div>
            <h1>🎯Convert <span className="spotify">Spotify</span> playlists into <span className="soundcloud">Soundcloud🚀</span></h1>

            {spotifyUser && soundcloudUser ? (
                <div>
                    <h2 className="hello">Hello {spotifyUser.display_name}!</h2>
                    <button onClick={() => navigate("/playlists")}>Select Playlists</button>
                </div>
            ) : (
                <div className="login-options">
                    <div className="login-option">
                        <a href={spotifyAuthURL}>
                            <button className="spotify-button">
                                {spotifyUser ? "✅ Spotify Connected" : "Login with Spotify"}
                            </button>
                        </a>
                    </div>

                    <div className="login-option">
                            <button onClick={handleSoundCloudLogin} className="soundcloud-button">
                                {soundcloudUser ? "✅ SoundCloud Connected" : "Login with SoundCloud"}
                            </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home