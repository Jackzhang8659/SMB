class Menu{
    constructor(){
        this.character = 'MARIO'
        this.score = 0
        this.anicoin = createImg('gif/anicoin.gif')
        this.anicoin.position(80,15)
        this.anicoin.size(5,7)
        this.numcoin = 0
        this.world = '1-1'
        this.time = 400
        
    }

    display(){
        textFont(fontSMB,8)
        fill('#ffffff')
        text(this.character + '           WORLD   TIME',15,15)
        text(int(this.score).toString().padStart(6,0) + '   x' + int(this.numcoin).toString().padStart(3,0) + '    ' + this.world + '     ' + this.time,15,23) //TODO: add time
        
    }

    addscore(x){
        this.score += x
    }

    addcoin(){
        this.numcoin += 1
    }

        //TODO: add change function 

}

class OpenScreen{
    constructor(){
        this.title = loadImage('sprites/title.png')
        this.topscore = int(0).toString().padStart(6,0)
        this.mushroom = loadImage('sprites/misc-7.png')

        // for cursor
        this.px = 62
        this.py = 136
    }

    display(){
        image(this.title, 40,30,176,88,1,60,176,88)
        fill('#ffcccc')
        textFont(fontSMB,6)
        text('@2019 Fanzhe&Jack',113,125)
        textFont(fontSMB,8)
        fill('#ffffff')
        text('TOP- ' + this.topscore, 90,195)
        text('1 PLAYER GAME\n\n2 INSTRUCTION' ,75,145)

        // For requirement
        if(mouseX > 75 && mouseX < 180 && mouseY > 130 && mouseY < 150){
            //rect(75,130,180-75,150-130)
            this.px = 62
            this.py = 136
        }
        else if(mouseX > 75 && mouseX < 180 && mouseY > 150 && mouseY < 170){
            //rect(75,150,180-75,170-150)
            this.px = 62
            this.py = 155
        }


        
        image(this.mushroom, this.px,this.py,8,8,24,160,8,8)
    }

    changeGameState(){

    }
}

function mouseClicked() {
    if(mouseX > 75 && mouseX < 180 && mouseY > 150 && mouseY < 170 && GameState == 0){
        //rect(75,150,180-75,170-150)
        GameState=1
        
    }
    if(mouseX > 75 && mouseX < 180 && mouseY > 130 && mouseY < 150 && GameState==0){
        //rect(75,150,180-75,170-150)
        GameState=2
        bgm.play()
        pushEnemy()
        setInterval(function(){menu.time--},1000)

    }
  }

class Character{
    constructor(x,y,frame){
        this.position = createVector(x, y)
        this.frame = frame
        this.picarray = []
        this.LastSate = null
        this.cframe = frame
    }

    load(img){
        //TODO implement a way to load differnt character
        //console.log(img)
        this.picarray.push(img)
    }

    update(){
        this.position.x += 1
        if(this.position.x >256){
            this.position.x = -5
        }
    }

    display(){
        push()
        translate(this.position.x, this.position.y)
        
        if(this.LastSate == null){
            this.LastSate = this.picarray[0]
        }
        else if(this.cframe == 0){
            this.cframe = this.frame
            //console.log(this.picarray)
            var index = this.picarray.indexOf(this.LastSate)
            if(index < this.picarray.length-1){
                this.LastSate = this.picarray[index+1]
            }
            else{
                this.LastSate = this.picarray[0]
            }
        }
        else{
            this.cframe += -1
        }
        //console.log(this.picarray)
        image(this.LastSate, 0,0)
        pop()
    }
}

let fontSMB
let font
let menu
let open
let Background
let MarioS, MarioB, Goomba, Turtle
let GameState = 0
let song
let Pipe
let Tileset
let IMAGE
let MAP
let Mario
let ANIMATION
let COIN, bgm,breakblock,gameover,jump,die,clear,stomp,warning,hurry

