/**
* @ContributorsList
* @Inateno / http://inateno.com / http://dreamirl.com
*
***
simple gameLoop example
**/

define( [ 'DREAM_ENGINE', 'Game' ],
function( DreamE, Game )
{
  function gameLoop( time )
  {
    Game.camera.limits.minX = Game.camera.realposition.x;
    Game.calcCinematic( time );
    
    if ( Game.winned && Game.player && Game.player.position.x > 8700 )
      Game.player.axes = { x: 0, y: 0 };
  }
  
  return gameLoop;
} );