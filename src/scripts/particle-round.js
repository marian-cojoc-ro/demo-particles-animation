import Particle from './particle';

class ParticleRound extends Particle {
  constructor(...p) {
    super(...p);
    this.b = 0.65;
  }
  draw(ctx) {
    //put the shape on the context
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.r/2, 0, 2 * Math.PI);
    ctx.fill();
  }
}
export default ParticleRound;