class SceneEnd extends DjScene {
    constructor(game) {
        super(game)
        this.game = game
        this.setUp()
    }

    setUp() {
        var g = this.game
        var b = GameImage.create(this.game, 'begin')
        this.addElement(b)

        var label = Label.create(g, 'GAME OVER, 按 R 键开始游戏')
        this.addElement(label)

        g.registerAction('r', function() {
            var s = SceneBegin.create(g)
            g.replaceScene(s)
        })
        log('end sce')
    }
}
