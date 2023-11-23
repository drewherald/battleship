import Player from './Player.js'
import Gameboard from './Gameboard.js'

export default class UI{

    constructor(){
        this.playerBoard = new Gameboard()
        this.comBoard = new Gameboard()
        this.com = new Player(this.comBoard, this.playerBoard)
        this.player = new Player(this.playerBoard, this.comBoard)
        this.p1turn = true
        this.vertical = true
    }

    setupGame(){

        this.comBoard.randomlyPopulate()

        let place = document.querySelector('.place')
        place.innerHTML = `Place Your Ships!`
        let vertical = document.querySelector('#vertical')
        let horizontal = document.getElementById('hortizontal')
        vertical.classList.remove('rotate')
        horizontal.classList.remove('rotate')
        vertical.addEventListener('click', (event) =>{
            this.vertical = true
        })

        horizontal.addEventListener('click', (event) =>{
            this.vertical = false
        })

        this.build()
        this.placeDestroyer()
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

       let vertical = document.querySelector('#vertical')
       let horizontal = document.getElementById('hortizontal')
       vertical.setAttribute('class', 'none')
       horizontal.setAttribute('class', 'none')
       let place = document.querySelector('.place')
       place.innerHTML = `Battleship`
        if(this.p1turn){
            for(let i=0; i<10; i++){
                for(let x=0; x<10; x++){
                    let square = document.getElementById(`${i}, ${x}`)
                    square.addEventListener('click', (event) => {
                        if(this.comBoard.allSunk() || this.playerBoard.allSunk()){
                            if(this.comBoard.allSunk()){
                                let place = document.querySelector('.place')
                                place.innerHTML = `Player Wins`
                                return
                            }
                            if(this.playerBoard.allSunk()){
                                let place = document.querySelector('.place')
                                place.innerHTML = `Com Wins`
                                return
                            }
                        }
                        this.comBoard.recieveAttack(i,x)
                        this.revealSquare(i,x, this.comBoard, square)
                        },{once : true}) 
                }
            }
        }
        if(!this.p1turn){
            if(this.comBoard.allSunk()){
                let place = document.querySelector('.place')
                place.innerHTML = `Player Wins`
                return
            }
            if(this.playerBoard.allSunk()){
                let place = document.querySelector('.place')
                place.innerHTML = `Com Wins`
                return
            }
            setTimeout(this.enemyPlay(), 2000)
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

    removeEL(square){
        var old_element = square;
        var new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);

    }

    placeDestroyer(){        
        for(let i=0; i<10; i++){
            for(let x=0; x<10; x++){
            let square = document.getElementById(`${i+10}, ${x+10}`)
            let square2 = document.getElementById(`${i+11}, ${x+10}`)
            let square3 = document.getElementById(`${i+10}, ${x+11}`)
           
            square.addEventListener('mouseover', (event) => {
                console.log(this.vertical)
                square.classList.add('placeShip')
                if(this.vertical){
                    square2.classList.add('placeShip')
                }else{
                    square3.classList.add('placeShip')
                }
            })
            square.addEventListener('mouseout', (event) => {
                square.classList.remove('placeShip')
                if(this.vertical){
                    square2.classList.remove('placeShip')
                }else{
                    square3.classList.remove('placeShip')
                }
            })
            
            square.addEventListener('click', (event) => {
                this.playerBoard.place(2, i, x, !this.vertical )
                console.log(`destroyer placed at ${i}, ${x}`)
                square.classList.add('placedShip')
                if(this.vertical){
                    square2.classList.add('placedShip')
                }else{
                    square3.classList.add('placedShip')
                }

                for(let i=0; i<10; i++){
                    for(let x=0; x<10; x++){
                    let square = document.getElementById(`${i+10}, ${x+10}`)
                    this.removeEL(square)
                    }}
                    
                this.placeSuborCruiser()
            })
         }
        }
    }

    placeSuborCruiser(){        
        for(let i=0; i<10; i++){
            for(let x=0; x<10; x++){
            let square = document.getElementById(`${i+10}, ${x+10}`)
            let vsquare2 = document.getElementById(`${i+11}, ${x+10}`)
            let vsquare3 = document.getElementById(`${i+12}, ${x+10}`)
            let hsquare2 = document.getElementById(`${i+10}, ${x+11}`)
            let hsquare3 = document.getElementById(`${i+10}, ${x+12}`)
           
            square.addEventListener('mouseover', (event) => {
                square.classList.add('placeShip')
                if(this.vertical){
                    vsquare2.classList.add('placeShip')
                    vsquare3.classList.add('placeShip')
                }else{
                    hsquare2.classList.add('placeShip')
                    hsquare3.classList.add('placeShip')
                }
            })
            square.addEventListener('mouseout', (event) => {
                square.classList.remove('placeShip')
                if(this.vertical){
                    vsquare2.classList.remove('placeShip')
                    vsquare3.classList.remove('placeShip')
                }else{
                    hsquare2.classList.remove('placeShip')
                    hsquare3.classList.remove('placeShip')
                }
            })
            
            square.addEventListener('click', (event) => {

            if(this.playerBoard.getSubFill()==0){
                this.playerBoard.place(3, i, x, !this.vertical )
                console.log(`sub placed at ${i}, ${x}`)
                square.classList.add('placedShip')
                if(this.vertical){
                    vsquare2.classList.add('placedShip')
                    vsquare3.classList.add('placedShip')
                }else{
                    hsquare2.classList.add('placedShip')
                    hsquare3.classList.add('placedShip')
                }
            } else{
                this.playerBoard.place(3, i, x, !this.vertical )
                console.log(`cruiser placed at ${i}, ${x}`)
                square.classList.add('placedShip')
                if(this.vertical){
                    vsquare2.classList.add('placedShip')
                    vsquare3.classList.add('placedShip')
                }else{
                    hsquare2.classList.add('placedShip')
                    hsquare3.classList.add('placedShip')
                }

                for(let i=0; i<10; i++){
                    for(let x=0; x<10; x++){
                    let square = document.getElementById(`${i+10}, ${x+10}`)
                    this.removeEL(square)
                    }}

                 this.placeBattleship()   
            }
               
            })
         }
        }
    }

    placeBattleship(){        
        for(let i=0; i<10; i++){
            for(let x=0; x<10; x++){
            let square = document.getElementById(`${i+10}, ${x+10}`)

            let vsquare2 = document.getElementById(`${i+11}, ${x+10}`)
            let vsquare3 = document.getElementById(`${i+12}, ${x+10}`)
            let vsquare4 = document.getElementById(`${i+13}, ${x+10}`)

            let hsquare2 = document.getElementById(`${i+10}, ${x+11}`)
            let hsquare3 = document.getElementById(`${i+10}, ${x+12}`)
            let hsquare4 = document.getElementById(`${i+10}, ${x+13}`)

           
            square.addEventListener('mouseover', (event) => {
                square.classList.add('placeShip')
                if(this.vertical){
                    vsquare2.classList.add('placeShip')
                    vsquare3.classList.add('placeShip')
                    vsquare4.classList.add('placeShip')
                }else{
                    hsquare2.classList.add('placeShip')
                    hsquare3.classList.add('placeShip')
                    hsquare4.classList.add('placeShip')
                }
            })
            square.addEventListener('mouseout', (event) => {
                square.classList.remove('placeShip')
                if(this.vertical){
                    vsquare2.classList.remove('placeShip')
                    vsquare3.classList.remove('placeShip')
                    vsquare4.classList.remove('placeShip')
                }else{
                    hsquare2.classList.remove('placeShip')
                    hsquare3.classList.remove('placeShip')
                    hsquare4.classList.remove('placeShip')
                }
            })
            
            square.addEventListener('click', (event) => {
                this.playerBoard.place(4, i, x, !this.vertical )
                console.log(`battleship placed at ${i}, ${x}`)
                square.classList.add('placedShip')
                if(this.vertical){
                    vsquare2.classList.add('placedShip')
                    vsquare3.classList.add('placedShip')
                    vsquare4.classList.add('placedShip')
                }else{
                    hsquare2.classList.add('placedShip')
                    hsquare3.classList.add('placedShip')
                    hsquare4.classList.add('placedShip')
                }

                for(let i=0; i<10; i++){
                    for(let x=0; x<10; x++){
                    let square = document.getElementById(`${i+10}, ${x+10}`)
                    this.removeEL(square)
                    }}
                this.placeCarrier()    
            })
         }
        }
    }


    placeCarrier(){        
        for(let i=0; i<10; i++){
            for(let x=0; x<10; x++){
            let square = document.getElementById(`${i+10}, ${x+10}`)

            let vsquare2 = document.getElementById(`${i+11}, ${x+10}`)
            let vsquare3 = document.getElementById(`${i+12}, ${x+10}`)
            let vsquare4 = document.getElementById(`${i+13}, ${x+10}`)
            let vsquare5 = document.getElementById(`${i+14}, ${x+10}`)

            let hsquare2 = document.getElementById(`${i+10}, ${x+11}`)
            let hsquare3 = document.getElementById(`${i+10}, ${x+12}`)
            let hsquare4 = document.getElementById(`${i+10}, ${x+13}`)
            let hsquare5 = document.getElementById(`${i+10}, ${x+14}`)

           
            square.addEventListener('mouseover', (event) => {
                square.classList.add('placeShip')
                if(this.vertical){
                    vsquare2.classList.add('placeShip')
                    vsquare3.classList.add('placeShip')
                    vsquare4.classList.add('placeShip')
                    vsquare5.classList.add('placeShip')
                }else{
                    hsquare2.classList.add('placeShip')
                    hsquare3.classList.add('placeShip')
                    hsquare4.classList.add('placeShip')
                    hsquare5.classList.add('placeShip')
                }
            })
            square.addEventListener('mouseout', (event) => {
                square.classList.remove('placeShip')
                if(this.vertical){
                    vsquare2.classList.remove('placeShip')
                    vsquare3.classList.remove('placeShip')
                    vsquare4.classList.remove('placeShip')
                    vsquare5.classList.remove('placeShip')
                }else{
                    hsquare2.classList.remove('placeShip')
                    hsquare3.classList.remove('placeShip')
                    hsquare4.classList.remove('placeShip')
                    hsquare5.classList.remove('placeShip')
                }
            })
            
            square.addEventListener('click', (event) => {
                this.playerBoard.place(4, i, x, !this.vertical )
                console.log(`carrier placed at ${i}, ${x}`)
                square.classList.add('placedShip')
                if(this.vertical){
                    vsquare2.classList.add('placedShip')
                    vsquare3.classList.add('placedShip')
                    vsquare4.classList.add('placedShip')
                    vsquare5.classList.add('placedShip')
                }else{
                    hsquare2.classList.add('placedShip')
                    hsquare3.classList.add('placedShip')
                    hsquare4.classList.add('placedShip')
                    hsquare5.classList.add('placedShip')
                }

                for(let i=0; i<10; i++){
                    for(let x=0; x<10; x++){
                    let square = document.getElementById(`${i+10}, ${x+10}`)
                    this.removeEL(square)
                    }}
                this.playGame()
            })
         }
        }
    }
}




