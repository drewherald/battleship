const ship = require("./Ship")
let testShip = new ship(2)
testShip.hit()
testShip.hit()

    it('ship has funtioning hits, length, sunk vars', ()=>
    expect(testShip.isSunk()).toBe(true))
