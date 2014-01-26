/**
* Author
 @Inateno / http://inateno.com / http://dreamirl.com

* ContributorsList
 @Inateno

***
 sample Game - kill the bubble
 there is no "end" and no menus, it's a very lite "how to" for basics
 and you can create complete game with this :)
**/
define( [ 'DREAM_ENGINE', 'Player', 'Enemy', 'datas', 'levelManager' ],
function( DE, Player, Enemy, datas, levelManager )
{
  var Game = {};
  
  // init
  Game.init = function()
  {
    console.log( "Engine init" );
    // DE.CONFIG.DEBUG = true;
    DE.CONFIG.DEBUG_LEVEL = 1; // 5 for all debug
    
    // create render
    Game.render = new DE.Render( "render", { fullScreen: "ratioStretch" } );
    Game.render.init();
    
    // create scene - name it only
    Game.scene = new DE.Scene( "Test" );
    
    // create your camera
    Game.camera = new DE.Camera( Game.screen.w, Game.screen.h, 0, 0, {
      'name': "Test zoom 100%", 'backgroundColor': "#ea995d"
      ,"minX": 0, "maxX": 4000, "minY": 0, "maxY": 1080
    } );
    
    // give a scene at the camera
    Game.camera.scene = Game.scene;
    // bind it on the render
    Game.render.add( Game.camera );
    
    // launch the engine
    DE.start();
  }
  
  Game.screen = { w: 1920, h: 1080 };
  // start
  Game.start = function()
  {
    var btn = new DE.GameObject( {
      "x": 960, "y": 750, "zindex": 200
      ,"renderers": [
        new DE.TextRenderer( { "fontSize": 90 }, 600, 300, "Start" )
      ]
      ,"collider": new DE.FixedBoxCollider( 350, 120 )
    } );
    btn.onMouseUp = function()
    {
      Game.replay();
    }
    
    Game.scene.add( btn );
    Game.scene.collideObjects = [];
    Game.scene.mobs = [];
    Game.scene.spawners = [];
    levelManager.generateEnvironment( Game.scene, Game.camera );
    Game.scene.trigger( "POWER_UP", 0 );
    DE.AudioManager.music.stopAllAndPlay( "drama" );
    
    
    Game.scene.on( "WIN_TWIST", Game.winTwist, Game );
    // DE.AudioManager.setVolume( 0 );
    // make menu
    
    // always let a little delay between the real load and the visual load, better feeling
    setTimeout( function(){ DE.States.down( "isLoading" ); }, 200 );
  };
  
  Game.replay = function()
  {
    Game.winned = false;
    Game.scene.winned = false;
    Game.isCinematic = false;
    DE.Inputs.keyLocked = false;
    Game.scene.deleteAll();
    Game.scene.collideObjects = [];
    Game.scene.mobs = [];
    Game.scene.spawners = [];
    var katana = new DE.GameObject( {
      "x": 370, "y": 850, "tag": "katana", "zindex": 10
      ,"renderer": new DE.SpriteRenderer( { "spriteName": "katana" } )
      ,"collider": new DE.CircleCollider( 150 )
    } );
    Game.scene.add( katana );
    
    Game.player = new Player( 100, -100, katana );
    Game.player.camera = Game.camera;
    Game.player.on( "no_dead", Game.win, Game );
    Game.player.on( "dead", Game.gameOver, Game );
    Game.camera.focus( Game.player, { y: true } );
    Game.scene.add( Game.player );
    levelManager.generateEnvironment( Game.scene, Game.camera );
    Game.scene.startedAt = Date.now();
    
    var enemy = new Enemy( 2080, 750 );
    enemy.removeAutomatism( "dir" );
    enemy.axes.x = -1;
    
    Game.scene.mobs.push( enemy );
    Game.scene.add( enemy );
    enemy.addHistory( "axes", { "x": -1, "y": 0, "px": 2080 }, DE.Time.currentTime );
    DE.AudioManager.music.stopAllAndPlay( "psycho" );
  }
  
  Game.gameOver = function()
  {
    if ( Game.winned )
      return;
    Game.winned = true;
    Game.player.axes = { x: 0, y: 0 };
    Game.startCinematic( "game_over" );
  }
  
  Game.win = function()
  {
    if ( Game.winned )
      return;
    Game.winned = true;
    var obs = Game.scene.gameObjects;
    Game.scene.winned = true;
    for ( var i = 0; i < obs.length; ++i )
    {
      if ( obs[ i ].tag == "mob" )
        obs[ i ].switchRenderer();
      if ( obs[ i ].filter )
      {
        obs[ i ].filter.disable = true;
        obs[ i ].childrens = [];
      }
      if ( obs[ i ].axes )
      {
        obs[ i ].axes = { x: 0, y : 0 };
      }
    }
    DE.AudioManager.music.stopAllAndPlay( "happy" );
    Game.startCinematic( "happy" );
  }
  
  Game.winTwist = function()
  {
    if ( Game.winned )
      return;
    Game.winned = true;
    Game.scene.winned = true;
    DE.AudioManager.music.stopAllAndPlay( "drama" );
    var filter = new DE.GameObject( {
      "x": Game.camera.realposition.x + Game.camera.sizes.width / 2 >> 0
      ,"y": Game.camera.realposition.y + Game.camera.sizes.height / 2 >> 0
      ,"zindex": 11
      ,"renderer": new DE.BoxRenderer( { "fillColor": "black" }, Game.camera.sizes.width, Game.camera.sizes.height )
    } );
    Game.scene.add( filter );
    Game.startCinematic( "drama" );
    setTimeout( function()
    {
      filter.askToKill();
      Game.startReplay();
    }, 2000 );
  }
  
  Game.startReplay = function()
  {
    DE.Inputs.keyLocked = true;
    Game.camera.limits.minX = 0;
    Game.player.powerUp( 0, true );
    var obs = Game.scene.gameObjects;
    for ( var i = 0; i < obs.length; ++i )
    {
      if ( obs[ i ].history )
        obs[ i ].startReplay();
      if ( obs[ i ].tag == "mob" )
        obs[ i ].switchRenderer();
      if ( obs[ i ].filter )
      {
        obs[ i ].filter.disable = true;
        obs[ i ].childrens = [];
      }
      if ( obs[ i ].axes )
      {
        obs[ i ].axes = { x: 0, y : 0 };
      }
    }
    Game.player.position.y = -100;
    Game.player.removeKatana();
    Game.scene.startedAt = Date.now();
  }
  
  Game.startCinematic = function( what )
  {
    DE.Inputs.keyLocked = true;
    Game.cinematic = datas.cinematic[ what ];
    Game.cinematic.startedAt = Date.now();
    Game.cinematic.current = 0;
    Game.isCinematic = true;
  }
  Game.calcCinematic = function( time )
  {
    if ( !Game.isCinematic )
      return;
    var cin = Game.cinematic;
    if ( time - cin.startedAt < cin.components[ cin.current ].delay )
      return;
    
    var comps = cin.components, curr = comps[ cin.current ];
    if ( cin.current > 0 && curr.type == "object" )
    {
      var last = comps[ cin.current - 1 ];
      if ( last.type != "object" )
        last = comps[ cin.current - 2 ];
      if ( last.fadeOut )
        last.obj.addAutomatism( "fade", { "type": "fade", "value1": -1 } );
      else
        last.obj.askToKill();
    }
    // create
    
    if ( curr.type == "object" )
    {
      var compo = new DE.GameObject( {
        "zindex": 100
        ,"renderer": new DE.TextRenderer( { "fontSize": curr.size }, 1800, 400, curr.text )
      } );
      compo.coefX = curr.x;
      compo.coefY = curr.y;
      compo.targetCam = function()
      {
        this.position.x = Game.camera.realposition.x + Game.camera.sizes.width * this.coefX >> 0;
        this.position.y = Game.camera.realposition.y + Game.camera.sizes.height * this.coefY >> 0;
      }
      compo.addAutomatism( "tar", { "type": "targetCam" } );
      compo.fade = function( target )
      {
        this.renderers[ 0 ].alpha += 0.025 * target;
        if ( ( target >= 1 && this.renderers[ 0 ].alpha >= 1 )
            || ( target <= 0 && this.renderers[ 0 ].alpha <= 0 ) )
        {
          this.removeAutomatism( "fade" );
          if ( target <= 0 )
            this.askToKill();
        }
      }
      
      if ( curr.fadeIn )
      {
        compo.addAutomatism( "fade", { "type": "fade", "value1": 1 } );
        compo.renderers[ 0 ].alpha = 0.1;
      }
      Game.scene.add( compo );
      comps[ cin.current ].obj = compo;
    }
    else if ( curr.type == "action" )
    {
      console.log( "action" )
      Game[ curr.target ][ curr.what ] = curr.val;
      console.log( Game[ curr.target ][ curr.what ] );
    }
    
    cin.current++;
    if ( cin.current == cin.components.length )
    {
      Game.isCinematic = false;
      Game.end();
    }
  }
  
  Game.end = function()
  {
    DE.Inputs.keyLocked = true;
    var btn = new DE.GameObject( {
      "x": Game.camera.realposition.x + 1600, "y": 900, "zindex": 200
      ,"renderers": [
        new DE.TextRenderer( { "fontSize": 50 }, 200, 100, "Replay" )
      ]
      ,"collider": new DE.FixedBoxCollider( 300, 100 )
    } );
    btn.onMouseUp = function()
    {
      Game.replay();
    }
    
    Game.scene.add( btn );
    // show replay button
    // show credits
    
    var ggj = new DE.GameObject( {
      "x": Game.camera.realposition.x + 400, "y": 60, "zindex": 200
      ,"renderer": new DE.TextRenderer( { "fontSize": 50 }, 700, 100, "Global Game Jam 2014" )
    } );
    
    Game.scene.add( ggj );
    
    var us = new DE.GameObject( {
      "x": Game.camera.realposition.x + 960, "y": 1010, "zindex": 200
      ,"renderer": new DE.TextRenderer( { "fontSize": 40 }, 1200, 100, "by Ludovic Servat and Antoine Rogliano" )
    } );
    Game.scene.add( us );
  }
  
  window.Game = Game; // debug only
  return Game;
} );