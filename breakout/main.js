var loadLevel = function(game, n) {
    var n = n - 1
    var level = levels[n]
    var blocks = []
    level.forEach(function(e) {
        // log(e, 'e')
        var b = Block(game, e)
        blocks.push(b)
    })
    return blocks
}

var enableDebugMode = function(game, ball, enable) {
    if (!enable) {
        return
    }

    //  debug pause
    window.paused = false
    var pause = function() {
        window.addEventListener('keydown', function(e) {
            if (e.key === 'p') {
                paused = !paused
            }
        })
    }

    //  debug level
    window.addEventListener('keydown', function(e) {
        var k = e.key
        if (k === 'p') {
            //  paused
            window.paused = !window.paused
        } else if ('123456789'.includes(k)) {
            blocks = loadLevel(game, Number(k))
        }
    })

    //  debug fps
    var input = document.querySelector('#id-input-fps')
    input.classList.add('active')
    input.addEventListener('input', function(e) {
        window.fps = this.value
    })

    // mouse event
    var enableDrag = false
    var canvas = game.canvas
    canvas.addEventListener('mousedown', function(e) {
        var x = e.offsetX
        var y = e.offsetY
        // log('down', x, y)
        if (ball.hasPoint(x, y)) {
            // log('hasPoint true', x, y)
            // 设置拖拽状态
            enableDrag = true
        }
    })

    canvas.addEventListener('mousemove', function(e) {
        var x = e.offsetX
        var y = e.offsetY
        if (enableDrag) {
            ball.x = x
            ball.y = y
        }
    })

    canvas.addEventListener('mouseup', function(e) {
        var x = e.offsetX
        var y = e.offsetY
        enableDrag = false
    })
}

var __main = function() {
    var images = {
        ball: 'ball.png',
        block: 'block.png',
        paddle: 'paddle.png',
    }

    var game = Game(window.fps, images, function(g) {
        var s = Scene(g)
        g.runWithScene(s)
        enableDebugMode(g, true)
    })
}

__main()
