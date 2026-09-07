const game = new Game()
let c
let isLoaded = false
let totalAssets = [];
let loadedAssets = 0;


function handleImage(e){
    totalAssets = [...totalAssets,e]
    loadedAssets++;
    if (loadedAssets === totalAssets.length) {
        isLoaded = true;
    }
    return e

}


async function setup() {
 c = createCanvas(window.innerWidth, window.innerHeight);
 game.init(this)
 await game.preload(handleImage)
 game.vierBox()
 await game.create(c)

}



function draw() {
    if(isLoaded){
        background(255)
        game.vierBox()
        game.update()

    }else {
        background("#000")
    }




}

function keyPressed(e) {
    game.board(e)
}

function mousePressed() {
    game.prees()
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}


