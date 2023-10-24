export default class Ship{
    constructor(length){
        this.length = length
        this.hits = 0
        this.sunk = false
    }

    hit(){
        if(this.hits<this.length){
            this.hits++
        }
       
    }

    showHits(){
        return this.hits
    }


    isSunk(){
        if(this.hits>=this.length){
            this.sunk = true
        }
        return this.sunk
    }

}

