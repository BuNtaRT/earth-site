import "./title.scss";
import "../../utils/mathPrototype";

const mouse = {
  x: 0,
  y: 0,
  radius: 100,
};
const resolution = 7;
const border = 150;
let particles = [];

//-------------------------- Style
const parent = document.querySelector(".canvas-block");
const canvas = document.createElement("canvas");
parent.appendChild(canvas);

const ctx = canvas.getContext("2d");

const updateText = (text, border) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const textX = canvas.width / 2 / resolution;
  const textY = 30 / resolution;

  ctx.fillStyle = "white";
  ctx.font = "25px BankGothicMedium";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillText(text, textX, textY);

  convertToParticles();
};

const convertToParticles = () => {
  const textCoordinates = ctx.getImageData(
    0,
    0,
    canvas.width / resolution,
    canvas.height / resolution
  );
  particles = [];

  const height = textCoordinates.height;
  const width = textCoordinates.width;

  // text
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // for opacity (alpha) we need the 4th value in the [] of the 40000 elements
      // if (textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 3] > 0) {
      if (textCoordinates.data[(y * textCoordinates.width + x) * 4 + 3] > 0) {
        // particles.push(new Particle(x * 20, y * 20));
        particles.push(new Particle(x * resolution, y * resolution));
      }
      // if (
      //   textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 3] > 128
      // ) {
      //   let positionX = x + 10;
      //   let positionY = y + 0;
      //   particles.push(new Particle(positionX * 20, positionY * 20));
      // }
    }
  }
};

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 3;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 40 + 5;
  }

  draw() {
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;

    let distance = Math.sqrt(dx * dx + dy * dy);

    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = mouse.radius;

    let force = (maxDistance - distance) / maxDistance;

    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;

    if (distance < mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 10;
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 10;
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++) {
    particles[i].draw();
    particles[i].update();
  }
  requestAnimationFrame(animate);
}

animate();

const resize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  updateText("Поверхность");
};

window.addEventListener("resize", () => {
  resize();
});
window.addEventListener("load", () => {
  resize();
});

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

function setTitleByPage(page) {
  updateText(pageTitles[page], page ? 0 : border);
}

updateText("Планета земля");
const pageTitles = ["Планета земля", "Планета земля", "Планета земля"];
