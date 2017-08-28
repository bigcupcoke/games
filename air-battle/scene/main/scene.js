class DjScene {
    constructor(game) {
        this.game = game
        this.elements = []
        this.game.scene = this
        //  set debug mode
        this.debugModeEnabled = true
    }

    static create(game) {
        var instance = new this(game)
        return instance
    }

    addElement(ele) {
        var len = this.elements.length
        ele.index = len
        this.elements.push(ele)
    }

    removeElement(ele) {
        var es = this.elements
        var i = ele.index
        this.elements.splice(i, 1)
        es.forEach(function(e, i) {
            e.index = i
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
        this.cloud = Cloud.create(this.game)
        this.player = Player.create(this.game)
        // this.cloud = Cloud.create(this.game)

        this.addElement(this.bg)
        this.addElement(this.cloud)
        this.addElement(this.player)
        // this.addElement(this.cloud)

        //  addEnemies
        this.countsOfEnemies = 10
        this.addEnemies()

        // add partices
        this.ps = ParticleSystem.create(this.game)
        this.addElement(this.ps)

        this.bullets = []
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

    addBullets() {
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

    draw() {
        super.draw()
        this.game.context.fillText(`生命值${this.player.lifes}`, 10, 550)
    }

    update() {
        super.update()
        if (this.player.lifes <= 0) {
            var s = SceneEnd.create(this.game)
            this.game.replaceScene(s)
        }
    }
}
