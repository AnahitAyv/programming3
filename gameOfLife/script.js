function matrixGenerator(matrixSize, grass, grassEater, predator,godzilla,kong) {
        var matrix = []
        ////  matrix սարքելու հատված
        for (let i = 0; i < matrixSize; i++) {
                matrix.push([])
                for (let j = 0; j < matrixSize; j++) {
                        matrix[i].push(0)
                }
        }

        // 1 -եր այսինքն խոտեր քցելու հատված մատռիքսում
        for (let i = 0; i < grass; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 1
        }
        //GrassEater 2

        for (let i = 0; i < grassEater; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 2
        }

        for (let i = 0; i < predator; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 3
        }

      

        for (let i = 0; i < godzilla; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 4
        }
        for (let i = 0; i < kong; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 5
        }
       
                        
                
                for (let y = 0; y < matrix.length; y++) {
                        for (let x = 0; x < matrix[y].length; x++) {
                                if(x==0 && y % 2 == 0 ){
                                        matrix[y][x] = 6
                                }else if (x == 3 && y % 2 == 0){
                                        matrix[y][x] = 6
                                }else if (x == 6  && y % 2 == 0){
                                        matrix[y][x] = 6
                                }else if (x == 9 && y % 2 == 0){
                                        matrix[y][x] = 6
                                }else if (x == 12 && y % 2 == 0){
                                        matrix[y][x] = 6
                                }else if (x == 15 && y % 2 == 0){
                                        matrix[y][x] = 6
                                }else if (x == 18 && y % 2 == 0){
                                        matrix[y][x] = 6
                                }else if (x == 21 && y % 2 == 0){
                                        matrix[y][x] = 6
                                }
                                
                        }}

                
                return matrix
}
let matrix = matrixGenerator(23, 10, 8, 3, 1,5)
let side = 27

var grassArr = []
var grassEaterArr = []
var predatorArr = []
var godzillaArr = []
var kongArr = []
var treeArr = []

function setup() {
        frameRate(7)
        createCanvas(matrix[0].length * side, matrix.length * side)
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        if (matrix[y][x] == 1) {
                                let grass = new Grass(x, y)

                                grassArr.push(grass)


                        } else if (matrix[y][x] == 2) {
                                let grEat = new GrassEater(x, y)
                                grassEaterArr.push(grEat)
                        } else if (matrix[y][x] == 3) {
                                let predator = new Predator(x, y)
                                predatorArr.push(predator)
                        }  else if (matrix[y][x] == 4) {
                                let godzilla = new Godzilla(x, y)
                                godzillaArr.push(godzilla)
                        } else if (matrix[y][x] == 5) {
                                let kong = new Kong(x, y)
                                 kongArr.push(kong)
                        }else if (matrix[y][x] == 6) {
                                let tree = new Tree(x, y)
                                 treeArr.push(tree)
                        }


                }
        }

}


function draw() {
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                 var toBot = side - side * 0.3
                 textSize(toBot);
                        if (matrix[y][x] == 1) {
                                fill("green")
                                rect(x * side, y * side, side, side)
                                text('☘️', x * side, y * side + toBot);
                        } else if (matrix[y][x] == 2) {
                                fill("yellow")
                                rect(x * side, y * side, side, side)
                                text('🐛', x * side, y * side + toBot);
                        } else if (matrix[y][x] == 3) {
                                fill("red")
                                rect(x * side, y * side, side, side)
                                text('🦂', x * side, y * side + toBot);
                        } else if (matrix[y][x] == 4) {
                                fill("DarkSlateGray")
                                rect(x * side, y * side, side, side);
                                text('🦖', x * side, y * side + toBot);
                        } else if (matrix[y][x] == 5) {
                                fill("DarkSlateGray")
                                rect(x * side, y * side, side, side);
                                text('🦍', x * side, y * side + toBot);
                        } else if (matrix[y][x] == 6) {
                                fill("brown")
                                rect(x * side, y * side, side, side);
                                text('🌳', x * side, y * side + toBot);
                        }else {
                                fill("lightgreen")
                                rect(x * side, y * side, side, side)
                        }
                       

                }
        }



        for (let i in grassArr) {
                grassArr[i].mul()
               
                
        }

        for (let i in grassEaterArr) {
                grassEaterArr[i].eat()
              
               
        }

        for (let i in predatorArr) {
                predatorArr[i].eat()
                
        }
        for (let i in godzillaArr) {
                godzillaArr[i].eat()
             
        }
        for (let i in kongArr) {
                kongArr[i].move()
        }
     
       
       

}
