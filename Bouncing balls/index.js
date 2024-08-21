let canvas = document.getElementById("canvas");
let c = canvas.getContext("2d");
let tx = window.innerWidth;
let ty = window.innerHeight;
canvas.width = tx;
canvas.height = ty;
//c.lineWidth= 5
//c.globalAlpha = 0.5

let mousex = 0;
let mousey = 0;

addEventListener("mousemove", function (event) {
  mousex = event.clientX;
  mousey = event.clientY;
});

let grav = 0.99;
c.strokeWidth = 5;
function randomColor() {
  return (
    "rgba(" +
    Math.round(Math.random() * 250) +
    "," +
    Math.round(Math.random() * 250) +
    "," +
    Math.round(Math.random() * 250) +
    "," +
    Math.ceil(Math.random() * 10) / 10 +
    ")"
  );
}

function Ball() {
  this.color = randomColor();
  this.radius = Math.random() * 20 + 14;
  this.startradius = this.radius;
  this.x = Math.random() * (tx - this.radius * 2) + this.radius;
  this.y = Math.random() * (ty - this.radius);
  this.dy = Math.random() * 2;
  this.dx = Math.round((Math.random() - 0.5) * 10);
  this.vel = Math.random() / 5;
  this.update = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    c.fillStyle = this.color;
    c.fill();
    //c.stroke()
  };
}

let ball = [];
for (let i = 0; i < 50; i++) {
  ball.push(new Ball());
}

function animate() {
  if (tx != window.innerWidth || ty != window.innerHeight) {
    tx = window.innerWidth;
    ty = window.innerHeight;
    canvas.width = tx;
    canvas.height = ty;
  }
  requestAnimationFrame(animate);
  c.clearRect(0, 0, tx, ty);
  for (let i = 0; i < ball.length; i++) {
    ball[i].update();
    ball[i].y += ball[i].dy;
    ball[i].x += ball[i].dx;

    if (ball[i].y + ball[i].radius >= ty) {
      ball[i].dy = -ball[i].dy * grav;
    } else {
      ball[i].dy += ball[i].vel;
    }
    if (ball[i].x + ball[i].radius > tx || ball[i].x - ball[i].radius < 0) {
      ball[i].dx = -ball[i].dx;
    }

    if (
      mousex > ball[i].x - 20 &&
      mousex < ball[i].x + 20 &&
      mousey > ball[i].y - 50 &&
      mousey < ball[i].y + 50 &&
      ball[i].radius < 70
    ) {
      //ball[i].x += +1;
      ball[i].radius += 5;
    } else {
      if (ball[i].radius > ball[i].startradius) {
        ball[i].radius += -5;
      }
    }

    //for loop end
  }
  //animation end
}

animate();

setInterval(function () {
  ball.push(new Ball());
  ball.splice(0, 1);
}, 400);
