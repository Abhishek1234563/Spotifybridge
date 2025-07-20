const CLIENT_ID = 'da953271d0d7401a957bb22c12c23b14'; 
const REDIRECT_URI = `https://${chrome.runtime.id}.chromiumapp.org/`;
const SCOPES = 'user-library-modify';
let accessToken = null;
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'ADD_SONG') {
    if (!accessToken) {
      authenticateSpotify().then(() => {
        searchAndAddTrack(request.payload.artist, request.payload.track);
      });
    } else {
      searchAndAddTrack(request.payload.artist, request.payload.track);
    }
  }
});
function authenticateSpotify() {
  return new Promise((resolve, reject) => {
    const authURL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`;
    chrome.identity.launchWebAuthFlow({ url: authURL, interactive: true }, (redirectUrl) => {
      if (chrome.runtime.lastError || !redirectUrl) {
        reject(chrome.runtime.lastError);
        return;
      }
      const params = new URLSearchParams(redirectUrl.split('#')[1]);
      accessToken = params.get('access_token');
      resolve();
    });
  });
}
function searchAndAddTrack(artist, track) {
  const query = encodeURIComponent(`${track} ${artist}`);
  fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
    .then(res => res.json())
    .then(data => {
      if (data.tracks.items.length > 0) {
        const songId = data.tracks.items[0].id;
        return fetch(`https://api.spotify.com/v1/me/tracks`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify([songId])
        });
      } else {
        console.log('No matching track found.');
      }
    })
    .then(() => console.log('Song added to Liked Songs'))
    .catch(err => console.error(err));
}
