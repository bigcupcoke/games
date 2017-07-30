var Paddle = function() {
    var img = imageFromPath('paddle.png')
    // log('img', img)
    var o = {
        img: img,
        x: 100,
        y: 390,
        speed: 5,
        leftDown: false,
        rightDown: false,
    }

    o.move = function(x) {
        if(x < 0) {
            x = 0
        } else if (x > 500 - o.img.width) {
            x = 500 - o.img.width
        }
        o.x = x
    }

    o.moveLeft = function() {
        o.move(o.x - o.speed)
    }

    o.moveRight = function() {
        o.move(o.x + o.speed)
    }

    o.collide = function(ball) {
        var result = false
        if (ball.y + ball.img.height > o.y) {
            if (ball.x > o.x && ball.x < o.x + o.img.width) {
                log('相撞')
                result = true
            }
        }
        return result
    }

    return o
}
