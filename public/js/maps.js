class map{
    constructor(){
        this.floor = new floor()
        this.block = new block()
        this.brick = new brick()
        this.stone = new stone()
        this.pipe = new pipe()
        this.background = null
        this.sprites = new Group()
        this.Coin = new Group()
        this.Shatter = new Group()
        this.Goomba = new goomba()
        this.other = new Group()
    }
    reset(){
        this.floor = new floor()
        this.block = new block()
        this.brick = new brick()
        this.stone = new stone()
        this.pipe = new pipe()
        this.background = null
        this.sprites = new Group()
        this.Coin = new Group()
        this.Shatter = new Group()
        this.Goomba = new goomba()
        this.other = new Group()
    }
    display(){
        if(this.background == null){
            this.background = IMAGE.world11
        }
        image(this.background,-128,0)
        drawSprites(this.sprites)
        var c
        for(c of this.Coin){
            c.addSpeed(2,90)
            c.display()
        }
        for(c of this.Shatter){
            c.velocity.y += 1;
            c.rotation += 1;
            c.display()
        }
        this.Goomba.display()
    }
    collide(Mario){


        // console.log(sprites)
        // this.floor.sprites.collide(Mario.sprite)
        // this.things.sprites.collide(Mario.sprite)


        if(!Mario.dead){

            if(this.Goomba.sprites.collide(Mario.sprite)){
                this.Goomba.update_M()
            }

            if(this.block.sprites.collide(Mario.sprite)){
                var s
                for(s of this.block.sprites){
                    if(s.touching.bottom && s.getAnimationLabel() === 'Block1'){
                        var coin = createSprite(s.position.x,s.position.y-32,16,16)
                        coin.addAnimation('Coin',ANIMATION.Coin)
                        coin.addSpeed(10,270)
                        coin.life = 15
                        this.Coin.add(coin)
                        s.changeAnimation('Block2')
                        menu.addscore(100)
                        menu.addcoin()
                        COIN.play()
                    }
                }
                this.update()
            }
    
            if(this.brick.sprites.collide(Mario.sprite)){
                var s
                for(s of this.brick.sprites){
                    if(s.touching.bottom){
                        function createShatter(x, y, isTop, isLeft) {
                            var offset_x = 8,
                                offset_y = 0,
                                dir_x = 2,
                                vel_y = 6;
                        
                            if (isTop) {
                                offset_y = -8;
                                vel_y = 8;
                            }
                            if (isLeft) {
                                offset_x = -8;
                                dir_x = -2;
                            }
                            var shatter = createSprite(x+offset_x, y+offset_y);
                            shatter.scale = 1.5;
                        
                            if (isLeft) shatter.mirrorX(-1);
                        
                            shatter.addImage('broken', IMAGE.broken);
                            shatter.changeAnimation('broken');
                            shatter.velocity.y -= vel_y;
                            shatter.velocity.x += dir_x;
                            shatter.rotationSpeed = 20;
                            return shatter
                        }
                        function breakBlock(block,shatter) {
                            shatter.add(createShatter(block.position.x, block.position.y, false, true));
                            shatter.add(createShatter(block.position.x, block.position.y, false, false));
                            shatter.add(createShatter(block.position.x, block.position.y, true, true));
                            shatter.add(createShatter(block.position.x, block.position.y, true, false));
                            block.remove();
                            breakblock.play()
                        }
                        breakBlock(s,this.Shatter)
                    }
                }
                this.update()
            }

            if(this.Goomba.sprites.collide(this.sprites)){
                this.Goomba.update()
            }

            Mario.collide(this.sprites)

        }
        



        
        //Mario.collide(this.things.sprites)
        // this.floor.sprites.displace(Mario.sprite)
        // this.things.sprites.displace(Mario.sprite)
        // var pipe
        // for(pipe of this.pipes.all_pipes){
        //    // Mario.collide(pipe.sprites)
        //     // pipe.sprites.displace(Mario.sprite)
        // }
    }
    update(){
        this.sprite = new Group()
        var array = this.floor.sprites.toArray().concat(this.block.sprites.toArray(),this.brick.sprites.toArray(),this.stone.sprites.toArray(),this.pipe.sprites.toArray())
        console.log(array.length)
        var sprite
        for(sprite of array){
            this.sprites.add(sprite)
        }
    }
}

class goomba{
    constructor(){
        this.sprites = new Group()
        // this.sprite.setCollider("circle")
    }

