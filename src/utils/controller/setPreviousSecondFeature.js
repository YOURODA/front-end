export const setPreviousSecondFeature = (redux) => {
  const { selectedSecond, setSelectedSecond, songCor, setSongCor } = redux;
  const index = selectedSecond;
  if (index + 1 !== songCor.length) {
    const newRobot = JSON.parse(JSON.stringify(songCor));
    newRobot[index+1] = JSON.parse(JSON.stringify(newRobot[index ]));
    setSongCor(newRobot);
    setSelectedSecond(index + 1);
  }
};

export const setNextSecondFeature = (redux) => {
  const { selectedSecond, setSelectedSecond, songCor, setSongCor } = redux;
  const index = selectedSecond;
  if (index !== 0) {
    const newRobot = JSON.parse(JSON.stringify(songCor));
    newRobot[index-1] = JSON.parse(JSON.stringify(newRobot[index ]));
    setSongCor(newRobot);
    setSelectedSecond(index - 1);
  }
};
