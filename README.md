
# YouTube to Spotify Saver Extension

This Chrome extension allows you to detect the currently playing YouTube song and add it to your Spotify **Liked Songs** with a single click.

## Features

- Detects song title from YouTube videos.
- Parses artist and track name.
- Shows a "➕ Add to Spotify" button on video pages.
- Adds the song to your Spotify Liked Songs when clicked.

## Setup Instructions

1. Clone or download this repository.
2. Go to `chrome://extensions` in your Chrome browser.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select the folder.
5. Click on the Spotify login button to authenticate.
6. Navigate to a YouTube music video. You will see the button next to the title.

## Requirements

- A Spotify account.
- Spotify Developer credentials (`Client ID` and `Redirect URI`) if modifying the extension.

## Note

This extension uses `manifest v3` and `OAuth2` with the Spotify API. It only works on YouTube video pages.

## Credits

Built with ❤️ to help music lovers connect YouTube and Spotify easily.

---

### License

MIT License.
