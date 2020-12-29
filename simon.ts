let TIME: number = 150;
let DEBOUNCE: number = 151;
function red() {
    music.playTone(310 * 2, TIME)
    light.setPixelColor(0, light.rgb(255, 0, 0))
    light.setPixelColor(1, light.rgb(255, 0, 0))
    light.setPixelColor(2, light.rgb(255, 0, 0))
    loops.pause(TIME)
    light.clear()

}

function blue() {
    music.playTone(209 * 2, TIME)
    light.setPixelColor(2, light.rgb(0, 0, 255))
    light.setPixelColor(3, light.rgb(0, 0, 255))
    light.setPixelColor(4, light.rgb(0, 0, 255))
    loops.pause(TIME)
    light.clear()
}

function green() {
    music.playTone(415 * 2, TIME)
    light.setPixelColor(5, light.rgb(0, 255, 0))
    light.setPixelColor(6, light.rgb(0, 255, 0))
    light.setPixelColor(7, light.rgb(0, 255, 0))
    loops.pause(TIME)
    light.clear()
}

function yellow() {
    music.playTone(252 * 2, TIME)
    light.setPixelColor(7, light.rgb(255, 255, 0))
    light.setPixelColor(8, light.rgb(255, 255, 0))
    light.setPixelColor(9, light.rgb(255, 255, 0))
    loops.pause(TIME)
    light.clear()
}



let functions = [red, blue, green, yellow]

function getRandomMove() {
    return (Math.randomRange(0, 3) + Math.floor(input.temperature(TemperatureUnit.Celsius)) + control.timer1.millis() + input.soundLevel()) % 4//lets add some randomness from the environment, since we have temperature, etc

}
let moves: number[] = []
//testing touch sensitive input
input.touchA1.onEvent(ButtonEvent.Click, function () {
    green()
})
input.touchA2.onEvent(ButtonEvent.Click, function () {
    yellow()
})
input.touchA6.onEvent(ButtonEvent.Click, function () {
    blue()
})
input.touchA5.onEvent(ButtonEvent.Click, function () {
    red()
})
//testing sequencing
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


