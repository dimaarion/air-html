class Game {
  sdk = new Ysdk()
  p5
  database = new Database()
  settings = new Settings()
  canvas
  virtualWidth = 1920;
  virtualHeight = 1080;
  engine
  Bodies = Matter.Bodies
  Composite = Matter.Composite
  Body = Matter.Body
  Events = Matter.Events
  Constraint = Matter.Constraint
  player = new Player(2300,750)
  platform
  stone = {
      data:{},
      body:{}
  }
  cameraX = 0;
  cameraY = 0;
  offsetX = 0;
  offsetY = 0;
  scene
  level_1 = new Level_1()
    p5bezier
    currentScale
  constructor() {

  }

init(p5){
    this.p5 = p5
}


  vierBox(){
    let scaleX = width / this.virtualWidth;
    let scaleY = height / this.virtualHeight;
    this.currentScale = min(scaleX, scaleY);
    this.offsetX = (width - this.virtualWidth * this.currentScale) / 2;
    this.offsetY = (height - this.virtualHeight * this.currentScale) / 2;
    translate(this.offsetX, this.offsetY);
    scale(this.currentScale);
  }

    async preload(handleImage){
        this.player.init(this.p5)
        await this.player.preload(handleImage)
        await this.level_1.preload(this.p5,handleImage)
        this.scene = await this.p5.loadJSON('./json/scene.json',handleImage);
    }

    event(){
        this.Events.on(this.engine,"collisionStart",(event)=>{
            let pairs = event.pairs;
            for (let i = 0; i < pairs.length; i++) {
                let pair = pairs[i];
                if((pair.bodyA.label === "player" && pair.bodyB.label === "ground") || (pair.bodyA.label === "player" && pair.bodyB.label === "restart")){
                    this.restart()
                }


            }

        })
    }

    async create(canvas){
    await  this.sdk.create()
    await this.sdk.start()
    this.canvas = canvas
    rectMode(this.p5.CENTER);
    imageMode(this.p5.CENTER);
    this.engine = Matter.Engine.create()
    this.player.create(this)
    this.level_1.create(this.engine.world)
    this.p5bezier = initBezier(this.canvas)
    this.settings.create(this)
    this.event()


  }

  update(){
      rectMode(this.p5.CENTER);
      imageMode(this.p5.CENTER);
    this.p5.push();
    this.getCameraOffset()
    this.level_1.bg()
    this.level_1.update()
    this.player.update()
    Matter.Engine.update(this.engine)
    this.p5.pop();
    this.player.btn()
    this.settings.update(this)

  }
   getCameraOffset = () => {
    // Вычисляем физический центр плитки игрока в координатах SVG
    const playerSvgX = this.player.ballon.position.x + 50;
    const playerSvgY = this.player.ballon.position.y + 50;

    // Находим точку смещения, чтобы игрок оказался ровно по центру viewBox
     this.cameraX = this.virtualWidth / 2 - playerSvgX;
     this.cameraY = this.virtualHeight / 2 - playerSvgY;
     translate(this.cameraX,this.cameraY)
  };

  restart(){
      this.level_1.remove(this.engine)
      this.player.create(this)
      this.level_1.create(this.engine.world)
      this.player.start = false
      this.player.gaz.level = 200
      this.player.fireScale = 0.3
  }

  board(e){
      if(e.key === "r" || e.key === "к"){
        this.restart()
      }

  }



}
