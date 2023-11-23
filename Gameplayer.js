import Ship from "./Ship.js"
import Gameboard from "./Gameboard.js"

export default class Gameplayer{

    constructor(playerBoard, enemyBoard){
        this.playerBoard = playerBoard
        this.enemyBoard = enemyBoard
    }

    makeMove(x,y){
        if(this.enemyBoard.showSquare(x,y)!='hit'){
            this.enemyBoard.recieveAttack(x,y)
        }else{
            console.log('this square has already been attacked!')
        }
    }

    randomMove(){
        let go = true
        let x = 0
        let y = 0

        while(go){
            x = Math.floor(Math.random() * 10)
            y = Math.floor(Math.random() * 10)
            if(this.enemyBoard.showSquare(x,y)=='empty'){
                this.makeMove(x, y)
                go = false
            }
        }
       
    }

 }

