class Coin{
    x = 0
    y = 0
    img

    create(x,y){
        this.x = x
        this.y = y
    }

    draw(img){
        this.x -=1
        this.y -=5
        if(this.y < 0){
            this.y = -9999
            this.x = -9999
        }

        image(img,this.x,this.y)
    }
}



class Player extends Action{
    p5
    ballon
    basket = {
        bottom:null,
        left:null,
        right:null,
    }
    ballonImage = []
    basketImage
    burner = {
        img:[],
        body:null,
    }
    countDevice = 0
    fireImg = {
        img:null,
        x:1770,
        y:930,
        width:250,
        height:250
    }
    bag = {
        img:null,
        x:150,
        y:930,
        width:250,
        height:250
    }
    constraint
    game
    fireScale = 0
    speedX = 0.0
    speedY = 0.0
    x = 6000
    y = 750
    width = 250
    height = 400
    offsetBallon = {
        x:150,
        y:450
    }
    size = 120
    compoundBody
    person = null
    personImg = null
    gameOver = false
    gazImg
    start = false
    gaz = {
        x:310,
        y:50,
        w:200,
        h:50,
        level:200
    }
    groundCollege = false
    coin = {
        img:null,
        count:this.database.getAll().score,
        vis: new Coin(),
        audio:null
    }

    constructor(x,y,countDevice = 0) {
        super();
        this.x = x
        this.y = y
        this.countDevice = countDevice
    }

    init(p5){
        this.p5 = p5
    }

    async preload(handleImage){
        this.ballonImage = [
            await this.p5.loadImage('./img/ballon_1.png',handleImage),
            await this.p5.loadImage('./img/ballon.png',handleImage),

        ];
        this.basketImage = [
            await this.p5.loadImage('./img/bascet_1.png',handleImage),
            await this.p5.loadImage('./img/bascet.png',handleImage)
        ];
        this.burner.img = [
            await this.p5.loadImage('./img/burner_1.png',handleImage),
            await this.p5.loadImage('./img/burner.png',handleImage)
        ];
        this.fireImg.img = await this.p5.loadImage('./img/faer.png',handleImage);
        this.bag.img = await this.p5.loadImage('./img/bag.png',handleImage);
        this.personImg = await this.p5.loadImage('./img/player.png',handleImage);
        this.gazImg = await this.p5.loadImage('./img/ballon-gaz.svg',handleImage);
        this.coin.img = await this.p5.loadImage('./img/coin.svg',handleImage);
    }

    event(engine){
        this.Events.on(engine,"collisionActive",(event)=>{
            let pairs = event.pairs;
            for (let i = 0; i < pairs.length; i++) {
                let pair = pairs[i];

                if((pair.bodyA.label === "player" && pair.bodyB.label === "ground") || (pair.bodyA.label === "player" && pair.bodyB.label === "restart")){
                    this.gameOver = true
                    this.start = false
                    this.speedX = 0

                }


            }

        })
        this.Events.on(engine,"collisionStart",(event)=>{
            let pairs = event.pairs;
            for (let i = 0; i < pairs.length; i++) {
                let pair = pairs[i];

                if(pair.bodyB.label === "ground" && pair.bodyA.label === "basket"){
                    this.groundCollege = true
                }
                if((pair.bodyB.label === "coin" && pair.bodyA.label === "basket") || (pair.bodyB.label === "basket" && pair.bodyA.label === "coin")){
                    this.coin.count +=10
                    this.removeBody(this.game.engine.world,pair.bodyB,"coin")
                    this.removeBody(this.game.engine.world,pair.bodyA,"coin")
                    this.Composite.remove(this.game.engine.world,pair.bodyB)
                    this.coin.vis.create(pair.bodyB.position.x,pair.bodyB.position.y)
                    this.coin.audio.play()
                    this.database.setScore(this.coin.count)
                }


            }

        })

        this.Events.on(engine,"collisionEnd",(event)=>{
            let pairs = event.pairs;
            for (let i = 0; i < pairs.length; i++) {
                let pair = pairs[i];
                if(pair.bodyB.label === "ballon" && pair.bodyA.label === "very"){
                    this.speedX = 0
                    this.speedY = 0
                }

                if(pair.bodyB.label === "ground" && pair.bodyA.label === "basket"){
                    this.groundCollege = false
                }


            }

        })
    }

