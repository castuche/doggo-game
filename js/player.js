class Player {
    constructor(gameScreen){
        this.gameScreen = gameScreen;
        this.element = document.createElement('img');
        this.width = 130 ;
        this.height = 130 ;
        this.left = (gameScreen.offsetWidth- this.width)/2 ;
        this.top = gameScreen.offsetHeight - this.height ;
        this.direction = 0;

        this.element.src = 'imgs/pngwing.com.png';
        this.element.style.position = 'absolute';
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px` ;
        this.element.style.left = `${this.left}px` ;
        this.element.style.top = `${this.top}px` ;

        this.gameScreen.appendChild(this.element);
    }

    move(){

    }

    updatePosition(){

    }

    bark(){

    }

    didCatch(stuff){

    }

}