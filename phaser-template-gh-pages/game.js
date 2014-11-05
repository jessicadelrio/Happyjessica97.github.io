/*global Phaser*/
/*jslint sloppy:true, browser: true, devel: true, eqeq: true, vars: true, white: true*/
var game;
 
function makePipePair(group, offsetX, newOffsetX, self) {
    var top = group.create(0, 0, 'pipe_top');
    var bottom = group.create(0, 0, 'pipe_bottom');
    top.anchor.set(0, 1);
    var spacing = 100;
    function addPhysics(pipe) {
        game.physics.enable(pipe);
        pipe.body.immovable = true;
        pipe.body.allowGravity = false;
        pipe.body.velocity.x = -200;
    }
        top.checkWorldBounds = true;
    top.events.onOutOfBounds.add(function () {
        if (top.x < 0) {
            positionPipes(top, bottom);
            top.x += newOffsetX;
            bottom.x += newOffsetX;
            self.score++; 
            self.labelScore.text = self.score;
        }
    });
    function positionPipes(top, bottom) {
        var randnumber = Math.floor((Math.random()*100)+200);
        var center = randnumber;
        var left = game.world.width;
        top.x = left;
        bottom.x = left;
        top.y = center - spacing;
        bottom.y = center + spacing;
    }
    addPhysics(top);
    addPhysics(bottom);
    positionPipes(top, bottom);
    top.x += offsetX;
    bottom.x += offsetX;
}
var mainState = {
    // Here we add all the functions we need for our state
    // For this project we will just have 3 functions
    preload: function () {
        // This function will be executed at the beginning
        // That's where we load the game's assets
       game.load.spritesheet('bird', 'images/bird_sheet.png', 68, 48);
       game.load.image('floor', 'images/floor.png');
        game.load.image('pipe_top','images/pipe_top.png');
        game.load.image('pipe_bottom','images/pipe_bottom.png');
       game.load.image('back','images/back.png');
    },
    create: function () {
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.
        this.backgroundSprite = game.add.sprite(0, 0, 'back');
        //this.backgroundSprite.width = game.world.width;
        //this.backgroundSprite.height = game.world.height;
        this.backgroundSprite.anchor.setTo(0, 0.5);

        // Create a game sprite from the logo image positioned
        // at the center of the game world
        this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'bird');
        // The position of the sprite should be based on the
        // center of the image (default is top-left)
        this.sprite.anchor.setTo(0.5, 0.5);
        
        this.sprite.animations.add('flap', [0,1,2,1], 10, true);
        this.sprite.animations.play('flap');
        game.physics.enable(this.sprite);
        game.physics.arcade.gravity.y = 120;
        
         // Stop the bird from falling off the screen, for now
        this.sprite.body.collideWorldBounds = true;
         // keep space from scrolling the page
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
        // Change background color to a gray color
        
        
        this.floor = game.add.tileSprite(0, game.world.height - 40, game.world.width, game.world.height, 'floor');
        this.floor.tileScale.set(0.5);
        
        this.obstacles = game.add.group();
        this.obstacles.add(this.floor);
        game.physics.enable(this.floor);
        this.floor.body.immovable = true;
        this.floor.body.allowGravity = false;
        //makes pipe
        var pipeSpacing = 200;
        var numPipes = 10;
        for (var i = 0; i < numPipes; i += 1) {
            makePipePair(this.obstacles, i * pipeSpacing, pipeSpacing * numPipes - game.world.width, this);
            
        }
        game.stage.backgroundImage = 'images/back.png';
       // document.body.style.backgroundImage = 'images/back.png';
        
        this.score = 0;  
        this.labelScore = game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });  
    },
    update: function () {
        // This function is called 60 times per second
        // It contains the game's logic
                if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
            this.sprite.body.velocity.y = -120;
        }
         this.floor.tilePosition.x -= 130;
          if (game.physics.arcade.collide(this.sprite, this.obstacles)) {
            console.log('Game over man, game over!');
            game.state.start('main');

        }
              //var center = game.rnd.integerInRange(50, game.world.height - 50);
        // Rotate the sprite by 1 degrees
        //this.sprite.angle += 1;
    }
};

// Initialize Phaser
game = new Phaser.Game(640, 480, Phaser.AUTO, 'gameDiv');

// And finally we tell Phaser to add and start our 'main' state
game.state.add('main', mainState);
game.state.start('main');
