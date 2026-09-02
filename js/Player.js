class Player extends Action{
    p5
    ballon
    basket
    ballonImage
    basketImage
    burner
    fireImg
    init(p5){
        this.p5 = p5
    }

    async preload(){
        this.ballonImage = await this.p5.loadImage('./img/ballon.png');
        this.basketImage = await this.p5.loadImage('./img/bascet.png');
        this.burner = await this.p5.loadImage('./img/burner.png');
        this.fireImg = await this.p5.loadImage('./img/faer.png');
    }

    create(scene,world){
        this.basket = scene.filter((el)=>el.name === "bascet").map((el)=>this.rect(el.pos[0],el.pos[1],el.size[0],el.size[1]))[0]
        this.ballon = scene.filter((el)=>el.name === "ballon").map((el)=>this.circle(el.pos[0],el.pos[1],el.size[0]))[0]
        let constraint = this.Constraint.create({
            bodyA:this.ballon,
            pointA: { x: 0, y: 0 },
            bodyB: this.basket,
            pointB: { x: 0, y: 0 },
            stiffness: 0.1
        })

        this.Composite.add(world,[constraint,this.ballon,this.basket])
    }

    update(){
        this.Body.setVelocity(this.ballon,{x:0,y:-0.1})
        if (mouseIsPressed === true) {
            this.Body.setVelocity(this.ballon,{x:0,y:-1})
        }
        updateAndDrawFire(this.ballon.position.x, this.ballon.position.y + this.ballon.diameter / 2 + 40,0.2);
        image(this.ballonImage,this.ballon.position.x,this.ballon.position.y,290,400)
        this.p5.push()
        translate(this.basket.position.x,this.basket.position.y)
        this.p5.rotate(this.basket.angle);
        this.p5.rotate(0);
        translate(0,0)
        image(this.basketImage,0,0,this.basket.width,this.basket.height)
        this.p5.pop()
        image(this.burner,this.ballon.position.x, this.ballon.position.y + this.ballon.diameter / 2 + 50)

    }

    fire(){
        image(this.fireImg,1920 - 150,1080 - 150,250,250)
    }
}