let LivingCreature = require("./LivingCreature")

module.exports = class Godzilla extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 10
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }



    chooseCell(char) {
        this.getNewCoordinates()
        let found = []


        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }

        }


        return found
    }
    mul() {

        let emptyCell = this.chooseCell(0)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]

        if (newCell && this.multiply >= 8) {
            let newX = newCell[0]
            let newY = newCell[1]

            matrix[newY][newX] = 4

            let godzilla = new Godzilla(newX, newY)
            godzillaArr.push(godzilla)





        }

    }

    eat() {
        let emptyCell = this.chooseCell(5)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]

        if (newCell) {
            this.energy += 5
            let newX = newCell[0]
            let newY = newCell[1]

            for (let i in kongArr) {
                if (newX == kongArr[i].x && newY == kongArr[i].y) {
                    kongArr.splice(i, 1)
                }
            }


            matrix[newY][newX] = 4
            matrix[this.y][this.x] = 0


            this.x = newX
            this.y = newY

            if (this.energy > 30) {
                this.mul()
            }

        } else {
            this.move()
        }

    }

    move() {
        let emptyCell = this.chooseCell(0)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]

        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]

            matrix[newY][newX] = 4
            matrix[this.y][this.x] = 0

            this.x = newX
            this.y = newY

            if (this.energy >= 35) {
                this.die()
            }

        }
    }
    die() {
        matrix[this.y][this.x] = 0

        for (let i in godzillaArr) {
            if (this.x == godzillaArr[i].x && this.y == godzillaArr[i].y) {
                godzillaArr.splice(i, 1)
            }
        }
    }


}