import { useState, useEffect } from "react";
import { fetchPlaylistTracks, fetchUserPlaylists, SpotifyPlaylist, SpotifyTrack } from "../util/spotifyAPI";
import { searchSoundCloudTrack, createSoundCloudPlaylist } from "../util/soundcloudAPI";
import { useNavigate } from "react-router-dom";

const Playlists = () =>{
    const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
    const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>([])
    const [conversionStatus, setConversionStatus] = useState<string | null>(null);
    const [successMessages, setSuccessMessages] = useState<string[]>([]);

    const navigate = useNavigate()

    useEffect(() =>{
        const loadPlaylists = async () =>{
            const data = await fetchUserPlaylists()
            setPlaylists(data)
        }
        loadPlaylists()
    }, []);

    const handleSelect = (playlistId: string) =>{
        setSelectedPlaylists((prev) =>
        prev.includes(playlistId)
        ? prev.filter((id) => id !== playlistId)
        : [...prev, playlistId]
        );
    };

    const convertPlaylists = async () => {
        setConversionStatus("Fetching Spotify playlists...");
        setSuccessMessages([]);

        for (const playlistId of selectedPlaylists) {
            const spotifyPlaylist = playlists.find(p => p.id === playlistId);
            if (!spotifyPlaylist) continue;

            setConversionStatus(`Fetching tracks for ${spotifyPlaylist.name}...`);
            const spotifyTracks = await fetchPlaylistTracks(playlistId);

            setConversionStatus(`Matching tracks from ${spotifyPlaylist.name} on SoundCloud...`);
            let matchedTrackIds: number[] = [];

            for (const track of spotifyTracks) {
                const query = `${track.name} ${track.artists.map((artist) => artist.name).join(", ")}`;
                const soundCloudTrack = await searchSoundCloudTrack(query);

                if (soundCloudTrack) {
                    matchedTrackIds.push(soundCloudTrack.id);
                }
            }

            if (matchedTrackIds.length === 0) {
                setConversionStatus(`No matches found for ${spotifyPlaylist.name}. Skipping...`);
                continue;
            }

            setConversionStatus(`Creating SoundCloud playlist for ${spotifyPlaylist.name}...`);
            const newPlaylist = await createSoundCloudPlaylist(spotifyPlaylist.name, matchedTrackIds);

            if (newPlaylist) {
                setSuccessMessages(prev => [...prev, `✅ Playlist "${spotifyPlaylist.name}" created on SoundCloud!`]);
                navigate("/success", {state: {playlist: newPlaylist}})
                return
            } else {
                setSuccessMessages(prev => [...prev, `❌ Failed to create SoundCloud playlist for "${spotifyPlaylist.name}".`]);
            }
        }

        setConversionStatus(null);
    };

    return (
        <div className="playlists-container">
            <h2>Select Playlists to Convert</h2>
            {playlists.length === 0 ?(
                <p>Loading Playlists...</p>
            ) : conversionStatus ? (
                <h3>{conversionStatus}</h3>
            ) : (
                <div className="playlist-grid">
                    {playlists.map((playlist) =>(
                        <div key={playlist.id} className="playlist-item">
                            <img 

                            src={playlist.images && playlist.images.length > 0 ? playlist.images[0].url : "https://via.placeholder.com/50"}
                            alt = {playlist.name}
                            className="playlist-image"
                            
                            ></img>
                            <span className="playlist-name">{playlist.name} ({playlist.tracks.total} songs)</span>
                            <input
                            type="checkbox"
                            checked={selectedPlaylists.includes(playlist.id)}
                            onChange={() => handleSelect(playlist.id)}
                            ></input>
                        </div>
                    ))}
                </div>
            )}
            {!conversionStatus && (
                <button className="convert-button" onClick={convertPlaylists}>Convert Selected Playlists</button>
            )}

            {successMessages.length > 0 && (
                <div className="success-messages">
                    {successMessages.map((msg, index) => (
                        <p key={index}>{msg}</p>
                    ))}
                </div>
            )}

        </div>
    )
}

export default Playlists