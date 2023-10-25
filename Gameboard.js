import Ship from "./Ship.js"
export default class Gameboard{

    constructor(){
        this.grid = Array(10).fill('empty').map(()=>Array(10).fill('empty'))
        this.destroyer = new Ship(2)
        this.sub = new Ship(3)
        this.cruiser = new Ship(3)
        this.battleship = new Ship(4)
        this.carrier = new Ship(5)
        this.subFill = 0;
    }

    place(length, x, y, vertical){
        let newShip = new Ship(length)

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
        if(this.battleship.isSunk()&&this.carrier.isSunk()&&this.destroyer.isSunk()&&this.sub.isSunk()&&this.cruiser.isSunk()){
            return true
        }else{
            return false
        }
    }
/*
    randomlyPopulate(){
        for(let i = 2; i<6; i++){
            let x
            let y
            let direction = true
            let z  = Math.floor(Math.random() * 10)
            if(z>4){
                direction = false
            }
            let go = true
            while(go){
                x = Math.floor(Math.random() * 10)
                y = Math.floor(Math.random() * 10)
                for(let a = 0; a<=i; a++){
                    if(direction){
                        if(this.grid[x][y+a]!=='empty'){
                            return 
                        }
                    }else{
                        if(this.grid[x+a][y]!=='empty'){
                            return
                        }
                    }
                    
                }
                go = false
            }
           
            this.place(i, x, y, direction)
        }
       
    } */
}



