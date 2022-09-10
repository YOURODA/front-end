import axios from 'axios';

// const userApiService = Prod_API
const spotifyApiUrl = "https://api.spotify.com"

class SpotifyAPI {
  async getDeviceList(access_token) {
    const serviceData = {
      method: 'GET',
      url: spotifyApiUrl + '/v1/me/player/devices',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
    return await axios(serviceData);
  }
  async getTracksAudioAnalysis(access_token, id) {
    const serviceData = {
      method: 'GET',
      url: spotifyApiUrl + '/v1/audio-analysis/' + id,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
    return await axios(serviceData);
  }
}

export default SpotifyAPI;
