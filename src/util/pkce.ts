function base64URLEncode(buffer: ArrayBuffer): string {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");
}

async function sha256(plain: string): Promise<ArrayBuffer> {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest("SHA-256", data);
}

export async function generateCodeVerifierAndChallenge() {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    const codeVerifier = base64URLEncode(array);

    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64URLEncode(hashed);

    return { codeVerifier, codeChallenge };
}
