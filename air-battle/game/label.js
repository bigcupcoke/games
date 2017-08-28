class Label {
    constructor(game, text) {
        this.game = game
        this.text = text

    }

    static create(game, text) {
        var instance = new this(game, text)
        return instance
    }

    draw() {
        this.game.context.font = '25px serif'
        this.game.context.fillText(this.text, 100, 180)
    }

    update() {

    }
}
