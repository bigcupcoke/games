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
        game.registerAction('k', function() {
            var s = Scene.create(game)
            game.replaceScene(s)
        })

        var label = Label.create(game, 'hello')
        this.addElements(label)

        var ps = ParticleSystem.create(this.game)
        this.addElements(ps)
        log('ps', this.elements)
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
        // this.x = 100
        // this.y = 100
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
        this.x += this.vx
        this.y += this.vy
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
        this.countsOfParticles = 10
        this.particles = []
    }

    update() {
        //  add particals
        if (this.particles.length <　this.countsOfParticles) {
            var p = Particle.create(this.game)
            var vx = 0.1 * randomBetween(-10, 10)
            var vy = 0.1 * randomBetween(-10, 10)
            log(vx, vy)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }

        //  update  particles
        this.particles.forEach(function(p) {
            // log(p, ' pin  partices')
            p.update()
        })

    }

    draw() {
        // log('darw in system ini', this.particles)
        this.particles.forEach(function(p) {
            // log('darw in system ini ')
            p.draw()
        })
    }
}
