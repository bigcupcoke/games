class DjScene{
    constructor(game) {
        this.game = game
    }

    static create(game) {
        var instance = new this(game)
        return instance
    }

    draw() {

    }

    update() {

    }
}

var Scene = function(game) {
    var s = {
        game: game,
    }

    window.fps = 50

    var paddle = Paddle(game)
    game.registerAction('a', paddle.moveLeft)
    game.registerAction('d', paddle.moveRight)

    var ball = Ball(game)
    game.registerAction('f', ball.fire)

    window.blocks = []
    blocks = loadLevel(game, 1)
    window.score = 0
    s.update = function() {
        if (window.paused) {
            return
        }
        ball.move()

        if (ball.y >= 400) {
            var s = SceneEnd.create(game)
            game.replaceScene(s)
        }
        if (paddle.collide(ball)) {
            ball.bound()
        }

        for (var i = 0; i < blocks.length; i++) {
            var b = blocks[i]
            if(b.collide(ball)) {
                ball.boundY()
                b.kill()

                //  score +100 when ball ana block collide
                window.score += 100
            }
        }
    }

    s.draw = function() {
        game.drawImg(paddle)
        game.drawImg(ball)

        for (var i = 0; i < blocks.length; i++) {
            var b = blocks[i]
            if (b.alive) {
                game.drawImg(b)
            }
        }
        game.context.fillText(`score: ${score}`, 30, 350)
    }

    // mouse event
    var enableDrag = false
    var canvas = game.canvas
    canvas.addEventListener('mousedown', function(e) {
        var x = e.offsetX
        var y = e.offsetY
        // log('down', x, y)
        if (ball.hasPoint(x, y)) {
            // log('hasPoint true', x, y)
            // 设置拖拽状态
            enableDrag = true
        }
    })

    canvas.addEventListener('mousemove', function(e) {
        var x = e.offsetX
        var y = e.offsetY
        if (enableDrag) {
            ball.x = x
            ball.y = y
        }
    })

    canvas.addEventListener('mouseup', function(e) {
        var x = e.offsetX
        var y = e.offsetY
        enableDrag = false
    })
    return s
}
