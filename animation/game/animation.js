class Animation {
    constructor(game) {
        this.game = game

        this.status = {
            //  ariplane 暂时代替闲置
            idle: [],
            //  block 代替 run
            run: [],
        }

        for (var i = 0; i < 10; i++) {
            var name = `w${i}`
            var t = game.textureByName(name)
            this.status['idle'].push(t)
        }

        for (var i = 0; i < 10; i++) {
            var name = `run${i}`
            var t = game.textureByName(name)
            this.status['run'].push(t)
        }

        this.statusName = 'idle'

        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.w = this.texture.height
        this.frameIndex = 0
        this.frameCount = 3

        //  水平饭抓标志
        this.filpX = false
    }

    static create(game) {
        return new this(game)
    }

    frames() {
        return this.status[this.statusName]
    }
    update() {
        this.frameCount--
        if (this.frameCount === 0 ) {
            this.frameCount = 3
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }

    move(offset, keyStatus) {
        this.filpX = (offset < 0)
        this.x += offset
        var  statusNames = {
            down: 'idle',
            up: 'run',
        }
        var name = statusNames[keyStatus]
        this.changeSituation(name)
    }

    changeSituation(name) {
        this.statusName = name
    }

    draw() {
        var context = this.game.context
        if (this.filpX) {
            context.save()

            var x = this.x + this.w / 2
            context.translate(x, 0)
            context.scale(-1, 1)
            context.translate(-x, 0)
            context.drawImage(this.texture, this.x, this.y)
            context.restore()
        } else {
             context.drawImage(this.texture, this.x, this.y)
        }
    }
}
