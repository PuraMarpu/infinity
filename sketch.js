var mon,store,distance,time;
var engine,world,earth,one,img,start,rai,pos;
var p;

function preload(){
    mon = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png",
                       "Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png",
                       "Monkey_09.png","Monkey_10.png");
    img = loadImage("back.jpg");
    rai = loadImage("stone.png");
}
function setup(){

    engine = Matter.Engine.create();
    world = engine.world;


    can = createCanvas(1200,500);

    //firebase linking
    store = firebase.database();

    //linking code with score
    store.ref("score").on("value",function(data){
        distance = data.val();
    });

    //linking code with time
    store.ref("time").on("value",function(data){
        time = data.val();
    });

    earth = new ground();

    one = new player(250,400);

    Matter.Engine.run(engine);
}
function draw(){
    Matter.Engine.update(engine);

    background("red");

    image(img,displayWidth/4120,displayHeight/600,10*displayWidth,displayHeight/1.5);

    one.show();

    if(one.pillar.position.x>=600){
        camera.x = one.pillar.position.x;
    }

    //all the more functions
    increase();
    jump();

    for(var i = 630;i<15000;i=i+630){
        p = Matter.Bodies.rectangle(i,430,30,30);
        image(rai,i,430,100,100);
    }
   

    image(rai,pos,440,100,100);

    console.log(one.pillar.position.y)

    text("DISTANCE TRAVELLED:"+distance,camera.x-550,50);
}
function jump(){
    if(keyWentDown(UP_ARROW)){
        Matter.Body.setVelocity(one.pillar,{x:0,y:-8});
    };
    if(keyDown(RIGHT_ARROW)){
        Matter.Body.setVelocity(one.pillar,{x:4,y:0});
    };
    if(keyDown(LEFT_ARROW)){
        Matter.Body.setVelocity(one.pillar,{x:-4,y:0});
    }
}
function increase(){
    if(start === undefined){
        start = one.pillar.position.x;
    };
    amount = Math.round(2*one.pillar.position.x/start);

    store.ref("/").update({
        score:amount
    });
}
function creation(){
}