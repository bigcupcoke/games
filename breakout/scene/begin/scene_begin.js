class SceneBegin extends DjScene {
    constructor(game) {
        super()
        this.game = game
        game.registerAction('k', function() {
            var s = Scene.create(game)
            game.replaceScene(s)
        })

        game.registerAction('e', function() {
            var s = SceneEdit.create(game)
            game.replaceScene(s)
        })
    }

    draw() {
        this.game.context.fillText('按 K 键开始游戏', 150, 150)
        this.game.context.fillText('按 E 键编辑关卡', 150, 200)
    }
}
