export default class Particle{
  constructor(pos, vel) {
    this.pos = pos;
    this.vel = vel;
    //gravity
    this.g = 2; // px/s^2;
    //bound waste of velocity
    this.b = 0.5;
    this.r = 10 + (Math.random() * 20);
    const h = Math.floor(Math.random() * 360);
    this.color = `hsla(${h}, 100%, 60%, 0.8)`;
  }

  /**
   *
   * @param diff miliseconds
   */
  tick(diff) {
    //set new position based on how much time
    //..has pased since last tick
    const diffX = this.vel.x * (diff / 1000);
    const diffY = this.vel.y * (diff / 1000);
    this.pos.x += diffX;
    this.pos.y += diffY;

    this.vel.y += this.g;

    const limit = 600 - (this.r / 2);

    if (this.pos.y > limit) {
      this.pos.y = 2 * limit - this.pos.y;
      this.vel.y *= this.b;
      this.vel.y *= -1;
    }

    if (this.pos.x > limit) {
      this.pos.x = 2 * limit - this.pos.x;
      this.vel.x *= -1;
    }
    if (this.pos.x < 0) {
      this.pos.x = Math.abs(this.pos.x % limit);
      this.vel.x *= -1;
    }


  }
}