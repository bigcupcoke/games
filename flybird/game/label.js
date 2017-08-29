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
        this.game.context.fillText(this.text, 0, 30)
    }

    update() {

    }
}
