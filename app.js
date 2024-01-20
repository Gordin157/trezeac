const clientId = '1198273461605367868';
const redirectUri = 'https://gordin157.github.io/trezeac/discord-login'; // Replace with your redirect URI
const discordAuthorizeUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=identify`;

function loginWithDiscord() {
    window.location.href = discordAuthorizeUrl;
}

// This function should be called on your redirect URI (e.g., http://localhost:3000/callback)
function handleDiscordCallback() {
    const code = new URLSearchParams(window.location.search).get('code');

    if (code) {
        // Exchange the code for an access token
        exchangeCodeForToken(code);
    } else {
        console.error('Authorization code not found in the URL.');
    }
}

function exchangeCodeForToken(code) {
    const tokenEndpoint = 'https://discord.com/api/oauth2/token';
    const params = new URLSearchParams({
        client_id: clientId,
        client_secret: 'LJqPiDWSLU-WchpdcM7547FEUPuS3GYc',
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
        scope: 'identify'
    });

    axios.post(tokenEndpoint, params)
        .then(response => {
            const accessToken = response.data.access_token;
            
            // Use the access token to make requests to the Discord API
            getUserInfo(accessToken);
        })
        .catch(error => {
            console.error('Error exchanging code for token:', error);
        });
}

function getUserInfo(accessToken) {
    const userInfoEndpoint = 'https://discord.com/api/users/@me';

    axios.get(userInfoEndpoint, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    .then(response => {
        const username = response.data.username;
        alert(`Welcome, ${username}! You are now logged in.`);
    })
    .catch(error => {
        console.error('Error getting user info:', error);
    });
}

// Call this function on your redirect URI page
handleDiscordCallback();
