let canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let context = canvas.getContext('2d')

function weightedRandom() {

	for (let i = 0; i < 100; i++) {
		number = Math.random()

		if (number < 0.3) {
			return number
		}
	}

	return number
}

let colors = ['#98cdb5', '#feedb0', '#fd706c', '#fecb65']

class Circle {
	constructor() {

		this.radius = Math.random() * 40

		this.x = Math.random() * (innerWidth - this.radius * 2) + this.radius
		this.dx = Math.random() * 14 - 7

		this.y = Math.random() * (innerHeight - this.radius * 2) + this.radius
		this.dy = Math.random() * 14 - 7

		this.color = colors[Math.floor(Math.random() * colors.length)]
	}

	draw() {
		context.beginPath()
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		context.fillStyle = this.color
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

let circles = [...Array(100)].map(_ => new Circle())

function animate() {
	requestAnimationFrame(animate)
	context.clearRect(0, 0, innerWidth, innerHeight)
	circles.map(circle => circle.update())
}


animate()

