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
        count:10,
        arr:[]
    }
    mountain = {
        img:null,
        count:10,
        arr:[]
    }

    wind = {
        weak:{
            body:null,
            speed:1
        },
        strong:{
            body:null,
            speed:2
        },
        very:{
            body:null,
            speed:3
        },
    }
    christmas = {
        img:null,
        body:null
    }
    partLeft
    partRight
    startImg = {
        body:null,
        img:null,
    }
    platformImg = {
        body:null,
        img:null,
    }
    async preload(p5,handleImage){
        this.p5 = p5
        this.scene = await this.p5.loadJSON('./json/scene.json',handleImage);
        this.sky.img = await this.p5.loadImage('./img/sky.svg',handleImage);
        this.bg_2.img = await this.p5.loadImage('./img/bg_2.svg',handleImage);
        this.stone.img = await this.p5.loadImage('./img/stone.svg',handleImage);
        this.hill.img = await this.p5.loadImage('./img/hill.svg',handleImage);
        this.mountain.img = await this.p5.loadImage('./img/mountain.svg',handleImage);
        this.christmas.img = await this.p5.loadImage('./img/christmas.svg',handleImage);
        this.startImg.img = await this.p5.loadImage('./img/Start.svg',handleImage);
        this.platformImg.img = await this.p5.loadImage('./img/platform-pusck.svg',handleImage);
    }

    create(world){
        this.christmas.body = this.scene.filter((el)=>el.name === "christmas").map((el)=>this.trapezoid(el.pos[0],el.pos[1],el.size[0],el.size[1],1,{isStatic:true}))
        this.startImg.body = this.scene.filter((el)=>el.name === "Start").map((el)=>this.rect(el.pos[0],el.pos[1],el.size[0],el.size[1],{isStatic:true}))
        this.platformImg.body = this.scene.filter((el)=>el.name === "platform-pusck").map((el)=>this.rect(el.pos[0],el.pos[1],el.size[0],el.size[1],{isStatic:true}))
        this.partLeft = this.rect(0,-1500,100,3000,{isStatic:true})
        this.partRight = this.rect(6900,-1500,100,3000,{isStatic:true})
        this.ground.body =  this.rect(0,865,10000,35,{isStatic:true,label:"ground"})
        this.wind.weak.body = this.rect(0,50,10000,200,{isStatic:true,isSensor:true,label:"weak"})
        this.wind.strong.body = this.rect(0,-200,10000,200,{isStatic:true,isSensor:true,label:"strong"})
        this.wind.very.body = this.rect(0,-500,10000,200,{isStatic:true,isSensor:true,label:"very"})
        let w = [this.ground.body,
            this.wind.weak.body,
            this.wind.strong.body,
            this.wind.very.body,
            this.partLeft,
            this.partRight
        ].concat(
            this.christmas.body,
            this.startImg.body,
            this.platformImg.body
        )
        this.Composite.add(world,w)
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
        this.mountain.arr = this.createArray(this.mountain.count).map((el)=>{
            el = {
                img:this.mountain.img,
                x:el * this.mountain.img.width,
                y:850,
                scale:this.getRandomFloat(1,3)
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

    remove(engine){
       this.Composite.clear(engine.world,true)
    }

    update(){
        this.p5.push()

        this.mountain.arr.forEach((el)=>{
            image(el.img,el.x ,el.y,el.img.width * el.scale,el.img.height * el.scale)
        })
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
        rect(5000,1400,10000,1000)
        fill("#381D13")
        rect(5000,900,10000,15)
        fill("#747536")
        rect(5000,885,10000,15)
        fill("#A6BD24")
        rect(this.ground.body.position.x,this.ground.body.position.y,this.ground.body.width,this.ground.body.height)
        this.stone.arr.forEach((el)=>{
            image(el.img,el.x ,el.y )
        })
        this.christmas.body.forEach((el)=>{
            image(this.christmas.img,el.position.x,el.position.y,el.width,el.height + el.width / 2)
        })
        this.startImg.body.forEach((el)=>{
            image(this.startImg.img,el.position.x,el.position.y)
        })
        this.platformImg.body.forEach((el)=>{
            image(this.platformImg.img,el.position.x,el.position.y)
        })
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
        rect(5000, -500, 10000, 1080 * 3);
        this.p5.pop()
    }
}