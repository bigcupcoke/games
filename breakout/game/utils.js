const e = slct => document.querySelector(slct)

const log = console.log.bind(console)

const imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

const rectIntersects = function(a, b) {
    var o = a
    if (b.y > o.y && b.y < o.y + o.h) {
        if (b.x > o.x && b.x < o.x + o.w) {
            return true
        }
    }
    return false
}
