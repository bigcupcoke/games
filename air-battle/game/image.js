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
