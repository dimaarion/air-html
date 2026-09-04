class Player extends Action{
    p5
    ballon
    basket = {
        bottom:null,
        left:null,
        right:null,
    }
    ballonImage
    basketImage
    burner
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
    fireScale = 0.2
    speedX = 0.0
    speedY = 0.0
    x = 1000
    y = 750
    offsetBallon = {
        x:88,
        y:450
    }
    size = 120
    compoundBody
    person = null
    personImg = null
    gameOver = false
    init(p5){
        this.p5 = p5
    }

    async preload(handleImage){
        this.ballonImage = await this.p5.loadImage('./img/ballon.png',handleImage);
        this.basketImage = await this.p5.loadImage('./img/bascet.png',handleImage);
        this.burner = await this.p5.loadImage('./img/burner.png',handleImage);
        this.fireImg.img = await this.p5.loadImage('./img/faer.png',handleImage);
        this.bag.img = await this.p5.loadImage('./img/bag.png',handleImage);
        this.personImg = await this.p5.loadImage('./img/player.png',handleImage);
    }

    event(engine){
        this.Events.on(engine,"collisionActive",(event)=>{
            let pairs = event.pairs;
            for (let i = 0; i < pairs.length; i++) {
                let pair = pairs[i];

                if(pair.bodyB.label === "ballon" && pair.bodyA.label === "weak"){
                    this.speedX = 1
                }
                if(pair.bodyB.label === "ballon" && pair.bodyA.label === "strong"){
                    this.speedX = 2
                }
                if(pair.bodyB.label === "ballon" && pair.bodyA.label === "very"){
                    this.speedX = 3
                }
                if(pair.bodyB.label === "player" && pair.bodyA.label === "ground"){
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
                if(pair.bodyB.label === "basket" && pair.bodyA.label === "ground"){
                    this.speedX = 0
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


            }

        })
    }

    create(game){
        this.game = game
        this.event(game.engine)


        this.person = this.rect(this.x,this.y - 100,60,120,{label:"player"})
        this.basket.bottom = this.rect(-50,50,100,10,{label:"basket"})
        this.basket.right = this.rect(50,-50,10,100,{label:"basket"})
        this.basket.left = this.rect( -50,-50,10,100,{label:"basket"})
        this.compoundBody = this.Body.create({
            parts: [this.basket.bottom, this.basket.right, this.basket.left]
        });
        this.Body.setPosition(this.compoundBody,{x:this.x,y:this.y});

        this.ballon = this.circle(this.x - this.offsetBallon.x,this.y - this.offsetBallon.y,300,{label:"ballon"})
        this.constraint = this.Constraint.create({
            bodyA:this.ballon,
            pointA: { x: 0, y: 210 },
            bodyB: this.compoundBody,
            pointB: { x: 0, y: -50 },
            stiffness: 1
        })
        this.constraintPerson = this.Constraint.create({
            bodyA:this.compoundBody,
            pointA: { x: 0, y: 0 },
            bodyB: this.person,
            pointB: { x: 0, y: 0 },
            stiffness: 0.0001
        })



        this.Composite.add(game.engine.world,[this.constraint,this.ballon,this.compoundBody,this.person,this.constraintPerson])
    }

    setUp(){
        this.speedY = this.speedY > -1?this.speedY -=0.01:-1
        this.fireScale = this.fireScale < 1?this.fireScale +=0.01:1
        this.start = true
    }

    setDown(){
        this.speedY = this.speedY < 0?this.speedY +=0.01:0
        this.fireScale = this.fireScale > 0?this.fireScale -=0.01:0
        this.start = true
    }

    update(){

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
       }

        this.Body.setVelocity(this.ballon,{x:this.speedX,y:this.speedY})



        updateAndDrawFire(this.ballon.position.x, this.ballon.position.y + this.ballon.diameter / 2 + 40,this.fireScale);
        image(this.ballonImage,this.ballon.position.x,this.ballon.position.y,290,400)
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
        image(this.basketImage,0,0,this.compoundBody.width,this.compoundBody.height)
        this.p5.pop()
        image(this.burner,this.ballon.position.x, this.ballon.position.y + this.ballon.diameter / 2 + 50)
        this.p5.push()
        stroke("#000")
        strokeWeight(5)
        line(this.ballon.position.x,this.ballon.position.y + 200,this.constraint.bodyB.position.x + this.constraint.pointB.x,this.constraint.bodyB.position.y + this.constraint.pointB.y)
        this.p5.pop()


    }

    fire(){
        image(this.fireImg.img,this.fireImg.x,this.fireImg.y,this.fireImg.width,this.fireImg.height)
    }


    btn(){
        this.fire()
        image(this.bag.img,this.bag.x,this.bag.y,this.bag.width,this.bag.height)
    }
}