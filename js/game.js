class Game {
    constructor(){
        this.startScreen = document.getElementById('game-intro') ;
        this.gameScreen = document.getElementById('game-screen') ;
        this.endScreen = document.getElementById('game-end') ;
        this.height = 600 ;
        this.width = 800 ; 
        this.player = new Player(this.gameScreen);
        this.meat = [] ;
        this.squirrels = [] ;
        this.score = 0 ;
        this.timer = 60 ;
        this.gameIsOver = false ;

        this.gameScreen.style.height=`${this.height}px`;
        this.gameScreen.style.width=`${this.width}px` ;
    }

    start (){
        this.startScreen.style.display = 'none';
        this.gameScreen.style.display = 'block';
        console.log ('displaying gamescreen') ;
    }


}