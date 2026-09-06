const game = new Game()
let c
let isLoaded = false
let totalAssets = [];
let loadedAssets = 0;
let settings = new Settings()

function handleImage(e){
    totalAssets = [...totalAssets,e]
    loadedAssets++;
    if (loadedAssets === totalAssets.length) {
        isLoaded = true;
    }
    return e

}
let testSlider = new Slider("circle", false, 100, 300)
testSlider.smooth = false
testSlider.segments = 6
testSlider.Slength = 150
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
        let fps = frameRate();

        // Выводим текст
        fill(0);
        textSize(30);
        text("FPS: " + fps.toFixed(2), 1000, 50);
    }else {
        background("#000")
    }




}

function keyPressed(e) {
    game.board(e)


}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}


