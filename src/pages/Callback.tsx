import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SOUNDCLOUD_CLIENT_ID = import.meta.env.VITE_SOUNDCLOUD_CLIENT_ID;
const SOUNDCLOUD_REDIRECT_URI = import.meta.env.VITE_SOUNDCLOUD_REDIRECT_URI || "http://localhost:5173/callback";
const SOUNDCLOUD_CLIENT_SECRET = import.meta.env.VITE_SOUNDCLOUD_CLIENT_SECRET;

const SoundCloudCallback = () => {
    const [SearchParams] = useSearchParams();
    const navigate = useNavigate();

    const param = SearchParams.get("code");

    console.log(param)

    useEffect(() => {
        if (param) {
            getSoundCloudToken(param);
        }
    }, [param]);

    const getSoundCloudToken = async (param: string) => {

        const codeVerifier = localStorage.getItem("soundcloud_code_verifier");

        if(!codeVerifier){
            console.error("Code verifier not found")
            return;
        }

        try{
            const response = await axios.post(
                "https://secure.soundcloud.com/oauth/token",
                new URLSearchParams({
                    grant_type: "authorization_code",
                    code: param,
                    redirect_uri: SOUNDCLOUD_REDIRECT_URI,
                    client_id: SOUNDCLOUD_CLIENT_ID,
                    client_secret: SOUNDCLOUD_CLIENT_SECRET,
                    code_verifier: codeVerifier,
                }),
                {
                    headers: {
                        "Content-Type":"application/x-www-form-urlencoded"
                    }
                },
            )

            const { access_token } = response.data;
            localStorage.setItem("Soundcloud Access Token", access_token)

            console.log("SoundCloud Authentication Successful")

        } catch(error){
            console.log("Error:", error)
        } finally{
            navigate("/")
        }
    }

    return <h2>Logging in...</h2>
}

export default SoundCloudCallback