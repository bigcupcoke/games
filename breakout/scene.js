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

    return s
}
