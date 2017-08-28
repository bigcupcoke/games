class SceneBegin extends DjScene {
    constructor(game) {
        super(game)
        this.game = game
        this.setUp()
    }

    setUp() {
        var g = this.game
        var b = GameImage.create(g, 'begin')
        this.addElement(b)

        var label = Label.create(g, '按 K 键开始游戏')
        this.addElement(label)

        g.registerAction('k', function() {
            var s = Scene.create(g)
            g.replaceScene(s)
        })
    }
}
