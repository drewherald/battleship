import Player from './player.js'
import Gameboard from './Gameboard.js'

export default class UI{

    constructor(){
        this.playerBoard = new Gameboard()
        this.comBoard = new Gameboard()
        this.com = new Player(this.comBoard, this.playerBoard)
        this.player = new Player(this.playerBoard, this.comBoard)
        this.p1turn = true
    }

    setupGame(){

        
        this.playerBoard.place(3, 0,0, true)
        this.playerBoard.place(2, 2, 0, true )
        this.playerBoard.place(3, 4, 0, true)
        this.playerBoard.place(4, 6,0,true)
        this.playerBoard.place(5, 8, 0, true)

        this.comBoard.place(3, 7,6, true)
        this.comBoard.place(2, 0, 0, false )
        this.comBoard.place(3, 5, 0, true)
        this.comBoard.place(4, 5,5,false)
        this.comBoard.place(5, 9, 3, true)

        
        this.build()
        this.playGame()
        
       
        

    }

    build(){

        let flexBox = document.querySelector('.flex')
      
        flexBox.innerHTML = `
        <div class="flex2">
        <h3>Enemy Waters</h1>
        <div class="gameBoard-container1"></div>
        </div>
        <div class="flex2">
        <h3>Friendly Waters</h1>
        <div class="gameBoard-container2">
        </div>
        </div>
        `
        for(let i=0; i<10; i++){
            for(let x=0; x<10; x++){
            let square = document.createElement('div')
            square.setAttribute('class', 'button')
            square.setAttribute('id', `${i}, ${x}`)
            document.querySelector('.gameBoard-container1').appendChild(square)
            }
        }
    
        for(let i=0; i<10; i++){
            for(let x=0; x<10; x++){
            let square = document.createElement('div')
            square.setAttribute('class', 'button')
            square.setAttribute('id', `${i+10}, ${x+10}`)
            document.querySelector('.gameBoard-container2').appendChild(square)
            }
        }
    }

    playGame(){

       
        if(this.p1turn){
            for(let i=0; i<10; i++){
                for(let x=0; x<10; x++){
                    let square = document.getElementById(`${i}, ${x}`)
                    square.addEventListener('click', (event) => {
                        if(this.comBoard.allSunk() || this.playerBoard.allSunk()){
                            return
                        }
                        this.comBoard.recieveAttack(i,x)
                        this.revealSquare(i,x, this.comBoard, square)
                        },{once : true}) 
                }
            }
        }
        if(!this.p1turn){
            if(this.comBoard.allSunk() || this.playerBoard.allSunk()){
                return
            }
            setTimeout(this.enemyPlay(), 1000)
        }
    }

   enemyPlay(){
        let go = true
        let x = 0
        let y = 0

        while(go){
            x = Math.floor(Math.random() * 10)
            y = Math.floor(Math.random() * 10)
            if(this.playerBoard.showSquare(x,y)!='miss'){
                if(this.playerBoard.showSquare(x,y)!='hit'){
                this.playerBoard.recieveAttack(x, y)
                go = false
                this.revealComSquare(x,y, this.playerBoard, document.getElementById(`${x+10}, ${y+10}`))
                }
            }
        }
        this.p1turn = true
    } 

  

    revealSquare(x,y, gameBoard, square){
        console.log(this.comBoard.allSunk())
        console.log(this.playerBoard.allSunk())
        let board = gameBoard
        if(board.showSquare(x,y)=='hit'){
            square.setAttribute('class', 'hit')
        }
        if(board.showSquare(x,y)=='miss'){
            square.setAttribute('class', 'miss')
        }
        this.p1turn = false
        this.playGame()
       
    }


    revealComSquare(x,y, gameBoard, square){
        let board = gameBoard
        
        if(board.showSquare(x,y)=='hit'){
            square.setAttribute('class', 'hit')
        }
        if(board.showSquare(x,y)=='miss'){
            square.setAttribute('class', 'miss')
        }
       
    }

  


}




