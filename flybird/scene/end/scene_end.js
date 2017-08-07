class SceneEnd extends DjScene {
    constructor(game) {
        super()
        this.game = game
        game.registerAction('r', function() {
            var s = SceneBegin.create(game)
            game.replaceScene(s)
        })

        this.bg = GameImage.create(game, 'bg')
        this.addElements(this.bg)

        this.over = GameImage.create(game, 'gameover')
        this.over.y = 200
        this.over.x = 50
        this.addElements(this.over)
    }

    // draw() {
    //     this.game.context.fillText('GAME OVER', 250, 150)
    // }
}
