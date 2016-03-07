import Particle from './particle';

class ParticleRound extends Particle {
  constructor(...p) {
    super(...p);
    //circles are extra bouncy
    this.b = 0.65;
  }
  draw(ctx) {
    //put the shape on the context
    const roundStyle = 'border-radius: 50%;';
    this.el.setAttribute('style', this.initialStyle + this.computePosStyle() + roundStyle);
  }
}
export default ParticleRound;