function preload() {
    fontSMB = loadFont('font/pressstart2p-webfont.ttf')
    font = loadFont('font/super_plumber_brothers-webfont.ttf')
    Background = loadImage('sprites/1-1.png') // temp to display map
    bgm = loadSound('sound/1-01-main.mp3');
    breakblock = loadSound('sound/smb_breakblock.wav')
    COIN = loadSound('sound/smb_coin.wav')
    gameover= loadSound('sound/smb_gameover.wav')
    jump = loadSound('sound/smb_jump-super.wav')
    die = loadSound('sound/smb_mariodie.wav')
    clear = loadSound('sound/smb_stage_clear.wav')
    stomp = loadSound('sound/smb_stomp.wav')
    warning = loadSound('sound/smb_warning.wav')
    hurry = loadSound('sound/HurryOverworld.mp3')

    Tileset = loadImage('sprites/Tileset.png')
    open = new OpenScreen()
    MarioS = new Character(50,192,10)
    MarioB = new Character(70,176,10)
    Goomba = new Character(30,192,20)
    Turtle = new Character(10,176,20)

    loadImage('sprites/player.png',function(loadedImage){
        //console.log(loadedImage)
        MarioS.load(loadedImage.get(80,32,16,16))
        MarioS.load(loadedImage.get(96,32,16,16))
        MarioS.load(loadedImage.get(112,32,16,16))
        MarioS.load(loadedImage.get(128,32,16,16))
    })
    loadImage('sprites/player.png',function(loadedImage){
        //console.log(loadedImage)
        MarioB.load(loadedImage.get(80,0,16,32))
        MarioB.load(loadedImage.get(96,0,16,32))
        MarioB.load(loadedImage.get(112,0,16,32))
        MarioB.load(loadedImage.get(128,0,16,32))
    })
    loadImage('sprites/enemy.png',function(loadedImage){
        //console.log(loadedImage)
        Goomba.load(loadedImage.get(0,16,16,16))
        Goomba.load(loadedImage.get(16,16,16,16))
    })
    loadImage('sprites/enemyr.png',function(loadedImage){
        //console.log(loadedImage)
        Turtle.load(loadedImage.get(96,0,16,32))
        Turtle.load(loadedImage.get(96+16,0,16,32))
    })

    IMAGE = new ALL_IMAGE()
    loadImage('sprites/Tileset.png',function(loadedImage){
        //console.log('loadedImage')
        IMAGE.load('pipeup',loadedImage.get(0,128,32,16))
        IMAGE.load('pipedown',loadedImage.get(0,144,32,16))
        IMAGE.load('floor',loadedImage.get(0,0,16,16))
        IMAGE.load('brick',loadedImage.get(16,0,16,16))
        IMAGE.load('block',loadedImage.get(48,0,16,16))
        IMAGE.load('stone',loadedImage.get(0,16,16,16))
        
    })
    
    loadImage('sprites/World11.png',function(loadedImage){
        //console.log('loadedImage')
        IMAGE.load('world11',loadedImage)
    })

    IMAGE.load('broken',loadImage('sprites/brick_shatter_1.png'))


    


    ANIMATION = new All_ANIMATION()
    var ani1 = loadAnimation('sprites/block.png')
    var ani2 = loadAnimation('sprites/question_1.png','sprites/question_1.png','sprites/question_1.png','sprites/question_2.png','sprites/question_3.png','sprites/question_4.png')
    ANIMATION.load('Block2',ani1)
    ANIMATION.load('Block1',ani2)

    var ani3 = loadAnimation('sprites/coin1.png','sprites/coin2.png','sprites/coin3.png','sprites/coin4.png')
    ani3.frameDelay = 5
    ANIMATION.load('Coin',ani3)

    ani1 = loadAnimation('sprites/enemy/goomba/goomba_walk1.png','sprites/enemy/goomba/goomba_walk2.png')
    ani2 = loadAnimation('sprites/enemy/goomba/goomba_flat.png')
    ani1.frameDelay = 10
    ANIMATION.load('gwalk',ani1)
    ANIMATION.load('gflat',ani2)

    var super_mario_stand= loadAnimation('sprites/super_stand.png')
    var super_mario_walk = loadAnimation('sprites/super_walk1.png','sprites/super_walk2.png','sprites/super_walk3.png')
    var super_mario_jump = loadAnimation('sprites/super_jump.png')
    var super_mario_sit = loadAnimation('sprites/super_sit2.png')
    var super_mario_stand_Left= loadAnimation('sprites/f_super_stand.png')
    var super_mario_walk_Left = loadAnimation('sprites/f_super_walk1.png','sprites/f_super_walk2.png','sprites/f_super_walk3.png')
    var super_mario_jump_Left = loadAnimation('sprites/f_super_jump.png')
    var dead = loadAnimation('sprites/dead.png')

    ANIMATION.load('super_mario_stand',super_mario_stand)
    ANIMATION.load('super_mario_walk',super_mario_walk)
    ANIMATION.load('super_mario_jump',super_mario_jump)
    ANIMATION.load('super_mario_sit',super_mario_sit)
    ANIMATION.load('super_mario_stand_Left',super_mario_stand_Left)
    ANIMATION.load('super_mario_walk_Left',super_mario_walk_Left)
    ANIMATION.load('super_mario_jump_Left',super_mario_jump_Left)
    ANIMATION.load('dead',dead)
    

    
    

}

