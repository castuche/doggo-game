class Game {
    constructor(){
        this.startScreen = document.getElementById('game-intro') ;
        this.gameScreen = document.getElementById('game-screen') ;
        this.endScreen = document.getElementById('game-end') ;
        this.height = 600 ;
        this.width = 800 ; 
        this.player = null ;
        this.rewards = [] ;
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

        let newRewards = [];
        this.rewards.forEach(currentReward => {
            currentReward.move()
            if (currentReward.top<600-currentReward.element.height){
                if (this.player.didCollide(currentReward)) {
                    console.log('reward caught');
                    currentReward.element.remove()
                    this.score+=1;
                    console.log (this.score);
                }
                newRewards.push(currentReward)   
            }  
            else {
                currentReward.element.remove()
            }
            
        })

        this.rewards = newRewards ;

        if (this.animateId % 300 === 0){
            this.rewards.push(new Rewards(this.gameScreen))
        }

        document.getElementById('score').innerHTML = this.score;

        this.animateId = requestAnimationFrame ( () => this.gameLoop());
    }


}