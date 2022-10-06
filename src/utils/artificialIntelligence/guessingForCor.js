import{corFillColour} from './fillColor'
//import {emptyCor} from '../cor/emptyCor'
// istenilen saniyeler arasında segmentleri böl
const setTakeIntervalSeconds = (segments, interval) => {
  // segmentsleri belirtilen süreler içerisinde gruplar
  const newSegmets = [...segments];
  const newSecontList = [];
  const lastSecond = segments[segments.length - 1].start;

  for (
    let second = interval;
    second < lastSecond;
    second = second + interval
  ) {
    const lastIndeWx = newSegmets.findIndex(
      (segment) => segment.start >= second
    );
    const thisSeconts = newSegmets.splice(0, lastIndex);
    newSecontList.push(thisSeconts);
  }
  newSecontList.push(newSegmets)
  return newSecontList;
};

// ortalama noto ağırlıklarını bulma
const getAverage = (groupSeconts) => {
  return groupSeconts.map((group) => {
    const pitches = new Array(12).fill(0).map((pic, index) => {
      const sumPitches = group.reduce(
        (a, b) => a + b.pitches[index] * b.confidence,
        0
      );
      const sumConfidence = group.reduce((a, b) => a + b.confidence, 0);
      return sumPitches / sumConfidence || 0;
    });
    return { pitches, start: group[0].start };
  });

  // return {pitches:pitchesAverage, start: groupSeconts[0] }
};

const fillInTheCor = (average,songCor) =>{  
  const cloneSongCor= [...songCor]
  // const empty=emptyCor(average.length)
  // console.log("empty",empty)
  console.log("average",average)
  console.log("songCor",songCor)
  const fullcor= cloneSongCor.map((seconstCor,index)=>{
    let pitches= [...average[index].pitches]
    const cloneSecont={...seconstCor}
    const indexOfMaxPitches = pitches.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
    const maxPitche= pitches.splice(indexOfMaxPitches, 1, 0)[0]
    const indexOfMaxPitches2 = pitches.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
    const maxPitche2= pitches.splice(indexOfMaxPitches2, 1, 0)[0]

    cloneSecont.robot.colour={
      "lColor1": corFillColour[indexOfMaxPitches].R,
      "lColor2": corFillColour[indexOfMaxPitches].G,
      "lColor3": corFillColour[indexOfMaxPitches].B,
      "rColor1": corFillColour[indexOfMaxPitches2].R,
      "rColor2": corFillColour[indexOfMaxPitches2].G,
      "rColor3": corFillColour[indexOfMaxPitches2].B,
      "Lhex": corFillColour[indexOfMaxPitches].hex,
      "Rhex": corFillColour[indexOfMaxPitches2].hex
    }

    return cloneSecont

  })
  return fullcor
}

export const guessingForCor = ({ segments,songCor }) => {
  console.log("segments", segments);

  // belirli saniye aralarında grupla
  const takeTwoSeconds = setTakeIntervalSeconds(segments, 2);
  //console.log("2 saniyeye ayrılmış");
  //console.log(takeTwoSeconds);

  // grupların ortalamarını al confidence ile orantılı
  // confidence ne kadar doğru olduğunu gösterir
  const average = getAverage(takeTwoSeconds);
  //console.log("average", average);

  const fillCor = fillInTheCor(average,songCor)
  console.log("fillCor",fillCor)

  // empty Coru doldur



  return fillCor;
};
