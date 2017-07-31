var SceneBegin = function(game) {
    var s = {
        game: game,
    }

    s.draw = function() {
        game.context.fillText('welcome to break out press k to begin', 200, 180)
    }

    window.addEventListener('keydown', function(e) {
        if (e.key === 'k') {
            var s = Scene(game)
            game.replaceScene(s)
        }
    })

    s.update = function() {

    }
    return s
}
