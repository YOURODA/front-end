import { CONSOLE_PRESS } from "../../store/actions/actionTypes";

const setTakeTwoSeconds=(segments)=>{
  const newSegmets=[...segments]
  const newSecontList = {};
  for(let seconst=2 ; seconst>segments[-1].seconst; seconst+2 ){
    console.log("seconst",seconst)
    const lastIndex = newSegmets.findIndex(segment=> segment.seconst<seconst)
    const thisSeconts =  newSegmets.splice(0,lastIndex);
    newSecontList[seconst.toString()] = thisSeconts
  }

  return newSecontList

}


export  const guessingForCor =({segments})=>{
  console.log("segments",segments)
  // 2 şer saniyeye ayır
  const takeTwoSeconds= setTakeTwoSeconds(segments);


  console.log("2 saniyeye ayrılmış")
  console.log(takeTwoSeconds)
  return segments
}
