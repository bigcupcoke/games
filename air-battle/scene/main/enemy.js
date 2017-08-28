//  enemy 是图片， 应该去继承 image 里面东西
class Enemy extends GameImage {
    constructor(game) {
        var type = randomBetween(0, 3)
        var name = 'enemy' + type
        // log('Enemy()', name)
        super(game, name)
        this.colldown = config.fire_cooldown
        this.setUp()
    }

    setUp() {
        this.speed = randomBetween(1, 3)
        this.x = randomBetween(0, config.width - 50)
        this.y = -randomBetween(0, 200)
    }

    update() {
        this.colldown--
        this.fire()

        this.y += this.speed
        if (this.y > config.height) {
            this.setUp()
        }

        var p = this.scene.player
        if (this.collide(p)) {
            p.lifes--
            this.remove()
        }
    }

    debug() {
        this.speed = config.enemies_speed
    }

    fire() {
        if (this.colldown === 0) {
            this.colldown = config.fire_cooldown
            var x = this.x + this.w / 2
            var y = this.y + this.h
            var b = Bullet.create(this.game)
            b.x = x
            b.y = y
            b.origin = 'enemy'
            var bs = this.scene.bullets
            b.indexOfBs = bs.length
            this.scene.addElement(b)
            bs.push(b)
        }
    }
}
