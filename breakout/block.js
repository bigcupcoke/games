var Block = function(game, positon) {
    // var img = imageFromPath('block.png')

    var p = positon
    var img = game.imageByName('block')
    var o = {
        img: img,
        x: p.x,
        y: p.y,
        alive: true,
        lives: p.lives || 1,
    }
    o.img = img.image
    o.w = img.w
    o.h = img.h

    o.rectIntersects = function(a, b) {
        var o = a
        if (b.y > o.y && b.y < o.y + o.img.height) {
            if (b.x > o.x && b.x < o.x + o.img.width) {
                return true
            }
        }
        return false
    }

    o.collide = function(b) {
        return o.alive && (o.rectIntersects(o, b) || o.rectIntersects(b, o))
    }

    o.kill = function() {
        o.lives--
        if (o.lives <1) {
            o.alive = false
        }
    }

    return o
}
