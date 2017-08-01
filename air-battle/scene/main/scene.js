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
        this.bg = GameImage.create(game, 'background')
        // this.init()
    }

    registerAction() {
        this.game.registerAction('a', this.paddle.moveLeft)
        this.game.registerAction('d', this.paddle.moveRight)
        this.game.registerAction('f', this.ball.fire)
    }

    init() {
        // TODO: 考虑如何消除这些全局变量
        window.fps = 50
        window.blocks = []
        window.blocks = loadLevel(this.game, 1)
        window.score = 0
        this.paddle = Paddle(this.game)
        this.ball = Ball(this.game)

        this.registerAction()
        this.mouseEvent()
    }

    update() {
        // if (window.paused) {
        //     return
        // }
        //
        // var b = this.ball
        // b.move()
        // if (b.y >= 400) {
        //     var s = SceneEnd.create(this.game)
        //     this.game.replaceScene(s)
        // }
        //
        // var p = this.paddle
        // if (p.collide(b)) {
        //     b.bound()
        // }
        //
        // for (var i = 0; i < window.blocks.length; i++) {
        //     log('blocks',  window.blocks)
        //     var blocks = window.blocks[i]
        //     if(blocks.collide(b)) {
        //         b.boundY()
        //         block.kill()
        //         //  score +100 when ball ana block collide
        //         window.score += 100
        //     }
        // }
    }

    draw() {
        var g = this.game
        g.drawImg(this.bg)
        // g.drawImg(this.ball)

        // for (var i = 0; i < window.blocks.length; i++) {
        //     log('blocks', blocks)
        //     var b = window.blocks[i]
        //     if (b.alive) {
        //         g.drawImg(b)
        //     }
        // }
        // g.context.fillText(`score: ${score}`, 30, 350)
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
