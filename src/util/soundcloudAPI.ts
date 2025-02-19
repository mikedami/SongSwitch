import axios from "axios";

const getAccessToken = () => localStorage.getItem("Soundcloud Access Token")

export const searchSoundCloudTrack = async (query: string) => {

    const accessToken = getAccessToken()
    if(!accessToken){
        console.error("No Access Token Found")
        return null;
    }

    try {
        const response = await axios.get(
            `https://api.soundcloud.com/tracks`,
            {
                params: { q: query },
                headers: { Authorization: `OAuth ${accessToken}`},
            }
        );

        return response.data.length > 0 ? response.data[0] : null;
    } catch(error){
        console.error("Could not find Match:", error)
        return null;
    }
}

export const createSoundCloudPlaylist = async (title: string, trackIds: number[]) => {

    const accessToken = getAccessToken()
    if(!accessToken){
        console.error("No Access Token Found")
        return null;
    }

    let playlistId = null;
    //const maxTracksPerRequest = 99;
    //let existingTracks = [];

    try{
        const response = await axios.post(
            `https://api.soundcloud.com/playlists`,
            {
                playlist: {
                    title: title,
                    tracks: trackIds.map((id) => ({id})),
                    //tracks: trackIds.slice(0, maxTracksPerRequest).map((id) => ({ id })),
                },
            },
            {
                headers: {
                    Authorization: `OAuth ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        playlistId = response.data.id
        console.log("Created SoundCloud playlist:", response.data.permalink_url)

        /*
        existingTracks = response.data.tracks.map((track: any) => ({ id: track.id })); // Store existing tracks

        for (let i = maxTracksPerRequest; i < trackIds.length; i += maxTracksPerRequest) {
            const chunk = trackIds.slice(i, i + maxTracksPerRequest);

            // Fetch the updated playlist to get the latest track list
            const playlistResponse = await axios.get(`https://api.soundcloud.com/playlists/${playlistId}`, {
                headers: { Authorization: `OAuth ${accessToken}` },
            });

            existingTracks = playlistResponse.data.tracks.map((track: any) => ({ id: track.id })); // Update track list

            // Append the new tracks instead of replacing
            const updatedTracks = [...existingTracks, ...chunk.map((id) => ({ id }))];

            await axios.put(
                `https://api.soundcloud.com/playlists/${playlistId}`,
                {
                    playlist: { tracks: updatedTracks },
                },
                {
                    headers: {
                        Authorization: `OAuth ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log(`Added ${chunk.length} more tracks to playlist.`);
        }
        */

        return response.data;

    } catch(error){
        console.error("Could not create playlist:", error)
        return null;
    }
}