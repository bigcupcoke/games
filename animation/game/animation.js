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
        this.frameIndex = 0
        this.frameCount = 3
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
        this.x += offset
        var  statusNames = {
            down: 'idle',
            up: 'run',
        }
        log('keyStatus', keyStatus)
        var name = statusNames[keyStatus]
        this.changeSituation(name)
    }

    changeSituation(name) {
        this.statusName = name
    }

    draw() {
        this.game.drawImg(this)
    }
}
