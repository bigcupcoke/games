var Ball = function(game) {
    // var img = imageFromPath('ball.png')
    var img = game.imageByName('ball')
    var o = {
        img: img,
        x: 100,
        y: 380,
        speedX: 5,
        speedY: 5,
        fired: false,
    }
    o.img = img.image
    o.w = img.w
    o.h = img.h
    o.boundX = function() {
        o.speedX *= -1
    }

    o.boundY = function() {
        o.speedY *= -1
    }

    o.bound = function() {
        o.boundX()
        o.boundY()
    }

    o.move = function() {
        if (o.fired) {
            if (o.x < 0 || o.x > 500) {
                o.boundX()
            }
            if (o.y < 0 || o.y > 400) {
                o.boundY()
            }
            o.x += o.speedX
            o.y += o.speedY
        }
    }

    o.fire = function() {
        o.fired = true
    }

    o.hasPoint = function(x, y) {
        var xIn = x >= o.x && x <= o.x + o.w
        var yIn = y >= o.y && y <= o.y + o.h
        return xIn && yIn
    }

    return o
}
