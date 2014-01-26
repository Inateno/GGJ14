/**
* @ContributorsList
* @Inateno / http://inateno.com / http://dreamirl.com
*
***
simple gameLoop example
**/

define( [ 'DREAM_ENGINE', 'Game', 'swap' ],
function( DreamE, Game, swap )
{
  function gameLoop( time )
  {
    if ( DreamE.Inputs.key("left") )
    {
      swap.activeCam.realposition.translate( { "x": -10, "y": 0 } );
    }
    else if ( DreamE.Inputs.key( "right" ) )
    {
      swap.activeCam.realposition.translate( { "x": 10, "y": 0 } );
    }
    
    if ( DreamE.Inputs.key( "up" ) )
    {
      swap.activeCam.realposition.translate( { "x": 0, "y": -10 } );
    }
    if ( DreamE.Inputs.key( "down" ) )
    {
      swap.activeCam.realposition.translate( { "x": 0, "y": 10 } );
    }
  }
  
  return gameLoop;
} );