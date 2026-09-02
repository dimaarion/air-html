class Game {
  p5
  canvas
  virtualWidth = 1920;
  virtualHeight = 1080;
  engine
  Bodies = Matter.Bodies
  Composite = Matter.Composite
  Body = Matter.Body
  Constraint = Matter.Constraint
  player = new Player()
  ground = new Ground()
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
  constructor() {

  }

init(p5){
    this.p5 = p5
}


  vierBox(){
    let scaleX = width / this.virtualWidth;
    let scaleY = height / this.virtualHeight;
    let currentScale = min(scaleX, scaleY);
    this.offsetX = (width - this.virtualWidth * currentScale) / 2;
    this.offsetY = (height - this.virtualHeight * currentScale) / 2;
    translate(this.offsetX, this.offsetY);
    scale(currentScale);
  }

    async preload(){
        this.player.init(this.p5)
        await this.player.preload()
        await this.ground.preload(this.p5)
        await this.level_1.preload(this.p5)
       this.scene = await this.p5.loadJSON('./json/scene.json');
    }

  create(){
      rectMode(this.p5.CENTER);
      imageMode(this.p5.CENTER);
    this.engine = Matter.Engine.create()
    this.player.create(this.scene,this.engine.world)
    this.level_1.create(this.engine.world)

  }

  update(){
      rectMode(this.p5.CENTER);
      imageMode(this.p5.CENTER);


    this.p5.push();
    this.getCameraOffset()
    this.level_1.update()
    this.player.update()
      Matter.Engine.update(this.engine)
    this.p5.pop();

      this.player.fire()

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

}
