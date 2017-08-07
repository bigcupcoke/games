class Particle extends GameImage {
    constructor(game) {
        super(game, 'particle')
        this.setUp()
    }

    setUp() {
        this.life = 100
    }

    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
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
        this.countsOfParticles = 30
        this.particles = []

        // 持续时间
        this.duration = 60
    }

    update() {
        // log('update in partice')
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

    //  remove system
    remove() {
        this.scene.removeElement(this)
    }

    draw() {
        //  粒子删除效果
        if (this.duration <= 0) {
            this.remove()
        } else {
            this.particles.forEach(function(p) {
                p.draw()
            })
        }
    }
}
