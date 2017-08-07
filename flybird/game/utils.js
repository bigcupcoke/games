var e = slct => document.querySelector(slct)

var log = console.log.bind(console)

const randomBetween = function(start, end) {
    var n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}
