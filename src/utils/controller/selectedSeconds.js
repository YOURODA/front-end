export const selectedSeconds = (redux) => {
  const {selectedSeconds,songCor,setSelectedSeconds,selectedSecond} = redux


  console.log("selectedSecond",selectedSecond)
    const valueIndex = selectedSeconds.indexOf(selectedSecond);
    const newSelectedSeconds = [...selectedSeconds];
    newSelectedSeconds.sort((a, b) => a - b);
    const firstSecond = newSelectedSeconds[0];
    const lastSecond = newSelectedSeconds[newSelectedSeconds.length - 1];

    if (
      newSelectedSeconds.length > 0 &&
      !(
        firstSecond - 1 === selectedSecond ||
        lastSecond + 1 === selectedSecond ||
        firstSecond === selectedSecond ||
        lastSecond === selectedSecond
      )
    ) {
      return ;
    }
    if (valueIndex < 0) {
      newSelectedSeconds.push(selectedSecond);
      setSelectedSeconds(newSelectedSeconds);
    } else {
      newSelectedSeconds.splice(valueIndex, 1);
      console.log("newSelectedSeconds",valueIndex,newSelectedSeconds)
      setSelectedSeconds(newSelectedSeconds);
    }

}