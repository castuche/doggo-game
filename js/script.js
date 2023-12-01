window.onload = function (){
    const startButton = document.getElementById('start-button') ;
    const restartButton = document.getElementById('start-button') ;

    function startGame() {
        console.log("start game");
        let game = new Game();
        game.start()
    }

    startButton.addEventListener('click', () => {
        startGame();})

    

}