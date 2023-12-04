class Game {
    constructor(){
        this.startScreen = document.getElementById('game-intro') ;
        this.gameScreen = document.getElementById('game-screen') ;
        this.endScreen = document.getElementById('game-end') ;
        this.height = 600 ;
        this.width = 800 ; 
        this.player = null ;
        this.meat = [] ;
        this.squirrels = [] ;
        this.score = 0 ;
        this.timer = 60 ;
        this.gameIsOver = false ;
        this.animateId = null;

    }

    start (){
        this.startScreen.style.display = 'none';
        this.endScreen.style.display = 'none';
        this.gameScreen.style.display = 'block';
        console.log ('displaying gamescreen') ;
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;
        this.player = new Player (this.gameScreen);
        this.gameLoop();
    }

    gameLoop(){
        this.player.move();
        this.animateId = requestAnimationFrame ( () => this.gameLoop());
    }


}