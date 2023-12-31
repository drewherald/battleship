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

    place(length, x, y, horizontal){
        let newShip = new Ship(length)

        if(horizontal){
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
        }
        
        if(!horizontal){
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

    isBshipHit(){
        return this.battleship.showHits()
    }

    isCarSunk(){
        return this.carrier.isSunk()
    }

    isCruSunk(){
        return this.cruiser.isSunk()
    }

    isDSunk(){
        return this.destroyer.isSunk()
    }

    isSSunk(){
        return this.sub.isSunk()
    }

    getSubFill(){
        return this.subFill
    }
    

    randomlyPopulate(){
        
        for(let i = 2; i<6; i++){
            let x = 0
            let y = 0
            let direction = true
            let go = true
            while(go){
                x = this.randomNum(i)
                y = this.randomNum(i)
                let z  = Math.floor(Math.random() * 10)
                if(z>4){
                    direction = false
                }
                let check = true
                
                for(let a = 0; a<i; a++){
                    if(direction){
                        if(this.grid[x][y+a]!=='empty'){
                            check = false 
                        }
                    }else{
                        if(this.grid[x+a][y]!=='empty'){
                            check = false
                        }
                    }
                    
                }
                if(check){
                    go = false
                }
                
            }
            console.log(`${i} placed at ${x},${y}`)
            this.place(i, x, y, direction)
        }
            let i =3
            let x = 0
            let y = 0
            let direction = true
            let go = true
            while(go){
                x = this.randomNum(i)
                y = this.randomNum(i)
                let z  = Math.floor(Math.random() * 10)
                if(z>4){
                    direction = false
                }
                let check = true
                
                for(let a = 0; a<i; a++){
                    if(direction){
                        if(this.grid[x][y+a]!=='empty'){
                            check = false 
                        }
                    }else{
                        if(this.grid[x+a][y]!=='empty'){
                            check = false
                        }
                    }
                    
                }
                if(check){
                    go = false
                }
                
            }
            console.log(`${i} placed at ${x},${y}`)
            this.place(i, x, y, direction)
       
    } 

    randomNum(size){
        let random = Math.floor(Math.random() * 10)
        if(random+size>9){
            random = 9 - (size-1)
        }
        return random
    }
}



