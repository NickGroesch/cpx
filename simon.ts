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
let colorFunctions = [red, blue, green, yellow]

function getRandomMove() {
    return (Math.randomRange(0, 3) + Math.floor(input.temperature(TemperatureUnit.Celsius)) + control.timer1.millis() + input.soundLevel()) % 4//lets add some randomness from the environment, since we have temperature, etc

}
let moves: number[] = []

let buff: number[] = []
function clearBuff() {
    buff = []
}
function addToBuff(num: number) {
    buff.push(num)
}
function lose() {
    music.playSound(music.sounds(Sounds.Wawawawaa))

}
function win() {
    music.playSound(music.sounds(Sounds.BaDing))
}
function showLeft(leftNum: number) {
    switch (leftNum) {
        case 3: light.setPixelColor(3, light.rgb(0, 128, 0));
        case 2: light.setPixelColor(2, light.rgb(0, 128, 0));
        case 1: light.setPixelColor(1, light.rgb(0, 128, 0));
        case 0: light.setPixelColor(0, light.rgb(0, 128, 0));
            break
        default: light.setPixelColor(4, light.rgb(128, 0, 0))
    }
}

function showRight(rightNum: number) {
    switch (rightNum) {
        case 3: light.setPixelColor(6, light.rgb(0, 0, 128));
        case 2: light.setPixelColor(7, light.rgb(0, 0, 128));
        case 1: light.setPixelColor(8, light.rgb(0, 0, 128));
        case 0: light.setPixelColor(9, light.rgb(0, 0, 128));
            break
        default: light.setPixelColor(5, light.rgb(128, 0, 0))
    }
}
function evalBuff() {
    for (let index = 0; index < moves.length; index++) {
        showLeft(buff[index])
        showRight(moves[index])
        //we need a custom logger to compare here
        if (buff[index] != moves[index]) {
            lose()
            return;
        }
        basic.pause(TIME * 2)
        light.clear()
        basic.pause(100)
    }
    win()
}

//testing touch sensitive input
input.touchA1.onEvent(ButtonEvent.Click, function () {
    green()
    addToBuff(2)
})
input.touchA2.onEvent(ButtonEvent.Click, function () {
    yellow()
    addToBuff(3)
})
input.touchA6.onEvent(ButtonEvent.Click, function () {
    blue()
    addToBuff(1)
})
input.touchA5.onEvent(ButtonEvent.Click, function () {
    red()
    addToBuff(0)
})

//testing sequencing
input.buttonsAB.onEvent(ButtonEvent.Click, function () {// L&R: reset
    moves = []
})
input.buttonA.onEvent(ButtonEvent.Click, function () {//L: add
    evalBuff()
    moves.push(getRandomMove())
})
input.buttonB.onEvent(ButtonEvent.Click, function () {//r: playbackj
    moves.forEach(function (func) {
        colorFunctions[func]()
        basic.pause(TIME)
    })
    clearBuff()
})


//music.baDing.play()
