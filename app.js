// console.log('attached')
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

function resizeCanvas(margin) {
  canvas.width = window.innerWidth - margin
  canvas.height = window.innerHeight - margin
}

resizeCanvas(5)

function clearCanvas() {
  context.save()
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.restore()
}

function radToDeg(rad) {
  return rad * (180 / Math.PI)
}


class Ray {
  constructor(canvas, context) {
    this.canvas = canvas
    this.context = context

    this.diameter = 10
    this.innerDiameter = 50 + 50 * Math.random()
    this.outerDiameter = 200 + 100 * Math.random()
    this.angle = Math.PI * 2 * Math.random()
    this.velocity = 0.01 * Math.random()

    this.slide = 100 * Math.sin(this.angle)
  }

  rotate() {
    this.angle += this.velocity
    this.slide = 100 * (Math.abs(Math.cos(this.angle)) / 2)
  }

  draw({canvas, context} = this) {
    context.save()
    context.translate(canvas.width / 2, canvas.height / 2)
    context.rotate(this.angle)
    context.beginPath()
    context.moveTo(this.innerDiameter + this.slide, 0)
    context.lineTo(this.outerDiameter + this.slide, 0)
    context.arc(this.outerDiameter + this.slide, 0, this.diameter, 0, Math.PI * 2)
    context.fill()
    context.stroke()
    context.restore()
  }
}

const rays = []
for(let i = 0; i < 50; i++) {
  rays.push(new Ray(canvas, context))
}
// const r1 = new Ray(canvas, context)
// r1.draw()

const fps = 60;
const interval = 1000 / fps;
let then = Date.now();

function loop(){
  animation = requestAnimationFrame(loop);
  const now = Date.now();
  const delta = now - then;
  if(delta > interval){
      then = now - (delta % interval);

      clearCanvas()
      rays.forEach(e => {
        e.draw()
        e.rotate()
      })
  }
}

loop()