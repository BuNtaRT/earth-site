import { camera } from "./main";
import { controls } from "./scene/interaction/orbit-control";
import Tween from "@tweenjs/tween.js";
import { updateText } from "./scene/title/title";
import { docSlider } from "./libs/docSlider/docSlider";
import { initPage as page0 } from "../pages/earth/earthPage";
import { initPage as page1 } from "../pages/position/positionPage";
import { initPage as page2 } from "../pages/atmosphere/atmospherePage";
import { initPage as page3 } from "../pages/surface/surfacePage";

const pageScript = [page0, page1, page2, page3];
const modelContainer = document.querySelector(".model-container");
const borders = document.querySelector(".borders");

export const setPage = (page = 0, fromMain = false) => {
  pageScript[page]();

  setFullPageScroll(page);
  moveCamera(page);
  setTitleByPage(page);

  if (page === 0) {
    borders.classList.remove("borders_show");
    borders.classList.add("borders_hide");
    modelContainer.classList.remove("blur");
  } else {
    borders.classList.remove("borders_hide");
    borders.classList.add("borders_show");
    modelContainer.classList.add("blur");
  }
};

//-------------------------- FULL PAGE SCROLL
const fullPageScroll = document.querySelector(".docSlider");

const setFullPageScroll = (page) => {
  const enable = !!page;

  docSlider.enable(enable);
  docSlider.jumpPage(page);
  fullPageScroll.style.pointerEvents = enable ? "all" : "none";
  fullPageScroll.classList.remove(enable ? "hideDots" : "showDots");
  fullPageScroll.classList.add(enable ? "showDots" : "hideDots");
};

//-------------------------- TITLE

const border = 150;

const setTitleByPage = (page) => {
  updateText(pageTitles[page], page ? border : 0);
};

export const pageTitles = ["Земля", "Положение", "Поверхность"];

//-------------------------- CAMERA
let isFirst = true;
export const moveCamera = (page = 0) => {
  if (isFirst) {
    isFirst = false;
    return;
  }

  const { cameraPos, targetPos } = pageCameraPosition[page];
  controls.enableDamping = page === 0;

  lerpVector(controls.target, targetPos);
  lerpVector(camera.position, cameraPos, () => {
    controls.enabled = !!!page;
  });
};

const lerpVector = (source, end, callback) => {
  new Tween.Tween(source)
    .to(
      {
        x: end.x,
        y: end.y,
        z: end.z,
      },
      3000
    )
    .delay(250)
    .easing(Tween.Easing.Circular.Out)
    .start()
    .onComplete(callback);
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