    update(){
        var s
        for(s of this.sprites){
            if(s.getAnimationLabel() === 'gdead'){
                continue
            }
            if(s.touching.left || s.touching.right){
                var spe = s.getSpeed()
                var dir = s.getDirection()
                s.setSpeed(-spe,dir)
                
            }
        }
    }

    update_M(){
        var s
        for(s of this.sprites){
            if(s.getAnimationLabel() === 'gdead'){
                continue
            }
            if(s.touching.top){
                s.changeAnimation('gdead')
                s.life = 2
                menu.addscore(100)
                stomp.play()
            }
            if(s.touching.left || s.touching.right){
                Mario.sprite.changeAnimation('dead')
                Mario.sprite.setSpeed(20,-90)
                Mario.dead = true
                Mario.sprite.life = 130
                bgm.pause()
                die.play()
            }
        }
    }

    push(x,y){
        var sprite = createSprite(x, y,16,16);
        sprite.addAnimation('gwalk',ANIMATION.gwalk)
        sprite.addAnimation('gdead',ANIMATION.gflat)
        sprite.changeAnimation('gwalk')
        sprite.setSpeed(1,180)
        this.sprites.add(sprite)
    }

    display(){
        drawSprites(this.sprites)
    }

}

class floor{
    constructor(){
        this.sprites = new Group()
    }
    push(x,y,total){
        //var count = total / 16
        for(var i = 0; i < total; i++){
            var temp = createSprite(x+i*16,y,16,16)
            // temp.setCollider("rectangle")
            temp.addImage(IMAGE.floor)
            this.sprites.add(temp)
        }
        for(var i = 0; i < total; i++){
            var temp = createSprite(x+i*16,y-16,16,16)
            // temp.setCollider("rectangle")
            temp.addImage(IMAGE.floor)
            this.sprites.add(temp)
        }
    }
    display(){
        drawSprites(this.sprites)
    }


}

class block{
    constructor(){
        this.sprites = new Group()
    }
    pushBlock(x,y){
        var temp = createSprite(x,y,16,16)
        temp.addAnimation('Block1',ANIMATION.Block1)
        temp.addAnimation('Block2',ANIMATION.Block2)
        temp.changeAnimation('Block1')
        temp.immovable = true
        // temp.setCollider("rectangle")
        this.sprites.add(temp)
    }

    display(){
        drawSprites(this.sprites)
    }
}

class brick{
    constructor(){
        this.sprites = new Group()
    }

    pushBrick(x,y){
        var temp = createSprite(x,y,16,16)
        // temp.setCollider("rectangle")
        temp.addImage(IMAGE.brick)
        temp.immovable = true
        this.sprites.add(temp)
    }

    display(){
        drawSprites(this.sprites)
    }
}

class stone{
    constructor(){
        this.sprites = new Group()
    }

    pushStone(x,y){
        var temp = createSprite(x,y,16,16)
        // temp.setCollider("rectangle")
        temp.addImage(IMAGE.stone)
        this.sprites.add(temp)
    }
    display(){
        drawSprites(this.sprites)
    }

}

class pipe{
    constructor(){
        this.sprites = new Group()
    }
    push(x,y,height){
        var up = createSprite(x,y+height,32,16)
        // up.setCollider("rectangle")
        up.addImage(IMAGE.pipeup)
        up.immovable = true
        this.sprites.push(up)
        var count = height / 16
        //console.log(height)
        for(var i = 1; i <= count; i++){
            //console.log('here')
            var down = createSprite(x,y+height+16*i,32,16)
            // down.setCollider("rectangle")
            down.addImage(IMAGE.pipedown)
            down.immovable = true
            this.sprites.add(down)
        }
    }

    display(){
        // console.log(this.up_img)
        drawSprites(this.sprites)
        // console.log(this.down)
        // drawSprites(this.down)
    }

}

function pushPrePipe(x,y,height){

    MAP.pipe.push(x,y,height)
}

function pushPreFloor(x,y,total){
    // var x16 = x*16+8
    MAP.floor.push(x,y,total)
}

function pushPreThing(str,x,y){
    var x16 = x*16+8
    if(str == 'Block'){
        MAP.block.pushBlock(x16,y)
    }
    else if(str == 'Brick'){
        MAP.brick.pushBrick(x16,y)
    }
    else if(str == 'Stone'){
        MAP.stone.pushStone(x16,y)
    }
    else if(str == 'Goomba'){
        MAP.Goomba.push(x16,y)
    }
}

let jumplevel1 = 152
let jumplevel2 = 88
let floorlevel = 232

