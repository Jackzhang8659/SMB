

class mario{
    constructor(x,y){
        this.sprite = createSprite(x, y,16,32);
        // this.sprite.setCollider("circle")
        this.sprite.friction = 0.1
        this.sprite.limitSpeed(10)
        this.sprite.depth = 0;
        this.facing = 'right'
        this.dead = false
        this.win = false
        this.sprite.addAnimation('super_stand', ANIMATION.super_mario_stand);
        this.sprite.addAnimation('super_walk', ANIMATION.super_mario_walk);
        this.sprite.addAnimation('super_jump', ANIMATION.super_mario_jump);
		this.sprite.addAnimation('super_sit', ANIMATION.super_mario_sit);
		this.sprite.addAnimation('super_stand_left', ANIMATION.super_mario_stand_Left);
        this.sprite.addAnimation('super_walk_left', ANIMATION.super_mario_walk_Left);
        this.sprite.addAnimation('super_jump_left', ANIMATION.super_mario_jump_Left);
        this.sprite.addAnimation('dead', ANIMATION.dead);
    }

    initialize(){
		// small
        // var small_mario_stand = loadAnimation('sprites/small_stand.png')
        // var small_mario_walk = loadAnimation('sprites/small_walk1.png','sprites/small_walk2.png','sprites/small_walk3.png')
        // var small_mario_jump = loadAnimation('sprites/small_jump.png')
		// var small_mario_speeding = loadAnimation('sprites/small_speeding.png')
		// // var small_mario_fly = loadAnimation('sprites/small_fly1.png','sprites/small_fly2.png','sprites/small_fly3.png','sprites/small_fly4.png','sprites/small_fly5.png')
        // // var small_mario_sit = loadAnimation('sprites/small_sit1.png','sprites/small_sit2.png')
		// var small_mario_stand_Left = loadAnimation('sprites/f_small_stand.png')
        // var small_mario_walk_Left = loadAnimation('sprites/f_small_walk1.png','sprites/f_small_walk2.png','sprites/f_small_walk3.png')
        // var small_mario_jump_Left = loadAnimation('sprites/f_small_jump.png')
		// // var small_mario_speeding_Left = loadAnimation('sprites/f_small_speeding.png')
		// // var small_mario_fly_Left = loadAnimation('sprites/f_small_fly1.png','sprites/f_small_fly2.png','sprites/f_small_fly3.png','sprites/f_small_fly4.png','sprites/f_small_fly5.png')
        // // var small_mario_sit_Left = loadAnimation('sprites/f_small_sit1.png','sprites/f_small_sit2.png')
		// var small_mario_dead = loadAnimation('sprites/small_dead.png')
		
		// this.sprite.addAnimation('small_stand', small_mario_stand);
        // this.sprite.addAnimation('small_walk', small_mario_walk);
        // this.sprite.addAnimation('small_jump', small_mario_jump);
		// this.sprite.addAnimation('small_speeding', small_mario_speeding);
		// // this.sprite.addAnimation('small_fly', small_mario_fly);
		// // this.sprite.addAnimation('small_sit', small_mario_sit);
		// this.sprite.addAnimation('small_stand_left', small_mario_stand_Left);
        // this.sprite.addAnimation('small_walk_left', small_mario_walk_Left);
        // this.sprite.addAnimation('small_jump_left', small_mario_jump_Left);
		// // this.sprite.addAnimation('small_speeding_left', small_mario_speeding_Left);
		// // this.sprite.addAnimation('small_fly_left', small_mario_fly_Left);
		// // this.sprite.addAnimation('small_sit_left', small_mario_sit_Left);
		// this.sprite.addAnimation('small_dead', small_mario_dead);
		
		// // super



		
			
		// // fiery
		// var fiery_mario_stand= loadAnimation('sprites/fiery_stand.png')
        // var fiery_mario_walk = loadAnimation('sprites/fiery_walk1.png','sprites/fiery_walk2.png','sprites/fiery_walk3.png')
        // var fiery_mario_jump = loadAnimation('sprites/fiery_jump.png')
		// var fiery_mario_speeding = loadAnimation('sprites/fiery_speeding.png')
		// var fiery_mario_fly = loadAnimation('sprites/fiery_fly1.png','sprites/fiery_fly2.png','sprites/fiery_fly3.png','sprites/fiery_fly4.png','sprites/fiery_fly5.png','sprites/fiery_fly6.png')
        // var fiery_mario_sit = loadAnimation('sprites/fiery_sit1.png','sprites/fiery_sit2.png')
		// var fiery_mario_climb = loadAnimation('sprites/fiery_climb1.png','sprites/fiery_climb2.png','sprites/fiery_climb3.png','sprites/fiery_climb4.png','sprites/fiery_climb5.png')
		// var fiery_mario_smaller = loadAnimation('sprites/fiery_smaller.png')
		// var fiery_mario_stand_Left= loadAnimation('sprites/f_fiery_stand.png')
        // var fiery_mario_walk_Left = loadAnimation('sprites/f_fiery_walk1.png','sprites/f_fiery_walk2.png','sprites/f_fiery_walk3.png')
        // var fiery_mario_jump_Left = loadAnimation('sprites/f_fiery_jump.png')
		// var fiery_mario_speeding_Left= loadAnimation('sprites/f_fiery_speeding.png')
		// var fiery_mario_fly_Left = loadAnimation('sprites/f_fiery_fly1.png','sprites/f_fiery_fly2.png','sprites/f_fiery_fly3.png','sprites/f_fiery_fly4.png','sprites/f_fiery_fly5.png','sprites/f_fiery_fly6.png')
        // var fiery_mario_sit_Left = loadAnimation('sprites/f_fiery_sit1.png','sprites/f_fiery_sit2.png')
		// var fiery_mario_climb_Left = loadAnimation('sprites/f_fiery_climb1.png','sprites/f_fiery_climb2.png','sprites/f_fiery_climb3.png','sprites/f_fiery_climb4.png','sprites/f_fiery_climb5.png')
		// var fiery_mario_smaller_Left = loadAnimation('sprites/f_fiery_smaller.png')

		// this.sprite.addAnimation('fiery_stand', fiery_mario_stand);
        // this.sprite.addAnimation('fiery_walk', fiery_mario_walk);
        // this.sprite.addAnimation('fiery_jump', fiery_mario_jump);
        // this.sprite.addAnimation('fiery_speeding', fiery_mario_speeding);
		// this.sprite.addAnimation('fiery_fly', fiery_mario_fly);
		// this.sprite.addAnimation('fiery_sit', fiery_mario_sit);
		// this.sprite.addAnimation('fiery_climb', fiery_mario_climb);
		// this.sprite.addAnimation('fiery_smaller', fiery_mario_smaller);
		// this.sprite.addAnimation('fiery_stand_left', fiery_mario_stand_Left);
        // this.sprite.addAnimation('fiery_walk_left', fiery_mario_walk_Left);
        // this.sprite.addAnimation('fiery_jump_left', fiery_mario_jump_Left);
        // this.sprite.addAnimation('fiery_speeding_left', fiery_mario_speeding_Left);
		// this.sprite.addAnimation('fiery_fly_left', fiery_mario_fly_Left);
		// this.sprite.addAnimation('fiery_sit_left', fiery_mario_sit_Left);
		// this.sprite.addAnimation('fiery_climb_left', fiery_mario_climb_Left);
		// this.sprite.addAnimation('fiery_smaller_left', fiery_mario_smaller_Left);
    }

