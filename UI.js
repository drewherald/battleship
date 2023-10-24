import Player from './player.js'
import Gameboard from './Gameboard.js'

class UI{

    constructor(){
        this.playerBoard = new Gameboard()
        this.comBoard = new Gameboard()
        this.com = new Player(this.comBoard, this.playerBoard)
        this. player = new Player(this.playerBoard, this.comBoard)
    }

    playGame(){

        
        this.playerBoard.place(3, 0,0, true)
        this.playerBoard.place(2, 2, 0, true )
        this.playerBoard.place(3, 4, 0, true)
        this.playerBoard.place(4, 6,0,true)
        this.playerBoard.place(5, 8, 0, true)

        this.comBoard.place(3, 7,6, true)
        this.comBoard.place(2, 0, 0, false )
        this.comBoard.place(3, 5, 0, true)
        this.comBoard.place(4, 6,6,false)
        this.comBoard.place(5, 9, 3, true)

        const gameNotOver = true

        while(gameNotOver){



        }

    }

}

function build(){
   
    for(let i=0; i<10; i++){
        for(let x=0; x<10; x++){
        let square = document.createElement('div')
        square.setAttribute('class', 'button')
        square.setAttribute('id', `${i}, ${x}`)
        document.querySelector('.gameBoard-container1').appendChild(square)
        console.log('building')
        }
    }

    for(let i=0; i<10; i++){
        for(let x=0; x<10; x++){
        let square = document.createElement('div')
        square.setAttribute('class', 'button')
        square.setAttribute('id', `${i}, ${x}`)
        document.querySelector('.gameBoard-container2').appendChild(square)
        console.log('building')
        }
    }
}


let create = document.querySelector('#create')
create.addEventListener('click', (event) => {
        build()
},{once : true})