function World11(){
    
    pushPreFloor(-120, floorlevel, 75);

    pushPreThing('Block', 8, jumplevel1);
    pushPreThing('Brick', 12, jumplevel1);
    pushPreThing('Block', 13, jumplevel1);

    pushPreThing('Brick', 14, jumplevel1);
    pushPreThing('Block', 14, jumplevel2);
    pushPreThing('Block', 15, jumplevel1);
    pushPreThing('Brick', 16, jumplevel1);

    pushPrePipe(336, 168, 16);

    pushPrePipe(496, 136, 32);

    pushPrePipe(626, 104, 48);

    pushPrePipe(802, 104, 48);

    pushPreFloor(1112, floorlevel, 15);
    pushPreThing('Brick', 75, jumplevel1);
    pushPreThing('Block', 76, jumplevel1);
    pushPreThing('Brick', 77, jumplevel1);
    pushPreThing('Brick', 78, jumplevel2);
    pushPreThing('Brick', 79, jumplevel2);
    pushPreThing('Brick', 80, jumplevel2);
    pushPreThing('Brick', 81, jumplevel2);
    pushPreThing('Brick', 82, jumplevel2);
    pushPreThing('Brick', 83, jumplevel2);
    pushPreThing('Brick', 84, jumplevel2);
    pushPreThing('Brick', 85, jumplevel2);

    pushPreFloor(1400, floorlevel, 63);
    pushPreThing('Brick', 89, jumplevel2);
    pushPreThing('Brick', 90, jumplevel2);
    pushPreThing('Brick', 91, jumplevel2);
    pushPreThing('Brick', 91, jumplevel1);
    pushPreThing('Brick', 97, jumplevel1);
    pushPreThing('Brick', 98, jumplevel1);
    pushPreThing('Block', 103, jumplevel1);
    pushPreThing('Block', 106, jumplevel1);
    pushPreThing('Block', 106, jumplevel2);
    pushPreThing('Block', 109, jumplevel1);
    pushPreThing('Brick', 115, jumplevel1);
    pushPreThing('Brick', 118, jumplevel2);
    pushPreThing('Brick', 119, jumplevel2);
    pushPreThing('Brick', 120, jumplevel2);
    pushPreThing('Brick', 250, jumplevel2);
    pushPreThing('Block', 251, jumplevel2);
    pushPreThing('Brick', 251, jumplevel1);
    pushPreThing('Block', 252, jumplevel2);
    pushPreThing('Brick', 252, jumplevel1);
    pushPreThing('Brick', 253, jumplevel2);

    pushPreThing('Stone', 131, jumplevel1+16*3);
    pushPreThing('Stone', 132, jumplevel1+16*3);
    pushPreThing('Stone', 132, jumplevel1+16*2);
    pushPreThing('Stone', 133, jumplevel1+16*3);
    pushPreThing('Stone', 133, jumplevel1+16*2);
    pushPreThing('Stone', 133, jumplevel1+16*1);
    pushPreThing('Stone', 134, jumplevel1+16*3);
    pushPreThing('Stone', 134, jumplevel1+16*2);
    pushPreThing('Stone', 134, jumplevel1+16*1);
    pushPreThing('Stone', 134, jumplevel1+16*0);

    pushPreThing('Stone', 137, jumplevel1+16*3);
    pushPreThing('Stone', 137, jumplevel1+16*2);
    pushPreThing('Stone', 137, jumplevel1+16*1);
    pushPreThing('Stone', 137, jumplevel1+16*0);
    pushPreThing('Stone', 138, jumplevel1+16*3);
    pushPreThing('Stone', 138, jumplevel1+16*2);
    pushPreThing('Stone', 138, jumplevel1+16*1);
    pushPreThing('Stone', 139, jumplevel1+16*3);
    pushPreThing('Stone', 139, jumplevel1+16*2);
    pushPreThing('Stone', 140, jumplevel1+16*3);

    pushPreThing('Stone', 145, jumplevel1+16*3);
    pushPreThing('Stone', 146, jumplevel1+16*3);
    pushPreThing('Stone', 146, jumplevel1+16*2);
    pushPreThing('Stone', 147, jumplevel1+16*3);
    pushPreThing('Stone', 147, jumplevel1+16*2);
    pushPreThing('Stone', 147, jumplevel1+16*1);
    pushPreThing('Stone', 148, jumplevel1+16*3);
    pushPreThing('Stone', 148, jumplevel1+16*2);
    pushPreThing('Stone', 148, jumplevel1+16*1);
    pushPreThing('Stone', 148, jumplevel1+16*0);
    pushPreThing('Stone', 149, jumplevel1+16*3);
    pushPreThing('Stone', 149, jumplevel1+16*2);
    pushPreThing('Stone', 149, jumplevel1+16*1);
    pushPreThing('Stone', 149, jumplevel1+16*0);


    pushPreFloor(2440, floorlevel, 62);
    pushPreThing('Stone', 152, jumplevel1+16*3);
    pushPreThing('Stone', 152, jumplevel1+16*2);
    pushPreThing('Stone', 152, jumplevel1+16*1);
    pushPreThing('Stone', 152, jumplevel1+16*0);
    pushPreThing('Stone', 153, jumplevel1+16*3);
    pushPreThing('Stone', 153, jumplevel1+16*2);
    pushPreThing('Stone', 153, jumplevel1+16*1);
    pushPreThing('Stone', 154, jumplevel1+16*3);
    pushPreThing('Stone', 154, jumplevel1+16*2);
    pushPreThing('Stone', 155, jumplevel1+16*3);

    pushPrePipe(2576, 168, 16);
    pushPreThing('Brick', 2648, jumplevel1);
    pushPreThing('Brick', 2664, jumplevel1);
    pushPreThing('Block', 2680, jumplevel1);
    pushPreThing('Brick', 2696, jumplevel1);
    pushPrePipe(2832, 168, 16);

    pushPreThing('Stone', 178, jumplevel1+16*3);
    pushPreThing('Stone', 179, jumplevel1+16*3);
    pushPreThing('Stone', 179, jumplevel1+16*2);
    pushPreThing('Stone', 180, jumplevel1+16*3);
    pushPreThing('Stone', 180, jumplevel1+16*2);
    pushPreThing('Stone', 180, jumplevel1+16*1);
    pushPreThing('Stone', 181, jumplevel1+16*3);
    pushPreThing('Stone', 181, jumplevel1+16*2);
    pushPreThing('Stone', 181, jumplevel1+16*1);
    pushPreThing('Stone', 181, jumplevel1+16*0);
    pushPreThing('Stone', 182, jumplevel1+16*3);
    pushPreThing('Stone', 182, jumplevel1+16*2);
    pushPreThing('Stone', 182, jumplevel1+16*1);
    pushPreThing('Stone', 182, jumplevel1+16*0);
    pushPreThing('Stone', 182, jumplevel1+16*-1);
    pushPreThing('Stone', 183, jumplevel1+16*3);
    pushPreThing('Stone', 183, jumplevel1+16*2);
    pushPreThing('Stone', 183, jumplevel1+16*1);
    pushPreThing('Stone', 183, jumplevel1+16*0);
    pushPreThing('Stone', 183, jumplevel1+16*-1);
    pushPreThing('Stone', 183, jumplevel1+16*-2);
    pushPreThing('Stone', 184, jumplevel1+16*3);
    pushPreThing('Stone', 184, jumplevel1+16*2);
    pushPreThing('Stone', 184, jumplevel1+16*1);
    pushPreThing('Stone', 184, jumplevel1+16*0);
    pushPreThing('Stone', 184, jumplevel1+16*-1);
    pushPreThing('Stone', 184, jumplevel1+16*-2);
    pushPreThing('Stone', 184, jumplevel1+16*-3);
    pushPreThing('Stone', 185, jumplevel1+16*3);
    pushPreThing('Stone', 185, jumplevel1+16*2);
    pushPreThing('Stone', 185, jumplevel1+16*1);
    pushPreThing('Stone', 185, jumplevel1+16*0);
    pushPreThing('Stone', 185, jumplevel1+16*-1);
    pushPreThing('Stone', 185, jumplevel1+16*-2);
    pushPreThing('Stone', 185, jumplevel1+16*-3);
    pushPreThing('Stone', 185, jumplevel1+16*-4);
    pushPreThing('Stone', 186, jumplevel1+16*3);
    pushPreThing('Stone', 186, jumplevel1+16*2);
    pushPreThing('Stone', 186, jumplevel1+16*1);
    pushPreThing('Stone', 186, jumplevel1+16*0);
    pushPreThing('Stone', 186, jumplevel1+16*-1);
    pushPreThing('Stone', 186, jumplevel1+16*-2);
    pushPreThing('Stone', 186, jumplevel1+16*-3);
    pushPreThing('Stone', 186, jumplevel1+16*-4);

    MAP.update()
}


function pushEnemy(){
    pushPreThing('Goomba', 44, 200);
    pushPreThing('Goomba', 38, 200);
    pushPreThing('Goomba', 25, 200);
    pushPreThing('Goomba', 16, 200);
    pushPreThing('Goomba', 162, 200);
}
