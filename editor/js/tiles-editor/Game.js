/**
* @ContributorsList
* @Inateno / http://inateno.com / http://dreamirl.com
*
***
simple Game class declaration example
**/

define( [ 'DREAM_ENGINE', 'DE.GuiLabel', 'DE.GuiImage', 'gui', 'swap' ],
function( DreamE, GuiLabel, GuiImage, createGUI, swap )
{
  var Game = {};
  // init
  Game.init = function()
  {
    DreamE.CONFIG.DEBUG_LEVEL = 3;
    
    // render2 and scene
    swap.renderSee = new DreamE.Render( "render2", { width: 768, height: 380 } );
    swap.renderSee.init();
    swap.sceneSee = new DreamE.Scene( "Test", { backgroundColor: "black" } );
    swap.cameraSee = new DreamE.Camera( 1536, 760, 0, 0, { 'name': "Object Edition", 'backgroundColor': "rgb(10,30,60)", "scale": 0.5 } );
    swap.cameraSee.scene = swap.sceneSee;
    swap.renderSee.add( swap.cameraSee );
    
    // render and scene
    swap.renderEdit = new DreamE.Render( "render", { width: 768, height: 380 } );
    swap.renderEdit.init();
    swap.sceneEdit = new DreamE.Scene( "Test", { backgroundColor: "black" } );
    
    swap.cameraEdit = new DreamE.Camera( 1536, 760, 0, 0, { 'name': "Current Tileset", 'backgroundColor': "rgb(50,50,200)", "scale": 0.5 } );
    swap.cameraEdit.scene = swap.sceneEdit;
    swap.renderEdit.add( swap.cameraEdit );
    
    swap.sceneEdit.tileRender = new DreamE.GameObject( { "x": 768, "y": 380 } );
    swap.sceneEdit.add( swap.sceneEdit.tileRender );
    
    swap.shapeEdit = new DreamE.GameObject( { "x": 758, "y": 380, "renderer": new DreamE.BoxRenderer( { "fillColor": "yellow", "strokeColor": "red", "alpha": 0.65 }, 200, 100 ) } );
    swap.shapeEdit.changeSizes = function( w, h ){ this.renderers[ 0 ].changeSizes( w, h ); }
    swap.shapeR = swap.shapeEdit.renderers[ 0 ];
    swap.sceneEdit.add( swap.shapeEdit );
    
    swap.sceneSee.object = new DreamE.GameObject( { "x": 768, "y": 380 } );
    swap.sceneSee.add( swap.sceneSee.object );
    
    var binder = createGUI( updateObject );
    
    swap.activeCam = swap.cameraEdit;
    swap.renderEdit.canvas.onclick = function(){ swap.activeCam = swap.cameraEdit; }
    swap.renderSee.canvas.onclick = function(){ swap.activeCam = swap.cameraSee; }
    
    swap.mouseIsDown = false;
    swap.lastMouseCoord = {};
    swap.cameraEdit.onMouseMove = function( mouse )
    {
      if ( !swap.mouseIsDown || 10 > Math.abs( swap.lastMouseCoord.x - mouse.x ) )
        return;
      swap.lastMouseCoord.moved = true;
      var w = swap.cameraEdit.realposition.x + (mouse.x - swap.lastMouseCoord.x);
      var h = swap.cameraEdit.realposition.y + (mouse.y - swap.lastMouseCoord.y);
      swap.shapeEdit.changeSizes( w, h );
      swap.shapeEdit.position.setPosition( swap.lastMouseCoord.x + swap.shapeR.sizes.width*0.5, swap.lastMouseCoord.y + swap.shapeR.sizes.height*0.5 )
    }
    swap.cameraEdit.onMouseUp = function( mouse )
    {
      if ( !swap.lastMouseCoord.moved )
        return;
      swap.mouseIsDown = false;
      var shape = {
        x: swap.lastMouseCoord.x
        ,y: swap.lastMouseCoord.y
        ,w: swap.cameraEdit.realposition.x + (mouse.x - swap.lastMouseCoord.x)
        ,h: swap.cameraEdit.realposition.y + (mouse.y - swap.lastMouseCoord.y)
      };
      if ( shape.w < 0 )
      {
        shape.x += shape.w;
        shape.w = -shape.w;
      }
      if ( shape.h < 0 )
      {
        shape.y += shape.h;
        shape.h = -shape.h;
      }
      var tRenderer = swap.sceneEdit.tileRender.renderers[ 0 ];
      var tRender = swap.sceneEdit.tileRender;
      
      var ratiox = ( tRenderer.tilesizes.width / tRenderer.sizes.width )
        , ratioy = ( tRenderer.tilesizes.height / tRenderer.sizes.height );
      var f = {
         "sx" : ( shape.x - ( tRender.position.x - tRenderer.sizes.width*0.5 ) ) * ratiox
        ,"sy" : ( shape.y - ( tRender.position.y - tRenderer.sizes.height*0.5 ) ) * ratioy
        ,"sw" : shape.w * ratiox
        ,"sh" : shape.h * ratioy
        ,"w"  : shape.w * ratiox
        ,"h"  : shape.h * ratioy
        ,"shape": shape
        ,"name": swap.elGui.oname.value
        ,"tag": swap.elGui.otag.value
        ,"zIndex": 0
        ,"sprite": tRenderer.imageName
      };
      updateObject( f );
      binder( f );
    }
    swap.cameraEdit.onMouseDown = function( mouse )
    {
      swap.mouseIsDown = true;
      swap.lastMouseCoord = mouse;
      swap.lastMouseCoord.moved = false;
    }
    
    DreamE.start();
  };
  
  function updateObject( f )
  {
    if ( f == null )
    {
      swap.shapeEdit.changeSizes( 1, 1 );
      swap.shapeEdit.position.setPosition( 0, 0 );
      swap.sceneSee.object.renderers = new Array();
      swap.sceneSee.object.collider = null;
      return;
    }
    swap.shapeEdit.changeSizes( f.shape.w, f.shape.h );
    swap.shapeEdit.position.setPosition( f.shape.x + f.shape.w * 0.5, f.shape.y + f.shape.h * 0.5 );
    if ( f.sx < 0 )
    {
      f.sw += f.sx;
      f.sx = 0;
    }
    if ( f.sy < 0 )
    {
      f.sh += f.sy;
      f.sy = 0;
    }
    var tRenderer = swap.sceneEdit.tileRender.renderers[ 0 ];
    var tRender = swap.sceneEdit.tileRender;
    f.sw = ( f.sw > tRenderer.tilesizes.width ) ? tRenderer.tilesizes.width : f.sw;
    f.sh = ( f.sh > tRenderer.tilesizes.height ) ? tRenderer.tilesizes.height : f.sh;
    f.sw = ( f.sx + f.sw > tRenderer.tilesizes.width ) ? tRenderer.tilesizes.width - f.sx : f.sw;
    f.sh = ( f.sy + f.sh > tRenderer.tilesizes.height ) ? tRenderer.tilesizes.height - f.sy : f.sh;
    f.w = ( f.customw ) ? f.customw : f.sw;
    f.h = ( f.customh ) ? f.customh : f.sh;
    swap.f = f;
    swap.f.name   = swap.elGui.oname.value;
    swap.f.tag    = swap.elGui.otag.value;
    swap.f.zIndex = parseInt( swap.elGui.zindex.value );
    swap.f.sprite = tRenderer.imageName;
    
    var r = swap.sceneSee.object.renderers[ 0 ];
    if ( r == undefined || r.imageName != tRenderer.imageName )
    {
      var sprite = new DreamE.TileRenderer( { "imageName": tRenderer.imageName, "w": f.w, "h": f.h
                                         , "tilesizes": { "w": f.sw, "h": f.sh }, "tileposition":{ "x": f.sx, "y": f.sy } } );
      swap.sceneSee.object.renderers = new Array();
      swap.sceneSee.object.addRenderer( sprite );
    }
    else
    {
      r.tilesizes.width  = f.sw;
      r.tilesizes.height = f.sh;
      r.tileposition.x   = f.sx;
      r.tileposition.y   = f.sy;
      r.sizes.width      = f.w;
      r.sizes.height     = f.h;
    }
  }
  
  window.Game = Game; // debug
  window.swap = swap; // debug
  return Game;
} );