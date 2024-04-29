import html from "./earthPage.html";
import { setHtml } from "../../scripts/utils/setHtml";
import "./earchPage.style.scss";
import { setPage } from "../../scripts/pageSwitcher";

export const initPage = (hide = false) => {
  setHtml("#page1", html, hide);

  if (hide) return;

  const positionButton = document.querySelector("#earth_menu_position");
  const atmosphereButton = document.querySelector("#earth_menu_atmosphere");

  positionButton.onclick = handleClick(1);
  atmosphereButton.onclick = handleClick(2);
};

const handleClick =
  (goto) =>
  ({ target }) => {
    const text = target.innerHTML;
    const rect = target.getBoundingClientRect();

    const effect = document.createElement("p");
    effect.innerHTML = text;
    effect.classList.add("earth_button_effect");
    effect.style.top = rect.top + "px";
    effect.style.left = rect.left + "px";
    effect.style.width = target.clientWidth + "px";

    target.parentElement.appendChild(effect);

    setTimeout(() => setPage(goto, 0), 200);
    setTimeout(() => {
      effect.remove();
    }, 2000);
  };
