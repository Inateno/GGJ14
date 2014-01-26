define( [ 'datas', 'DREAM_ENGINE', 'DE.GamePad', 'Character' ],
function( datas, DE, GamePad, Character )
{
  // args are written with a _ because they become private (and we use args later in methods)
  function Player( x, y, katana )
  {
    Character.call( this, x, y, "player", "player", 50, 150 );
    
    var _weaponRd = new DE.SpriteRenderer( { "spriteName": "player-w", "offsetX": 15, "offsetY": -40 } );
    var _startRd = this.renderers[ 0 ];
    
    this.power     = 50;
    this.hasWeapon = false;
    this.target    = katana;
    
    this.killerZone = new DE.GameObject( {
      "y": -50, "collider": new DE.CircleCollider( 80 )
    } );
    this.add( this.killerZone );
    this.killerZone.disable = true;
    
    this.powerUp = function( val, force )
    {
      if ( this.isReplay )
        return;
      var l = ( this.power * 0.1 >> 0 ) * 10;
      this.power += val;
      if ( this.power == 0 && this.target )
      {
        this.trigger( "no_dead" );
        return;
      }
      else if ( this.power < 0 )
      {
        this.trigger( "dead" );
        return;
      }
      if ( this.power > 100 )
        this.power = 100;
      if ( force )
        this.power = val;
      var nl = ( this.power * 0.1 >> 0 ) * 10;
      
      if ( nl != l )
        this.scene.trigger( "POWER_UP", nl, l );
    }
    
    this.customBefore = function()
    {
      if ( this.onFloor && ( DE.Inputs.key( "jump" ) || DE.Inputs.key( "up" ) ) )
        this.jump();
    }
    this.customAfter = function()
    {
      this.checkHit( this.hitting );
      this.checkSpawner();
      
      if ( this.position.x < this.camera.realposition.x + 30 )
        this.position.x = this.camera.realposition.x + 30;
    }
    
    // resolve action
    this.action = function()
    {
      this.addHistory( "action", { "isCall": true }, Date.now() );
      if ( this.hasWeapon )
      {
        this.hitting = true;
        this.killerZone.disable = false;
        this.killerZone.position.x = 50 * this.dir;
        this.addAutomatism( "endHit", { "type": "endHit", "interval": 50 } );
      }
      else
      {
        if ( DE.CollisionSystem.pointCircleCollision( this.getPos(), this.target.collider ) )
        {
          this.target.disable = true;
          this.target = null;
          this.hasWeapon = true;
          _startRd = this.renderers[ 0 ];
          this.renderers[ 0 ] = _weaponRd;
        }
      }
    }
    
    this.removeKatana = function()
    {
      this.renderers[ 0 ] = _startRd;
      this.hasWeapon      = false;
      this.target         = katana;
      this.target.disable = false;
      this.killerZone.disable = true;
    }
    
    this.endHit = function()
    {
      this.removeAutomatism( "endHit" );
      this.hitting = false;
      this.killerZone.disable = true;
    }
    
    this.lastHurt = Date.now();
    this.delayHurt = 50;
    this.checkHit = function( hitting )
    {
      var mobs = this.scene.mobs;
      var hit = false;
      for ( var i = 0, m; i < mobs.length; ++i )
      {
        m = mobs[ i ];
        if ( hitting && !m.disable && DE.CollisionSystem.circleCollision( this.killerZone.collider, m.weakCollider.collider ) )
        {
          hit = true;
          m.getDamage( this );
          this.powerUp( 0.1 );
          if ( m.life == 0 )
            this.powerUp( 1 );
          this.camera.shake( 30, 30, 30 );
        }
        else if ( Date.now() - this.lastHurt > this.delayHurt && DE.CollisionSystem.fixedBoxCollision( this.collider, m.collider ) )
        {
          this.lastHurt = Date.now();
          if ( !this.target )
            this.powerUp( -1 );
          else
            this.powerUp( 0, true );
        }
      }
      if ( hitting )
      {
        if ( hit )
          DE.AudioManager.fx.play( "hit" );
        else
          DE.AudioManager.fx.play( "empty_hit" );
      }
    }
    
    this.checkSpawner = function()
    {
      var spawners = this.scene.spawners;
      for ( var i = 0, m; i < spawners.length; ++i )
      {
        m = spawners[ i ];
        if ( !m.disable && DE.CollisionSystem.pointCircleCollision( this.getPos(), m.collider ) )
          m.trigger( "collision" );
      }
    }
    
    var _self = this;
    // register axes listeners - we use different than keyboard because keyboard is "left" "right"
    // with gamepad it's just h-axe or v-axe and get the force value
    DE.Inputs.on( "keyDown", "action", function(){ _self.action(); } );
    DE.Inputs.on( "axeMoved", "haxe", function(val){ _self.updateAxes( val, undefined ); } );
    DE.Inputs.on( "axeMoved", "vaxe", function(val){ _self.updateAxes( undefined, val ); } );
    DE.Inputs.on( "axeStop", "haxe", function(){ _self.updateAxes( 0, undefined ); } );
    DE.Inputs.on( "axeStop", "vaxe", function(){ _self.updateAxes( undefined, 0 ); } );
    DE.Inputs.on( "keyUp", "left", function(){ if ( !DE.Inputs.key( 'right' ) ){ _self.updateAxes( 0 ); } } );
    DE.Inputs.on( "keyUp", "right", function(){ if ( !DE.Inputs.key( 'left' ) ){ _self.updateAxes( 0 ); } } );
    DE.Inputs.on( "keyDown", "left", function(){ _self.updateAxes( -1 ); } );
    DE.Inputs.on( "keyDown", "right", function(){ _self.updateAxes( 1 ); } );
  };
  
  Player.prototype = new Character();
  Player.prototype.constructor = Player;
  Player.prototype.supr        = Character.prototype;
  
  // here update axes, and flip intention
  Player.prototype.updateAxes = function( x, y )
  {
    this.axes = {
      'x': x !== undefined ? x : this.axes.x
      ,'y': y !== undefined ? y : this.axes.y
    };
    this.addHistory( "axes", { "x": this.axes.x, "y": this.axes.y, "px": this.position.x }, DE.Time.currentTime );
  }
  
  return Player;
} );