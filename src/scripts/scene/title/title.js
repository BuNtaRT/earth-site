import "./title.scss";
import "../../utils/mathPrototype";
import { ParticleText } from "./text";

let particles = [];

//-------------------------- STYLE
const parent = document.querySelector(".canvas-block");
const canvas = document.createElement("canvas");
parent.appendChild(canvas);

const ctx = canvas.getContext("2d");
let particleText = new ParticleText(canvas, ctx);

//-------------------------- OPERATIONS
export const updateText = (text, border) => {
  particles = particleText.updateText(text, border);
};

//-------------------------- ANIMATION
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++) {
    particles[i].draw(ctx);
    particles[i].update();
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