    create(game){
        this.game = game
        this.coin.audio = this.createAudio("coin.mp3")

        this.person = this.rect(this.x,this.y - 100,60,120,{label:"player"})
        this.basket.bottom = this.rect(-50,50,100,10,{label:"basket"})
        this.basket.right = this.rect(50,-50,10,100,{label:"basket"})
        this.basket.left = this.rect( -50,-50,10,100,{label:"basket"})
        this.burner.body = this.rect( this.x,this.y,this.burner.img[this.countDevice].width,this.burner.img[this.countDevice].height,{label:"burner",isSensor:true})
        this.compoundBody = this.Body.create({
            parts: [this.basket.bottom, this.basket.right, this.basket.left]
        });
        this.Body.setPosition(this.compoundBody,{x:this.x,y:this.y});

        this.ballon = this.circle(this.x - this.offsetBallon.x,this.y - this.offsetBallon.y,300,{label:"ballon",isSensor:true})


        let constrBurnerBallon = this.setConstraint(this.ballon,this.burner.body,
            {x:0,y:0},
            {x:0,y:0},1,210);
        let constrBurnerBasckedLeft = this.setConstraint(this.burner.body, this.compoundBody,
            {x: 0, y: 0},
            {x: -50, y: -50}, 0.1,100);
        let constrBurnerBasckedRight = this.setConstraint(this.burner.body,this.compoundBody,
            {x:0,y:0},
            {x:50,y:-50},0.1,100);


        this.Composite.add(game.engine.world,[constrBurnerBallon,constrBurnerBasckedLeft,constrBurnerBasckedRight,this.burner.body,this.ballon,this.compoundBody,this.person])

        this.event(game.engine)
    }

    setUp(){
        if(this.gaz.level > 0){
        this.speedY = this.speedY > -1?this.speedY -=0.01:-1
        this.fireScale = this.fireScale < 1?this.fireScale +=0.01:1
        this.start = true

        }
    }

    setDown(){
        this.speedY = this.speedY < 0.1?this.speedY +=0.01:0.1
        this.fireScale = this.fireScale > 0?this.fireScale -=0.01:0
        this.start = true

    }

