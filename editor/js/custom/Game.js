/**
* @ContributorsList
* @Inateno / http://inateno.com / http://dreamirl.com
*
***
simple Game class declaration example
**/

define( [ 'DREAM_ENGINE', 'DE.GuiLabel', 'DE.GuiImage', 'gui', 'resources' ],
function( DreamE, GuiLabel, GuiImage, createGUI, resources )
{
  var Game = {};
  Game.render  = null;
  
  // init
  Game.init = function()
  {
    DreamE.CONFIG.DEBUG_LEVEL = 3;
    
    // render and scene
    Game.render = new DreamE.Render( "render", { width: 1920, height: 1080 , fullScreen: "ratioStretch"} );
    Game.render.init();
    resources.scene = new DreamE.Scene( "Test", { backgroundColor: "black" } );
    
    Game.camera = new DreamE.Camera( 1920, 1080, 0, 0, { 'name': "Test zoom 100%", 'backgroundColor': "rgb(50,50,200)" } );
    Game.camera.scene = resources.scene;
    Game.render.add( Game.camera );
    
    createGUI();
    
    Game.camera.onMouseMove = function( mouse )
    {
      if ( resources.currentEl != null && resources.currentEl.isDragged && !resources.currentEl.isLocked )
      {
        var x = ( ( Game.camera.realposition.x + mouse.x ) / resources.gridsize >> 0 ) * resources.gridsize;
        var y = ( ( Game.camera.realposition.y + mouse.y ) / resources.gridsize >> 0 ) * resources.gridsize;
        resources.currentEl.position.setPosition( x, y );
      }
    }
    Game.camera.onMouseUp = function( mouse )
    {
      if ( resources.currentEl == null )
        return;
      resources.currentEl.isDragged = false;
      return true;
    }
    Game.camera.lastOnMouseDown = function( mouse )
    {
      if ( resources.currentEl == null )
        return;
      resources.currentEl.selected = false;
      resources.currentEl = null;
      document.getElementById( "elGui" ).style.display = "none";
      return true;
    }
    
    // var shipRender = new DreamE.SpriteRenderer( { "spriteName": "ship", "scaleX":0.2, "scaleY":0.2 } );
    //   var collider = new DreamE.CircleCollider( {"radius" : 50} );
    //   Game.ship = new DreamE.GameObject( { "name":"Ayera", "tag":"Player", "x": 850, "y":900, "z": -1, "renderer": shipRender, "collider":collider } );
    //   Game.ship.onMouseUp= function(){this.fire();};
      
    //   // add a children
    //   var reactorfx = new DreamE.SpriteRenderer( { "spriteName": "reactor", "scaleX":0.2, "scaleY":0.2 } );
    //   var reactor = new DreamE.GameObject( { "name":"Reactor", "tag":"FX", "y":98, "renderer": reactorfx } );
    //   Game.ship.add( reactor );
    //   reactor.position.setRotation( Math.PI );
      
    //   // add ship in scene
    //   resources.scene.add( Game.ship );
    //
    DreamE.start();
    // DreamE.Inputs.addActionInput( "fire", "launchMissile", function(){Game.ship.fire();}, "up" )
  };
  
  window.Game = Game; // debug
  return Game;
} );