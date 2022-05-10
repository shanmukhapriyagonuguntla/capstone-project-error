var ship, shipimg;
var alien, alienimg, aliens;
var coin, coinimg, coins, coins2, coins3, coins4, coins5;
var powerup, powerupimg;
var alpha, alphaimg;
var score;
var bg, bgimg;
var aster, asterimg, asters;
var gamestate="serve";
var coin_touch, aster_touch, alien_touch;
var plasmagun, guns;
var laser, laser_sound, laserg;
var gameover, gameimg;
var dist, ly, la;


function preload(){
    // loading images for game
    shipimg = loadImage("spaceship.png")
    alienimg = loadImage("alien_ship.png")
    alphaimg = loadImage("alpha_cen.png")
    coinimg = loadImage("gold.png")
    powerupimg = loadImage("poerups.png")
    bgimg = loadImage("space.png")
    asterimg = loadImage("aster.png")
    gameimg = loadImage("gameover.png")

    // loading sounds for game
    coin_touch = loadSound("collect-diamond (1).mp3")
    aster_touch = loadSound("ship_aster.mp3")
    alien_touch = loadSound("ship dead.mp3")
    laser_sound = loadSound("alien dead.mp3")
}

function setup(){
    createCanvas(600,500)

    bg = createSprite(300,250)
    bg.addImage(bgimg)
    bg.scale=2

    ship = createSprite(300,450)
    ship.addImage(shipimg)
    ship.scale=0.6

    coins = new Group();
    coins2 = new Group();
    coins3 = new Group();
    coins4 = new Group();
    coins5 = new Group();
    aliens = new Group();
    asters = new Group();
    guns = new Group();
    laserg = new Group();

    score =0;
    dist = 0;
    ly = 0;
    la=5;
}

function draw(){
    background("pink")

    if (gamestate=="play"){

        ship.x=World.mouseX

        dist = dist + Math.round(frameCount/60);
        
        /*if (dist % 1000 === 0){
            ly = 1
        }*/

        /*if (dist % 1000  === 0){
            alpha = createSprite(100,200)
            alpha.addImage(alphaimg)
            alpha.scale=0.8
            console.log("4300 yahhhhhh")
        }*/

        if (ship.x > 560){
            ship.x = 560
        }

        if (ship.x < 50){
            ship.x =  50
        }

        // coins touches

        if (coins.isTouching(ship)){
            coins.destroyEach()
            score=score+10
            coin_touch.play()
        }

        if (coins2.isTouching(ship)){
            coins2.destroyEach()
            score=score+10
            coin_touch.play()
        }

        if (coins3.isTouching(ship)){
            coins3.destroyEach()
            score=score+10
            coin_touch.play()
        }

        if (coins4.isTouching(ship)){
            coins4.destroyEach()
            score=score+10
            coin_touch.play()
        }

        if (coins5.isTouching(ship)){
            coins5.destroyEach()
            score=score+10
            coin_touch.play()
        }

        if (asters.isTouching(ship)){
            ship.destroy()
            gamestate="end"
            aster_touch.play()
        }

        if (guns.isTouching(ship)){
            ship.destroy()
            gamestate="end"
            alien_touch.play()
        }

        if (keyDown("UP_ARROW") /*&& la > 0*/){
            laser = createSprite(ship.x,ship.y-220, 5, 400)
            laser.shapeColor = "red"
            laser.lifetime=100
            laserg.add(laser)
            //la=la-1
        }

        if (laserg.isTouching(alien)){
            laser_sound.play()
            alien.destroy()
            guns.destroyEach()
            console.log("alien dead")
        }

        if (laserg.isTouching(asters)){
            laser_sound.play()
            console.log("aster destroyed")
        }

        spawnaliens()
        asteriods()
        spawncoins()
    }

    if(keyDown("space")){
        gamestate="play"
    }

    if (gamestate=="end"){
        coins.setVelocityYEach(0)
        coins2.setVelocityYEach(0)
        coins3.setVelocityYEach(0)
        coins4.setVelocityYEach(0)
        coins5.setVelocityYEach(0)
        asters.setVelocityYEach(0)
        console.log("end")
        game()
    }

    drawSprites()

    if (gamestate=="serve"){
        fill("white")
        text("target is to be go to alpha centuri star", 200, 200)
        text("Distance: 4.367 light years", 200, 230)
        text("1 light year is equal to 1000km",200, 260)
        text("Try to miss the asteroids", 200, 290)
        text("Use lazer (up arrow) to destroy alien ships", 200, 320)
        text("Press space bar key to start the game ", 200, 350)
    }

    fill("white")
    text("Score: "+score, 520, 20)
    text("Distance: "+dist+" km", 500, 40)
    text("Lasers: "+la, 500, 60)
    //text("LightYears: "+ly, 500, 60)
}

function game(){
    gameover = createSprite(300,250)
    gameover.addImage(gameimg)
    gameover.scale=0.5
}

function spawnaliens(){
    if (frameCount % 400 === 0){
        alien = createSprite(Math.round(random(200,500)), 80)
        alien.addImage(alienimg)
        alien.scale=0.4
        alien.lifetime=300

        plasmagun = createSprite(alien.x,alien.y+230, 5, 400)
        plasmagun.shapeColor = "yellow"
        plasmagun.lifetime=300

        guns.add(plasmagun)

    }
}

function asteriods(){
    if (frameCount % 200 === 0){
        aster = createSprite(Math.round(random(200,500)),100)
        aster.addImage(asterimg)
        aster.scale=0.3
        aster.velocityY = 3
        aster.lifetime=300

        asters.add(aster)
    }
}

function spawncoins(){
    if (frameCount % 300 === 0){
        coin = createSprite(200, 10, 20, 20)
        coin.addImage(coinimg)
        coin.scale = 0.2
        coin.velocityY = 3

        var coin2 = createSprite(200, 30, 20, 20)
        coin2.addImage(coinimg)
        coin2.scale = 0.2
        coin2.velocityY = 3

        var coin3 = createSprite(200, 50, 20, 20)
        coin3.addImage(coinimg)
        coin3.scale = 0.2
        coin3.velocityY = 3

        var coin4 = createSprite(200, 70, 20, 20)
        coin4.addImage(coinimg)
        coin4.scale = 0.2
        coin4.velocityY = 3

        var coin5 = createSprite(200, 90, 20, 20)
        coin5.addImage(coinimg)
        coin5.scale = 0.2
        coin5.velocityY = 3

        coins.add(coin)
        coins2.add(coin2)
        coins3.add(coin3)
        coins4.add(coin4)
        coins5.add(coin5)
    }
}