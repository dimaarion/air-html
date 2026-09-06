class Close{
    game
    action = new Action()
    constructor() {

    }
    preload(){

    }

    create(game){
        this.game = game

    }

    update(){
        this.game.p5.push()
        this.game.p5.rotate(45)
        this.game.p5.translate(-500,-500)
        this.game.p5.rect(500,500,10,30)
        this.game.p5.pop()
    }
}

class Slider{
    action = new Action()
    game
    name = ""
    utils = new p5.Utils();
    sliderThumb = {
        x:300,
        y:300,
        r:100
    }
    sliderTrek = {
        x:300,
        y:300,
        w:400,
        h:100,
        color:"white"
    }
    sliderValue = 0

    constructor(x,y,w,h,r,value = 0) {
        this.sliderValue = value
        this.sliderThumb.x = x
        this.sliderTrek.x = x
        this.sliderThumb.y = y
        this.sliderTrek.y = y
        this.sliderTrek.w = w
        this.sliderTrek.h = h
        this.sliderThumb.r = r
    }

    create(game){
        this.game = game
        this.sliderThumb.x = this.sliderThumb.x + (this.sliderValue * this.sliderTrek.w / 100) * 100
    }

    vis(setValue = ()=>{}){
        this.game.p5.push()
        this.game.p5.rectMode(this.game.p5.CORNER)
        let hit = this.game.p5.collidePointRect(this.action.getMouseWorldX(this.game.offsetX,this.game.currentScale),this.action.getMouseWorldY(this.game.offsetY,this.game.currentScale),this.sliderTrek.x,this.sliderTrek.y,this.sliderTrek.w,this.sliderTrek.h)

        this.game.p5.fill(this.sliderTrek.color)
        this.game.p5.rect(this.sliderTrek.x,this.sliderTrek.y,this.sliderTrek.w,this.sliderTrek.h)

        if (mouseIsPressed === true && hit) {
            this.sliderThumb.x = this.action.getMouseWorldX(this.game.offsetX,this.game.currentScale)
        }
        this.game.p5.fill("#FF9926")
        this.game.p5.noStroke()
        this.utils.beginShadow(
            "#FF9926",
            20,
            0,
            0);
        this.game.p5.circle(this.sliderThumb.x,this.sliderThumb.y + this.sliderThumb.r / 2,this.sliderThumb.r)
        this.utils.endShadow();
        if (mouseIsPressed === true && hit) {
            this.sliderValue  = ((this.sliderThumb.x - this.sliderTrek.x) * 100 / this.sliderTrek.w / 100).toFixed(1)
            setValue()
        }
        this.game.p5.textSize(40)
        this.game.p5.text(this.name,this.sliderTrek.x,this.sliderTrek.y - 10)
        this.game.p5.pop()
    }


}