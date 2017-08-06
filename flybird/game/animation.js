class Animation {
    constructor(game) {
        this.game = game

        this.status = {
            //  bird 闲置
            idle: [],
            //  bird up
            up: [],
            //  bird down
            down: [],
        }

        for (var i = 0; i < 2; i++) {
            var name = `bird${i}`
            var t = game.textureByName(name)
            this.status['idle'].push(t)
        }

        // for (var i = 0; i < 10; i++) {
        //     var name = `run${i}`
        //     var t = game.textureByName(name)
        //     this.status['run'].push(t)
        // }

        this.statusName = 'idle'

        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height
        this.frameIndex = 0
        this.frameCount = 20

        //  水平饭抓标志
        this.filpX = false

        //  y轴速度
        this.vy = 1
        //  重力加速度
        this.gy = 10
        this.factor = 0.05

        this.rotation = 45
    }

    static create(game) {
        return new this(game)
    }

    frames() {
        return this.status[this.statusName]
    }

    jump(v) {
        this.vy = v
        this.rotation = -45
    }


    update() {
        this.frameCount--
        if (this.frameCount === 0 ) {
            this.frameCount = 20
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }

        this.y += this.vy
        this.vy += this.gy * this.factor

        var h = 400
        if (this.y > h) {
            this.y = h
        }

        if (this.rotation < 45) {
            this.rotation += 5
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
        context.save()
        var w2 = this.w / 2
        var h2 = this.h / 2
        // log(this.x, this.y, w2, h2)
        context.translate(this.x + w2, this.y + h2)
        // if (this.filpX) {
        //     context.scale(-1, 1)
        // }
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, -h2)
        context.drawImage(this.texture, 0, 0)
        context.restore()
    }
}
