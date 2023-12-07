# doggo-game

[Click here to play the doggo game](https://castuche.github.io/doggo-game/)

## Description
The doggo-game is a one-player game for Desktop. The player is represented by a dog, sitting at the bottom of the screen, that can move horizontally with the LEFT and RIGHT arrows. Steaks, squirrels and dog fall from the sky. **The objective is to collect a maximum of points**, by catching the steaks in the dog's mouth, and barking at the squirrels and bombs to make them go away.

### Points
+1 for a steak
+3 for woofing at a squirrel
-2 if a squirrel reaches the floor

### Game Over
if a squirrel falls on your doggo
if a bomb touches the floor


## MVP
The MVP includes :
- An intro screen
- A game screen
- An end screen

### Intro Screen
A simple screen, that contains the title of the game, the rules, and a start button.

### Game Screen
The game screen is made of 3 parts :
1. The audio toggles : there the user can turn on/off the theme music and the audio effects
2. The stats box : this is where points get tracked. The player can also see his current level.
3. The playing zone
The playing zone offers many possibilities 
- move the dog left and rigth with left and right arrows
- bark with up arrow. A bark goes straight up from the point it was shot, and destroys the first squirrel or bomb that he collides into
- with the F and S keys, the player can access easter eggs, that change his doggo character into French-doggo or Spiderman-doggo
- When the player looses, a box asking for their name will appear

The game changes level every 15 seconds, becoming more difficult.
| Levels | Rewards Frequency | Rewards speed | Squirrels frequency | Squirrels speed | Bombs frequency | Bombs speed |
|----|----|----|----|----|----|----|
|1|150|3|200|2|0|0|
|2|80|4|150|2.5|0|0|
|3|50|4.5|60|3|0|0|
|4|50|4.5|60|3|200|2|

### End Screen
On the end screen, the player will see :
- their score, with a personalized message
- the game leaderboard
- a restart button to try again

## Backlog
- Make the game responsive
- Add a "choose your character" screen between intro and gamescreen
- Add more falling obstacles with different rules

## Data structure
The game is structured as follows : 
- HTML file
- CSS stylsheet
- script.js
- game.js
- player.js
- squirrels.js
- rewards.js
- woof.js
- bombs.js

### script.js
#### Functions
- startGame()
- musicToggle()
- soundToggle()

### game.js : the Game class
#### Variables
- this.startScreen ;
- this.gameScreen ;
- this.endScreen ;
- this.height ;
- this.width ; 
- this.player ;
- this.rewards ;
- this.squirrels ;
- this.woofs ;
- this.bombs ;
- this.score ;
- this.level ;
- this.timer ;
- this.gameIsOver ;
- this.animateId ;
- this.audioTheme ;
- this.audioWoof ;
- this.audioBomb ;
- this.audioGulp ;
- this.audioOops ;
- this.isFrench ;
- this.isSpiderman ;
- this.isMusicOn ;
- this.isSoundOn ;
#### Functions
- start()
- bark ()
- checkLevel()
- makeItFrench()
- makeItSpiderman()
- changeMusicState()
- changeSoundState()
- gameLoop()

### player.js : the Player class
#### Variables
- this.gameScreen
- this.element 
- this.width 
- this.height 
- this.left 
- this.top 
- this.direction
- this.projectiles = [];

#### Functions
- move()
- updatePosition()
- didCollide ()

### squirrels.js : the Squirrels class
#### Variables
- this.gameScreen 
- this.width
- this.height
- this.left 
- this.top
- this.element 
- this.speed 
#### Functions
- move()
- updatePosition()

### rewards.js : the Rewards class
#### Variables
- this.gameScreen 
- this.width
- this.height
- this.left 
- this.top
- this.element 
- this.speed 

#### Functions
- move()
- updatePosition()

### woof.js : the Woofs class
#### Variables
- this.gameScreen 
- this.width
- this.height
- this.left 
- this.top
- this.element 
#### Functions
- move()
- updatePosition()
- didCollide ()
### bombs.js : the Bombs class
#### Variables
- this.gameScreen 
- this.width
- this.height
- this.left 
- this.top
- this.element 
- this.speed 

#### Functions
- move()
- updatePosition()

## States y States Transitions
- intro state
- game screen state
- game end state


## Technologies used
- JavaScript
- HTML
- CSS
- JS classes
- DOM manipulations
- Local.storage
- JS Audio