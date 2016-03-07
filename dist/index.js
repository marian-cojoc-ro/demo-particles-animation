(function () {
  'use strict';

  class Particle{
    constructor(canvas, pos, vel) {
      this.canvas = canvas;
      this.pos = pos;
      this.vel = vel;
      //gravity
      this.g = 2; // px/s^2;
      //bound waste of velocity
      this.b = 0.5;
      this.r = 10 + (Math.random() * 20);
      const h = Math.floor(Math.random() * 360);
      this.initialStyle = `background-color: hsla(${h}, 100%, 60%, 0.8);`;
      this.initialStyle += `width: ${this.r}px; height: ${this.r}px;`;
      this.init();
    }
    init() {
      const el = document.createElement('div');
      el.setAttribute('class', 'particle')
      this.canvas.appendChild(el);
      this.el = el;
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
    computePosStyle() {
      return `transform: translate(${this.pos.x - this.r/2}px, ${this.pos.y - this.r / 2}px);`;
    }
    destroy(){
      this.el.parentNode.removeChild(this.el);
    }
  }

  class ParticleSquare extends Particle {
    draw(ctx) {
      this.el.setAttribute('style', this.initialStyle + this.computePosStyle());
    }
  }

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

  class Scene {
    constructor(canvas) {
      this.canvas = canvas;

      this.particles = [];
      this.particlesPerSecond = 100;
      this.lastTick = null;
      this.mouse = {x: 300, y: 50};
      this.maxParticles = 500;

      //this.initialDone = false;
      const self = this;
      //this.mouse = null;
      setTimeout(function(){
        self.mouse = null;
      }, 3000);
    }

    loop(){
      var self = this;

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
        const toDelete = this.particles.slice(this.particles.length - partCountToDelete, this.particles.length);
        toDelete.forEach(function(partToDelete){
          partToDelete.destroy();
        });
        let newParticles = [];

        for (let i = 0; i<newPartCount; i++) {
          const newPartVelX = 50 - Math.floor(Math.random() * 100);
          const newPartVelY = -Math.floor(Math.random() * 100);

          const constructors = [ParticleRound, ParticleSquare];
          const Constructor = constructors[Math.floor(Math.random() * 2)];

          newParticles.unshift(new Constructor(
            this.canvas,
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

      let tickOneParticle = function(particle) {
        particle.tick(diff);
      };
      this.particles.forEach(tickOneParticle);

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

  var startDemo = function(){
    const canvas = document.querySelector('.canvas');
    var demoScene = new Scene(canvas);
    demoScene.start();
  };

  startDemo();

}());
//# sourceMappingURL=index.js.map
