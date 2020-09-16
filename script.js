const FIELD_SIZE = 3
const ROWS_NUMBER = 200
const COLUMNS_NUMBER = 200
const BACKGROUND_COLOR = 'black'
const FIELD_COLOR = 'green'
const GENERATION_TIME = 0

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const lifeGame = new LifeGame(ROWS_NUMBER, COLUMNS_NUMBER)

start()

function start () {
    canvas.width = FIELD_SIZE * COLUMNS_NUMBER
    canvas.height = FIELD_SIZE * ROWS_NUMBER

    lifeGame.reviveRandomFields(ROWS_NUMBER * COLUMNS_NUMBER / 2)

    requestAnimationFrame(tick)
}

function tick (timestamp) {
    clearCanvas()

    if (timestamp > lifeGame.generationNumber * GENERATION_TIME) {
        lifeGame.changeGeneration()
    }
    
    lifeGame.forFreeEach((x, y) => drawField(x, y, FIELD_COLOR))

    requestAnimationFrame(tick)
}

function clearCanvas () {
    context.fillStyle = BACKGROUND_COLOR
    context.beginPath()
    context.rect(0, 0, canvas.width, canvas.height)
    context.fill()
}

function drawField (x, y, color) {
    context.fillStyle = color
    context.beginPath()
    context.rect(x * FIELD_SIZE, y * FIELD_SIZE, FIELD_SIZE, FIELD_SIZE)
    context.fill()
}