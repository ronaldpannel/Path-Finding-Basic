/**@type{HTMLCanvasElement} */

// Steering = desired velocity - velocity

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;
let mouse = {
  x: 0,
  y: 0,
  pressed: false,
};

let offset = canvas.getBoundingClientRect();

let vehicle = new Vehicle(100, 100);
let path = new Path(0, 200, 600, 200);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  path.end.y = mouse.y
  
  let force = vehicle.follow(path);
  vehicle.applyForce(force);

  vehicle.edges();
  vehicle.draw();
  vehicle.update();
  path.draw();

  requestAnimationFrame(animate);
  console.log(mouse.y)
}
animate();

canvas.addEventListener('click', (e) => {
  mouse.x = e.clientX - offset.left;
  mouse.y = e.clientY - offset.top;

});

window.addEventListener("resize", () => {
  canvas.width = canvas.width;
  canvas.height = canvas.height;
});
