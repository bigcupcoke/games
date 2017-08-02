class Animation {
    constructor(game) {
        this.game = game
        this.frames = []
        for (var i = 0; i < 10; i++) {
            var name = `w${i}`
            var t = game.textureByName(name)
            this.frames.push(t)
        }

        this.texture = this.frames[0]
        this.frameIndex = 0
        this.frameCount = 3
    }

    static create(game) {
        return new this(game)
    }

    update() {
        this.frameCount--
        if (this.frameCount === 0 ) {
            this.frameCount = 3
            this.frameIndex = (this.frameIndex + 1) % this.frames.length
            this.texture = this.frames[this.frameIndex]
        }
    }

    move(offset) {
        this.x += offset
    }

    draw() {
        this.game.drawImg(this)
    }
}
