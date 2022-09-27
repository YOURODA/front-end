import React, {useEffect, useState} from "react"
import * as actionTypes from "../../store/actions/actionTypes";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import SpotifyAPIServices from "../Services/SpotifyAPIServices";
import Chart from "../Chart/Chart";
import {Button} from "@mui/material";
import {guessingForCor} from "../../utils/artificialIntelligence/guessingForCor";

const useStyles = (theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.4em",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "#DE675F",
      // outline: '1px solid slategrey'
    },
  },
  button: {
    backgroundColor: "#66B2FF",
    "&$selected": {
      backgroundColor: "#4994DE",
    },
    "&:hover": {
      backgroundColor: "#4994DE",
    },
    "&$selected:hover": {
      backgroundColor: "#4994DE",
    },
  },
});

function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}

const pitches = {
  'C': true,
  'C#': true,
  'D': true,
  'D#': true,
  'E': true,
  'F': true,
  'F#': true,
  'G': true,
  'G#': true,
  'A': true,
  'A#': true,
  'B': true
}
const AnalysisOfTrack = ({
                           setAudioAnalysisOfTrack,
                           audioAnalysisOfTrack,
                           currentUser,
                           currentTrackId,
                         }) => {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  const spotifyAPIServices = new SpotifyAPIServices();


  const width = window.innerWidth;
  useEffect(() => {
    if (currentUser && currentUser.email && currentTrackId && audioAnalysisOfTrack) {
      spotifyAPIServices.getTracksAudioAnalysis(currentUser.access_token, currentTrackId).then((response) => {
        setAudioAnalysisOfTrack(response.data);
      });
    }
  }, [currentUser,currentUser.email,currentTrackId])

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);


  console.log("audioAnalysisOfTrack",audioAnalysisOfTrack)
console.log("width",windowSize.innerWidth)
  return (
    <div  style={{height:'100%', width:"100%", backgroundColor:"blue",marginBottom:"10%"}} >
      <Button onClick={ ()=>{
        guessingForCor({segments:audioAnalysisOfTrack.segments})
      }} >
        Try
      </Button>
      <Chart
        segments={audioAnalysisOfTrack.segments}
        width={windowSize.innerWidth-10}
        height={250}
        pitches={pitches}
      />
    </div>
  )
}


const mapStateToProps = (state) => ({
  durationStamps: state.durationStamps,
  selectedSeconds: state.selectedSeconds,
  selectedSecond: state.selectedSecond,
  songCor: state.songCor,
  socket: state.socket,
  isLiveTry: state.isLiveTry,
  settings: state.settings,
  currentUser: state.current_user,
  currentTrackId: state.currentTrackId,
  currently_playing: state.currently_playing,
  audioAnalysisOfTrack: state.audioAnalysisOfTrack
});

const mapDispatchToProps = (dispatch) => ({
  setAddSongCor: (miniCor) =>
    dispatch({type: actionTypes.COR_LOOP_ADD, miniCor}),
  setSongCor: (songCor) => dispatch({type: actionTypes.SONG_COR, songCor}),
  setAudioAnalysisOfTrack: (audioAnalysisOfTrack) => dispatch({
    type: actionTypes.AUDIO_ANALYSIS_OF_TRACK,
    audioAnalysisOfTrack
  })

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(AnalysisOfTrack));