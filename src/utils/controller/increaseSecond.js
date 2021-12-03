export const increaseSecond = (redux) => {
  const {selectedSecond,songCor,setSelectedSecond} = redux
  if (selectedSecond !== songCor) {
    setSelectedSecond(selectedSecond+1)
  }
}