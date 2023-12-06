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
        this.bombs = [] ;
        this.score = 0 ;
        this.level = 1 ;
        this.timer = 0 ;
        this.gameIsOver = false ;
        this.animateId = null;
        this.audioTheme = new Audio ('audio/theme.mp3') ;
        this.audioWoof = new Audio ('audio/woof.mp3') ;
        this.audioBomb = new Audio ('audio/bomb.mp3') ;
        this.audioGulp = new Audio ('audio/gulp.mp3') ;
        this.audioOops = new Audio ('audio/oops.mp3') ;

        this.audioTheme.volume = 0.2;
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
        this.timer= this.timer+1 ;
           /*  document.getElementById('timer').innerHTML=`${this.timer} `; */
        }
        let intervalId = setInterval(updateTimer,1000) 
        this.audioTheme.play();
        this.gameLoop();
    }

    bark(){
        let woof = new Woofs(this.gameScreen,this.player.left,this.player.height);
        woof.move();
        this.audioWoof.play();
        this.woofs.push(woof);
    }

    checkLevel() {
        if(this.timer>15 && this.timer<30) {
            this.level = 2;
        }
        else if(this.timer>=30 && this.timer<45) {
            this.level = 3;
        }
        else if(this.timer>=45){
            this.level = 4;
        }
        document.getElementById('level-number').innerHTML=`${this.level}`;
    }

    gameLoop(){

/*         if (this.timer === 0){
            this.gameIsOver = true;
        } */

        let intervalId = setInterval(this.checkLevel(),1000) ;

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
                this.audioOops.play();
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
                    this.audioGulp.play();
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
                        currentSquirrel.toBeRemoved = true;
                        currentSquirrel.element.remove();
                    }
                })
                this.bombs.forEach((currentBomb) => {
                    if (currentWoof.didCollide(currentBomb)){
                        currentBomb.element.remove();
                        currentWoof.element.remove();
                        this.score += 3;
                        collided = true ;
                        currentBomb.toBeRemoved = true;
                        currentBomb.element.remove();
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
        
        this.squirrels = this.squirrels.filter((squirrel) => !squirrel.toBeRemoved);
        this.woofs = newWoofs;

        this.woofs = newWoofs ;

        let newBombs = [];
        this.bombs.forEach(currentBomb => {
            currentBomb.move()
            if (currentBomb.top < this.height - currentBomb.element.height) {
                let collided = false ;
                this.woofs.forEach(currentWoof => {
                    if (currentWoof.didCollide(currentBomb)) {
                        collided = true;
                        currentBomb.element.remove();
                        currentWoof.element.remove();
                        this.score += 3;
                    }
                })
                if (!collided) {
                    newBombs.push(currentBomb);
                }
            } else {
                console.log('bomb touched floor > game over');
                this.audioBomb.play();
                currentBomb.element.remove();
                this.gameIsOver = true;
            }
        });
    
        this.bombs = newBombs;

        if (this.level===1){
        if (this.animateId % 150 === 0){
            this.rewards.push(new Rewards(this.gameScreen, 3))
        }

        if (this.animateId % 200 === 0){
            this.squirrels.push(new Squirrels(this.gameScreen, 2))
        }}

        else if (this.level===2){
            if (this.animateId % 80 === 0){
                this.rewards.push(new Rewards(this.gameScreen, 4))
            }
    
            if (this.animateId % 150 === 0){
                this.squirrels.push(new Squirrels(this.gameScreen, 2.5))
            }}

        else if (this.level===3){
             if (this.animateId % 50 === 0){
                this.rewards.push(new Rewards(this.gameScreen, 4.5))
            }
        
            if (this.animateId % 60 === 0){
                this.squirrels.push(new Squirrels(this.gameScreen, 3))
            }}

        else if (this.level===4 ){
            if (this.animateId % 50 === 0){
                this.rewards.push(new Rewards(this.gameScreen, 4.5))
            }
           
            if (this.animateId % 60 === 0){
                this.squirrels.push(new Squirrels(this.gameScreen, 3))
            }
            
            if (this.animateId % 200 === 0){
                this.bombs.push(new Bombs(this.gameScreen, 3))
            }
            }

        document.getElementById('score').innerHTML = this.score;

        if (this.gameIsOver){
            this.audioTheme.pause();
            this.gameScreen.style.display='none';
            this.endScreen.style.display='block';
            this.player.element.remove();

            let playerName ;
            function getPlayerName() {
                let inputPlayerName = prompt("GAME OVER ! Please enter your name:");
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