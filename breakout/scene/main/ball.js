class Ball {
    constructor(game) {
        this.game = game
        this.texture = game.textureByName('ball')
        this.w = this.texture.width
        this.h = this.texture.height
        this.x = config.ball.x
        this.y = config.ball.y
        this.speedX = config.ball.speedX
        this.speedY = config.ball.speedY
        this.fired = false
    }

    static create(game) {
        return new this(game)
    }

    boundX() {
        this.speedX *= -1
    }

    boundY() {
        this.speedY *= -1
    }

    bound() {
        this.boundX()
        this.boundY()
    }

    move() {
        var o = this
        if (o.fired) {
            if (o.x < 0 || o.x > 500) {
                o.boundX()
            }
            if (o.y < 0 || o.y > 400) {
                o.boundY()
            }
            o.x += o.speedX
            o.y += o.speedY
        }
    }

    fire() {
        this.fired = true
    }

    hasPoint(x, y) {
        var o = this
        var xIn = x >= o.x && x <= o.x + o.w
        var yIn = y >= o.y && y <= o.y + o.h
        return xIn && yIn
    }
}
