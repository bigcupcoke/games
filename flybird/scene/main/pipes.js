class Pipes {
    constructor(game) {
        this.game = game
        this.pipes = []
        this.spaceY = 150
        this.spaceX = 180
        this.columsOfPipes = 3
        for (var i = 0; i < this.columsOfPipes; i++) {
            var p1 = GameImage.create(game, 'pipe')
            p1.filpY = true
            p1.x = 500 + i * this.spaceX

            var p2 = GameImage.create(game, 'pipe')
            p2.x = p1.x
            this.resetPipesPostion(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }

    static create(game) {
        return new this(game)
    }

    resetPipesPostion(p1, p2) {
        p1.y = randomBetween(-400, -200)
        p2.y = p1.y + p2.h + this.spaceY
        log('p1, p2', p1.y, p2.y)
    }

    update() {
        var t = this
        for (var i = 0; i < this.pipes.length / 2; i++) {
            var p1 = this.pipes[i]
            var p2 = this.pipes[i + 1]
            p1.x -= 0.9
            p2.x = p1.x
            if (p1.x < -40) {
                p1.x = t.spaceX * t.columsOfPipes
                p2.x = p1.x
                this.resetPipesPostion(p1, p2)
            }
        }
        var debugMode = true
        if (debugMode) {
            this.debug()
        }
    }

    debug() {
        this.spaceX = config.pipe_spaceX.value
        this.spaceY = config.pipe_spaceY.value
    }

    draw() {
        var context = this.game.context
        this.pipes.forEach((p) => {
            context.save()
            var w2 = p.w / 2
            var h2 = p.h / 2
            // log(p.x, p.y, w2, h2)
            context.translate(p.x + w2, p.y + h2)

            var scaleX = p.filpY ? -1 : 1
            var scaleY = p.filpY ? -1 : 1
            // log(scaleX, scaleY)
            context.scale(scaleX, scaleY)

            context.rotate(p.rotation * Math.PI / 180)
            context.translate(-w2, -h2)
            context.drawImage(p.texture, 0, 0)
            context.restore()

        })
    }
}
