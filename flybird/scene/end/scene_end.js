class SceneEnd extends DjScene {
    constructor(game) {
        super(game)

        game.registerAction('r', function() {
            var s = SceneBegin.create(game)
            game.replaceScene(s)
        })

        this.drawImg('gameover')
        this.drawLabel(`共得${config.score} 分`)
        this.emptyBird()
        this.initSlider()
    }
}
