let canvas = document.querySelector('canvas')

let context = canvas.getContext('2d')

let mouse = {
	x: undefined,
	y: undefined,
}


let minRadius = 5
let maxRadius = 60


function resize() {
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
}


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
		let xOutOfLeftBoundary = this.x - this.radius < 0
		let xOutOfRightBoundary = this.x + this.radius > innerWidth
		if (xOutOfLeftBoundary || xOutOfRightBoundary) {

			if (xOutOfLeftBoundary) {
				this.x = this.radius
			}

			if (xOutOfRightBoundary) {
				this.x = innerWidth - this.radius
			}

			this.dx = - this.dx
		}

		let yOutOfTopBoundary = this.y - this.radius < 0
		let yOutOfBottomBoundary = this.y + this.radius > innerHeight
		if (yOutOfTopBoundary || yOutOfBottomBoundary) {

			if (yOutOfTopBoundary) {
				this.y = this.radius
			}

			if (yOutOfBottomBoundary) {
				this.y = innerHeight - this.radius
			}

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

let circles = [...Array(500)].map(_ => new Circle())

function animate() {
	requestAnimationFrame(animate)
	context.clearRect(0, 0, innerWidth, innerHeight)
	circles.map(circle => circle.update())
}

resize()
animate()

window.addEventListener('mousemove', event => {
	mouse.x = event.x
	mouse.y = event.y
})

window.addEventListener('resize', event => {
	resize()
})

