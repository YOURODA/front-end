export const milisToMinutesAndSeconds = (mil) => {
  let minutes = Math.floor(mil / 60000);
  let seconds = ((mil % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};
export const regulatorCorTry = ({ cor, smoke }) => {

  const {
    robot: {
      LHor,
      LVer,
      LBrightness,
      LBlinker,
      LSpeed,
      RHor,
      RVer,
      RBrightness,
      RBlinker,
      RSpeed,
      colour: { lColor1, lColor2, lColor3, rColor1, rColor2, rColor3 },
    },
  } = cor;
  return `${LHor ? LHor : "0"},0,${LVer ? LVer : "0"},0,${LSpeed ? LSpeed : "0"},${
    LBrightness ? LBrightness : "0"
  },${lColor1},${lColor2},${lColor3},0,${LBlinker ? LBlinker : "0"},0,0,${
    RHor ? RHor : "0"
  },0,${RVer ? RVer : "0"},0,${RSpeed ? RSpeed : "0"},${
    RBrightness ? RBrightness : "0"
  },${rColor1},${rColor2},${rColor3},0,${RBlinker ? RBlinker : "0"},0,0`;
};


export const tryRegulatorCorLoop = ({ songCor, selectedSeconds, smoke }) => {
  let socketCorLoop=[]
  if (Array.isArray(selectedSeconds) && selectedSeconds.length >0){
    selectedSeconds.map((second,index)=>{
  
        // const {
        //   robot: {
        //     LHor,
        //     LVer,
        //     LBrightness,
        //     LBlinker,
        //     RHor,
        //     RVer,
        //     RBrightness,
        //     RBlinker,
        //     colour: { lColor1, lColor2, lColor3, rColor1, rColor2, rColor3 },
        //   },
        // } = songCor[second];
        console.log("songCor[second]",songCor[second])
      socketCorLoop.push({
        startDate: index,
        robot: regulatorCorTry({cor:songCor[second] ,smoke: false}),
        smoke, //L
      })
    })
  }
  console.log("socketCorLoop",socketCorLoop)
  return socketCorLoop;
};


export const regulatorCorLoop = ({ songCorLoop, smoke }) => {
  let socketCorLoop=[]
  if (Array.isArray(songCorLoop) && songCorLoop.length >0){
    songCorLoop.map((secondCor,index)=>{
      // const {
      //   robot: {
      //     LHor,
      //     LVer,
      //     LBrightness,
      //     LBlinker,
      //     RHor,
      //     RVer,
      //     RBrightness,
      //     RBlinker,
      //     colour: { lColor1, lColor2, lColor3, rColor1, rColor2, rColor3 },
      //   },
      // } = secondCor;
      socketCorLoop.push({
        startDate: index,
        robot: regulatorCorTry({cor:secondCor,smoke:false}),
        smoke, //L
      })
      // socketCorLoop.push(regulatorCorTry(secondCor,false))
    })
  }
  return socketCorLoop;
};