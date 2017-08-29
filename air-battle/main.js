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
    // window.addEventListener('keydown', function(e) {
    //     var k = e.key
    //     if (k === 'p') {
    //         //  paused
    //         config.paused = !config.paused
    //     } else if ('123456789'.includes(k)) {
    //         blocks = loadLevel(game, Number(k))
    //     }
    // })

    //  debug fps
    var input = document.querySelector('#id-input-fps')
    input.classList.add('active')
    input.addEventListener('input', function(e) {
        window.fps = this.value
    })
}

var __main = function() {
    var images = {
        bullet: 'img/ball.png' ,
        player: 'img/player.png',
        begin: 'img/begin.jpg',
        background: 'img/bg.jpg',
        cloud: 'img/cloud0.png',
        enemy0: 'img/enemy0.png',
        enemy1: 'img/enemy1.png',
        enemy2: 'img/enemy2.png',
        enemy3: 'img/enemy3.png',
        particle: 'img/ball.png',
    }

    var game = Game.instance(30, images, function(g) {
        var s = SceneBegin.create(g)
        // var s = Scene.create(g)
        // log(s, 's')
        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}

__main()
