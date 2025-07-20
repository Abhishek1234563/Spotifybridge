console.log("YouTube to Spotify Script Loaded");

function getSongTitle() {
    const title = document.title.replace(" - YouTube", "").trim();
    console.log("🎥 YouTube Video Title:", title);
    return title;
}

function createSpotifyButton(songTitle) {
    const query = encodeURIComponent(songTitle);
    const spotifyURL = `https://open.spotify.com/search/${query}`;

    const btn = document.createElement("a");
    btn.textContent = "Listen on Spotify";
    btn.href = spotifyURL;
    btn.target = "_blank";
    btn.style.position = "fixed";
    btn.style.bottom = "20px";
    btn.style.right = "20px";
    btn.style.padding = "10px 20px";
    btn.style.backgroundColor = "#1DB954";
    btn.style.color = "white";
    btn.style.fontSize = "16px";
    btn.style.fontWeight = "bold";
    btn.style.borderRadius = "5px";
    btn.style.zIndex = "9999";
    btn.style.textDecoration = "none";
    btn.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";

    document.body.appendChild(btn);
}

setTimeout(() => {
    const title = getSongTitle();
    createSpotifyButton(title);
}, 5000);