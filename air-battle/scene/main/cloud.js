class Cloud extends GameImage {
    constructor(game) {
        super(game, 'cloud')
        this.setUp()
    }

    setUp() {
        this.speed = randomBetween(1, 2)
        this.x = randomBetween(-100, 100 )
        this.y = -randomBetween(200, 250)
    }

    update() {
        this.y += this.speed
        if (this.y > config.height) {
            this.setUp()
        }
    }

    debug() {
        this.speed = config.cloud_speed
    }
}
