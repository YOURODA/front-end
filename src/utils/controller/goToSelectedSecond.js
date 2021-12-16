export const goToSelectedSecond = (redux) => {
  const {selectedSecond,setGoToSecond} = redux
  const second = selectedSecond * 1000*2
  setGoToSecond({second,isGo:true})
 
}