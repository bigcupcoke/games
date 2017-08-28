class GameImage {
    constructor(game, name) {
        this.game = game
        this.texture = this.game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
        //  scene
        this.scene = this.game.scene
        //  在 secne 中下标
        this.index = -1
    }

    static create(game, name) {
        var instance = new this(game, name)
        return instance
    }

    collide(b) {
        var a = this
        return  rectIntersects(a, b) || rectIntersects(b, a)
    }

    remove() {
        this.scene.removeElement(this)
    }

    draw() {
        this.game.drawImg(this)
    }

    update() {

    }
}
