import { setHtml } from "../../scripts/utils/setHtml";
import html from "./positionPage.html";
import "./positionPage.style.scss";
import textCardInit from "../../scripts/textCard/textCard";

let popup;
let currenPopupElem;
let showPopup = false;

export const initPage = (hide = false) => {
  setHtml("#page2", html, hide);
  if (hide) return;

  textCardInit();
  planetRef();

  const solarSystem = document.querySelector(".solarSystem").children;
  popup = document.querySelector(".popupPlanet");

  for (let i = 0; i < solarSystem.length; i++) {
    if (i && i !== 3) {
      const delay = `-${Math.floor(Math.random() * 500)}s`;
      const orbit = solarSystem[i];
      orbit.style.animationDelay = delay;
      const planet = orbit.lastElementChild;
      planet.style.animationDelay = delay;
    }
  }
  setInterval(reposition, 25);
};

function planetRef() {
  const refs = document.querySelectorAll('[class*="_a"]');
  refs.forEach((ref) => {
    ref.addEventListener("click", (evt) => {
      setPlanetInfo(planetData[evt.target.dataset.planet]);
    });
  });
}

function setPlanetInfo({ name, speed, description, planetClass }) {
  const planet = document.querySelector(planetClass);
  const innerName = popup.querySelector("p").innerHTML;

  if (innerName === name) {
    showPopup = popup.style.display === "none";
    popup.style.display = showPopup ? "block" : "none";
  } else {
    showPopup = true;
    popup.style.display = "block";
    popup.querySelector("p").innerHTML = name;
    popup.querySelector("main").innerHTML = `Скорость: ${speed}`;
    popup.querySelector("footer").innerHTML = description;

    currenPopupElem = planet;
  }
}

const reposition = () => {
  if (currenPopupElem && showPopup) {
    const rect = currenPopupElem.getBoundingClientRect();
    popup.style.left = `${rect.left + window.scrollX + rect.width + 8}px`;
    popup.style.top = `${rect.top + window.scrollY + 8}px`;
  }
};

const planetData = [
  {
    name: "Солнце",
    speed: "0км/ч",
    description: "Звезда по имени солнце",
    planetClass: ".solarSystem_sun",
  },
  {
    name: "Меркурий",
    speed: "170,503км/ч",
    description: "Это Набу? это Горус? Нет! это Меркурий",
    planetClass: ".solarSystem_mercury_planet",
  },
  {
    name: "Вернера",
    speed: "126,074км/ч",
    description: `Аппарат "Венера 9" приземлился, женщин тут не увидел`,
    planetClass: ".solarSystem_venus_planet",
  },
  {
    name: "Земля",
    speed: "107,218км/ч",
    description: "А тут точно есть разумная жизнь?",
    planetClass: ".solarSystem_earth_planet",
  },
  {
    name: "Марс",
    speed: "86,677км/ч",
    description: "Видимо Илон Маск не играл в Surviving Mars",
    planetClass: ".solarSystem_mars_planet",
  },
  {
    name: "Юпитер",
    speed: "47,002км/ч",
    description: "Он наблюдает за нами",
    planetClass: ".solarSystem_jupiter_planet",
  },
  {
    name: "Сатурн",
    speed: "37,701км/ч",
    description: ``,
    planetClass: ".solarSystem_saturn_planet",
  },
  {
    name: "Уран",
    speed: "24,477км/ч",
    description: `"Это земля неправильно вертится!" - нептун`,
    planetClass: ".solarSystem_uranus_planet",
  },
  {
    name: "Нептун",
    speed: "19,566км/ч",
    description: "Первый с конца (с 2006г)",
    planetClass: ".solarSystem_neptune_planet",
  },
];
