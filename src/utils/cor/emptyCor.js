export const emptyCor = (second) => {
  let newArray = new Array(second).fill(0);
  return newArray.map((cor, index) => {
    return {
      startDate: index,
      robot: {
        LHor: 0,
        LVer: 0,
        LBrightness: 0,
        LBlinker: 0,
        LSlow: 0,
        RHor: 0,
        RVer: 0,
        RBrightness: 0,
        RBlinker: 0,
        RSlow: 0,

        colour: {
          lColor1: 0,
          lColor2: 0,
          lColor3: 0,
          rColor1: 0,
          rColor2: 0,
          rColor3: 0,
          Lhex: "#000000",
          Rhex: "#000000",
        },
      },
      smoke: false,
    };
  });
};
