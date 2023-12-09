import html from "./earthPage.html";
import { setPage } from "../../scripts/utils/setPage";
import "./earchPage.style.scss";

export const setHtml = () => {
  setPage("#page1", html);
};
