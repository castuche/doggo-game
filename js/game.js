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
        /* this.timer = 20 ; */
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
        /* let updateTimer = ()  => {
            this.timer= this.timer-1 ;
            document.getElementById('timer').innerHTML=`${this.timer}`;
        }
        let intervalId = setInterval(updateTimer,1000) */
        this.gameLoop();
    }

    bark(){
        let woof = new Woofs(this.gameScreen,this.player.left,this.player.height);
        woof.move();
        this.woofs.push(woof);
    }

    gameLoop(){

/*         if (this.timer === 0){
            this.gameIsOver = true;
        } */

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
                const xPosition = currentSquirrel.left;
                const yPosition = 560;
    
                const minus2 = document.createElement('img');
                minus2.src = 'imgs/minus2.png';
                minus2.style.width = '60px';
                minus2.style.height = '60px';
                minus2.style.position = 'absolute';
                minus2.style.left = `${xPosition}px`;
                minus2.style.top = `${yPosition}px`;
                this.gameScreen.appendChild(minus2);
                setTimeout(() => {
                    minus2.remove();
                }, 330);
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
            this.endScreen.style.display='block';
            this.player.element.remove();

            let playerName ;
            function getPlayerName() {
                let inputPlayerName = prompt("GAME OVER ! You let a squirrel touch your doggo. Please enter your name:");
                if (inputPlayerName != null && inputPlayerName != "") {
                    playerName = inputPlayerName
                } else { playerName = 'Anonymous doggo'
                }
              }
            getPlayerName();

            document.getElementById('final-score').innerHTML=`${this.score}`;
            document.getElementById('player-name').innerHTML=`${playerName}`;

            let score = this.score ;
            let existingScores = JSON.parse(localStorage.getItem('scores')) || [];
            existingScores.push({name: playerName, score}) ;
            existingScores.sort((a,b) => b.score - a.score) ;
            localStorage.setItem('scores', JSON.stringify(existingScores)) ;

            let scores= JSON.parse(localStorage.getItem('scores')) || [];
            let leaderboardElement = document.getElementById('leaderboard');
            scores.slice(0,4).forEach((entry, index) => {
                let listItem = document.createElement('li');
                listItem.style.listStyle = 'none';
                listItem.innerHTML = `${index +1}. ${entry.name} : ${entry.score} points` ;
                leaderboardElement.appendChild(listItem) ;
            })
    
        }
        else {
        this.animateId = requestAnimationFrame ( () => this.gameLoop());
        }
    }


}