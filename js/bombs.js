class Bombs {
    constructor (gameScreen, levelSpeed) {
        this.gameScreen = gameScreen ;
        this.width = 80 ;
        this.height = 80 ;
        this.left = Math.floor(Math.random()* (800-this.width));
        this.top = -340;
        this.element = document.createElement('img') ;
        this.element.src='imgs/bomb.webp';
        this.element.style.position = 'absolute';
        this.element.style.height=`${this.height}px`;
        this.element.style.width=`${this.width}px`;
        this.element.style.top=`${this.top}px`;
        this.element.style.left=`${this.left}px`;
        this.speed = levelSpeed ;

        this.gameScreen.appendChild(this.element);
    }

    move() {
        this.top += this.speed ;
        this.udpatePosition ()
    }

    udpatePosition(){
        this.element.style.left = `${this.left}px`
        this.element.style.top = `${this.top}px`
    }
}
