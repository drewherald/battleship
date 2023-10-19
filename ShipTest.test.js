const ship = require("./Ship")
let testShip = new ship(2)
testShip.hit()
testShip.hit()

    it('ship has funtioning hits, length, sunk vars', ()=>
    expect(testShip.isSunk()).toBe(true))



const Gameboard = require("./Gameboard")
let testBoard = new Gameboard()
testBoard.place(3, 0,0, true)
testBoard.place(2, 2, 0, true )
testBoard.place(3, 4, 0, true)
testBoard.place(4, 6,0,true)
testBoard.place(5, 8, 0, true)
testBoard.recieveAttack(0,1)
testBoard.recieveAttack(0,2)
testBoard.recieveAttack(0,0)
testBoard.recieveAttack(5,5)
testBoard.recieveAttack(2,0)
testBoard.recieveAttack(2,1)
testBoard.recieveAttack(4,0)
testBoard.recieveAttack(4,1)
testBoard.recieveAttack(4,2)
testBoard.recieveAttack(6,0)
testBoard.recieveAttack(6,1)
testBoard.recieveAttack(6,2)
testBoard.recieveAttack(6,3)
testBoard.recieveAttack(8,0)
testBoard.recieveAttack(8,1)
testBoard.recieveAttack(8,2)
testBoard.recieveAttack(8,3)
testBoard.recieveAttack(8,4)



it('gameBoard records hit', () =>
    expect(testBoard.showSquare(0,2)).toBe('hit')
)

it('gameBoard records miss', () => 
    expect(testBoard.showSquare(5,5)).toBe('miss')
)

it('gameboard recognizes all ships as sunk', () =>
    expect(testBoard.allSunk()).toBe(true)
)