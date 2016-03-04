import Particle from './particle';

class ParticleSquare extends Particle {
  draw(ctx) {
    //put the shape on the context
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.pos.x - (this.r / 2),
      this.pos.y - (this.r / 2),
      this.r,
      this.r
    );
  }
}
export default ParticleSquare;