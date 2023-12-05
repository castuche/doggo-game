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
        this.woofs = [] ;
        this.score = 0 ;
        this.timer = 20 ;
        this.gameIsOver = false ;
        this.animateId = null;

    }

    start (){
        this.startScreen.style.display = 'none';
        this.endScreen.style.display = 'none';
        this.gameScreen.style.display = 'flex';
        console.log ('displaying gamescreen') ;
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;
        this.player = new Player (this.gameScreen);
        let updateTimer = ()  => {
            this.timer= this.timer-1 ;
            document.getElementById('timer').innerHTML=`${this.timer}`;
        }
        let intervalId = setInterval(updateTimer,1000)
        this.gameLoop();
    }

    bark(){
        let woof = new Woofs(this.gameScreen,this.player.left,this.player.height);
        woof.move();
        this.woofs.push(woof);
    }

    gameLoop(){

        if (this.timer === 0){
            this.gameIsOver = true;
        }

        this.player.move();

        let newSquirrels =[];
        this.squirrels.forEach(currentSquirrel => {
            currentSquirrel.move()
            if (currentSquirrel.top<600-currentSquirrel.element.height){
                if (this.player.didCollide(currentSquirrel)) {
                    console.log('squirrel collision > game over');
                    currentSquirrel.element.remove()
                    this.gameIsOver = true;
                }
            
                newSquirrels.push(currentSquirrel)   
            }  
            else {
                currentSquirrel.element.remove()
                console.log('squirrel reached floor');
                this.score-=2; 
                }
            
        })

        this.squirrels = newSquirrels ;
        
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


        let newWoofs = [];
        this.woofs.forEach(currentWoof => {
            currentWoof.move();
            let collided = false;
            if (currentWoof.top>0) {
                this.squirrels.forEach((currentSquirrel) => {
                    if (currentWoof.didCollide(currentSquirrel)){
                        currentSquirrel.element.remove();
                        currentWoof.element.remove();
                        this.score += 3;
                        collided = true ;
                    }
                })
                if (!collided){
                    newWoofs.push(currentWoof);
                }
                else {
                    currentWoof.element.remove()
                }
            }
            else {currentWoof.element.remove()}})

        this.woofs = newWoofs ;

        if (this.animateId % 150 === 0){
            this.rewards.push(new Rewards(this.gameScreen))
        }

        if (this.animateId % 200 === 0){
            this.squirrels.push(new Squirrels(this.gameScreen))
        }

        document.getElementById('score').innerHTML = this.score;

        if (this.gameIsOver){
            this.gameScreen.style.display='none';
            document.getElementById('final-score').innerHTML=`${this.score}`;
            this.endScreen.style.display='block';
            this.player.element.remove()
    
        }
        else {
        this.animateId = requestAnimationFrame ( () => this.gameLoop());
        }
    }


}