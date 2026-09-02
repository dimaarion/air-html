class Level_1 extends Action{
    p5
    scene
    ground = {
        data:{},
        body:{}
    }
    sky = {
        img:null,
        count:30,
        arr:[]
    }
    bg_2 = {
        img:null,
        count:30,
        arr:[]
    }
    stone = {
        img:null,
        count:30,
        arr:[]
    }
    hill = {
        img:null,
        count:30,
        arr:[]
    }
    wind = {
        weak:{
            body:null,
            speed:0.1
        }
    }
    async preload(p5){
        this.p5 = p5
        this.scene = await this.p5.loadJSON('./json/scene.json');
        this.sky.img = await this.p5.loadImage('./img/sky.svg');
        this.bg_2.img = await this.p5.loadImage('./img/bg_2.svg');
        this.stone.img = await this.p5.loadImage('./img/stone.svg');
        this.hill.img = await this.p5.loadImage('./img/hill.svg');
    }

    create(world){


        this.ground.body =  this.rect(0,865,7000,35,{isStatic:true})
        this.wind.weak.body = this.rect(0,50,7000,200,{isStatic:true,isSensor:true,label:"weak"})
        this.Composite.add(world,[this.ground.body,this.wind.weak.body])
        this.sky.arr = this.createArray(this.sky.count).map((el)=>{
            el = {
                img:this.sky.img,
                x:el * this.sky.img.width,
                y:this.getRandomInt(-500,500)
            }

            return el
        })
        this.bg_2.arr = this.createArray(this.bg_2.count).map((el)=>{
            el = {
                img:this.bg_2.img,
                x:el * (this.bg_2.img.width - 20),
                y:800
            }

            return el
        })
        this.stone.arr = this.createArray(this.stone.count).map((el)=>{
            el = {
                img:this.stone.img,
                x:el * this.stone.img.width,
                y:1000
            }

            return el
        })
        this.hill.arr = this.createArray(this.hill.count).map((el)=>{
            el = {
                img:this.hill.img,
                x:el * this.getRandomInt(-100,this.hill.img.width),
                y:850,
                scale:this.getRandomFloat(1,2)
            }

            return el
        })

    }

    update(){
        this.p5.push()
        this.sky.arr.forEach((el)=>{
            image(el.img,el.x ,el.y )
        })
        this.bg_2.arr.forEach((el)=>{
            image(el.img,el.x ,el.y )
        })
        this.p5.push()
        this.hill.arr.forEach((el)=>{
            image(el.img,el.x ,el.y,el.img.width * el.scale,el.img.height * el.scale)
        })
        this.p5.pop()
        this.p5.noStroke()
        fill("#4A3124")
        rect(0,1400,7000,1000)
        fill("#381D13")
        rect(0,900,7000,15)
        fill("#747536")
        rect(0,885,7000,15)
        fill("#A6BD24")
        rect(this.ground.body.position.x,this.ground.body.position.y,this.ground.body.width,this.ground.body.height)
        this.stone.arr.forEach((el)=>{
            image(el.img,el.x ,el.y )
        })
        fill("blue")
        rect(this.wind.weak.body.position.x,this.wind.weak.body.position.y,this.wind.weak.body.width,this.wind.weak.body.height)
        this.p5.pop()
    }

    bg(){
        this.p5.push()
        this.p5.fillGradient('linear', {
            from : [0,0],   // x, y : Coordinates
            to : [0,1080], // x, y : Coordinates
            steps : [
                color("#6DCED1"),
                color("#C8EBC7"),
            ] // Array of p5.color objects or arrays containing [p5.color Object, Color Stop (0 to 1)]
        });
        rect(0, -500, 1920 * 3, 1080 * 3);
        this.p5.pop()
    }
}