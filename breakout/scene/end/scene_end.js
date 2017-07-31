var SceneEnd = function(game) {
    var s = {
        game: game,
    }

    s.draw = function() {
        game.context.fillText('GAME OVER', 250, 150)
    }

    window.addEventListener('keydown', function(e) {
        if (e.key === 'r') {
            var s = SceneBegin(game)
            game.replaceScene(s)
        }
    })

    s.update = function() {

    }
    return s
}
