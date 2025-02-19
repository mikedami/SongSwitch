import { useLocation, useNavigate } from "react-router-dom";

const Success = () =>{
    const location = useLocation()
    const navigate = useNavigate()
    const {playlist} = location.state || {};

    return (
        <div className="success-container">
            <h1>🎉 Conversion Successful!</h1>
            {playlist ? (
                <div className="playlist-info">
                    <h2>✅ {playlist.title}</h2>
                    <p>Tracks: {playlist.tracks.length}</p>
                    <a href={playlist.permalink_url} target="_blank" rel="noopener noreferrer">
                        <button className="view-playlist-button">View on SoundCloud</button>
                    </a>
                </div>
            ) : (
                <p>Something went wrong. Please try again.</p>
            )}

            <button className="convert-more-button" onClick={() => navigate("/playlists")}>
                Convert More Playlists
            </button>
        </div>
    );
}

export default Success