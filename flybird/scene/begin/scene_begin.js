class SceneBegin extends DjScene {
    constructor(game) {
        super(game)

        // var begin = GameImage.create(game, 'begin')
        // begin.x = 90
        // begin.y = 90
        // this.addElements(begin)
        //
        // this.bird.empty()
        // this.bird.x = 150
        // this.bird.y = 200

        // var label = Label.create(game, '按 K 开始游戏， 按 W 键跳跃')
        // label.x = 0
        // label.y = 0
        // this.addElements(label)
        // this.initSlider()

        
        this.drawImg('begin')
        this.emptyBird()
        this.bird.x = 150
        this.bird.y = 250
        this.initSlider()
        this.drawLabel('按 K 开始游戏， 按 W 键跳跃')
        this.setInputs()
    }

    setInputs() {
        var g = this.game
        g.registerAction('k', function() {
            var s = Scene.create(g)
            g.replaceScene(s)
        })
    }

    debug() {

    }

    update() {
        super.update()
        this.debug && this.debug()
    }
}