function reset(){
    createCanvas(256, 240);
    menu = new Menu()
    // Mario = new mario(2900,0-24)
    Mario = new mario(-0,200-24)
    camera.off()
    // Mario = new mario(-0,200-24)
    MAP = new map()
    World11()

    
    //camera.position.y = height/2;

    // song.play();
}
function setup() { 
    reset()
}
function draw() {  
    if(GameState == 0){
        image(Background,0,0) // temp to display map
        menu.display()
        open.display()
        MarioS.display()
        MarioS.update()
        MarioB.display()
        MarioB.update()
        Goomba.display()
        Goomba.update()
        Turtle.display()
        Turtle.update()
    }
    else if(GameState == 1){
        image(Background,0,0) // temp to display map
        menu.display()
        MarioS.display()
        MarioS.update()
        MarioB.display()
        MarioB.update()
        Goomba.display()
        Goomba.update()
        Turtle.display()
        Turtle.update()
        fill('#000000')
        textFont(font,8)
        text('As the game proceeds, the screen gradually scroll to the right.\nThere are a few world in the game.\nIn each world, the princess is being held in the castels by the turtle\ntribe.\nIn order to rescue the Princess, Mario has to make it to the castle\nat the end of each world.\nUse up,down,left and right keys to control the position of the mario.\nThe longer you hold the up key, the higher Mario would jump.\nClicking B button makes Mario speed up.\nWhen Mario hits a Magic Mushroom, he would become Super Mario.\nWhen Super Mario hits a fire flower, he would become Fiery Mario.\n Use B button to throw fireballs.\nWhen Mario hits a starman, he would become invincible Mario.\nMario would return to regular Mario when bumped into by a bad guy.\nWhen play starts, the clock in the upper right of the screen starts ticking away.\nAny time left on the clock when you get to the end of each area \nis added to your score as bonus points.\nThere is no remianing-time bonuswhen you get to the very last castle.\nWhen Mario is hit by a bad guy, he would die.',10,32)
    }
    else if(GameState == 4){
        bgm.pause()
        background(0)
        fill('#FFFFFF')
        textFont(font,32)
        text('GAME OVER',70,120)
        menu.display()
        if(!gameover.isPlaying()){
            gameover.play()
        }
        setTimeout(function(){GameState = 0
            reset()
        },gameover.duration()*1000)
        GameState = 999
    }
    else if(GameState == 5){
        
        background(0)
        fill('#FFFFFF')
        textFont(font,32)
        text('You Win',80,120)
        menu.display()
        setTimeout(function(){GameState = 0
            reset()
        },2000)
        GameState = 999
    }
    else if(GameState == 2){
        camera.position.x = Mario.sprite.position.x
        if(keyWentDown(UP_ARROW)){
            //console.log(camera)
            //console.log('here?')
            Mario.move('up')
        }
        else if(keyDown(LEFT_ARROW)){
            //console.log(camera)
            Mario.move('left')
            
        }
        else if(keyDown(RIGHT_ARROW)){
            //console.log(camera)
            Mario.move('right')
        }
        //camera.off()
        Mario.update()
        MAP.collide(Mario)
        MAP.display()
        Mario.display()
        camera.off()
        menu.display()
        camera.on()
    
    }
    //camera.position.y = 0


    // image(IMAGE.mario,50,50,16,16,128,32,16,16)

    //camera.on()


}