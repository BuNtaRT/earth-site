import "./title.scss";
import "../../utils/mathPrototype";
import { ParticleText } from "./text";
import Tween from "@tweenjs/tween.js";

let particles = [];

//-------------------------- STYLE
const parent = document.querySelector(".canvas-block");
const canvas = document.createElement("canvas");
parent.appendChild(canvas);
const ctx = canvas.getContext("2d");
let particleText = new ParticleText(canvas, ctx);

//-------------------------- OPERATIONS

const particleOffset = {
  x: 0,
  y: 0,
};

export const updateText = (text, page, fromPage) => {
  if (!!page) {
    changeParticleOffset({ x: 0, y: 80 }, 0);
  } else if (page !== fromPage) {
    changeParticleOffset({ x: 0, y: 0 }, 2500);
  }
  particles = particleText.updateText(text, particleOffset);
};

const changeParticleOffset = (xy, delay) => {
  new Tween.Tween(particleOffset)
    .to(
      {
        x: xy.x,
        y: xy.y,
      },
      700
    )
    .delay(delay)
    .easing(Tween.Easing.Linear.None)
    .start();
};

//-------------------------- ANIMATION
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update(particleOffset.x, particleOffset.y);
    particles[i].draw(ctx);
  }

  requestAnimationFrame(animate);
}

animate();

//-------------------------- EVENTS
const resize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  updateText();
};

window.addEventListener("resize", resize);
window.addEventListener("load", resize);
