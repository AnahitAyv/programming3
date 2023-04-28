var socket = io()
let side = 27


function setup() {
        createCanvas(23 * side, 23 * side)


}
socket.on("Winter", function (data) {
        weath = data;
    })
    socket.on("Summer", function (data) {
        weath = data;
    })
    socket.on("Spring", function (data) {
        weath = data;
    })
    socket.on("Autumn", function (data) {
        weath = data;
    })
    var weath = "spring";

function changeColor(matrix) {
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        var toBot = side - side * 0.3
                        textSize(toBot);
                        if (matrix[y][x] == 1) {
                                if(weath == "spring"){
                                fill("green");
                        }else if(weath == "summer"){
                                fill("#7cfc00");
                        }else if(weath == "autumn"){
                                fill("#ffa500")
                        }else if(weath == "winter"){
                                fill("#ffffff")
                        }
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
                                if(weath == "summer"){
                                 fill("brown")
                                rect(x * side, y * side, side, side);
                                text('🌴', x * side, y * side + toBot);   
                                }else if(weath == "spring"){
                                        fill("brown")
                                        rect(x * side, y * side, side, side);
                                        text('🌱', x * side, y * side + toBot);
                                }else if(weath == "winter"){
                                        fill("brown")
                                        rect(x * side, y * side, side, side);
                                        text('🌲', x * side, y * side + toBot);
                                }else if(weath == "autumn"){
                                        fill("brown")
                                        rect(x * side, y * side, side, side);
                                        text('🌳', x * side, y * side + toBot);
                                }
                                
                        } else if(weath == "spring"){
                                fill("lightgreen")
                                rect(x * side, y * side, side, side)
                        }else if(weath == "summer"){
                                fill("green")
                                rect(x * side, y * side, side, side)
                        }else if(weath == "winter"){
                                fill("white")
                                rect(x * side, y * side, side, side)
                        }else if(weath == "autumn"){
                                fill("#FFA836")
                                rect(x * side, y * side, side, side)
                        }


                }
        }



}


socket.on("send matrix", changeColor)

function Winter() {
        socket.emit("winter");
    }
    function Summer() {
        socket.emit("summer");
    }
    function Spring() {
        socket.emit("spring");
    }
    function Autumn() {
        socket.emit("autumn");
    }
    function AddGrass(){
        socket.emit("addGrass");
    }
    function AddGrassEater(){
        socket.emit("addGrassEater");
    }
    function KillAll(){
        socket.emit("killAll");
    }
    function AddPredator(){
        socket.emit("addPredator");
    }
    function AddGodzilla(){
        socket.emit("addGodzilla");
    }
    function AddKong(){
        socket.emit("addKong");
    }
    function AddTree(){
        socket.emit("addTree");
    }
   