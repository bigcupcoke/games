var loadLevel = function(game, n) {
    var n = n - 1
    var level = levels[n]
    var blocks = []
    level.forEach(function(e) {
        // log(e, 'e')
        var b = Block.create(game, e)
        blocks.push(b)
    })
    config.blocks = blocks
    log('blocks', blocks)
}

var enableDebugMode = function(game, enable) {
    if (!enable) {
        return
    }

    //  debug pause
    config.paused = false
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
            config.paused = !config.paused
        } else if ('123456789'.includes(k)) {
            loadLevel(game, Number(k))
        }
    })

    //  debug fps
    var input = document.querySelector('#id-input-fps')
    input.classList.add('active')
    input.addEventListener('input', function(e) {
        config.fps = this.value
    })
}

var __main = function() {
    var images = {
        ball: 'img/ball.png',
        block: 'img/block.png',
        paddle: 'img/paddle.png',
    }

    var game = Game.instance(config.fps, images, function(g) {
        var s = SceneBegin.create(g)
        // log(s, 's')
        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}

__main()
