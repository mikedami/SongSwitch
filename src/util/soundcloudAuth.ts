import { generateCodeVerifierAndChallenge } from "./pkce";

const CLIENT_ID = import.meta.env.VITE_SOUNDCLOUD_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_SOUNDCLOUD_REDIRECT_URI || "http://localhost:5173/callback";

export const getSoundCloudAuthURL = async () =>{

     // Generate PKCE Code Verifier & Challenge
     const { codeVerifier, codeChallenge } = await generateCodeVerifierAndChallenge();
    
     // Store the code verifier for later use
     localStorage.setItem("soundcloud_code_verifier", codeVerifier);
 
     return `https://soundcloud.com/connect?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&code_challenge=${codeChallenge}&code_challenge_method=S256`;
 };