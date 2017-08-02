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
