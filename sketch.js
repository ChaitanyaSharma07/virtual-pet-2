var database;
var dog, happy_dog;
var dog_image, happy_dog_image;
var foods = 20; 
var foodStock;
var add_food_button, feed_button;
var name_input;
var milk;
var feedTime;
var lastFed;
var gameState, readState;


function preload() {
    dog_image = loadImage("Dog.png");
    happy_dog_image = loadImage("happydog.png");


}


function setup(){
  database = firebase.database();
  createCanvas(700,500);

  dog = createSprite(550, 400, 20, 20);
  dog.addImage(dog_image);
  dog.scale = 0.2;
  
  foodStock = database.ref('food');
  foodStock.on("value", readStock);

  add_food_button = createButton('add food');
  add_food_button.position(800, 150);
  add_food_button.mousePressed(addFood)

  feed_button = createButton('feed the dog')
  feed_button.position(650, 150);
  feed_button.mousePressed(feedDog)

  name_input = createInput('name: ')
  name_input.position(450, 150);



  milk = new Food();

}

function draw(){
  background("green");
  
  milk.display();

  stroke("white")
  fill("white")
  
  lastFed = database.ref('feedTime')


  lastFed.on("value", function(data){
    lastFed = data.val()
  })

  currectTime = hour();



  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
  

  drawSprites();
  
}

function readStock(data) {
  foods = data.val();
}

function writeStock(x) {
  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }

  database.ref('/').update({
    food: x
  })
}


function addFood() {
  milk.updateFoodStock(milk.getFoodStock() - 1)
  database.ref('/').update({
   food: milk.getFoodStock(),
   feedTime: hour()

  })
  
}

function feedDog() {
  if (foods >= 0){
    dog.addImage(happy_dog_image);
    milk.deductFood(milk.getFoodStock() - 1)
    database.ref('/').update({
      food: foods
    })
  }

}



