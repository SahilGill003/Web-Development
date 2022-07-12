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

let counter = document.querySelector("p");
var noOfBalls = 0;

function display(noOfBalls)
{
  document.querySelector("p").innerHTML ="Ball Count : " +  noOfBalls;
}

class Shape {
  constructor(posx, posy, velX, velY) {
    this.posx = posx;
    this.posy = posy;
    this.velY = velY;
    this.velX = velX;
  }
}

class Ball extends Shape {
  constructor(posx, posy, velX, velY, color, size) {
    super(posx, posy, velX, velY);
    this.color = color;
    this.size = size;
    this.exists = true;
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
      if (!(this === ball) && ball.exists) {
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
  noOfBalls++;
}

class EvilCircle extends Shape {
  constructor(x, y) {
    super(x, y, 20, 20);
    this.color = "white";
    this.size = 10;
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "a":
          this.posx -= this.velX;
          break;
        case "d":
          this.posx += this.velX;
          break;
        case "w":
          this.posy -= this.velY;
          break;
        case "s":
          this.posy += this.velY;
          break;
      }
    });
  }
  draw() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.posx, this.posy, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }
  checkBounds() {
    if (this.posx + this.size >= width) {
      this.posx = this.posx - this.size;
    }

    if (this.posx - this.size <= 0) {
      this.posx = this.posx + this.size;
    }

    if (this.posy + this.size >= height) {
      this.posy = this.posy - this.size;
    }

    if (this.posy - this.size <= 0) {
      this.posy = this.posy + this.size;
    }

    this.draw();
  }
  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.posx - ball.posx;
        const dy = this.posy - ball.posy;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.exists = false;
          display(noOfBalls);
          noOfBalls--;
        }
      }
    } 
  }
}

const evilCircle = new EvilCircle(
    random(0, width),
    random(0, height)
  );


function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.75)";

  ctx.fillRect(0, 0, width, height);
    
    
    evilCircle.draw();
    evilCircle.checkBounds();
    evilCircle.collisionDetect();
  
  for (const ball of balls) {
    if (ball.exists) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
      }
  requestAnimationFrame(loop);
}
loop();

