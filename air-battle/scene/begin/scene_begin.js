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
        this.game.context.fillText(this.text, 200, 180)
    }

    update() {

    }
}

class SceneBegin extends DjScene {
    constructor(game) {
        super()
        this.game = game
        game.registerAction('k', function() {
            var s = Scene.create(game)
            game.replaceScene(s)
        })

        var label = Label.create(game, 'hello')
        this.addElement(label)

        var ps = ParticleSystem.create(this.game)
        this.addElement(ps)
        // log('ps', this.elements)
    }
}
