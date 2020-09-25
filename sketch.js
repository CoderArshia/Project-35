
var dog,happyDog,database,foodStock,foodS,milkImg,milk;
var button1,button2,fedTime,lastFed,foodObj;

function preload(){
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  milk= loadImage("images/Milk.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  foodObj=createSprite(120,300,210,31);
  foodObj.addImage(milk);
  foodObj.scale=0.5;
  
  dog = createSprite(250, 350, 150, 150);
  dog.addImage(dogImg);
  dog.scale = 0.5; 
  foodStock = database.ref('Food');
  foodStock.on("value", readStock,writeStock);
  
  feed=createButton("Feed the Dog");
  feed.position(450,100);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(710,100);
  addFood.mousePressed(addFoods);
}


function draw() {  
background(46, 139, 87);

/*if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage("happydog",dogHappy);
    console.log("happydog")
    //foodS= foodS - 1
  }*/
 
  fedTime=database.ref('FeedTime');
  fedTime.on("value", function(data) {
    lastFed= data.val();
  })

  fill(255,255,254);
  textSize(15);
  if (lastFed>=12) {
    text("Last Feed : " + lastFed%12  + "PM", 350,30)
  } else if(lastFed==0) {
    text("Last Feed : 12 AM", 350, 30);
  } else{
    text("Last Feed : " + lastFed + "AM", 350, 30)
  }
  drawSprites();
  }
  
  function readStock(data) {
    foodS = data.val();
    foodObj.updateFoodStock(foodS);
  }
  
  function writeStock(x) {
    if (x<=0) {
      x = 0;
    }
    else {
      x= x-1
    }
  database.ref('/').update({
    Food:x
  })
}
  
  
  function feedDog() {
    dog.addImage(happyDog);
  
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food: foodObj.getFoodStock(),
      FeedTime:hour()
    })
  }
  function addFoods() {
    foodS++
    database.ref('/').update({
      Food:foodS
    })
    }
  
  