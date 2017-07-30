var Block = function() {
    var img = imageFromPath('block.png')

    var o = {
        img: img,
        x: 100,
        y: 100,
        alive: true,
    }

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
        o.alive = false
    }

    return o
}
