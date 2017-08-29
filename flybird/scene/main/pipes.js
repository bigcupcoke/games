class Pipes {
    constructor(game) {
        this.game = game
        this.scene = this.game.scene
        this.pipes = []
        this.spaceY = 150
        this.spaceX = 170
        this.columsOfPipes = 3
        for (var i = 0; i < this.columsOfPipes; i++) {
            var p1 = GameImage.create(game, 'pipe')
            var p2 = GameImage.create(game, 'pipe')
            p1.filpY = true
            //  passed 是否被小鸟飞过
            p1.passed = false
            p1.x = 500 + i * this.spaceX
            p2.x = 500 + i * this.spaceX
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
    }

    //  出界
    outSide(p1, p2) {
        var t = this
        if (p1.x < -40) {
            p1.x = t.spaceX * t.columsOfPipes
            p2.x = p1.x
            p1.passed = false
            // log('p1x', p1.x)
            t.resetPipesPostion(p1, p2)
        }
    }

    update() {
        var t = this
        for (var i = 0; i < this.pipes.length; i+=2) {
            var p1 = this.pipes[i]
            var p2 = this.pipes[i + 1]
            p1.x -= 0.9
            p2.x = p1.x
            // log('x', i, p1.x)

            var bird = this.scene.bird
            // 小鸟飞过管子
            if (p1.x + p1.w < bird.x) {
                //  passed属性存在则 true
                if (p1.passed !== undefined) {
                    p1.passed = true
                }
            }

            t.outSide(p1, p2)
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
