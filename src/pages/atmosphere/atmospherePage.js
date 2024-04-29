import { setHtml } from "../../scripts/utils/setHtml";
import html from "./atmospherePage.html";
import "./atmospherePage.style.scss";

let page;
let clouds;

export const initPage = (hide = false) => {
  page = setHtml("#page3", html, hide);

  if (hide) return;

  clouds = page.querySelectorAll(".atmosphere_cloud");

  page.addEventListener("mousemove", (evt) => {
    const x = (evt.clientX - window.innerWidth / 2) * -0.01;
    const y = (evt.clientY - window.innerHeight / 2) * -0.01;

    for (let i = 0; i < clouds.length; i++) {
      clouds[i].style.transform = `translateX(${
        x * cloudOffset[i].y
      }px) translateY(${y * cloudOffset[i].y}px) translateZ(${i * 50}px)`;
    }
  });
};
const cloudOffset = [
  { x: 5.5, y: -5.5 },
  { x: -3.3, y: 3.25 },
  { x: 1.15, y: -1.05 },
];
