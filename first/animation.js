let canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let context = canvas.getContext('2d')

let mouse = {
	x: undefined,
	y: undefined,
}


let minRadius = 5
let maxRadius = 60

function weightedRandom() {

	for (let i = 0; i < 200; i++) {
		number = Math.random()

		if (number < 0.1) {
			return number
		}
	}

	return number
}

let colors = ['#70D6FF', '#FF70A6', '#FF9770', '#FFD670', 'E9FF70']

class Circle {
	constructor() {

		this.original_radius = Math.random() * 10
		this.radius = this.original_radius

		this.x = Math.random() * (innerWidth - this.radius * 2) + this.radius
		this.dx = Math.random() * 20 - 10

		this.y = Math.random() * (innerHeight - this.radius * 2) + this.radius
		this.dy = Math.random() * 20 - 10

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

		if (Math.sqrt(Math.pow(this.x - mouse.x, 2) + Math.pow(this.y - mouse.y, 2)) - this.radius < 100) {
			if (this.radius < maxRadius) {
				this.radius += 5
			}
		} else {
			if (this.radius > this.original_radius && this.radius > minRadius) {
				this.radius -= 2
			}
		}


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

window.addEventListener('mousemove', event => {
	mouse.x = event.x
	mouse.y = event.y
})

