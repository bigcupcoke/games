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

var enableDebugMode = function(game, enable) {
    if (!enable) {
        return
    }

    // log('debugMode true')
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
}

var __main = function() {
    var images = {
        //  bird
        bg: 'img/bg.jpg',
        bird0: 'img/bird0.png',
        bird1: 'img/bird1.png',

        begin: 'img/head.jpg',
        slider: 'img/banner.jpg',
        pipe: 'img/pipe.png',
        earth: 'img/earth.png',
        gameover: 'img/game_over.jpg',
    }

    var game = Game.instance(window.fps, images, function(g) {
        var s = SceneBegin.create(g)
        // var s = SceneEnd.create(g)
        // var s = Scene.create(g)
        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}

__main()
