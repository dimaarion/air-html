const game = new Game()


let img
async function setup() {
    game.init(this)
 await game.preload()
  createCanvas(window.innerWidth, window.innerHeight);
  game.vierBox()
  game.create()
}

function draw() {
  game.vierBox()
  game.update()

}



function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}


