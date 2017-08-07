class Label {
    constructor(game, text) {
        this.game = game
        this.text = text

    }

    static create(game, text) {
        var instance = new this(game, text)
        return instance
    }

    draw() {
        this.game.context.fillText(this.text, 200, 180)
    }

    update() {

    }
}

class Pipes {
    constructor(game) {
        this.game = game
        this.pipes = []

        this.spaceY = 150
        this.spaceX = 180
        this.columsOfPipes = 3
        for (var i = 0; i < this.columsOfPipes; i++) {
            var p1 = GameImage.create(game, 'pipe')
            p1.filpY = true
            p1.x = 500 + i * this.spaceX

            var p2 = GameImage.create(game, 'pipe')
            p2.x = p1.x
            this.resetPipesPostion(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }

    static create(game) {
        return new this(game)
    }

    resetPipesPostion(p1, p2) {
        p1.y = randomBetween(-400, -200)
        p2.y = p1.y + p2.h + this.spaceY
        log('p1, p2', p1.y, p2.y)
    }

    update() {
        var t = this
        for (var p of this.pipes) {
            p.x -= 0.9
            if (p.x < -40) {
                p.x = t.spaceX * t.columsOfPipes
            }
        }
    }

    draw() {
        var context = this.game.context
        this.pipes.forEach((p) => {
            context.save()
            var w2 = p.w / 2
            var h2 = p.h / 2
            // log(p.x, p.y, w2, h2)
            context.translate(p.x + w2, p.y + h2)

            var scaleX = p.filpY ? -1 : 1
            var scaleY = p.filpY ? -1 : 1
            // log(scaleX, scaleY)
            context.scale(scaleX, scaleY)

            context.rotate(p.rotation * Math.PI / 180)
            context.translate(-w2, -h2)
            context.drawImage(p.texture, 0, 0)
            context.restore()

        })
    }
}

class SceneBegin extends DjScene {
    constructor(game) {
        super()
        this.game = game



        // var label = Label.create(game, 'hello')
        // this.addElements(label)

        var bg = GameImage.create(game, 'bg')
        this.addElements(bg)



        var bird = Animation.create(game)
        this.bird = bird
        bird.x = 100
        bird.y = 100
        this.addElements(bird)
        this.setInputs()

        this.pipe = Pipes.create(game)
        this.addElements(this.pipe)


        this.earth = GameImage.create(game, 'earth')
        this.earth.y = 423
        this.addElements(this.earth)

        this.grounds = []
        for (var i = 0; i < 3; i++) {
            var g = GameImage.create(game, 'banner')
            g.y = 423
            g.x = i * 340
            g.speed = 0.5
            this.addElements(g)
            this.grounds.push(g)
        }
        this.g = g
    }

    setInputs() {
        var self = this
        self.game.registerAction('k', function(g) {
            var s = Scene.create(g)
            game.replaceScene(s)
        })

        self.game.registerAction('a', function(keyStatus) {
            // self.g.move(-2, keyStatus)
            // self.g.x -= 1
        })

        self.game.registerAction('d', function(keyStatus) {
            self.b.move(2, keyStatus)
        })

        self.game.registerAction('w', function(keyStatus) {
            self.bird.jump(-1)
        })
    }

    update() {
        super.update()
        var g = this.game
        // log('this.piep', this.pipe)
        this.pipe.pipes.forEach((p) => {
            if (this.bird.collide(p)) {
                var s = SceneEnd.create(g)
                g.replaceScene(s)
            }
        })

        this.grounds.forEach((g) => {
            g.x -= g.speed
            var x = 300
            if (g.x < -x) {
                g.x = x
            }
        })
        // //  y add
        // this.y += this.vy
        // //  v =at, a add
        // this.vy += this.gy * 0.1
    }
}

class Particle extends GameImage {
    constructor(game) {
        super(game, 'fire')
        this.setUp()
    }

    setUp() {
        this.life = 60
    }

    init(x, y, vx, vy) {
        // log(x, y, 'init in Particle befor')
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
        // log(this.x, y, 'init in Particle()')
    }

    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
        // 速度增加
        var factor = 0.01
        this.vx += factor * this.vx
        this.vy += factor * this.vy

    }
}


class ParticleSystem {
    constructor(game) {
        this.game = game
        this.setUp()
    }

    static create(game) {
        return new this(game)
    }

    setUp() {
        this.x = 100
        this.y = 100
        this.countsOfParticles = 100
        this.particles = []

        // 持续时间
        this.duration = 60
    }

    update() {
        //  add particals
        this.duration--
        this.countsOfParticles--
        if (this.particles.length <　this.countsOfParticles) {
            var p = Particle.create(this.game)

            //  设置初始左边
            var s = 2
            var vx = 0.1 * randomBetween(-s, s)
            var vy = 0.1 * randomBetween(-s, s)
            // log(vx, vy)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }

        //  update  particles
        this.particles.forEach(function(p) {
            // log(p, ' pin  partices')
            p.update()
        })

        // 删除 fire
        this.particles = this.particles.filter((p) => p.life > 0)

    }

    draw() {
        //  TODO:　粒子删除效果
        if (this.duration < 0) {
            return
        }
        // log('darw in system ini', this.particles)
        this.particles.forEach(function(p) {
            // log('darw in system ini ')
            p.draw()
        })
    }
}
