import { setHtml } from "../../scripts/utils/setHtml";
import html from "./positionPage.html";
import "./positionPage.style.scss";

export const initPage = () => {
  setHtml("#page1", html);
};
