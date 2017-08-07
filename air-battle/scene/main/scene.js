class DjScene {
    constructor(game) {
        this.game = game
        this.elements = []

        //  set debug mode
        this.debugModeEnabled = true
    }

    static create(game) {
        var instance = new this(game)
        return instance
    }

    addElement(img) {
        img.scene = this
        var len = this.elements.length
        img.indexInScene = len
        this.elements.push(img)
    }

    removeElement(img) {
        var i = img.indexInScene
        //  删除当前的 img
        this.elements.splice(i, 1)
        //  其他元素的下标还有跟着改变
        this.elements.forEach((e, i) => {
            e.indexInScene = i
        })
    }

    draw() {
        var es = this.elements
        // log(es, 'es')
        var g = this.game
        es.forEach((e) => {
            // log(e.draw, 'e', e.draw)
            e.draw()
        })
    }

    update() {
        var es = this.elements

        //  debug mode
        if (this.debugModeEnabled) {
            es.forEach((e) => {
                //  if e.dug exist, then run e.debug
                e.debug && e.debug()
            })
        }
        // log(es, 'es')
        var g = this.game
        es.forEach((e) => {
            // log(e, 'e update')
            e.update()
        })
    }
}

class Scene extends DjScene {
    constructor(game) {
        super(game)
        this.setUp()
        this.setInputs()
    }

    setUp() {
        // log(this.game, 'game this')
        this.bg = GameImage.create(this.game, 'background')
        this.player = Player.create(this.game)
        // this.cloud = Cloud.create(this.game)

        this.addElement(this.bg)
        this.addElement(this.player)
        // this.addElement(this.cloud)

        //  addEnemies
        this.countsOfEnemies = 10
        this.addEnemies()

        // add partices
        this.ps = ParticleSystem.create(this.game)
        this.addElement(this.ps)
    }

    addEnemies() {
        var es = []
        for (var i = 0; i < this.countsOfEnemies; i++) {
            var e = Enemy.create(this.game)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }

    setInputs() {
        var s = this
        this.game.registerAction('a', function() {
            s.player.moveLeft()
        })
        this.game.registerAction('d', function() {
            s.player.moveRight()
        })
        this.game.registerAction('w', function() {
            s.player.moveUp()
        })
        this.game.registerAction('s', function() {
            s.player.moveDown()
        })
        this.game.registerAction('f', function() {
            s.player.fire()
        })
    }

    update() {
        super.update()
        this.enemies.forEach((e) => {

        })
    }
}
