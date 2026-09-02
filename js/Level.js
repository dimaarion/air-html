class Level_1 extends Action{
    p5
    scene
    ground = {
        data:{},
        body:{}
    }
    async preload(p5){
        this.p5 = p5
        this.scene = await this.p5.loadJSON('./json/scene.json');
    }

    create(world){
        this.ground.data = this.scene.find((el)=>el.name === "ground")
        this.ground.body =  this.createPolygonFromJson(this.ground.data,{isStatic: true})
        this.Composite.add(world,[this.ground.body])
    }

    update(){
        background("#D1FCFF")

        push()
        rectMode(CORNERS)

        translate(-4000,0)
        this.drawJsonPolygon(this.ground.data,this.ground.body,this.p5)
        pop()
    }
}