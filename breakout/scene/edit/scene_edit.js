class SceneEdit extends DjScene {
    constructor(game, index) {
        super()
        this.game = game
        this.index = index
        this.blocks = []
        this.bh = game.textureByName('block').height
        this.bw = game.textureByName('block').width
        var s = JSON.stringify(levels)
        localStorage.levels = s
        // log(this.bh, this.bw)
        this.init()
    }

    static create(game, index) {
        return new this(game, index)
    }

    init() {
        this.mouseEvent()
        this.registerAction()
    }

    registerAction() {
        var t = this
        t.game.registerAction('s', function() {
            t.save()
        })
    }

    mouseEvent() {
        var t = this
        var g = t.game
        var canvas = g.canvas
        var n = 1
        canvas.addEventListener('click', function(event) {
            var bs = t.blocks
            var len = bs.length
            log(len, bs)
            var x = event.offsetX
            var y = event.offsetY
            var p = {}
            p.x = x
            p.y = y
            // log('p', p)
            // if (len === 0) {
            bs.push(p)
            // } else {
            //     for (var i = 0; i < len; i++) {
            //         var e = bs[i]
            //         if (x > e.x && (x < e.x + t.bw) && y > e.y  && (y < e.y + t.bh)) {
            //             log('这个位置已经有砖块le')
            //         } else {
            //             bs.push(p)
            //         }
            //     }
            // }
        })
    }

    save() {
        var ls = localStorage.levels
        var levels = JSON.parse(ls)
        log(this.index, 'index')
        levels[this.index] = this.blocks
        var s = JSON.stringify(levels)
        log('saved', s)
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
    }
}
