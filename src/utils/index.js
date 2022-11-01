export const milisToMinutesAndSeconds = (mil) => {
  let minutes = Math.floor(mil / 60000);
  let seconds = ((mil % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

// her ikiside olursa zaten blinker brightness'lı çalıştığı için sorun olmuyor
const regulatorRobotModel = (brightness, blinker) => {
  let result = 0;
  if (brightness > 1) {
    result = Math.floor((brightness * 134) / 255);
  }
  if (brightness > 1 && blinker > 1) {
    result += Math.floor((blinker * 106) / 255 - 1);
  }
  if (Math.floor((blinker * 106) / 255) > 238) {
    result = Math.floor((brightness * 134) / 255) + 28;
  }
  return result;
};
export const regulatorCorTry = ({ cor, smoke, robotModel }) => {
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
  let result = {};
  result.main = `${LHor ? LHor : "0"},0,${LVer ? LVer : "0"},0,${
    LSpeed ? LSpeed : "0"
  },${LBrightness ? LBrightness : "0"},${lColor1},${lColor2},${lColor3},0,${
    LBlinker ? LBlinker : "0"
  },0,0,${RHor ? RHor : "0"},0,${RVer ? RVer : "0"},0,${
    RSpeed ? RSpeed : "0"
  },${RBrightness ? RBrightness : "0"},${rColor1},${rColor2},${rColor3},0,${
    RBlinker ? RBlinker : "0"
  },0,0`;

  // if (true) {
  // if (robotModel === "14chw")
  // unutma
  // console.log("result: ", regulatorRobotModel(LBrightness, LBlinker));
  result.cue = `${LHor ? LHor : "0"},0,${LVer ? LVer : "0"},0,${
    LSpeed ? LSpeed : "0"
  },${
    regulatorRobotModel(LBrightness, LBlinker)
      ? regulatorRobotModel(LBrightness, LBlinker)
      : "0"
  },${lColor1},${lColor2},${lColor3},0,0,0,0,0,${RHor ? RHor : "0"},0,${
    RVer ? RVer : "0"
  },0,${RSpeed ? RSpeed : "0"},${
    regulatorRobotModel(RBrightness, RBlinker)
      ? regulatorRobotModel(RBrightness, RBlinker)
      : "0"
  },${rColor1},${rColor2},${rColor3},0,0,0`;
  // }

  return result;
};

export const tryRegulatorCorLoop = ({
  songCor,
  selectedSeconds,
  smoke,
  robotModel,
}) => {
  let socketCorLoop = [];
  if (Array.isArray(selectedSeconds) && selectedSeconds.length > 0) {
    selectedSeconds.map((second, index) => {
      console.log("songCor[second]", songCor[second]);
      socketCorLoop.push({
        startDate: index,
        robot: regulatorCorTry({
          cor: songCor[second],
          smoke: false,
          robotModel: robotModel,
        }),
        smoke, //L
      });
    });
  }
  console.log("socketCorLoop", socketCorLoop);
  return socketCorLoop;
};

export const regulatorCorLoop = ({ songCorLoop, smoke, robotModel }) => {
  let socketCorLoop = [];
  if (Array.isArray(songCorLoop) && songCorLoop.length > 0) {
    songCorLoop.map((secondCor, index) => {
      socketCorLoop.push({
        startDate: index,
        robot: regulatorCorTry({
          cor: secondCor,
          smoke: false,
          robotModel: robotModel,
        }),
        smoke, //L
      });
    });
  }
  return socketCorLoop;
};
