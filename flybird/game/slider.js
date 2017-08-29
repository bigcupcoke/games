//  滑条， 下方的
class Slider {
    constructor(game) {
        this.game = game
        this.sliders = []
        this.init()
    }

    static create(game) {
        return new this(game)
    }

    init() {
        for (var i = 0; i < 3; i++) {
            var b = GameImage.create(this.game, 'slider')
            b.y = 423
            b.x = i * 340
            b.speed = 0.5
            this.sliders.push(b)
        }
    }

    update() {
        this.sliders.forEach((e) => {
            e.x -= e.speed
            var x = 300
            if (e.x < -x) {
                e.x = x
            }
        })
    }

    draw() {
        this.sliders.forEach((e) => {
            e.draw()
        })
    }
}
