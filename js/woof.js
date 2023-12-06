class Woofs {
    constructor (gameScreen, left, height) {
        this.gameScreen = gameScreen ;
        this.width = 80 ;
        this.height = 60 ;
        this.left = left;
        this.top = 600 - height ;
        this.element = document.createElement('img') ;
        this.element.src='imgs/woof.png';
        this.element.style.position = 'absolute';
        this.element.style.height=`${this.height}px`;
        this.element.style.width=`${this.width}px`;
        this.element.style.top=`${this.top}px`;
        this.element.style.left=`${this.left}px`;

        this.gameScreen.appendChild(this.element);
    }

    move() {
        this.top -= 3;
        this.updatePosition ();
    }

    updatePosition(){
        this.element.style.left = `${this.left}px`
        this.element.style.top = `${this.top}px`
    }

    didCollide (squirrelOrBomb){
        const woofRect = this.element.getBoundingClientRect()
        const squirrelOrBombRect = squirrelOrBomb.element.getBoundingClientRect()
    
        if (
          woofRect.left < squirrelOrBombRect.right &&
          woofRect.right > squirrelOrBombRect.left &&
          woofRect.top < squirrelOrBombRect.bottom &&
          woofRect.bottom > squirrelOrBombRect.top
        ) {
          const xPosition = woofRect.left ;
          const yPosition = woofRect.top;

            let plus3 = document.createElement('img');
            plus3.src = 'imgs/plus3.png';
            plus3.style.width = '60px';
            plus3.style.height = '60px';
            plus3.style.position = 'absolute';
            plus3.style.left = `${xPosition}px`;
            plus3.style.top = `${yPosition}px`;
            this.gameScreen.appendChild(plus3);
            setTimeout(() => {
                plus3.remove();
            }, 330);

          return true
        } else {
          return false
        }
      }

    }
