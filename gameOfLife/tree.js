let LivingCreature = require("./LivingCreature")

module.exports =class Tree extends LivingCreature {
    constructor(x, y) {
        super(x,y)
        this.directions = [];
    }

}

//gfhh