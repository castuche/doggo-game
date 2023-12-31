window.onload = function (){
    const startButton = document.getElementById('start-button') ;
    const restartButton = document.getElementById('restart-button') ;
    const musicButton = document.getElementById('music-button') ;
    const soundButton = document.getElementById('sound-button') ;

    let game;

    function startGame() {
        console.log("start game");
        game = new Game();
        game.start()
    }

    startButton.addEventListener('click', () => {
        startGame();})

    restartButton.addEventListener('click', () => {
        location.reload()}) 
    
    musicButton.addEventListener('click', musicToggle);

    function musicToggle() {
        console.log('clicked music toggle');
        game.changeMusicState();
        musicButton.removeEventListener('click', musicToggle);
        setTimeout(() => {
            musicButton.addEventListener('click', musicToggle);
        }, 100);
    }

    soundButton.addEventListener('click', soundToggle);

    function soundToggle() {
        console.log('clicked sound toggle');
        game.changeSoundState();
        soundButton.removeEventListener('click', soundToggle);
        setTimeout(() => {
            soundButton.addEventListener('click', soundToggle);
        }, 100);
    }

    document.addEventListener('keydown', event => {
        if(event.code === 'ArrowLeft'){
            console.log('go left');
            game.player.direction = -3; 
        }
        if(event.code === 'ArrowRight'){
            console.log('go right');
            game.player.direction = 3; 
        }
        if(event.code === 'ArrowUp'){
            console.log('bark');
            game.bark();
        }
        if(event.code === 'KeyF'){
            console.log('French doggo');
            game.makeItFrench();
        }

        if(event.code === 'KeyS'){
            console.log('Spidy doggo');
            game.makeItSpiderman();
        }
    })

    document.addEventListener('keyup', event => {
        if(event.code === 'ArrowLeft' || event.code === 'ArrowRight' || event.code === 'ArrowUp'){
            console.log ('stop moving')
            game.player.direction=0
        }
    })

}