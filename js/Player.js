class Player extends Action{
    p5
    ballon
    basket
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
    constraint
    game
    fireScale = 0.2
    init(p5){
        this.p5 = p5
    }

    async preload(){
        this.ballonImage = await this.p5.loadImage('./img/ballon.png');
        this.basketImage = await this.p5.loadImage('./img/bascet.png');
        this.burner = await this.p5.loadImage('./img/burner.png');
        this.fireImg.img = await this.p5.loadImage('./img/faer.png');
    }

    event(engine){
        this.Events.on(engine,"collisionActive",(event)=>{
            let pairs = event.pairs;
            for (let i = 0; i < pairs.length; i++) {
                let pair = pairs[i];
                if(pair.bodyB.label === "ballon" && pair.bodyA.label === "weak"){
                    this.Body.setVelocity(this.ballon,{x:1,y:0})
                }

            }

        })
    }

    create(game){
        this.game = game
        this.event(game.engine)
        this.basket = this.rect(1024,576,125,125)
        this.ballon = this.circle(936,136,300,{label:"ballon"})
        this.constraint = this.Constraint.create({
            bodyA:this.ballon,
            pointA: { x: 0, y: 200 },
            bodyB: this.basket,
            pointB: { x: 0, y: -50 },
            stiffness: 1
        })



        this.Composite.add(game.engine.world,[this.constraint,this.ballon,this.basket])
    }

    update(){

        let hit = this.p5.collidePointRect(this.getMouseWorldX(this.game.offsetX,this.game.currentScale),this.getMouseWorldY(this.game.offsetY,this.game.currentScale),this.fireImg.x - this.fireImg.width / 2,this.fireImg.y - this.fireImg.height / 2,this.fireImg.width,this.fireImg.height)
       if (mouseIsPressed === true && hit) {
            this.Body.setVelocity(this.ballon,{x:this.ballon.velocity.x,y:-1})
            this.fireScale = this.fireScale < 1?this.fireScale +=0.01:1
       }else {
             this.fireScale = this.fireScale > 0.1?this.fireScale -=0.01:0.1
       }

        updateAndDrawFire(this.ballon.position.x, this.ballon.position.y + this.ballon.diameter / 2 + 40,this.fireScale);
        image(this.ballonImage,this.ballon.position.x,this.ballon.position.y,290,400)
        this.p5.push()
        translate(this.basket.position.x,this.basket.position.y)
        this.p5.rotate(this.basket.angle);
        this.p5.rotate(0);
        translate(0,0)
        image(this.basketImage,0,0,this.basket.width,this.basket.height)
        this.p5.pop()
        image(this.burner,this.ballon.position.x, this.ballon.position.y + this.ballon.diameter / 2 + 50)
        this.p5.push()
        stroke("#000")
        strokeWeight(5)
        line(this.constraint.bodyA.position.x + this.constraint.pointA.x,this.constraint.bodyA.position.y + this.constraint.pointA.y,this.constraint.bodyB.position.x + + this.constraint.pointB.x,this.constraint.bodyB.position.y + this.constraint.pointB.y)
        this.p5.pop()
    }

    fire(){
        image(this.fireImg.img,this.fireImg.x,this.fireImg.y,this.fireImg.width,this.fireImg.height)
    }
}