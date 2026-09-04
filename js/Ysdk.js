class Ysdk{
    ysdk
    player
    async create(){
        if(typeof YaGames !== "undefined"){
            this.ysdk = await YaGames.init();
            this.ysdk.features.LoadingAPI?.ready()
            const lang = this.ysdk.environment.i18n.lang
            try {
                this.player = await this.ysdk.getPlayer();
            } catch (e) {
                this.player = null
            }
        }else {
            this.ysdk = null
        }

    }




    async start(){
        if(this.ysdk){
            await this.ysdk.features.GameplayAPI?.start()
        }

    }
}