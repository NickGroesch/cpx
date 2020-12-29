let TIME: number = 150;
let DEBOUNCE: number = 151;
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
    return (control.timer1.millis() + control.timer1.millis() % control.timer1.seconds()) % 4 //DEBOUNCE is messing with this
}
let moves: number[] = []
input.buttonsAB.onEvent(ButtonEvent.Click, function () {
    moves = []
})
input.buttonA.onEvent(ButtonEvent.Click, function () {
    moves.push(getRandomMove())
})
input.buttonB.onEvent(ButtonEvent.Click, function () {
    moves.forEach(function (func) {
        functions[func]()
        loops.pause(TIME)
    })
})
// forever(function () {
//     if (input.buttonsAB.isPressed()) {
//         moves = []
//     } else
//         if (input.buttonA.isPressed()) {
//             moves.push(getRandomMove())
//         } else
//             if (input.buttonB.isPressed()) {
//                 moves.forEach(function (func) {
//                     functions[func]()
//                     loops.pause(TIME)
//                 })
//             }
//     loops.pause(DEBOUNCE)
// })
