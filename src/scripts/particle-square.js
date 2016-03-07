import Particle from './particle';

class ParticleSquare extends Particle {
  draw(ctx) {
    this.el.setAttribute('style', this.initialStyle + this.computePosStyle());
  }
}
export default ParticleSquare;