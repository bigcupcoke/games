class SceneBegin extends DjScene {
    constructor(game) {
        super()
        this.game = game
        game.registerAction('k', function() {
            var s = Scene.create(game)
            game.replaceScene(s)
        })
    }

    draw() {
        this.game.context.fillText('welcome to break out press k to begin', 200, 180)
    }
}
