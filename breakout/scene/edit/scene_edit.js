class SceneEdit extends DjScene {
    constructor(game) {
        super()
        this.game = game
        this.blocks = []
        this.bh = game.textureByName('block').height
        this.bw = game.textureByName('block').width
        this.init()
    }

    static create(game) {
        return new this(game)
    }

    init() {
        this.mouseEvent()
        this.registerAction()
    }

    registerAction() {
        var t = this
        t.game.registerAction('s', function() {
            t.save()
            t.play()
        })
    }

    mouseEvent() {
        var t = this
        var g = t.game
        var canvas = g.canvas
        var n = 1
        canvas.addEventListener('click', function(event) {
            var bs = t.blocks
            // log(len, bs)
            var x = event.offsetX
            var y = event.offsetY
            var p = {
                x: x,
                y: y,
            }
            bs.push(p)
        })
    }

    play() {
        var g = this.game
        var ls = localStorage.levels
        var blocks = JSON.parse(ls)
        var bs = blocks.map(function(e) {
            return Block.create(g, e)
        })
        config.blocks = bs
        var s = Scene.create(g)
        this.game.replaceScene(s)
    }

    save() {
        var bs = this.blocks
        var s = JSON.stringify(bs)
        // log('saved', s)
        localStorage.levels = s
    }

    update() {

    }

    draw() {
        var g = this.game
        this.blocks.forEach(function(e) {
            // log(e, 'e')
            var b = Block.create(g, e)
            g.drawImg(b)
        })

        this.drawText()
    }

    drawText() {
        var g = this.game
        g.context.fillText('点击空白区域生成砖块', 150, 340)
        g.context.fillText('按 S 键保存并开始刚刚已编辑关卡', 150, 360)
    }
}