    update(){
    if(this.game.isPaused)return
        let hit = this.p5.collidePointRect(this.getMouseWorldX(this.game.offsetX,this.game.currentScale),this.getMouseWorldY(this.game.offsetY,this.game.currentScale),this.fireImg.x - this.fireImg.width / 2,this.fireImg.y - this.fireImg.height / 2,this.fireImg.width,this.fireImg.height)
        let hit2 = this.p5.collidePointRect(this.getMouseWorldX(this.game.offsetX,this.game.currentScale),this.getMouseWorldY(this.game.offsetY,this.game.currentScale),this.bag.x - this.bag.width / 2,this.bag.y - this.bag.height / 2,this.bag.width,this.bag.height)


        if (mouseIsPressed === true && hit) {
                this.setUp()
       }
        if (mouseIsPressed === true && hit2) {
            this.setDown()
        }

       if(this.p5.keyIsPressed === true){
           if(this.p5.key === "w" || this.p5.key === "ц" || this.p5.key === "ArrowUp"){
                   this.setUp()


           }

           if(this.p5.key === "s" || this.p5.key === "ы" || this.p5.key === "ArrowDown"){
               this.setDown()
           }

       }

       if(!this.start){
           this.speedY =-0.3
           this.speedX = 0
           this.Body.setStatic(this.compoundBody,true)
       }else {
           this.Body.setStatic(this.compoundBody,false)
       }

       if(this.ballon.position.y < 300){
          this.speedX = 1
       }
        if(this.ballon.position.y < 100){
            this.speedX = 2
        }

        if(this.ballon.position.y < 0){
            this.speedX = 3
        }

        if(this.groundCollege){
            this.speedX = 0
        }

        if(this.gaz.level > 0){
            this.gaz.level -= this.fireScale / 10
        }

        if(this.gaz.level <= 0){
            this.speedY = 0.1
            this.fireScale = 0

        }

        if(this.fireScale > 0){
            if(this.width < 350){
                this.width += this.fireScale / 10
            }
        }
        if(this.fireScale <= 0){
            if(this.width > 250){
                this.width -= 0.5
            }
        }



        this.Body.setVelocity(this.ballon,{x:this.speedX,y:this.speedY})






        this.p5.push()
        stroke("#000")
        strokeWeight(2)
        line(this.compoundBody.position.x + this.basketImage[this.countDevice].width / 3,this.compoundBody.position.y - this.basketImage[this.countDevice].height / 2,this.burner.body.position.x + 15,this.burner.body.position.y + 10)
        line(this.compoundBody.position.x - this.basketImage[this.countDevice].width / 3,this.compoundBody.position.y - this.basketImage[this.countDevice].height / 2,this.burner.body.position.x - 15,this.burner.body.position.y + 10)
        this.p5.pop()
        image(this.ballonImage[this.countDevice],this.ballon.position.x,this.ballon.position.y,this.width,this.height)
        updateAndDrawFire(this.burner.body.position.x, this.burner.body.position.y - this.burner.img[this.countDevice].height / 2,this.fireScale);
        this.p5.push()
        translate(this.person.position.x,this.person.position.y)
        this.p5.rotate(this.person.angle);
        this.p5.rotate(0);
        translate(0,0)
        image(this.personImg,0,0,this.person.width,this.person.height)
        this.p5.pop()
        this.p5.push()
        translate(this.compoundBody.position.x,this.compoundBody.position.y)
        this.p5.rotate(this.compoundBody.angle);
        this.p5.rotate(0);
        translate(0,0)
        image(this.basketImage[this.countDevice],0,0,this.compoundBody.width,this.compoundBody.height)
        this.p5.pop()
        image(this.burner.img[this.countDevice],this.burner.body.position.x, this.burner.body.position.y)
        this.p5.push()
        stroke("#000")
        strokeWeight(2)
        line(this.ballon.position.x - 50,this.ballon.position.y + 150,this.burner.body.position.x - 15,this.burner.body.position.y - 10)
        line(this.ballon.position.x + 50,this.ballon.position.y + 150,this.burner.body.position.x + 15,this.burner.body.position.y - 10)

        this.p5.pop()
        this.coin.vis.draw(this.coin.img)



    }

    fire(){
        image(this.fireImg.img,this.fireImg.x,this.fireImg.y,this.fireImg.width,this.fireImg.height)
    }


    btn(){
        this.fire()
        image(this.bag.img,this.bag.x,this.bag.y,this.bag.width,this.bag.height)
        this.fuelLevel()
        image(this.coin.img,120,150)
        this.p5.push()
        textSize(50);
        fill("white")
        stroke("#000")
        text(this.coin.count,180,165)
        this.p5.pop()
    }

    fuelLevel(){
        this.p5.push()
        stroke("#FF9926")
        strokeWeight(2)

        fill("#fff")
        rect(this.gaz.x,this.gaz.y,this.gaz.w,this.gaz.h)
        fill("#2DE810")
        rect(this.gaz.x - this.gaz.w / 2 + this.gaz.level / 2,50,this.gaz.level,50)
        image(this.gazImg,this.gaz.x - 190,this.gaz.y)
        this.p5.pop()
    }
}