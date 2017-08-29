class DjScene {
    constructor(game) {
        this.game = game
        this.elements = []

        //  set debug mode
        this.debugModeEnabled = true

        this.init()
    }

    static create(game) {
        var instance = new this(game)
        return instance
    }

    addElements(img) {
        img.scene = this
        this.elements.push(img)
    }

    init() {
        var game = this.game
        this.bg = GameImage.create(game, 'bg')
        this.addElements(this.bg)

        this.bird = Bird.create(game)
        this.addElements(this.bird)
    }

    initSlider() {
        this.slider = Slider.create(this.game)
        this.addElements(this.slider)
    }


    //  清空鸟的 飞行， 下降， 事件等
     // 为开始和结束场景准备的
    emptyBird() {
        this.bird.empty()
        this.bird.x = 150
        this.bird.y = 200
    }

    //  画标语, 为开始和结束场景准备的
    drawLabel(text) {
        var label = Label.create(this.game, text)
        label.x = 0
        label.y = 0
        this.addElements(label)
    }

   //  画图, 为开始和结束场景准备的
    drawImg(name) {
        this.image = GameImage.create(this.game, name)
        this.image.y = 150
        this.image.x = 50
        this.addElements(this.image)
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


        this.pipe = Pipes.create(game)
        // log('this.pipe', this.pipe.pipes)
        this.addElements(this.pipe)

        //  滑条下面黄色的土部分
        this.earth = GameImage.create(game, 'earth')
        this.earth.y = 423
        this.addElements(this.earth)

        this.initSlider()
        this.setInputs()
    }

    setInputs() {
        var t = this

        t.game.registerAction('w', function(keyStatus) {
            t.bird.jump(-1)
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
                var s = SceneEnd.create(g)
                g.replaceScene(s)
            } else if (p.passed) {
                config.score++
                delete p.passed
            }
        })
    }

    draw() {
        super.draw()
        this.game.context.fillText(`当前分数 ${config.score}`, 0, 50)
    }
}
