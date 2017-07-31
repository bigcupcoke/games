var Game = function(fps, images, runCallback) {
    var g = {
        actions: {},
        keydowns: {},
        images: {},
        scene: null,
    }

    var canvas = document.querySelector('#dj-canvas')
    var context = canvas.getContext('2d')

    g.canvas = canvas
    g.context = context

    g.drawImg = function(o) {
        // log('o', this)
        g.context.drawImage(o.img, o.x, o.y)
    }

    g.clear = function() {
        this.context.clearRect(0, 0, canvas.width, canvas.height)
    }

    // update
    g.update = function() {
        g.scene.update()
    }
    // draw
    g.draw = function() {
        g.scene.draw()
    }

    // change keydowns  state
    window.addEventListener('keydown', function(e) {
        g.keydowns[e.key] = true
    })
    window.addEventListener('keyup', function(e) {
        g.keydowns[e.key] = false
    })

    //  registerAction
    g.registerAction = function(key, callback) {
        g.actions[key] = callback
        // log('cb', callback)
    }

    // loop render
    //  timeout 递归调用
    var renderLoop = function(fps) {
        //  timer
        var actions = Object.keys(g.actions)
        actions.forEach(function(key) {
            if (g.keydowns[key]) {
                g.actions[key]()
            }
        })

        g.update || g.update()
        // clear
        g.clear()
        //  draw
        g.draw || g.draw()

        // log('render success')
        setTimeout(function () {
            // log('fps', window.fps)
            renderLoop()
        }, 1000 / window.fps)
    }

    var loads = []
    var names = Object.keys(images)
    names.forEach(function(name, i) {
        var path = images[name]
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

    g.imageByName = function(name) {
        var img = g.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }

    g.runWithScene = function(scene) {
        g.scene = scene
        renderLoop()
    }

    g.replaceScene = function(scene) {
        g.scene = scene
    }

    g._start = function() {
        runCallback(g)
    }

    return g
}
