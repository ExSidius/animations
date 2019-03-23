let canvas = document.querySelector('canvas')

let context = canvas.getContext('2d')

let mouse = {
	x: undefined,
	y: undefined,
}

let terminalVelocity = 30

function resize() {
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
}

let colors = [
	'#0B3954',
	'#087E8B',
	'#BFD7EA',
	'#FF5A5F',
	'#C81D25',
]

class Ball {
	constructor() {
		this.radius = Math.random() * 30
		this.x = Math.random() * (innerWidth - this.radius * 2) + this.radius
		this.y = Math.random() * (innerHeight - this.radius * 2) + this.radius
		this.dy = 20
		this.ddy = 1
		this.color = colors[Math.floor(Math.random() * colors.length)]
	}

	update() {

		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.dy = - this.dy * 0.8
		} else {
			if (this.dy < terminalVelocity) {
				this.dy += this.ddy
			}
		}

		this.y += this.dy

		this.draw()
	}

	draw() {
		context.beginPath()
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		context.fillStyle = this.color
		context.fill()
		context.lineWidth = 0.5
		context.stroke()
		context.closePath()
	}
}


let balls = [...Array(500)].map(_ => new Ball())

function animate() {
	requestAnimationFrame(animate)
	context.clearRect(0, 0, innerWidth, innerHeight)
	balls.map(ball => ball.update())
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
