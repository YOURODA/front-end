export const decreaseSecond = (redux) => {
  const {selectedSecond,setSelectedSecond} = redux
  if (selectedSecond > 0) {
    setSelectedSecond(selectedSecond-1)
  }
}