    move(str){
        if(this.win || this.dead){
            return
        }
        else if(str == 'up' && this.sprite.touching.bottom){
            //console.log('here')
            this.sprite.addSpeed(17,270)
            this.jumping = true
            jump.play()
        }
        else if(str == 'right'){
            this.sprite.addSpeed(0.3,0)
            this.facing = 'right'
        }
        else if(str == 'left'){
            this.sprite.addSpeed(0.3,180)
            this.facing = 'left'
        }

    }

    update(){
        
        var dir = this.sprite.getDirection()
        var spe = this.sprite.getSpeed()
        // this.sprite.addSpeed(0.25,90)
        //this.sprite.addSpeed(0.15,-90)
        
        // console.log(dir,spe)
        // if(spe < 0.5){
        //     this.changeAnimation('small_stand');
        // }
        // else if(dir > 92){
        //     //console.log('here!')
        //     this.sprite.mirrorY(1)
        //     this.changeAnimation('small_walk');
        // }
        // else if(dir < 89 && dir >0){
        //     //console.log('here?')
        //     this.sprite.mirrorY(-1)
        //     this.changeAnimation('small_walk');
        // }
        // console.log(this.sprite.touching)

        if(this.dead){
            this.sprite.addSpeed(1,90)
            if(this.sprite.removed){
                GameState = 4
                camera.position.x = 128
            }
            return
        }

        if(this.win){
            this.sprite.addSpeed(1,90)
            if(this.sprite.removed){
                GameState = 5
                camera.position.x = 128
            }
            return
        }

        if(!this.sprite.touching.bottom){
            this.sprite.addSpeed(1,90)
            if(this.facing === 'right'){
                this.changeAnimation('super_jump');
            }
            else{
                this.changeAnimation('super_jump_left');
            }
            
        }
        if(this.sprite.touching.top){
            this.sprite.addSpeed(3,90)
        }
        if(this.sprite.touching.bottom){
            // var speed =spe*cos(abs(90-dir))
            // this.sprite.addSpeed(speed,-90)
            if(this.facing === 'left'){
                //console.log('here!')
                if(spe > 0.5){
                    this.changeAnimation('super_walk_left');
                }
                else{
                    this.changeAnimation('super_stand_left');
                }
            }
            else{
                //console.log('here?')
                if(spe > 0.5){
                    this.changeAnimation('super_walk');
                }
                else{
                    this.changeAnimation('super_stand');
                }
                
            }
        }
        if(this.sprite.position.y > 280){
            this.sprite.changeAnimation('dead')
            this.sprite.setSpeed(20,-90)
            this.dead = true
            this.sprite.life = 130
            bgm.pause()
            die.play()
        }
        if(this.sprite.position.x > 3046){
            this.sprite.changeAnimation('super_sit')
            this.win = true
            this.sprite.setSpeed(0,0)
            this.sprite.life = 170
            bgm.pause()
            clear.play()
        }

        // console.log(this.sprite.position.x)


        
    }

    changeAnimation(animation) {
        this.sprite.changeAnimation(animation);
    }

    display(){
        // animation(this.sprite.animation,this.sprite.position.x,this.sprite.position.y)
        this.sprite.display()
    }

    collide(target){
        this.sprite.collide(target)
    }

    displace(target){
        this.sprite.displace(target)
    }

    bounce(target){
        this.sprite.bounce(target)
    }
    is_jumping(target){
        return 
    }

}