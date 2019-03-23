let canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let context = canvas.getContext('2d')

class Circle {
	constructor() {
		this.x = Math.random() * innerWidth
		this.dx = Math.random() * 40 - 20

		this.y = Math.random() * innerHeight
		this.dy = Math.random() * 40 - 20

		this.radius = Math.random() * 20 + 20
	}

	draw() {
		context.beginPath()
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		context.strokeStyle = getRandomColor()
		context.stroke()
	}

	update() {
		if ((this.x + this.radius > innerWidth) || (this.x - this.radius < 0)) {
			this.dx = - this.dx
		}

		if ((this.y + this.radius > innerHeight) || (this.y - this.radius < 0)) {
			this.dy = - this.dy
		}

		this.x += this.dx
		this.y += this.dy

		this.draw()
	}
}

function getRandomColor() {
  let letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color;
}

let circles = [...Array(20)].map(_ => new Circle())

function animate() {
	requestAnimationFrame(animate)
	context.clearRect(0, 0, innerWidth, innerHeight)
	circles.map(circle => circle.update())
}


animate()

