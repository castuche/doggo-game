class Player {
    constructor(gameScreen){
        this.gameScreen = gameScreen;
        this.element = document.createElement('img');
        this.width = 60 ;
        this.height = 130 ;
        this.left = 300 ;
        this.top = 490 ;
        this.direction = 0;
        this.projectiles = [];

        this.element.src = 'imgs/doggo.png';
        this.element.style.position = 'absolute';
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px` ;
        this.element.style.left = `${this.left}px` ;
        this.element.style.top = `${this.top}px` ;
        this.gameScreen.appendChild(this.element);

    }

    move(){
        if(this.left>= 0) {
            this.left+=this.direction;
        } else {
            this.left = 0;
        }
        if(this.left<= 800 -this.width) {
            this.left+=this.direction;
        } else {
            this.left = 800 - this.width;
        }
        this.updatePosition();
    }

    updatePosition(){
        this.element.style.left=`${this.left}px`
    }

    didCollide(reward){
        const playerRect = this.element.getBoundingClientRect()
        const rewardRect = reward.element.getBoundingClientRect()
    
        if (
          playerRect.left < rewardRect.right &&
          playerRect.right > rewardRect.left &&
          playerRect.top < rewardRect.bottom &&
          playerRect.bottom > rewardRect.top
        ) {
            const xPosition = playerRect.left - 400 ;
            const yPosition = playerRect.top;
    
            const plus1 = document.createElement('img');
            plus1.src = 'imgs/plus1.png';
            plus1.style.width = '60px';
            plus1.style.height = '60px';
            plus1.style.position = 'absolute';
            plus1.style.left = `${xPosition}px`;
            plus1.style.top = `${yPosition}px`;
            this.gameScreen.appendChild(plus1);
            setTimeout(() => {
                plus1.remove();
            }, 330);
            return true
        } else {
          return false
        }
      }
}