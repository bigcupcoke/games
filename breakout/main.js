var loadLevel = function(n) {
    var n = n - 1
    var level = levels[n]
    var blocks = []
    level.forEach(function(e) {
        // log(e, 'e')
        var b = Block(e)
        blocks.push(b)
    })
    return blocks
}

var enableDebugMode = function(enable) {
    if (!enable) {
        return
    }

    //  debug pause
    window.paused = false
    var pause = function() {
        window.addEventListener('keydown', function(e) {
            if (e.key === 'p') {
                paused = !paused
            }
        })
    }

    //  debug level
    window.addEventListener('keydown', function(e) {
        var k = e.key
        if (k === 'p') {
            //  paused
            window.paused = !window.paused
        } else if ('123456789'.includes(k)) {
            blocks = loadLevel(Number(k))
        }
    })

    //  debug fps
    var input = document.querySelector('#id-input-fps')
    input.classList.add('active')
    input.addEventListener('input', function(e) {
        window.fps = this.value
    })
}

var __main = function() {
    enableDebugMode(true)

    var paddle = Paddle()

    window.fps = 50
    var game = Game(window.fps)
    game.registerAction('a', paddle.moveLeft)
    game.registerAction('d', paddle.moveRight)

    var ball = Ball()
    game.registerAction('f', ball.fire)

    window.blocks = []
    blocks = loadLevel(1)

    window.score = 0
    game.update = function() {
        if (paused) {
            return
        }
        ball.move()

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

    game.draw = function() {
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
}

__main()
