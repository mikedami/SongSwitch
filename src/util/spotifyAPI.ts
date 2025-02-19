import axios, { all } from "axios";

const getAccessToken = () => localStorage.getItem("Spotify Access Token");

export interface SpotifyUserProfile {
    display_name: string;
    email: string;
}  

export interface SpotifyPlaylist {
    id: string;
    name: string;
    images: { url: string }[];
    tracks: { total: number };
}

export interface SpotifyTrack {
    id: string;
    name: string;
    artists: {name: string}[];
}

export const fetchUserProfile = async (): Promise<SpotifyUserProfile | null> => {
  try {
    const response = await axios.get<SpotifyUserProfile>("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
};

export const fetchUserPlaylists = async (): Promise<SpotifyPlaylist[]> => {
    try{
        const response = await axios.get<{ items: SpotifyPlaylist[] }>(
            "https://api.spotify.com/v1/me/playlists",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("Spotify Access Token")}`
                },
            }
        );
        return response.data.items;
    } catch(error) {
        console.error("Error fetching playlists:", error);
        return [];
    }
};

export const fetchPlaylistTracks = async (playlistId: string): Promise<SpotifyTrack[]> =>{

    let allTracks: SpotifyTrack[] = [];
    let nextUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=100`

    try {
        while (nextUrl) {
            const response = await axios.get(nextUrl, {
                headers: { Authorization: `Bearer ${localStorage.getItem("Spotify Access Token")}` },
            });

            if (response.data.items) {
                const tracks = response.data.items
                .filter((item: any) => item.track)
                .map((item: any) => ({
                    id: item.track.id,
                    name: item.track.name,
                    artists: item.track.artists.map((artist: any) => ({
                        name: artist.name,
                    })),
                }));

            allTracks = [...allTracks, ...tracks];
            }

            nextUrl = response.data.next;
        }
    } 
    catch(error) {
        console.log("Error fetching playlist tracks", error)
        return [];
    }

    return allTracks;
}

    /*
    try{
        const response = await axios.get<{ items: {track: SpotifyTrack }[] }>(
            `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("Spotify Access Token")}`
                },
            }
        );
        return response.data.items.map((item) => item.track)
    }
    */