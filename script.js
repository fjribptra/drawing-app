const canvas = document.querySelector('canvas')
const penWidth = document.querySelector('.pen-width')
penWidth.value = 1
canvas.width = window.innerWidth
canvas.height = window.innerHeight 

const c = canvas.getContext('2d')
let startBackground = 'white'
c.fillStyle = startBackground

c.fillRect(0,0,canvas.width,canvas.height)

let drawColor = 'black'
let drawWidth = '2'
let isDrawing = false

let restoreArray = []
let index = -1

function changeColor(element) {
    drawColor = element.style.backgroundColor
}

canvas.addEventListener('touchstart', start, false)
canvas.addEventListener('touchmove', draw, false)
canvas.addEventListener('mousedown', start, false)
canvas.addEventListener('mousemove', draw, false)

canvas.addEventListener('touchend', stop, false)
canvas.addEventListener('mouseup', stop, false)
canvas.addEventListener('mouseout', stop, false)

function start(event) {
    isDrawing = true
    c.beginPath()
    c.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop)
    event.preventDefault()
}

function draw(event) {
    if(isDrawing) {
        c.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop)
        c.strokeStyle = drawColor
        c.lineWidth = drawWidth
        c.lineCap = 'round'
        c.lineJoin = 'round'
        c.stroke()
    }
    event.preventDefault()
}

function stop(event) {
    if(isDrawing) {
        c.stroke()
        c.closePath()
        isDrawing = false
    }
    event.preventDefault()

    if(event.type != 'mouseout') {
        restoreArray.push(c.getImageData(0,0,canvas.width,canvas.height))
        index += 1
    }

    console.log(restoreArray)
}

function clearCanvas() {
    c.fillStyle = startBackground
    c.clearRect(0,0,canvas.width,canvas.height)
    c.fillRect(0,0,canvas.width,canvas.height)

    restoreArray = []
    index = -1
}

function undoLast() {
    if(index <= 0) {
        clearCanvas()
    } else {
        index -= 1
        restoreArray.pop()
        c.putImageData(restoreArray[index], 0, 0)
    }
}