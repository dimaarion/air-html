class Settings extends Action {
    game
    effect = new Slider(591, 591, 737, 80, 80, this.database.getAll().effect)
    music = new Slider(591, 404, 737, 80, 80, this.database.getAll().music)
    close = new Close(1478, 200)
    pause = new Pause(1778, 70,100,100)
    isPaused = false
    preload() {

    }

    create(game) {
        this.game = game
        this.effect.create(game)
        this.effect.name = "Звуки"
        this.music.create(game)
        this.music.name = "Музыка"
        this.close.create(game)
        this.pause.create(game)
    }

    update() {
        if (!this.close.value && this.pause.value) {
            this.game.p5.push()
            this.game.p5.fill("#313B47")
            this.game.p5.rect(this.gameWidth / 2, this.gameHeight / 2, 1130, 631)
            this.game.p5.pop()
            this.effect.vis(() => {
                this.database.setEffect(this.effect.sliderValue)
            })
            this.music.vis(() => {
                this.database.setMusic(this.music.sliderValue)
            })
            this.game.p5.push()
            this.game.p5.textSize(72)
            this.game.p5.fill("white")
            this.game.p5.text("Настройки", this.gameWidth / 2 - 180, 290)
            this.game.p5.pop()
            this.close.update()
            this.game.isPaused = true
        }else {
           // this.isPaused = false
        }
        this.pause.update()
        if(this.close.value){
            this.pause.value = false
            this.close.value = false
            this.game.isPaused = false
        }
    }


    prees(game){

    }


}