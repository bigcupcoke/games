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
        bullet: 'img/bullet.png' ,
        sky: 'img/sky.png',
        player: 'img/player.png',
        begin: 'img/begin.jpg',
        background: 'img/bg.jpg',
        enemy0: 'img/enemy0.png',
        enemy1: 'img/enemy1.png',
        enemy2: 'img/enemy2.png',
        fire: 'img/ball.png',
    }

    var game = Game.instance(window.fps, images, function(g) {
        var s = SceneBegin.create(g)
        // log(s, 's')
        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}

__main()
