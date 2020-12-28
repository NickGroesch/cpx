let TIME: number = 100;
let DEBOUNCE: number = 100;
function red() {
    light.setPixelColor(0, light.rgb(255, 0, 0))
    light.setPixelColor(1, light.rgb(255, 0, 0))
    light.setPixelColor(2, light.rgb(255, 0, 0))
    loops.pause(TIME)
    light.clear()
}

function blue() {
    light.setPixelColor(2, light.rgb(0, 0, 255))
    light.setPixelColor(3, light.rgb(0, 0, 255))
    light.setPixelColor(4, light.rgb(0, 0, 255))
    loops.pause(TIME)
    light.clear()
}

function green() {
    light.setPixelColor(5, light.rgb(0, 255, 0))
    light.setPixelColor(6, light.rgb(0, 255, 0))
    light.setPixelColor(7, light.rgb(0, 255, 0))
    loops.pause(TIME)
    light.clear()
}

function yellow() {
    light.setPixelColor(7, light.rgb(255, 255, 0))
    light.setPixelColor(8, light.rgb(255, 255, 0))
    light.setPixelColor(9, light.rgb(255, 255, 0))
    loops.pause(TIME)
    light.clear()
}


let functions = [red, blue, green, yellow]
function getRandomMove() {
    return Math.floor(Math.random() * functions.length)//insufficiently random, as in 100% the same every time
}

let moves: number[] = []

forever(function () {
    if (input.buttonsAB.isPressed()) {
        moves = []
    } else
        if (input.buttonA.isPressed()) {
            moves.push(getRandomMove())
        } else
            if (input.buttonB.isPressed()) {
                moves.forEach(function (func) {
                    functions[func]()
                    loops.pause(TIME)
                })
            }
    loops.pause(DEBOUNCE)
})
