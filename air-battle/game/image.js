class GameImage {
    constructor(game, name) {
        this.game = game
        this.texture = this.game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.w = this.texture.height
    }

    static create(game, name) {
        var instance = new this(game, name)
        return instance
    }

    draw() {

    }

    update() {

    }
}

//  player 是图片， 应该去继承 image 里面东西
class Player extends GameImage {
    constructor(game) {
        super(game, 'player')
        this.speed = 5
        this.x = 0
    }

    moveLeft() {
        this.x -= this.speed
    }

    moveRight() {
        this.x += this.speed
    }

    moveUp() {
        this.y -= this.speed
    }

    moveDown() {
        this.y += this.speed
    }
}

const randomBetween = function(start, end) {
    var n = Math.random() * (end - start + 1)
    return Math.floor(n)
}

//  eneey 是图片， 应该去继承 image 里面东西
class Enemy extends GameImage {
    constructor(game) {
        var type = randomBetween(0, 4)
        var name = 'enemy' + type
        super(game, name)
        this.setUp()
    }

    setUp() {
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(0, 250)
        this.y = -randomBetween(0, 100)
    }

    update() {
        this.y += this.speed
        if (this.y > 400) {
            this.setUp()
        }
    }
}

//
// class Player extends GameImage {
//     constructor(game, name) {
//         super()
//         this.game = game
//         this.texture = this.game.textureByName(name)
//         this.x = 0
//         this.y = 0
//         this.w = this.texture.width
//         this.w = this.texture.height
//     }
//
//     static create(game, name) {
//         var instance = new this(game, name)
//         return instance
//     }
//
//     draw() {
//
//     }
//
//     update() {
//
//     }
// }
