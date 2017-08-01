class Game {
    constructor(fps, images, runCallback) {
        window.fps = fps
        this.images = images
        this.runCallback = runCallback

        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.canvas = document.querySelector('#dj-canvas')
        this.context = this.canvas.getContext('2d')

        // change keydowns  state
        var self = this
        window.addEventListener('keydown', function(e) {
            self.keydowns[e.key] = true
        })
        window.addEventListener('keyup', function(e) {
            self.keydowns[e.key] = false
        })

        this.init()
    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    drawImg(o) {
        // log('o', this)
        this.context.drawImage(o.img, o.x, o.y)
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    // update
    update() {
        this.scene.update()
    }

    // draw
    draw() {
        log('g.draw')
        this.scene.draw()
    }

    //  registerAction
    registerAction(key, callback) {
        this.actions[key] = callback
        // log('cb', callback)
    }

    // loop render
    //  timeout 递归调用
    renderLoop(fps) {
        //  timer
        var g = this
        var actions = Object.keys(g.actions)
        actions.forEach(function(key) {
            if (g.keydowns[key]) {
                g.actions[key]()
            }
        })

        g.update()
        // clear
        g.clear()
        //  draw
        g.draw()

        // log('render success')

        setTimeout(function () {
            // log('fps', window.fps)
            g.renderLoop()
        }, 1000 / window.fps)
    }

    imageByName(name) {
        var g = this
        var img = g.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }

    runWithScene(scene) {
        var g = this
        g.scene = scene
        g.renderLoop()
    }

    replaceScene(scene) {
        this.scene = scene
    }

    _start() {
        // log('_start')
        this.runCallback(this)
    }

    init() {
        var g = this
        var loads = []
        var names = Object.keys(g.images)
        names.forEach(function(name, i) {
            var path = g.images[name]
            let img = new Image()
            img.src = path
            img.onload = function() {
                // 存入 g.images 中
                g.images[name] = img
                loads.push(1)
                if (loads.length === names.length) {
                    g._start()
                }
            }
        })
    }
}
