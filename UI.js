import Player from './player.js'
import Gameboard from './Gameboard.js'

class UI{

    constructor(){
        this.playerBoard = new Gameboard()
        this.comBoard = new Gameboard()
        this.com = new Player(this.comBoard, this.playerBoard)
        this.player = new Player(this.playerBoard, this.comBoard)
        this.p1turn = true
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

        let gameNotOver = true
        
        this.build()
        
        
        
        while(gameNotOver){
            if(this.p1turn){

                    this.p1SquareFunctionality()
                    if(this.comBoard.allSunk() || this.playerBoard.allSunk()){
                        gameNotOver = false
                    }
                    
                
            
            }else{
                
                this.p2SquareFuntionality()
                if(this.comBoard.allSunk() || this.playerBoard.allSunk()){
                    gameNotOver = false
                }
            }


        } 

        console.log('game over') 

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

    p1SquareFunctionality(){
        for(let i=0; i<10; i++){
            for(let x=0; x<10; x++){
                let square = document.getElementById(`${i}, ${x}`)
                square.addEventListener('click', (event) => {
                    console.log(this.comBoard.showSquare(i,x))
                    this.player.makeMove(i,x)
                    console.log(this.comBoard.showSquare(i,x))
                    if(this.comBoard.showSquare(i,x)=='hit'){
                        square.setAttribute('class', 'hit')
                    }
                    if(this.comBoard.showSquare(i,x)=='miss'){
                        square.setAttribute('class', 'miss')
                    }
                    this.p1turn = false
                    this.removeSquare()
                },{once : true})          
            }
        }

    }

    p2SquareFuntionality(){
        for(let i=0; i<10; i++){
            for(let x=0; x<10; x++){
                let square = document.getElementById(`${i}, ${x}`)
                square.addEventListener('click', (event) => {
                    console.log(this.playerBoard.showSquare(i,x))
                    this.com.makeMove(i,x)
                    console.log(this.playerBoard.showSquare(i,x))
                    if(this.playerBoard.showSquare(i,x)=='hit'){
                        square.setAttribute('class', 'hit')
                    }
                    if(this.playerBoard.showSquare(i,x)=='miss'){
                        square.setAttribute('class', 'miss')
                    }
                    this.p1turn = true
                    this.removeSquare()
                    },{once : true})          
            }
        }
    }

    removeSquare(){
        for(let i=0; i<10; i++){
            for(let x=0; x<10; x++){
                let square = document.getElementById(`${i}, ${x}`)
                let replace = square.cloneNode(true);
                square.parentNode.replaceChild(replace, square);
                }
    }}


}




let UserInterface = new UI()

let create = document.querySelector('#create')
create.addEventListener('click', (event) => {
        UserInterface.playGame()
},{once : true})