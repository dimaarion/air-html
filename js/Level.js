class Level_1 extends Action{
    p5
    scene
    width = 7000
    height = 1920
    player
    world
    ground = {
        data:{},
        body:{}
    }
    sky = {
        img:null,
        count:50,
        arr:[]
    }
    bg_2 = {
        img:null,
        count:40,
        arr:[]
    }
    stone = {
        img:null,
        count:190,
        arr:[]
    }
    hill = {
        img:null,
        count:30,
        arr:[]
    }
    mountain = {
        img:null,
        count:25,
        arr:[]
    }
    coin = {
        img:null,
        arr:[],
        json:[]
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
    finish = {
        body:null,
        img:null,
    }
    heaven
    grass_2
    ground_2
    ground_3
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
        this.finish.img = await this.p5.loadImage('./img/finish.svg',handleImage);
        this.coin.img = await this.p5.loadImage('./img/coin.svg',handleImage);
        this.coin.json = await this.p5.loadJSON('./json/level_1/coins.json',handleImage);
    }

    create(world){
        this.world = world
        this.christmas.body = this.scene.filter((el)=>el.name === "christmas").map((el)=>this.trapezoid(el.pos[0],el.pos[1],el.size[0] - el.size[0] / 4,el.size[1] - el.size[1] / 4,0.9,{isStatic:true,label:"restart"}))
        this.startImg.body = this.scene.filter((el)=>el.name === "Start").map((el)=>this.rect(el.pos[0],el.pos[1],el.size[0],el.size[1],{isStatic:true,label:"restart"}))
        this.platformImg.body = this.scene.filter((el)=>el.name === "platform-pusck").map((el)=>this.rect(el.pos[0],el.pos[1],el.size[0],el.size[1],{isStatic:true,label:"restart"}))
        this.finish.body = this.scene.filter((el)=>el.name === "finish").map((el)=>this.rect(el.pos[0],el.pos[1],el.size[0],el.size[1],{isStatic:true,isSensor:true}))
        this.partLeft = this.scene.filter((el)=>el.name === "platform-left").map((el)=>this.rect(el.pos[0],el.pos[1],el.size[0],el.size[1],{isStatic:true}))
        this.partRight = this.scene.filter((el)=>el.name === "platform-right").map((el)=>this.rect(el.pos[0],el.pos[1],el.size[0],el.size[1],{isStatic:true}))
        this.ground.body = this.scene.filter((el)=>el.name === "ground").map((el)=>this.rect(el.pos[0],el.pos[1],el.size[0],el.size[1],{isStatic:true,label:"ground"}))
        this.heaven = this.scene.filter((el)=>el.name === "heaven").map((el)=>this.rect(el.pos[0],el.pos[1],el.size[0],el.size[1],{isStatic:true,isSensor:true,label:""}))
        this.grass_2 = this.scene.filter((el)=>el.name === "grass_2").map((el)=>this.rect(el.pos[0],el.pos[1],el.size[0],el.size[1],{isStatic:true,isSensor:true,label:"restart"}))
        this.ground_3 = this.scene.filter((el)=>el.name === "ground_3").map((el)=>this.rect(el.pos[0],el.pos[1],el.size[0],el.size[1],{isStatic:true,isSensor:true,label:"restart"}))
        this.ground_2 = this.scene.filter((el)=>el.name === "grond_2").map((el)=>this.rect(el.pos[0],el.pos[1],el.size[0],el.size[1],{isStatic:true,isSensor:true,label:"restart"}))
        this.coin.arr = this.coin.json.map((el)=>this.rect(el.pos[0],el.pos[1],el.size[0],el.size[1],{isStatic:true,isSensor:true,label:"coin"}))



        this.wind.weak.body = this.rect(0,50,10000,200,{isStatic:true,isSensor:true,label:"weak"})
        this.wind.strong.body = this.rect(0,-200,10000,200,{isStatic:true,isSensor:true,label:"strong"})
        this.wind.very.body = this.rect(0,-500,10000,200,{isStatic:true,isSensor:true,label:"very"})
        let w = [
            this.wind.weak.body,
            this.wind.strong.body,
            this.wind.very.body,
        ].concat(
            this.ground.body,
            this.christmas.body,
            this.startImg.body,
            this.platformImg.body,
            this.partLeft,
            this.finish.body,
            this.partRight,
            this.heaven,
            this.grass_2,
            this.ground_3,
            this.ground_2,
            this.coin.arr
        )
        this.Composite.add(world,w)
        this.sky.arr = this.createArray(this.sky.count).map((el)=>{
            el = {
                img:this.sky.img,
                x:el * this.sky.img.width,
                y:this.getRandomInt(0,500)
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
                y:1000,
                width:this.stone.img.width,
                height:this.stone.img.height,
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


        this.player = this.getPlayer(world)



    }

    remove(engine){
       this.Composite.clear(engine.world,true)
    }

    update(){
        this.p5.push()

        this.mountain.arr.forEach((el)=>{
            this.visible(this.player,this.p5,el.x,el.y,el.img.width * el.scale,el.img.height * el.scale,()=>image(el.img,el.x ,el.y,el.img.width * el.scale,el.img.height * el.scale))
        })
        this.sky.arr.forEach((el)=>{
            this.visible(this.player,this.p5,el.x,el.y,el.width,el.height,()=>image(el.img,el.x,el.y))
        })
        this.bg_2.arr.forEach((el)=>{
            this.visible(this.player,this.p5,el.x,el.y,el.width,el.height,()=>image(el.img,el.x,el.y))
        })

        this.p5.push()
        this.hill.arr.forEach((el)=>{
            this.visible(this.player,this.p5,el.x,el.y,el.width,el.height,()=>image(el.img,el.x,el.y))
        })
        this.p5.pop()
        this.p5.noStroke()
        fill("#4A3124")
        this.ground_2.forEach((el)=>{
            rect(el.position.x,el.position.y,el.width,el.height)
        })

        fill("#A6BD24")
        this.ground.body.forEach((el)=>{
            rect(el.position.x,el.position.y,el.width,el.height)
        })
        fill("#747536")
        this.grass_2.forEach((el)=>{
            rect(el.position.x,el.position.y,el.width,el.height)
        })
        this.stone.arr.forEach((el)=>{
            this.visible(this.player,this.p5,el.x,el.y,el.width,el.height,()=>image(el.img,el.x,el.y))
        })
        fill("#381D13")
        this.ground_3.forEach((el)=>{
            rect(el.position.x,el.position.y,el.width,el.height)
        })
        this.christmas.body.forEach((el)=>{
            this.visible(this.player,this.p5,el.position.x,el.position.y,el.width + el.width / 2,el.height + el.height / 2,()=>image(this.christmas.img,el.position.x,el.position.y ,el.width + el.width / 2,el.height + el.height / 2))
        })
        this.startImg.body.forEach((el)=>{
            image(this.startImg.img,el.position.x,el.position.y)
        })
        this.platformImg.body.forEach((el)=>{
            image(this.platformImg.img,el.position.x,el.position.y)
        })
        this.finish.body.forEach((el)=>{
            this.visible(this.player,this.p5,el.position.x,el.position.y,el.width,el.height,()=>image(this.finish.img,el.position.x,el.position.y,el.width,el.height))
        })
        this.getObjects(this.world,"coin").forEach((el)=>{
            this.visible(this.player,this.p5,el.position.x,el.position.y,el.width,el.height,()=>image(this.coin.img,el.position.x,el.position.y))
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
        this.heaven.forEach((el)=>{
            rect(el.position.x,el.position.y,el.width,el.height)
        })

        this.p5.pop()
    }
}