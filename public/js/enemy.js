class goomba{
    constructor(x,y){
        this.sprite = createSprite(x, y,16,16);
        this.sprite.addAnimation('gwalk',ANIMATION.gwalk)
        this.sprite.addAnimation('gdead',ANIMATION.gflat)
        this.sprite.setAnimation('gwalk')
        this.sprite.setSpeed(2,180)
        // this.sprite.setCollider("circle")
    }

    update(){
        if(this.sprite.touching.left || this.sprite.touching.right){
            this.sprite.setSpeed(this.sprite.getSpeed(),-this.sprite.getDirection())
        }
    }

}