class Bullet extends GameImage {
    constructor(game) {
        super(game, 'bullet')

        //  子弹来源
        this.origin = null
        this.setUp()
    }

    setUp() {
        this.speed = config.bullet_speed
    }

    debug() {
        this.speed = config.bullet_speed
    }

    updateByPlayer() {
        var b = this
        var s = b.scene
        var es = s.enemies
        b.y -= b.speed
        es.forEach((e) => {
            // log(e, 'e')
            if (b.collide(e)) {
                // log('player fired enemies')
                var x = e.x + e.w / 2
                var y = e.y + e.h / 2
                var ps = ParticleSystem.create(b.game)
                b.scene.addElement(ps)
                ps.x = x
                ps.y = y
                b.remove()
                e.setUp()
            }
        })
    }

    updateByEnemy() {
        var b = this
        var s = b.scene
        var p = s.player
        b.y += b.speed
        if (b.collide(p)) {
            // log('player been fired')
            b.remove()
            var ps = ParticleSystem.create(b.game)
            b.scene.addElement(ps)
            ps.x = b.x
            ps.y = b.y
            p.lifes--
        }
    }

    update() {
        var b = this
        var o = b.origin
        var updateByOrigin = {
            player: b.updateByPlayer,
            enemy: b.updateByEnemy,
        }
        updateByOrigin[o].call(b)

        //  子弹相撞的情况
        var bs = b.game.scene.bullets
        bs.forEach(function(e) {
            if (b.collide(e)) {
                log('子弹相撞了')
                e.remove()
                b.remove()
            }
        })

        //  子弹出界的情况
        b.delOutBorder()
    }

    remove() {
        super.remove()
        var i = this.indexOfBs
        var bs = this.game.scene.bullets
        bs.splice(i, 1)
        bs.forEach(function(e, i) {
            e.indexOfBs = i
        })
    }

    //  脱离边界后删除
    delOutBorder() {
        var b = this
        if (b .y > config.height || b.y < 0) {
            // log('remove')
            b.remove()
        }
    }
}
