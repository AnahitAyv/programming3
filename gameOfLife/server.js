var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs")

app.use(express.static("."));

app.get('/', function (req, res) {
        res.redirect('index.html');
});

server.listen(3000, function () {
        console.log("Server is run");
});

/// matrix generator
function matrixGenerator(matrixSize, grass, grassEater, predator, godzilla, kong) {
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
                        if (x == 0 && y % 2 == 0) {
                                matrix[y][x] = 6
                        } else if (x == 3 && y % 2 == 0) {
                                matrix[y][x] = 6
                        } else if (x == 6 && y % 2 == 0) {
                                matrix[y][x] = 6
                        } else if (x == 9 && y % 2 == 0) {
                                matrix[y][x] = 6
                        } else if (x == 12 && y % 2 == 0) {
                                matrix[y][x] = 6
                        } else if (x == 15 && y % 2 == 0) {
                                matrix[y][x] = 6
                        } else if (x == 18 && y % 2 == 0) {
                                matrix[y][x] = 6
                        } else if (x == 21 && y % 2 == 0) {
                                matrix[y][x] = 6
                        }

                }
        }


        return matrix
}
matrix = matrixGenerator(23, 10, 8, 3, 1, 5)

io.sockets.emit("send matrix", matrix)
//arrays
grassArr = []
grassEaterArr = []
predatorArr = []
godzillaArr = []
kongArr = []
treeArr = []
//modules
Grass = require("./grass")
GrassEater = require("./grassEater")
Predator = require("./predator")
Godzilla = require("./godzilla")
Kong = require("./kong")
Tree = require("./tree")

//object generation

function createObject() {
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
                        } else if (matrix[y][x] == 4) {
                                let godzilla = new Godzilla(x, y)
                                godzillaArr.push(godzilla)
                        } else if (matrix[y][x] == 5) {
                                let kong = new Kong(x, y)
                                kongArr.push(kong)
                        } else if (matrix[y][x] == 6) {
                                let tree = new Tree(x, y)
                                treeArr.push(tree)
                        }


                }
        }
        io.sockets.emit("send matrix", matrix)
}

function game() {

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
        io.sockets.emit("send matrix", matrix)
}

setInterval(game, 300)

io.on("connection", function(){
        createObject()
})