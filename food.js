class Food {
    constructor() {

        this.lastFed = database.ref('lastFed');
        this.foodStock = 0;

        this.image = loadImage("Milk.png");
        }

    getFoodStock() {
        return this.foodStock
    }

    updateFoodStock() {
        this.foodStock = this.foodStock + 1
    }

    deductFood(foods) {
        if (foods >= 0) {
            this.foodStock -= 1
        }
    }

    display() {
        var x = 80, y = 100;
        imageMode(CENTER)
        image(this.image, 720, 220, 70, 70);

        if (this.foodStock != 0) {
            for (var i = 0; i < this.foodStock; i++) {
                if (i % 10 == 0) {
                    x = 80;
                    y = y + 50;
                }
                image(this.image, x, y, 50, 50);
                x += 30
            }
        }
    }



}