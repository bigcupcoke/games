class Block {
    constructor(game, positon) {
        this.game = game
        this.texture = game.textureByName('block')
        this.w = this.texture.width
        this.h = this.texture.height
        this.x = positon.x
        this.y = positon.y
        this.alive = true
        //  life 的 复数其实应该是lives, 但为了保持一致性，复数全部用 +s 的方法表示
        this.lifes = positon.lifes || 1
    }

    static create(game, positon) {
        return new this(game, positon)
    }

    collide(b) {
        var o = this
        return o.alive && (rectIntersects(o, b) || rectIntersects(b, o))
    }

    kill() {
        this.lifes--
        if (this.lifes < 1) {
            this.alive = false
        }
    }
}
