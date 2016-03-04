(function () {
  'use strict';

  class Particle{
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

  class Scene {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');

      this.particles = [];
      this.particlesPerSecond = 100;
      this.lastTick = null;
      this.mouse = {x: 150, y: 50};
      this.maxParticles = 200;

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

  var startDemo = function(){
    const canvas = document.querySelector('canvas');
    var demoScene = new Scene(canvas);

    demoScene.start();
  };

  startDemo();

}());
//# sourceMappingURL=index.js.map
