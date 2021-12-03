const componentToHex = (c) => {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

const rgbToHex = (r, g, b) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};
export const setColour = (redux, { colorPress, robot }) => {
  const setColor = ({ before, action, colour }) => {
    if (robot === "L"){
      if (colorPress.find((button) => button.index === 0)) {
        colour.lColor2 = colour?.lColor2 === 0 ? 255 : 0;
      }
      if (colorPress.find((button) => button.index === 1)) {
        colour.lColor1 = colour?.lColor1 === 0 ? 255 : 0;
      }
      if (colorPress.find((button) => button.index === 2)) {
        colour.lColor3 = colour?.lColor3 === 0 ? 255 : 0;
      }
      colour[`${robot}hex`] = rgbToHex(
        colour.lColor1,
        colour.lColor2,
        colour.lColor3
      );
      return colour;
    }
    if (robot === "R"){
      if (colorPress.find((button) => button.index === 0)) {
        colour.rColor2 = colour?.rColor2 === 0 ? 255 : 0;
      }
      if (colorPress.find((button) => button.index === 1)) {
        colour.rColor1 = colour?.rColor1 === 0 ? 255 : 0;
      }
      if (colorPress.find((button) => button.index === 2)) {
        colour.rColor3 = colour?.rColor3 === 0 ? 255 : 0;
      }
      console.log("colour",colour)
      colour[`${robot}hex`] = rgbToHex(
        colour.rColor1,
        colour.rColor2,
        colour.rColor3
      );
      return colour;
    }
  };

  const { selectedSecond, songCor,setSongCor } = redux;
  const newRobotColour = [...songCor];
  const colour = newRobotColour[selectedSecond].robot.colour;
  newRobotColour[selectedSecond].robot.colour = setColor({colour});
   setSongCor(newRobotColour);
};
