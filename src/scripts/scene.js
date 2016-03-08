import MouseHandler from './mouse-handler';
import ParticleSquare from './particle-square';
import ParticleRound from './particle-round';
class Scene {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.particles = [];
    this.particlesPerSecond = 100;
    this.lastTick = null;
    this.mouse = {x: 150, y: 50};
    this.maxParticles = 500;

    //this.initialDone = false;
    const self = this;
    setTimeout(function(){
      self.mouse = null;
    }, 3000);
  }

  loop(){
    var self = this;
    this.ctx.clearRect(0, 0, 600, 600);

    const now = new Date();
    const nowMs = now.getTime();
    let diff;
    if (this.lastTick !== null) {
      diff = nowMs - this.lastTick;
    } else {
      diff = 0;
    }
    this.lastTick = nowMs;

    //should we add particles?
    if (this.mouse !== null) {
      const newPartCount = Math.floor(this.particlesPerSecond * (diff /1000));
      const oldPartCount = this.particles.length;
      const partCountToDelete = Math.max(0, (newPartCount + oldPartCount) - this.maxParticles);

      const oldParticlesLeft = this.particles.slice(0, this.particles.length - partCountToDelete);
      let newParticles = [];

      for (let i = 0; i<newPartCount; i++) {
        const newPartVelX = 50 - Math.floor(Math.random() * 100);
        const newPartVelY = -Math.floor(Math.random() * 100);

        const constructors = [ParticleRound, ParticleSquare];
        const Constructor = constructors[Math.floor(Math.random() * 2)];

        newParticles.unshift(new Constructor(
          {
            x: this.mouse.x,
            y: this.mouse.y
          },
          {
            x: newPartVelX,
            y: newPartVelY
          }
        ));
      }
      this.particles = newParticles.concat(oldParticlesLeft);
    }

    this.particles.forEach(function(particle){
      particle.tick(diff);
    });

    this.particles.forEach(function(particle){
      particle.draw(self.ctx);
    });

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      particle.draw(this.ctx);
    }

    requestAnimationFrame(function(){
      self.loop();
    });
  }

  start() {
    this.loop();
    //attach click handler to canvas
    const self = this;
    this.canvas.addEventListener('mousedown', function(e){
      self.mouse = {
        x: e.offsetX,
        y: e.offsetY
      };
    });
    this.canvas.addEventListener('mouseup', function(e){
      self.mouse = null;
    });

    this.canvas.addEventListener('mousemove', function(e){
      if (self.mouse === null) {
        return;
      }
      self.mouse = {
        x: e.offsetX,
        y: e.offsetY
      };
    });

  }
}

export default Scene;