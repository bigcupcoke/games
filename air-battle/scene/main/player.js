//  player 是图片， 应该去继承 image 里面东西
class Player extends GameImage {
    constructor(game) {
        super(game, 'player')
        this.lifes = config.lifes
        this.setUp()
    }

    setUp() {
        this.speed = 5
        this.x = 200
        this.y = 500
        this.colldown = 0
    }

    update() {
        // log('this.lifes', config.lifes, this.lifes)
        if (this.colldown > 0) {
            this.colldown--
        }
        this.fire()
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
            var bs = this.scene.bullets
            b.indexOfBs = bs.length
            this.scene.addElement(b)
            bs.push(b)
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
