﻿/**
* @ContributorsList
* @Inateno / http://inateno.com / http://dreamirl.com
*
***
simple gameLoop example
**/

define( [ 'DREAM_ENGINE', 'Game', 'resources' ],
function( DreamE, Game, resources )
{
  function gameLoop( time )
  {
    if ( resources.currentEl != null && resources.currentEl.isDragged )
    {
      resources.elGui.x.value = resources.currentEl.position.x;
      resources.elGui.y.value = resources.currentEl.position.y;
    }
    if ( DreamE.Inputs.key("left") )
    {
      Game.camera.realposition.translate( { "x": -10, "y": 0 } );
    }
    else if ( DreamE.Inputs.key( "right" ) )
    {
      Game.camera.realposition.translate( { "x": 10, "y": 0 } );
    }
    
    if ( DreamE.Inputs.key( "up" ) )
    {
      Game.camera.realposition.translate( { "x": 0, "y": -10 } );
    }
    if ( DreamE.Inputs.key( "down" ) )
    {
      Game.camera.realposition.translate( { "x": 0, "y": 10 } );
    }
  }
  
  return gameLoop;
} );