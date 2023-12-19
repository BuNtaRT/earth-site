import { setHtml } from "../../scripts/utils/setHtml";
import html from "./positionPage.html";
import "./positionPage.style.scss";
import "../../styles/components/textBlock/textBlock.scss";

export const initPage = () => {
  setHtml("#page2", html);

  const solarSystem = document.querySelector(".solarSystem").children;

  for (let i = 0; i < solarSystem.length; i++) {
    if (i && i !== 3) {
      const delay = `-${Math.floor(Math.random() * 500)}s`;
      const orbit = solarSystem[i];
      orbit.style.animationDelay = delay;
      const planet = orbit.lastElementChild;
      planet.style.animationDelay = delay;
    }
  }
};
