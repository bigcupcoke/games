const config = {
    player_speed: 10,
    bullet_speed: 5,
    cloud_speed: 5,
    enemies_speed: 5,
    fire_cooldown: 5,
}


class DjScene{
    constructor(game) {
        this.game = game
        this.elements = []

        //  set debug mode
        this.debugModeEnabled = true
    }

    static create(game) {
        var instance = new this(game)
        return instance
    }

    addElements(img) {
        img.scene = this
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
        var es = this.elements

        //  debug mode
        if (this.debugModeEnabled) {
            es.forEach((e) => {
                //  if e.dug exist, then run e.debug
                e.debug && e.debug()
            })
        }
        // log(es, 'es')
        var g = this.game
        es.forEach((e) => {
            e.update()
        })
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
        this.cloud = Cloud.create(this.game)

        this.addElements(this.bg)
        this.addElements(this.player)
        this.addElements(this.cloud)

        //  addEnemies
        this.countsOfEnemies = 10
        this.addEnemies()
    }

    addEnemies() {
        var es = []
        for (var i = 0; i < this.countsOfEnemies; i++) {
            var e = Enemy.create(this.game)
            es.push(e)
            this.addElements(e)
        }
        this.enemies = es
    }

    setInputs() {
        var s = this
        this.game.registerAction('a', function() {
            s.player.moveLeft()
        })
        this.game.registerAction('d', function() {
            s.player.moveRight()
        })
        this.game.registerAction('w', function() {
            s.player.moveUp()
        })
        this.game.registerAction('s', function() {
            s.player.moveDown()
        })
        this.game.registerAction('f', function() {
            s.player.fire()
        })

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
        super.update()
        this.cloud.y ++
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
