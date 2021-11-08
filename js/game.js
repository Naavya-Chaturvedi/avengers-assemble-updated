class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(100,200);
    player1.addAnimation("player1",cap);
    
    player2 = createSprite(100,600);
    player2.addAnimation("player2", ironMan);
    players=[player1,player2];

    obstacleGroup = new Group();
    bulletGroup = new Group();
    
        console.log(frameCount)
       
        }

    play(){
        
                form.hide();

                Player.getPlayerInfo();
                player.getPlayerAtEnd();

                invisibleBg= createSprite(100, height/2, 100,height);
                invisibleBg.visible = false;
                //invisibleBg.addImage(bg)

                 image(bg, 0, 0, 1350, 750);
                 var x =100;
                 var y=200;
                 var index =0;
                 
                 for(var plr in allPlayers){
                    
                    
                     index = index+1;
                     x = 100;

                     if(index === 1){
                        y = 200-allPlayers[plr].distance;
                     }
                     else{
                        y = 600-allPlayers[plr].distance;
                     }

                     
                     
                     players[index -1].x = x;
                     players[index - 1].y = y;
                    
                     var count = 10;
                     if(index === player.index){
                         
                        if (keyIsDown(RIGHT_ARROW) && player.index !== null) {

                         if(count > 0){
                            if(frameCount % 20 === 0){ 
                                var bullet = createSprite(x, y);
                                bullet.addImage("bullet1",bulletImg);
                                bullet.velocityX = 4;
                               bullet.scale = 0.1;
                                bulletGroup.add(bullet);
                                count -= 1
                            }
    
                         }
                        }
                        fill("red");
                        ellipse(x, y, 60, 60);
                         //textSize(25);
                         //text(allPlayers[plr].name ,x-25,y+25);

                         
                     }
                    
                         textSize(25);
                         fill("white");
                         textFont("Consolas")
                         text(allPlayers.player1.name + " : " +allPlayers.player1.score,50,50);
                        text(allPlayers.player2.name + " : " + allPlayers.player2.score, 50, 100);
                 
                 }
                 drawSprites();
                
                if(player.score>=5){
                    gameState = 2; 
                    player.rank += 1;
                    Player.updatePlayerAtEnd(player.rank);
                    player.update();
                    this.showRank();
                    
                }
            
                 

                if (keyIsDown(UP_ARROW) && player.index !== null) {
                    player.distance += 10
                    player.update();
                }
                if (keyIsDown(DOWN_ARROW) && player.index !== null) {
                    player.distance -= 10
                    player.update();
                }


            
            
                
                 if(frameCount % 90 === 0){
                    this.addObstacles()
                    
                 }

                 if (player.index !== null) {
                    for (var j = 0; j < bulletGroup.length; j++) {
                        for (var i = 0; i < obstacleGroup.length; i++) {
                            if (obstacleGroup.get(i).isTouching(bulletGroup[j])) {
                                obstacleGroup.get(i).destroy();
                                bulletGroup[j].destroy();
                                player.score =player.score+1;
                                player.update();
                                

                            }
                    
                            
                        }
                }

                    
                }

                 if(obstacleGroup.isTouching(invisibleBg)){
                   gameState = 2;

                   }

                }
                 
                 
                
            
                

         
         
        
         

    
                showRank() {
                    alert("Awesome !! You finished the game! You rank is :" +player.rank)
                  }

                  gameOver() {
                    textSize(40)
                    fill("white")
                    text("GAME OVER",400,250)
                    }
    
    end(){
       console.log("Game Ended");
       console.log(player.rank)
       this.gameOver();
    }


    addObstacles()
    {       
            var x, y;
            
            x = 1350
            
            
            
            y = random(100, height-50);
            var obstacle = createSprite(x, y);

            var rand = Math.round(random(1,2));
                switch(rand){
                    case 1: obstacle.addAnimation("obs1",asteroid);
                    break;
                    case 2: obstacle.addAnimation("obs2", alien);
                    break;
                   default: break;
                }


            obstacle.velocityX = -4;
            obstacle.scale = 0.5;
            obstacleGroup.add(obstacle);
    }

    
}