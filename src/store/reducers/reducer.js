import * as actionTypes from "../actions/actionTypes";

const initialState = {
  current_user: null,
  recently_played: null,
  play_now: {
    type: null,
    uri: null,
  },
  currently_playing: null,
  isPlaying: false,
  position_stamp: null,
  durationStamps: "00:00",
  csvData: [],
  corData: [],
  socket: null,
  onCloseCsvData: [],
  backgroundImage: "linear-gradient(rgb(58, 91, 95), rgb(6, 9, 10) 85%)",
  popUpAll: "",
  modalData: {},
  leftHorValue: 0,
  leftVerValue: 0,
  rightHorValue: 0,
  rightVerValue: 0,
  brightnessValue: {
    L: 0,
    R: 0,
  },
  blinkerValue: {
    L: 0,
    R: 0,
  },
  smokeTemperature: null,
  createUserPopup: false,
  currentTrackId: null,
  createCorPopup: false,
  userId: null,
  colourNumber: 0,
  isUserAvailable: true,
  colour: {
    lColor1: 0,
    lColor2: 0,
    lColor3: 0,
    rColor1: 0,
    rColor2: 0,
    rColor3: 0,
  },
  isReturnMusic: false,
  corLoop: [],
  selectedSeconds: [],
  selectedSecond: 0,
  songCor: [],
  isSmokeActive: false,
  isLiveTry: { status: false, localConnectStatus: false, localOdaIp: "", robotModel: "" },
  consolePress: [],
  goToSecond: { second: 0, isGo: false },
  corSaveInfo: { corID: "" },
  list: [],
  playChoreographyScreen: { isYourList: false, selected: "All" }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        isLoggedIn: true,
        current_user: action.user,
      };
    case actionTypes.SET_RECENTLY_PLAYED:
      return {
        ...state,
        recently_played: action.recently_played,
      };
    case actionTypes.SET_PLAY_NOW:
      return {
        ...state,
        play_now: {
          type: action.uri_type,
          uri: action.uri,
        },
      };
    case actionTypes.RESET_PLAY_NOW:
      return {
        ...state,
        play_now: {
          type: null,
          uri: null,
        },
      };
    case actionTypes.SET_CURRENTLY_PLAYING:
      return {
        ...state,
        currently_playing: action.song,
      };
    case actionTypes.SET_IS_PLAYING:
      return {
        ...state,
        isPlaying: action.isPlaying,
      };
    case actionTypes.SET_BACKGROUND_IMAGE:
      return {
        ...state,
        backgroundImage: action.backgroundImage,
      };
    case actionTypes.PLAY_SONG_START:
      return {
        ...state,
        play_now: null,
      };
    case actionTypes.NOW_POSITION_STAMP:
      return {
        ...state,
        position_stamp: action.position_stamp,
      };
    case actionTypes.DURATION_STAMP:
      return {
        ...state,
        durationStamps: action.durationStamps,
      };
    case actionTypes.CSV_DATA:
      return {
        ...state,
        csvData: action.csvData,
      };
    case actionTypes.COR_DATA:
      return {
        ...state,
        corData: action.corData,
      };
    case actionTypes.SOCKET:
      return {
        ...state,
        socket: action.socket,
      };
    case actionTypes.ON_CLOSE_CSV_DATA:
      return {
        ...state,
        csvData: action.onCloseCsvData,
      };
    case actionTypes.POPUP_ALL:
      return {
        ...state,
        popUpAll: action.popUpAll,
      };
    case actionTypes.LEFT_HOR_VALUE:
      return {
        ...state,
        leftHorValue: action.leftHorValue,
      };
    case actionTypes.LEFT_VER_VALUE:
      return {
        ...state,
        leftVerValue: action.leftVerValue,
      };
    case actionTypes.RIGHT_HOR_VALUE:
      return {
        ...state,
        rightHorValue: action.rightHorValue,
      };
    case actionTypes.RIGHT_VER_VALUE:
      return {
        ...state,
        rightVerValue: action.rightVerValue,
      };
    case actionTypes.BRIGHTNESS_VALUE:
      return {
        ...state,
        brightnessValue: {
          ...state.brightnessValue,
          ...action.brightnessValue,
        },
      };
    case actionTypes.BLINKER_VALUE:
      return {
        ...state,
        blinkerValue: {
          ...state.blinkerValue,
          ...action.blinkerValue,
        },
      };
    case actionTypes.SMOKE_TEMPERATURE:
      return {
        ...state,
        smokeTemperature: action.smokeTemperature,
      };
    case actionTypes.UPDATE_COLOUR:
      return {
        ...state,
        colour: {
          ...state.colour,
          ...action.colour,
        },
      };
    case actionTypes.UPDATE_COLOUR_NUMBER:
      return {
        ...state,
        colourNumber: action.colourNumber,
      };
    case actionTypes.CURRENT_TRACK_ID:
      return {
        ...state,
        currentTrackId: action.currentTrackId,
      };
    case actionTypes.CREATE_USER_POPUP:
      return {
        ...state,
        createUserPopup: action.createUserPopup,
      };
    case actionTypes.CREATE_COR_POPUP:
      return {
        ...state,
        createCorPopup: action.createCorPopup,
      };
    case actionTypes.USER_ID:
      return {
        ...state,
        userId: action.userId,
      };
    case actionTypes.IS_RETURN_MUSIC:
      return {
        ...state,
        isReturnMusic: action.isReturnMusic,
      };
    case actionTypes.IS_USER_AVALIABLE:
      return {
        ...state,
        isUserAvailable: action.isUserAvailable,
      };
    case actionTypes.COR_LOOP:
      return {
        ...state,
        corLoop: action.corLoop,
      };
    case actionTypes.COR_LOOP_ADD:
      const newCorLoop = [...state.corLoop];
      newCorLoop.push(action.miniCor);
      return {
        ...state,
        corLoop: newCorLoop,
      };
    case actionTypes.SELECTED_SECONDS:
      return {
        ...state,
        selectedSeconds: action.selectedSeconds,
      };
    case actionTypes.SELECTED_SECOND:
      return {
        ...state,
        selectedSecond: action.selectedSecond,
      };
    case actionTypes.SONG_COR:
      return {
        ...state,
        songCor: action.songCor,
      };
    case actionTypes.IS_SMOKE_ACTIVE:
      return {
        ...state,
        isSmokeActive: action.isSmokeActive
      }
    case actionTypes.CONSOLE_PRESS:
      return {
        ...state,
        consolePress: action.consolePress
      }
    case actionTypes.GO_TO_SECONDS:
      return {
        ...state,
        goToSecond: action.goToSecond
      }
    case actionTypes.IS_LIVE_TRY:
      return {
        ...state,
        isLiveTry: action.isLiveTry
      }
    case actionTypes.SET_COR_INFO:
      return {
        ...state,
        corSaveInfo: action.corSaveInfo
      }
    case actionTypes.SET_LIST:
      console.log("set cor info reducer çalıştı", action.list)
      return {
        ...state,
        list: action.list
      }
    case actionTypes.PLAY_CHOREOGRAPH_SCREEN:
      return {
        ...state,
        playChoreographyScreen: action.playChoreographyScreen
      }
    default:
      return state;
  }
};

export default reducer;
