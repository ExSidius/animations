let canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let context = canvas.getContext('2d')

class Circle {
	constructor() {

		this.radius = Math.random() * 30 + 30

		this.x = Math.random() * (innerWidth - this.radius * 2) + this.radius
		this.dx = Math.random() * 20 - 10

		this.y = Math.random() * (innerHeight - this.radius * 2) + this.radius
		this.dy = Math.random() * 20 - 10
	}

	draw() {
		context.beginPath()
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		context.strokeStyle = 'blue'
		context.stroke()
		context.fill()
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

let circles = [...Array(20)].map(_ => new Circle())

function animate() {
	requestAnimationFrame(animate)
	context.clearRect(0, 0, innerWidth, innerHeight)
	circles.map(circle => circle.update())
}


animate()

