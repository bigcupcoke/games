class SceneEnd extends DjScene {
    constructor(game) {
        super()
        this.game = game
        game.registerAction('r', function() {
            var s = SceneBegin.create(game)
            game.replaceScene(s)
        })
    }

    draw() {
        this.game.context.fillText('GAME OVER', 250, 150)
    }
}
