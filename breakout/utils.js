var e = slct => document.querySelector(slct)

var log = function(s) {
    e('#id-text-log').value += '\n' + s
    // console.log.bind(console)
}

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}
