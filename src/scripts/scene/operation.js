import { camera } from "../main";
import { controls } from "./interaction/orbit-control";
import Tween from "@tweenjs/tween.js";
import { updateText } from "./title/title";

export const setPage = (page = 0) => {
  moveCamera(page);
  setTitleByPage(page);
};

//-------------------------- CAMERA

export const moveCamera = (page = 0) => {
  const { cameraPos, targetPos } = pageCameraPosition[page];
  if (page !== 0) controls.enabled = false;

  lerpVector(controls.target, targetPos);
  lerpVector(camera.position, cameraPos, () => (controls.enabled = !!!page));
};

const lerpVector = (source, end, callback) => {
  new Tween.Tween(source)
    .to(
      {
        x: end.x,
        y: end.y,
        z: end.z,
      },
      1500
    )
    //.delay(100)
    .easing(Tween.Easing.Circular.Out)
    .start()
    .onComplete(() => {
      if (callback) callback();
    });
};

const pageCameraPosition = [
  {
    cameraPos: {
      x: 0,
      y: 0,
      z: 10,
    },
    targetPos: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
  {
    cameraPos: {
      x: 0,
      y: 0,
      z: 1.5,
    },
    targetPos: {
      x: 8,
      y: 0,
      z: 8,
    },
  },
];

//-------------------------- TITLE

const border = 150;

const setTitleByPage = (page) => {
  updateText(pageTitles[page], page ? border : 0);
};

export const pageTitles = ["Планета земля", "Планета земля", "Планета земля"];
