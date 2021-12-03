import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions/actionTypes";
import useInterval from "../../../hooks/useInterval";
import PressActions from "./PressActions";
import AxesActions from "./AxesActions";

let gamepadOld = new Array(17).fill({
  pressed: false,
  touched: false,
  value: 0,
});

let oldAxes = [];

const gamepadIsActivity = (gamepad) => {
  const isSame = JSON.stringify(gamepad) === JSON.stringify(gamepadOld);
  if (isSame) {
    return false;
  } else {
    gamepadOld = gamepad;
    return true;
  }
};

let firstStartInterval = false;
function ReadController({ redux }) {
  const requestRef = useRef();
  const [press, setPress] = useState({});
  const [connectedController, setConnectedController] = useState(false);
  const [axes, setAxes] = useState([]);
  const [isAxesComponentOpen, setIsAxesComponentOpen] = useState(false);
  var haveEvents = "ongamepadconnected" in window;

  const intervalAxes = () => {
    setInterval(() => {
      const indexAxes = oldAxes.findIndex((e) => {
        if (e > 0.1 || e < -0.1) {
          return true;
        }
      });

      if (indexAxes !== -1) {
        setAxes(oldAxes);
        setIsAxesComponentOpen(true);
      } else {
        setIsAxesComponentOpen(false);
      }
    }, 10);
  };

  const addGamepad = (gamepad) => {
    if (!connectedController && !firstStartInterval && oldAxes.length === 0) {
      firstStartInterval = true;
      setConnectedController(true);
      intervalAxes();
    }
    oldAxes = gamepad.axes;
    const fixGamePad = gamepad.buttons.map((e, index) => {
      return {
        pressed: e.pressed,
        touched: e.touched,
        index,
        value: ~~(e.value * 10),
      };
    });
    const onlyPressGamepad = fixGamePad.filter(
      (buttons) => buttons.pressed === true
    );
    if (gamepadIsActivity(onlyPressGamepad)) {
      setPress(onlyPressGamepad);
    }
  };

  const connectGamepadHandler = (e) => {
    addGamepad(e.gamepad);
    // addGamepadAxes(e.gamepad);
  };

  const scanGamepads = () => {
    var detectedGamepads = navigator.getGamepads
      ? navigator.getGamepads()
      : navigator.webkitGetGamepads
      ? navigator.webkitGetGamepads()
      : [];

    for (var i = 0; i < detectedGamepads.length; i++) {
      if (detectedGamepads[i]) {
        addGamepad(detectedGamepads[i]);
        // addGamepadAxes(detectedGamepads[i]);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("gamepadconnected", connectGamepadHandler);

    return window.removeEventListener(
      "gamepadconnected",
      connectGamepadHandler
    );
  });

  const animate = (time) => {
    if (!haveEvents) scanGamepads();
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  useInterval(() => {
    if (!haveEvents) scanGamepads();
  }, 1000);

  return (
    <div>
      <PressActions pressGamePad={press} />
      {isAxesComponentOpen && <AxesActions axes={axes} />}
    </div>
  );
}



export default ReadController;
