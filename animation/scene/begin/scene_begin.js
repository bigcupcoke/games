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

class SceneBegin extends DjScene {
    constructor(game) {
        super()
        this.game = game



        var label = Label.create(game, 'hello')
        this.addElements(label)

        var w = Animation.create(game)

        this.w = w
        w.x = 100
        w.y = 100
        this.addElements(w)

        this.setInputs()
    }

    setInputs() {
        var self = this
        self.game.registerAction('k', function(g) {
            var s = Scene.create(g)
            game.replaceScene(s)
        })

        self.game.registerAction('a', function(keyStatus) {
            self.w.move(-2, keyStatus)
        })

        self.game.registerAction('d', function(keyStatus) {
            self.w.move(2, keyStatus)
        })
    }
    //
    // update() {
    //
    // }
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
