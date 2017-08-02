class DjScene{
    constructor(game) {
        this.game = game
        this.elements = []
    }

    static create(game) {
        var instance = new this(game)
        return instance
    }

    addElements(img) {
        this.elements.push(img)
    }

    draw() {
        var es = this.elements
        // log(es, 'es')
        var g = this.game
        es.forEach((e) => {
            g.drawImg(e)
        })
    }

    update() {

    }
}

class Scene extends DjScene {
    constructor(game) {
        super(game)
        // this.init()
        this.setUp()
        this.setInputs()
    }

    setUp() {
        // log(this.game, 'game this')
        this.bg = GameImage.create(this.game, 'background')
        this.player = Player.create(this.game)
        this.cloud = GameImage.create(this.game, 'cloud')

        this.addElements(this.bg)
        this.addElements(this.player)
        this.addElements(this.cloud)
    }

    setInputs() {
        var s = this
        this.game.registerAction('a', function() {
            s.player.moveLeft()
        })
        this.game.registerAction('d', s.player.moveRight)
        this.game.registerAction('w', s.player.moveUp)
        this.game.registerAction('s', s.player.movDown)
        // this.game.registerAction('f', this.ball.fire)
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
        this.cloud.y ++
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

    // draw() {
    //     var g = this.game
    //     g.drawImg(this.bg)
    //     g.drawImg(this.player)
    //     // g.drawImg(this.ball)
    //
    //     // for (var i = 0; i < window.blocks.length; i++) {
    //     //     log('blocks', blocks)
    //     //     var b = window.blocks[i]
    //     //     if (b.alive) {
    //     //         g.drawImg(b)
    //     //     }
    //     // }
    //     // g.context.fillText(`score: ${score}`, 30, 350)
    // }

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

var Paddle = function(game) {
    // var img = imageFromPath('paddle.png')
    // log('img', img)
    var o = {
        img: img,
        x: 100,
        y: 390,
        speed: 5,
        leftDown: false,
        rightDown: false,
    }
    var img = game.imageByName('paddle')
    o.img = img.image
    o.w = img.w
    o.h = img.h
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
