class GameImage {
    constructor(game, name) {
        this.game = game
        this.texture = this.game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height

        //  scene
        this.scene = this.game.scene
        //  在 secne 中下标
        this.indexInScene = -1
    }

    static create(game, name) {
        var instance = new this(game, name)
        return instance
    }

    remove() {
        this.scene.removeElement(this)
    }

    draw() {
        this.game.drawImg(this)
    }

    update() {

    }
}

class Bullet extends GameImage {
    constructor(game) {
        super(game, 'bullet')

        //  子弹来源
        this.origin = null
        this.setUp()
    }

    setUp() {
        this.speed = 1
    }

    debug() {
        this.speed = config.player_speed
    }

    updateFromPlayer(bullet) {
        var b = bullet
        var s = b.scene
        var es = s.enemies
        b.y -= b.speed
        es.forEach((e) => {
            // log(e, 'e')
            if (b.collide(e)) {
                log('player fired enemies')
                var x = e.x + e.w / 2
                var y = e.y + e.h / 2
                var ps = ParticleSystem.create(b.game)
                b.scene.addElement(ps)
                ps.x = x
                ps.y = y
                b.remove()
                e.setUp()
            }
        })
    }

    updateFromEnemy(bullet) {
        var b = bullet
        var s = b.scene
        var p = s.player
        b.y += b.speed
        if (b.collide(p)) {
            log('player been fired')
        }
    }

    update() {
        var b = this
        var o = b.origin
        var updateFromOrigin = {
            player: b.updateFromPlayer,
            enemy: b.updateFromEnemy,
        }
        updateFromOrigin[o](b)
    }

    collide(b) {
        var a = this
        return  rectIntersects(a, b) || rectIntersects(b, a)
    }

}

//  player 是图片， 应该去继承 image 里面东西
class Player extends GameImage {
    constructor(game) {
        super(game, 'player')
        this.setUp()
    }

    setUp() {
        this.speed = 5
        this.x = 0
        this.colldown = 0
    }

    update() {
        if (this.colldown > 0) {
            this.colldown--
        }
    }

    debug() {
        this.speed = config.player_speed
    }

    fire() {
        if (this.colldown === 0) {
            this.colldown = config.fire_cooldown
            var x = this.x + this.w / 2
            var y = this.y
            var b = Bullet.create(this.game)
            b.x = x
            b.y = y
            b.origin = 'player'
            this.scene.addElement(b)
        }
    }

    moveLeft() {
        this.x -= this.speed
    }

    moveRight() {
        this.x += this.speed
    }

    moveUp() {
        this.y -= this.speed
    }

    moveDown() {
        this.y += this.speed
    }
}

//  enemy 是图片， 应该去继承 image 里面东西
class Enemy extends GameImage {
    constructor(game) {
        var type = randomBetween(0, 2)
        var name = 'enemy' + type
        super(game, name)
        this.colldown = config.fire_cooldown
        this.setUp()
    }

    setUp() {
        this.speed = randomBetween(1, 3)
        this.x = randomBetween(0, 280)
        this.y = -randomBetween(0, 100)
    }

    update() {
        this.y += this.speed
        if (this.y > 400) {
            this.setUp()
        }
        this.colldown--
        this.fire()
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
            // log(b, 'this b')
            this.scene.addElement(b)
        }
    }
}

class Cloud extends GameImage {
    constructor(game) {
        // var type = randomBetween(0, 4)
        // var name = 'cloud' + type
        super(game, 'cloud')
        this.setUp()
    }

    setUp() {
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(0, 250)
        this.y = -randomBetween(0, 100)
    }

    update() {

        this.y += this.speed
        if (this.y > 400) {
            this.setUp()
        }
    }

    debug() {
        this.speed = config.cloud_speed
    }
}
