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

    addElements(img) {
        img.scene = this
        this.elements.push(img)
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

        var bg = GameImage.create(game, 'bg')
        this.addElements(bg)

        var bird = Bird.create(game)
        this.bird = bird
        this.addElements(bird)

        this.pipe = Pipes.create(game)
        log('this.pipe', this.pipe.pipes)
        this.addElements(this.pipe)

        //  黄色的 土
        this.earth = GameImage.create(game, 'earth')
        this.earth.y = 423
        this.addElements(this.earth)

        var slider = Slider.create(game)
        this.addElements(slider)

        this.setInputs()
    }

    setInputs() {
        var self = this
        self.game.registerAction('k', function(g) {
            var s = Scene.create(g)
            game.replaceScene(s)
        })

        self.game.registerAction('a', function(keyStatus) {
            self.g.move(-2, keyStatus)
            self.g.x -= 1
        })

        self.game.registerAction('d', function(keyStatus) {
            self.b.move(this.bird.speed, keyStatus)
        })

        self.game.registerAction('w', function(keyStatus) {
            self.bird.jump(-1)
        })
    }

    debug() {
        this.bird.speed = config.bird_speed.value
    }

    update() {
        super.update()
        this.debug && this.debug()
        var g = this.game
        this.pipe.pipes.forEach((p) => {
            if (this.bird.collide(p)) {
                // var s = SceneEnd.create(g)
                // g.replaceScene(s)
            }
        })
    }
}
