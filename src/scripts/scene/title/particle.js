//-------------------------- < SETTINGS

const mouseRadius = 100;
const particleColor = "rgba(255, 255, 255, 1)";
const size = 3;

//-------------------------- SETTINGS >

const doublePI = Math.PI * 2;

const mouse = {
  x: 0,
  y: 0,
  radius: mouseRadius,
};

export class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 40 + 5;
  }

  draw(ctx) {
    ctx.fillStyle = particleColor;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, doublePI);
    ctx.closePath();
    ctx.fill();
  }

  update() {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mouse.radius) {
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      const maxDistance = mouse.radius;

      const force = (maxDistance - distance) / maxDistance;

      const directionX = forceDirectionX * force * this.density;
      const directionY = forceDirectionY * force * this.density;

      this.x -= directionX;
      this.y -= directionY;
    } else {
      if (this.x !== this.baseX) {
        const dx = this.x - this.baseX;
        this.x -= dx / 10;
      }
      if (this.y !== this.baseY) {
        const dy = this.y - this.baseY;
        this.y -= dy / 10;
      }
    }
  }
}

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});
