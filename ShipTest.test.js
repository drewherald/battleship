//test ship

const ship = require("./Ship")
let testShip = new ship(2)
testShip.hit()
testShip.hit()

    it('ship has funtioning hits, length, sunk vars', ()=>
    expect(testShip.isSunk()).toBe(true))


//test gameboard

const Gameboard = require("./Gameboard")
let testBoard = new Gameboard()
testBoard.place(3, 0,0, true)
testBoard.place(2, 2, 0, true )
testBoard.place(3, 4, 0, true)
testBoard.place(4, 6,0,true)
testBoard.place(5, 8, 0, true)


for(let i=0; i<9; i++){
    for(let x=0; x<6; x++){
        testBoard.recieveAttack(i,x)
    }
}

it('gameBoard records hit', () =>
    expect(testBoard.showSquare(0,2)).toBe('hit')
)

it('gameBoard records miss', () => 
    expect(testBoard.showSquare(5,5)).toBe('miss')
)

it('gameboard recognizes all ships as sunk', () =>
    expect(testBoard.allSunk()).toBe(true)
)

/*
let randomBoard = new Gameboard()
randomBoard.randomlyPopulate()


for(let i=0; i<10; i++){
    for(let x=0; x<10; x++){
        randomBoard.recieveAttack(i,x)
    }
} 


for(let i=0; i<10; i++){
    for(let x=0; x<10; x++){
        console.log(randomBoard.showSquare(i,x))
    }
}

it('gameboard can randomize', () =>
    expect(randomBoard.allSunk()).toBe(true)
)
*/
//test player

const Player = require('./player')

let player1board = new Gameboard()
let player2board = new Gameboard()
let player1 = new Player(player1board,player2board)
player1.makeMove(7,5)

it('player makes a move', () =>
    expect(player2board.showSquare(7,5)).toBe('miss')
)