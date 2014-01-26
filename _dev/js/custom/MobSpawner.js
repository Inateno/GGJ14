define( [ 'DREAM_ENGINE', 'Enemy' ],
function( DE, Enemy )
{
  function Spawner( datas )
  {
    DE.GameObject.call( this, {
      "x": datas.x, "y": datas.y, "tag": "spawn"
      ,"collider": new DE.CircleCollider( datas.radius )
    } );
    
    var _mobs = datas.mobs;
    this.spawn = function()
    {
      for ( var i = 0; i < _mobs.length; ++i )
      {
        var e = new Enemy( this.position.x, this.position.y, _mobs[ i ] );
        this.scene.add( e );
        this.scene.mobs.push( e );
        if ( this.scene.winned )
          e.switchRenderer();
        e.init();
      }
      this.askToKill();
    }
    
    this.on( "collision", this.spawn, this );
  };
  
  Spawner.prototype = new DE.GameObject();
  Spawner.prototype.constructor = Spawner;
  Spawner.prototype.supr        = DE.GameObject.prototype;
  
  return Spawner;
} );