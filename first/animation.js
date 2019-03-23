function getRandomColor() {
  let letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color;
}



let canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let context = canvas.getContext('2d')

context.fillStyle = 'rgba(255, 0, 0, 0.5)'
context.fillRect(100, 100, 100, 100)
context.fillStyle = 'rgba(0, 255, 0, 0.5)'
context.fillRect(400, 100, 100, 100)
context.fillStyle = 'rgba(0, 0, 255, 0.5)'
context.fillRect(300, 300, 100, 100)

context.beginPath()
context.moveTo(50, 300)
context.lineTo(300, 100)
context.lineTo(400, 300)
context.strokeStyle = '#fa34a3'
context.stroke()


for (let i = 0; i < 20; i++) {

	context.beginPath()
	context.arc(Math.random() * window.innerWidth, Math.random() * window.innerHeight, 30, 0, Math.PI * 2, false)
	context.strokeStyle = getRandomColor()
	context.stroke()
}

