class Woofs {
    constructor (gameScreen, left, height) {
        this.gameScreen = gameScreen ;
        this.width = 80 ;
        this.height = 20 ;
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
        this.top -= 2;
        this.updatePosition ();
    }

    updatePosition(){
        this.element.style.left = `${this.left}px`
        this.element.style.top = `${this.top}px`
    }

    didCollide (squirrel){
        const woofRect = this.element.getBoundingClientRect()
        const squirrelRect = squirrel.element.getBoundingClientRect()
    
        if (
          woofRect.left < squirrelRect.right &&
          woofRect.right > squirrelRect.left &&
          woofRect.top < squirrelRect.bottom &&
          woofRect.bottom > squirrelRect.top
        ) {
          return true
        } else {
          return false
        }
      }

    }
