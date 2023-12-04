window.onload = function (){
    const startButton = document.getElementById('start-button') ;
    const restartButton = document.getElementById('start-button') ;

    let game;

    function startGame() {
        console.log("start game");
        game = new Game();
        game.start()
    }

    startButton.addEventListener('click', () => {
        startGame();})

/*     restartButton.addEventListener('click', () => {
            location.reload()}) */

    document.addEventListener('keydown', event => {
        if(event.code === 'ArrowLeft'){
            console.log('go left');
            game.player.direction = -2; 
        }
        if(event.code === 'ArrowRight'){
            console.log('go right');
            game.player.direction = 2; 
        }
        if(event.code === 'ArrowUp'){
            console.log('bark');
            game.bark();
        }
    })

    document.addEventListener('keyup', event => {
        if(event.code === 'ArrowLeft' || event.code === 'ArrowRight' || event.code === 'ArrowUp'){
            console.log ('stop moving')
            game.player.direction=0
        }
    })

}