const ship = require("./Ship")

class Gameboard{

    constructor(){
        this.grid = Array(10).fill('empty').map(()=>Array(10).fill('empty'))
        this.destroyer = new ship(2)
        this.sub = new ship(3)
        this.cruiser = new ship(3)
        this.battleship = new ship(4)
        this.carrier = new ship(5)
        this.subFill = 0;
    }

    place(length, x, y, vertical){
        let newShip = new ship(length)

        if(vertical){
            try{
                if(length===2){
                    for(let i=0; i<length; i++){
                        this.grid[x][y+i] = this.destroyer
                    } }
                if(length===3 && this.subFill == 0){
                    for(let i=0; i<length; i++){
                        this.grid[x][y+i] = this.sub
                    }
                    this.subFill ++
                }else if(length ===3 && this.subFill == 1){
                    for(let i=0; i<length; i++){
                        this.grid[x][y+i] = this.cruiser
                    } }
                if(length===4){
                    for(let i=0; i<length; i++){
                        this.grid[x][y+i] = this.battleship
                    } }
                if(length===5){
                    for(let i=0; i<length; i++){
                        this.grid[x][y+i] = this.carrier
                    } }
            }catch(e){
                console.log(e)
            }
        }else{
            try{
                if(length===2){
                    for(let i=0; i<length; i++){
                        this.grid[x+i][y] = this.destroyer
                    } }
                    if(length===3 && this.subFill == 0){
                        for(let i=0; i<length; i++){
                            this.grid[x+i][y] = this.sub
                        }
                        this.subFill ++
                    }else if(length ===3 && this.subFill == 1){
                        for(let i=0; i<length; i++){
                            this.grid[x+i][y] = this.cruiser
                        } }
                if(length===4){
                    for(let i=0; i<length; i++){
                        this.grid[x+i][y] = this.battleship
                    } }
                if(length===5){
                    for(let i=0; i<length; i++){
                        this.grid[x+i][y] = this.carrier
                    } }
            }catch(e){
                console.log(e)
            }
        }
    }

    recieveAttack(x,y){
        if(typeof this.grid[x][y] != 'string'){
            this.grid[x][y].hit()
            this.grid[x][y] = 'hit'
        } else if(this.grid[x][y]=='empty'){
            this.grid[x][y] = 'miss'
        }

    }

    showSquare(x,y){
        return this.grid[x][y]
    }

    allSunk(){
        if(this.battleship.isSunk()&&this.carrier.isSunk()&&this.cruiser.isSunk()&&this.destroyer.isSunk()&&this.sub.isSunk()){
            return true
        }else{
            return false
        }
    }
}

module.exports = Gameboard


