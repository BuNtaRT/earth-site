import { Particle } from "./particle";
//-------------------------- < SETTINGS

const resolution = 7;
const fontSize = 25;
const offsetY = 2;

//-------------------------- SETTINGS >

export class ParticleText {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.currentText = "text";
    this.currentBorder = 0;
  }
  updateText(text = "", border = -1) {
    this.currentBorder = border >= 0 ? border : this.currentBorder;
    this.currentText = text ? text : this.currentText;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const textX = this.canvas.width / 2 / resolution;
    const textY = offsetY + this.currentBorder / resolution;

    this.ctx.fillStyle = "white";
    this.ctx.font = `${fontSize}px BankGothicMedium`;
    this.ctx.textBaseline = "middle";
    this.ctx.textAlign = "center";
    this.ctx.fillText(this.currentText, textX, textY);

    return this.convertToParticles();
  }

  convertToParticles() {
    const textCoordinates = this.ctx.getImageData(
      0,
      0,
      this.canvas.width / resolution,
      this.canvas.height / resolution
    );

    let particles = [];

    const height = textCoordinates.height;
    const width = textCoordinates.width;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (textCoordinates.data[(y * textCoordinates.width + x) * 4 + 3] > 0) {
          particles.push(new Particle(x * resolution, y * resolution));
        }
      }
    }

    return particles;
  }
}
