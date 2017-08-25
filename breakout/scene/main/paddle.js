class Paddle {
    constructor(game) {
        this.game = game
        this.texture = game.textureByName('paddle')
        this.w = this.texture.width
        this.h = this.texture.height
        this.x = config.paddle.x
        this.y = config.paddle.y
        this.speed =  config.paddle.speed
        this.leftDown =  false
        this.rightDown =  false
    }

    static create(game) {
        return new this(game)
    }

    move(x) {
        var o = this;
        if(x < 0) {
            x = 0
        } else if (x > 500 - o.w) {
            x = 500 - o.w
        }
        o.x = x
    }

    moveLeft() {
        var o = this
        o.move(o.x - o.speed)
    }

    moveRight() {
        var o = this
        o.move(o.x + o.speed)
    }

    collide(ball) {
        // log('collide')
        var result = false
        var o = this
        // log(ball.h, 'ball .y + h')
        // log(o.y, 'paddle .y')
        if (ball.y + ball.h > o.y) {
            if (ball.x > o.x && ball.x < o.x + o.w) {
                log('相撞')
                result = true
            }
        }
        return result
    }
}
