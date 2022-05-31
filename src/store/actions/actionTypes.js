import axios from "axios";

export const SET_USER = "SET_USER";
export const SET_ODAUSER = "SET_ODAUSER";
export const GET_RECENTLY_PLAYED = "GET_RECENTLY_PLAYED";
export const SET_RECENTLY_PLAYED = "SET_RECENTLY_PLAYED";
export const SET_PLAY_NOW = "SET_PLAY_NOW";
export const RESET_PLAY_NOW = "RESET_PLAY_NOW";
export const SET_CURRENTLY_PLAYING = "SET_CURRENTLY_PLAYING";
export const SET_IS_PLAYING = "SET_IS_PLAYING";
export const SET_BACKGROUND_IMAGE = "SET_BACKGROUND_IMAGE";
export const PLAY_SONG_START = "PLAY_SONG_START";
export const PLAYER_INFORMATION = "PLAYER_INFORMATION";
export const PLAYER_INFORMATION_SUCCESS = "PLAYER_INFORMATION_SUCCESS";
export const PLAYER_INFORMATION_FAIL = "PLAYER_INFORMATION_FAIL";
export const PLAY_SONG_SUCCESS = "PLAY_SONG_SUCCESS";
export const PLAY_SONG_FAIL = "PLAY_SONG_FAIL";
export const NOW_POSITION_STAMP = "NOW_POSITION_STAMP";
export const DURATION_STAMP = "DURATION_STAMP";
export const CSV_DATA = "CSV_DATA";
export const COR_DATA = "COR_DATA";
export const ON_CLOSE_CSV_DATA = "ON_CLOSE_CSV_DATA";
export const SOCKET = "SOCKET";
export const POPUP_ALL = "POPUP_ALL";
export const MODAL_DATA = "MODAL_DATA";
export const LEFT_HOR_VALUE = "LEFT_HOR_VALUE";
export const LEFT_VER_VALUE = "LEFT_VER_VALUE";
export const RIGHT_HOR_VALUE = "RIGHT_HOR_VALUE";
export const RIGHT_VER_VALUE = "RIGHT_VER_VALUE";
export const BRIGHTNESS_VALUE = "BRIGHTNESS_VALUE";
export const BLINKER_VALUE = "BLINKER_VALUE";
export const SMOKE_TEMPERATURE = "SMOKE_TEMPERATURE";
export const CREATE_USER_POPUP = "CREATE_USER_POPUP";
export const CURRENT_TRACK_ID = "CURRENT_TRACK_ID";
export const CREATE_COR_POPUP = "CREATE_COR_POPUP";
export const USER_ID = "USER_ID";
export const UPDATE_COLOUR = "UPDATE_COLOUR";
export const UPDATE_COLOUR_NUMBER = "UPDATE_COLOUR_NUMBER";
export const IS_RETURN_MUSIC = "IS_RETURN_MUSIC";
export const IS_USER_AVALIABLE = "IS_USER_AVALIABLE";
export const COR_LOOP = "COR_LOOP";
export const COR_LOOP_ADD = "COR_LOOP_ADD";
export const SELECTED_SECONDS = "SELECTED_SECONDS";
export const SELECTED_SECOND = "SELECTED_SECOND";
export const SONG_COR = "SONG_COR";
export const IS_SMOKE_ACTIVE = "IS_SMOKE_ACTIVE";
export const IS_LIVE_TRY = "IS_LIVE_TRY";
export const CONSOLE_PRESS = "CONSOLE_PRESS";
export const GO_TO_SECONDS = "GO_TO_SECONDS";
export const SET_COR_INFO = "SET_COR_INFO";
export const SET_LIST = "SET_LIST";
export const PLAY_CHOREOGRAPH_SCREEN = "PLAY_CHOREOGRAPH_SCREEN";



export const playSong = (uris, deviceId) => {
  return (dispatch, getState) => {
    if (getState().current_user) {
      dispatch(playSongStart());
      axios({
        url: `https://api.spotify.com/v1/me/player/play`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getState().current_user.access_token}`,
        },
        data: uris,
      })
        .then(() => {
          dispatch(playSongSuccess());
        })
        .catch(() => {
          dispatch(playSongFail());
        });
    }
  };
};
export const playerInf = (uris, deviceId) => {
  return (dispatch, getState) => {
    if (getState().current_user) {
      dispatch(playerInformation());
      axios({
        url: `https://api.spotify.com/v1/me/player`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getState().current_user.access_token}`,
        },
        data: uris,
      })
        .then(() => {
          dispatch(playerInformationSuccess());
        })
        .catch(() => {
          dispatch(playerInformationFail());
        });
    }
  };
};

const playSongStart = () => {
  return {
    type: PLAY_SONG_START,
  };
};
const playerInformation = () => {
  return {
    type: PLAYER_INFORMATION,
  };
};

const playSongSuccess = () => {
  return {
    type: PLAY_SONG_SUCCESS,
  };
};
const playerInformationSuccess = () => {
  return {
    type: PLAYER_INFORMATION_SUCCESS,
  };
};
const playerInformationFail = () => {
  return {
    type: PLAYER_INFORMATION_FAIL,
  };
};

const playSongFail = () => {
  return {
    type: PLAY_SONG_FAIL,
  };
};

export const pauseSong = () => {
  return (dispatch, getState) => {
    if (!getState().isPlaying) {
      axios({
        url: "https://api.spotify.com/v1/me/player/pause",
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getState().current_user.access_token}`,
        },
      })
        .then((res) => {
          dispatch(setPauseSong());
        })
        .catch((err) => {
          console.error(
            "Playback cannot be paused, Your playback is probably already paused"
          );
        });
    } else {
      console.error(
        "Playback cannot be paused, Your playback is probably already paused"
      );
    }
  };
};

const setPauseSong = () => {
  return {
    type: SET_IS_PLAYING,
  };
};

export const fetchRecentlyPlayed = (options) => {
  return (dispatch, getState) => {
    if (getState().current_user) {
      dispatch(getRecentlyPlayed());
      axios({
        url: "https://api.spotify.com/v1/me/player/recently-played",
        method: "GET",
        headers: {
          Authorization: `Bearer ${getState().current_user.access_token}`,
        },
        params: {
          ...options,
        },
      })
        .then((res) => {
          dispatch(setRecentlyPlayed(res.data.items));
        })
        .catch((err) => {
          console.error("There was an error getting recently played tracks");
        });
    }
  };
};

const getRecentlyPlayed = () => {
  return {
    type: GET_RECENTLY_PLAYED,
  };
};

const setRecentlyPlayed = (data) => {
  return {
    type: SET_RECENTLY_PLAYED,
    recently_played: data,
  };
};
