define( [ 'datas', 'DREAM_ENGINE', 'Character', 'Filter' ],
function( datas, DE, Character, Filter )
{
  function Enemy( x, y, sprite )
  {
    Character.call( this, x, y, "mob", "monster", 70, 130 );
    
    var _boyRd = new DE.SpriteRenderer( { "spriteName": "boy" } );
    this.renderers[ 0 ].onAnimEnd = function()
    {
      this.gameObject.hurtable = true;
    };
    
    this.weakCollider = new DE.GameObject( {
      "collider": new DE.CircleCollider( 40 )
    } );
    
    this.add( this.weakCollider );
    
    this.maxX = this.position.x;
    this.hurtAnimDelay = 100;
    this.hurtable = true;
    
    this.moveSpeed = datas.mob.moveSpeed;
    this.jumpForce = datas.mob.jumpForce;
    this.mass      = datas.mob.mass;
    
    this.switchRenderer = function()
    {
      this.renderers[ 0 ] = _boyRd;
    }
    
    this.customBefore = function()
    {
      if ( !this.onFloor )
        return;
      
      if ( !this.isReplay && this.position.x > this.maxX )
        this.axes.x = -1;
    }
    
    this.changeDir = function()
    {
      if ( this.isReplay )
        return;
      this.axes.x = ( Math.random() * 2 >> 0 ) == 1 ? 1 : -1;
      this.addHistory( "axes", { "x": this.axes.x, "y": this.axes.y, "px": this.position.x }, DE.Time.currentTime );
      this.addAutomatism( Date.now().toString(), { "type": "changeDir", "interval": Math.random() * 1450 >> 0, "persistant": false } );
    }
    this.addAutomatism( "dir", { "type": "changeDir", "interval": Math.random() * 1450 >> 0, "persistant": false } );
    
    this.customAfter = function()
    {
    }
    
    this.getDamage = function( attackant )
    {
      if ( !this.isReplay && !this.hurtable )
        return;
      
      this.axes.x = 0;
      this.gravity.y = -2;
      this.gravity.x = 1 * ( this.position.x > attackant.position.x ? 1 : -1 );
      this.onFloor = false;
      this.life--;
      var rd = this.getRenderer();
      if ( rd.currentLine < 2 )
        rd.setLine( rd.currentLine += 2 );
      
      this.hurted   = true;
      this.hurtable = false;
      rd.setEndFrame( 2 );
      rd.setDelay( this.hurtAnimDelay );
      rd.setLoop( false );
      rd.setPause( false );
      rd.restartAnim();
    }
    
    this.endHurt = function()
    {
      this.changeDir();
      this.hurted = false;
      var rd = this.getRenderer();
      rd.setDelay( DE.ImageManager.images[ rd.spriteName ].eachAnim );
      rd.setEndFrame( DE.ImageManager.images[ rd.spriteName ].totalFrame );
      rd.setLoop( true );
      rd.restartAnim();
      
      if ( this.life <= 0 )
      {
        this.disable = true;
        // this.askToKill();
      }
    }
  };
  
  Enemy.prototype = new Character();
  Enemy.prototype.constructor = Enemy;
  Enemy.prototype.supr        = Character.prototype;
  
  return Enemy;
} );