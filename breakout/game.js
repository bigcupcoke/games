var Game = function(fps) {
    var g = {
        actions: {},
        keydowns: {
            'a': false,
            'd': false,
        },
        update: function() {},
        draw: function() {},
    }

    var canvas = document.querySelector('#dj-canvas')
    var context = canvas.getContext('2d')

    g.canvas = canvas
    g.context = context

    g.drawImg = function(o) {
        // log('o', this)
        this.context.drawImage(o.img, o.x, o.y)
    }

    g.clear = function() {
        this.context.clearRect(0, 0, canvas.width, canvas.height)
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
        log('cb', callback)
    }

    //  timer
    setInterval(function () {
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
    }, 1000 / fps)

    return g
}
