// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

const balls = [];


class Ball {
  constructor(posx, posy, velX, velY, color, size) {
    this.posx = posx;
    this.posy = posy;
    this.velY = velY;
    this.velX = velX;
    this.color = color;
    this.size = size;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.posx, this.posy, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
  update() {
    if (this.posx + this.size >= width) {
      this.velX = -this.velX;
    }

    if (this.posx - this.size <= 0) {
      this.velX = -this.velX;
    }

    if (this.posy + this.size >= height) {
      this.velY = -this.velY;
    }

    if (this.posy - this.size <= 0) {
      this.velY = -this.velY;
    }

    this.posx += this.velX;
    this.posy += this.velY;
    this.draw();
  }
  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball)) {
        const dx = this.posx - ball.posx;
        const dy = this.posy - ball.posy;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}


while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  balls.push(ball);
}

function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.75)";

  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }
  requestAnimationFrame(loop);
}
loop();
