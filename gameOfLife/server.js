var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs")


app.use(express.static("."));

app.get('/', function (req, res) {
        res.redirect('index.html');
});

server.listen(4000, function () {
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
matrix = matrixGenerator(23,10,8,3,1,5)

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


var weath;

function Winter() {
    weath = "winter";
    io.sockets.emit('Winter', weath);
}

function Summer() {
    weath = "summer";
    io.sockets.emit('Summer', weath);
}

function Spring() {
    weath = "spring";
    io.sockets.emit('Spring', weath);
}
function Autumn() {
    weath = "autumn";
    io.sockets.emit('Autumn', weath);
}

function Kill() {
        grassArr = [];
        grassEaterArr = [];
        predatorArr = [];
        godzillaArr = [];
        kongArr = [];
        treeArr = [];
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                matrix[y][x] = 0;
            }
        }
        io.sockets.emit("send matrix", matrix);
    }
    function AddGrass() {
        for (var i = 0; i < 7; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] == 0) {
                matrix[y][x] = 1;
                var grass = new Grass(x, y)
                grassArr.push(grass)
            }
        }
        io.sockets.emit("send matrix", matrix);
    }
    function AddGrassEater() {
        let count = 0;
        for (var i = 0; i < 50; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (count < 7) {
                if (i < 30) {
                    if (matrix[y][x] == 0) {
                        count++;
                        matrix[y][x] = 2;
                        var grEat = new GrassEater(x, y);
                        grassEaterArr.push(grEat);
                    }
    
                } else if (i >= 30) {
                    if (matrix[y][x] == 0 || matrix[y][x] == 1) {
                        count++;
                        matrix[y][x] = 2;
                        var grEat = new GrassEater(x, y);
                        grassEaterArr.push(grEat);
                    }
                }
            }
    
    
        }
    
        io.sockets.emit("send matrix", matrix);
    }
    function AddPredator() {
        for (var i = 0; i < 7; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] == 0) {
                matrix[y][x] = 3;
                var predator = new Predator(x, y);
                predatorArr.push(predator);
            }
        }
        io.sockets.emit("send matrix", matrix);
    }
    function AddGodzilla() {
        for (var i = 0; i < 7; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] == 0) {
                matrix[y][x] = 4;
                var godzilla = new Godzilla(x, y);
                godzillaArr.push(godzilla);
            }
        }
        io.sockets.emit("send matrix", matrix);
    }
    
    function AddKong() {
        for (var i = 0; i < 7; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] == 0) {
                matrix[y][x] = 5;
                var kong = new Kong(x, y);
                kongArr.push(kong);
            }
        }
        io.sockets.emit("send matrix", matrix);
    }
    function AddTree() {
        for (var i = 0; i < 7; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] == 0) {
                matrix[y][x] = 6;
                var tree = new Tree(x, y)
                treeArr.push(tree)
            }
        }
        io.sockets.emit("send matrix", matrix);
    }
    
   
    

io.on('connection', function (socket) {
        createObject();
        socket.on("spring", Spring);
        socket.on("summer", Summer);
        socket.on("autumn", Autumn);
        socket.on("winter", Winter);
        socket.on("addGrass", AddGrass);
        socket.on("addGrassEater", AddGrassEater);
        socket.on("killAll", Kill);
        socket.on("addPredator", AddPredator);
        socket.on("addGodzilla", AddGodzilla);
        socket.on("addKong", AddKong);
        socket.on("addTree", AddTree);
})
var statistics = {};
setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.predator = predatorArr.length;
    statistics.godzilla = godzillaArr.length;
    statistics.kong = kongArr.length;
    statistics.tree = treeArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics),function(){
     
})
}, 1000);
