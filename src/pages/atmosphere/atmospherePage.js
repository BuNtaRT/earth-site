import { setHtml } from "../../scripts/utils/setHtml";
import html from "./atmospherePage.html";
import "./atmospherePage.style.scss";

export const initPage = () => {
  setHtml("#page3", html);
};
