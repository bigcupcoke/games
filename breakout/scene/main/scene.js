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

class Scene extends DjScene {
    constructor(game) {
        super()
        this.game = game
        // log('blocksss', blocks)
        this.init()
    }

    registerAction() {
        var t = this
        this.game.registerAction('a', function() {
            t.paddle.moveLeft()
        })

        this.game.registerAction('d', function() {
            t.paddle.moveRight()
        })

        this.game.registerAction('f', function() {
            t.ball.fire()
        })
    }

    init() {
        this.paddle = Paddle.create(this.game)
        this.ball = Ball.create(this.game)

        this.registerAction()
        this.mouseEvent()
    }

    update() {
        if (config.paused) {
            return
        }

        var b = this.ball
        b.move()
        if (b.y >= 400) {
            var s = SceneEnd.create(this.game)
            this.game.replaceScene(s)
        }

        var p = this.paddle
        if (p.collide(b)) {
            b.bound()
        }

        for (var i = 0; i < config.blocks.length; i++) {
            // log('blocks',  config.blocks)
            var block = config.blocks[i]
            if(block.collide(b)) {
                b.boundY()
                block.kill()
                //  score +100 when ball ana block collide
                config.score += 100
            }
        }
    }

    draw() {
        var g = this.game
        g.drawImg(this.paddle)
        g.drawImg(this.ball)

        if (config.blocks.length === 0) {
            loadLevel(g, 1)
        }

        for (var i = 0; i < config.blocks.length; i++) {
            // log('blocks', blocks)
            var b = config.blocks[i]
            if (b.alive) {
                g.drawImg(b)
            }
        }
        g.context.fillText(`score: ${config.score}`, 30, 350)
    }

    mouseEvent() {
        var g = this
        g.enableDrag = false
        var canvas = g.game.canvas
        canvas.addEventListener('mousedown', function(e) {
            var x = e.offsetX
            var y = e.offsetY
            // log('down', x, y)
            if (g.ball.hasPoint(x, y)) {
                // log('hasPoint true', x, y)
                // 设置拖拽状态
                g.enableDrag = true
            }
        })

        canvas.addEventListener('mousemove', function(e) {
            var x = e.offsetX
            var y = e.offsetY
            if (g.enableDrag) {
                g.ball.x = x
                g.ball.y = y
            }
        })

        canvas.addEventListener('mouseup', function(e) {
            var x = e.offsetX
            var y = e.offsetY
            g.enableDrag = false
       })
    }
}
