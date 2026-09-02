const game = new Game()

let c
let img
async function setup() {
    game.init(this)
 await game.preload()
 c = createCanvas(window.innerWidth, window.innerHeight);
  game.vierBox()
  game.create(c)

}

function draw() {
  game.vierBox()
  game.update()

}



function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}


