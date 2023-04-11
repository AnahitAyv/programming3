let LivingCreature = require("./LivingCreature")

module.export =class Tree extends LivingCreature {
    constructor(x, y) {
        super(x,y)
        this.directions = [];
    }

}

//gfhh