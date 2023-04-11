let LivingCreature = require("./LivingCreature")

module.export =class Kong extends LivingCreature{
    constructor(x,y){
        super(x,y)
        this.multiply = 0
        this.directions = [
            
        ];
    
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

    chooseCell(char){
        this.getNewCoordinates()
         let found = []


         for(let i in this.directions){
                          let x =   this.directions[i][0]
                          let y =   this.directions[i][1]
               if(x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                            if(matrix[y][x] == char ){
                                    found.push(this.directions[i])
                            }
               }
         }


         return found

    }
    move() {
        
        let emptyCell = this.chooseCell(0)
        let newCell = random(emptyCell)

        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]

            matrix[newY][newX] = 5
            matrix[this.y][this.x] = 0

            this.x = newX
            this.y = newY

          

           
        }
    }

   


}

