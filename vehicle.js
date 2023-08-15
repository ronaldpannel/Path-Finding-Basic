function findProjection(pos, a, b){
  let v1 = Vector.sub(a,pos)
  let v2 = Vector.sub(b,pos)
  v2.normalize()
  let sp = v1.dot(v2)
  v2. mult(sp)
  v2.add(pos)
  return v2
}

class Vehicle {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(1, 0);
    this.acc = new Vector(0, 0);
    this.maxSpeed = 4;
    this.maxForce = 0.1;
    this.radius = 5;
    this.angle;
  }
  follow(path) {
    let future = this.vel.copy();
    future.mult(20)
    future.add(this.pos);
    ctx.beginPath();
    ctx.fillStyle = "red";
    //ctx.arc(future.x, future.y, 8, 0, Math.PI * 2);
    ctx.fill();

    let target = findProjection(path.start, future, path.end);
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    //ctx.arc(target.x, target.y, 8, 0, Math.PI * 2);
    ctx.fill();

    let d = Vector.dist(future, target);
    if (d > path.radius) {
      return this.seek(target);
    } else {
      return new Vector(0, 0);
    }
  }
  seek(target) {
    // let desired = Vector.sub(target, this.pos);
    // desired.setMag(this.maxSpeed);
    // let steering = Vector.sub(desired, this.vel)
    // steering.limit(this.maxForce)
    // this.applyForce(steering)

    let force = Vector.sub(target, this.pos);
    force.setMag(this.maxSpeed);
    force.sub(this.vel);
    force.limit(this.maxForce);
    return force;
  }

  applyForce(force) {
    this.acc.add(force);
  }
  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }
  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "gray";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 4;
    ctx.translate(this.pos.x, this.pos.y);
    this.angle = this.vel.heading();
    ctx.rotate(this.angle);
    //ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.moveTo(-this.radius, -this.radius);
    ctx.lineTo(-this.radius, this.radius);
    ctx.lineTo(this.radius * 4, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
  edges() {
    if (this.pos.x >= canvas.width) {
      this.pos.x = 0;
    }

    if (this.pos.x < 0) {
      this.pos.x = canvas.width;
    }

    if (this.pos.y > canvas.height) {
      this.pos.y = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = canvas.height;
    }
  }
}
