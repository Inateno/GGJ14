define( [ 'datas', 'DREAM_ENGINE' ],
function( datas, DE )
{
  // args are written with a _ because they become private (and we use args later in methods)
  function Character( x, y, tag, sprite, colliderW, colliderH )
  {
    if ( !sprite )
      return;
    DE.GameObject.call( this, {
      "x": x, "y": y, "zindex": 11, "tag": tag
      ,"renderer": new DE.SpriteRenderer( { "spriteName": sprite } )
      ,"collider": new DE.FixedBoxCollider( colliderW, colliderH )
    } );
    
    this.moveSpeed = datas.player.moveSpeed;
    this.jumpForce = datas.player.jumpForce;
    this.mass      = datas.player.mass;
    this.axes      = { x: 0, y: 0 };
    this.gravity   = { x: 0, y: 0 };
    this.onFloor   = false;
    this.dir = 0;
    this.startedX  = x;
    this.startedY  = y;
    
    this.init = function(){}
    this.customBefore = function(){}
    this.customAfter = function(){}
    this.life = datas.mob.life;
    
    var _self = this;
    this.logic = function()
    {
      if ( this.isReplay )
        this.replay();
      this.customBefore();
      this.move();
      this.makeCollision();
      this.customAfter();
    }
    
    this.move = function()
    {
      var axeH = this.axes.x;
      if ( this.isReplay && this.targetX > this.position.x )
        axeH = 1;
        
      if ( axeH < 0 )
        this.dir = -1;
      else if ( axeH > 0 )
        this.dir = 1;
      var y = this.mass * this.gravity.y * datas.coefAirFriction >> 0;
      this.gravity.y += ( ( Math.abs( this.gravity.y * this.mass ) > datas.maxAttractionForce ) ? 0 : datas.attractionForce );
      this.gravity.y = ( this.gravity.y * 100 >> 0 ) / 100;
      
      var x = this.mass * this.gravity.x * datas.coefAirFriction >> 0;
      if ( this.onFloor )
        this.gravity.x *= datas.coefFloorReductor;
      this.gravity.x = ( this.gravity.x * 100 >> 0 ) / 100;
      
      var pos = this.getPos();
      this.previousMove = { x: x || axeH * this.moveSpeed, y: y  };
      this.previousPosition = { x: pos.x, y: pos.y };
      this.translate( { x: x || axeH * this.moveSpeed, y: y  } );
      this.getAnimation( axeH );
    }
    
    this.getRenderer = function()
    {
      return this.renderers[ 0 ];
    }
    
    this.getAnimation = function( axeH )
    {
      var rd = this.getRenderer();
      if ( this.hitting )
      {
        rd.setFrame( 0 );
        rd.setLine( this.dir < 0 ? 5 : 4 );
      }
      else if ( this.hurted )
      {
        if ( rd.isOver && this.onFloor )
          this.endHurt();
      }
      else if ( this.onFloor )
      {
        if ( axeH != 0 )
          rd.setPause( false );
        else
        {
          rd.setPause( true );
          rd.setFrame( 0 );
        }
        
        rd.setLine( this.dir < 0 ? 1 : 0 );
      }
      else
      {
        rd.setPause( true );
        rd.setFrame( 0 );
        rd.setLine( this.dir < 0 ? 3 : 2 );
      }
    }
    
    this.makeCollision = function()
    {
      var obj = this.scene.collideObjects;
      var colpos = this.collider.getRealPosition();
      var T = colpos.y
        , L = colpos.x
        , R = colpos.x + this.collider.width
        , B = colpos.y + this.collider.height;
      var collide = { l: 0, r: 0, t: 0, b: 0 };
      for ( var i = 0, col, o, ocolpos; i < obj.length; ++i, col = false )
      {
        o = obj[ i ];
        if ( o.name == "mirror" )
        {
          if ( this.tag == "player" && DE.CollisionSystem.pointCircleCollision( this.position, o.collider ) )
          {
            this.scene.trigger( "WIN_TWIST" );
          }
        }
        else if ( DE.CollisionSystem.fixedBoxCollision( this.collider, o.collider ) )
        {
          ocolpos = o.collider.getRealPosition();
          var OT = ocolpos.y
            , OL = ocolpos.x
            , OR = ocolpos.x + o.collider.width
            , OB = ocolpos.y + o.collider.height;
          var r = R - OL < 0 ? 0 : R - OL + 1 >> 0
            , l = L - OR > 0 ? 0 : - ( L - OR - 1 ) >> 0
            , t = T - OB > 0 ? 0 : - ( T - OB ) >> 0
            , b = B - OT < 0 ? 0 : B - OT >> 0;
          
          col = this.checkHCol( r, l, t, b, collide );
          if ( !col )
            col = this.checkVCol( r, l, t, b, collide );
          if ( !col ) // last try
            col = this.checkHCol( r, l, t, b, collide );
        }
      }
    }
    
    this.checkHCol = function( r, l, t, b, collide )
    {
      if ( ( r > 0 && ( !t || r < t ) && ( !b || r < b ) )
          || ( l > 0 && ( !t || l < t ) && ( !b || l < b ) ) )
      {
        if ( ( l < r && collide.r ) || ( r < l && collide.l ) )
        {
          this.position.x -= r < l ? r : -l;
          l = 0;
          r = 0;
          return false;
        }
        else
        {
          collide.l = l < r;
          collide.r = r < l;
          this.position.x -= r < l ? r : -l;
          return true;
        }
      }
    }
    
    // check vertical position by giving the borders offset colliding
    this.checkVCol = function( r, l, t, b, collide )
    {
      if ( ( t > 0 && ( !r || t < r ) && ( !l || t < l ) && !collide.t )
               || ( b > 0 && ( !r || b < r ) && ( !l || b < l ) && !collide.b ) )
      {
        if ( ( b < t && collide.t ) || ( t < b && collide.b ) )
        {
          t = 0;
          b = 0;
          return false;
        }
        else
        {
          collide.t = t < b;
          collide.b = b < t;
          this.position.y -= b < t ? b : -t;
          this.gravity.y = 0;
          if ( b < t )
          {
            if ( !this.onFloor )
              this.trigger( "onFloor" );
            this.onFloor = true;
          }
          return true;
        }
      }
    }
    
    this.jump = function( axeH )
    {
      this.addHistory( "jump", { "isCall": true }, Date.now() );
      this.onFloor = false;
      this.gravity.y = this.jumpForce;
    }
    
    this.history = [];
    this.addHistory = function( whatChange, params, time )
    {
      if ( this.isReplay )
        return;
      var h = {
        "whatChange": whatChange
        ,"time"     : time - this.scene.startedAt
      };
      for ( var i in params )
      {
        h[ i ] = params[ i ];
      }
      this.history.push( h );
    }
    
    this.currentReplay = 0;
    this.replay = function()
    {
      var input = this.history[ this.currentReplay ];
      if ( !input )
      {
        this.isReplay = false;
        return;
      }
      if ( DE.Time.currentTime - this.scene.startedAt <= input.time )
        return;
      
      if ( input.x != undefined )
      {
        this[ input.whatChange ].x = input.x;
        this[ input.whatChange ].y = input.y;
        if ( this.tag != "mob" )
          this.targetX = input.px;
      }
      else
        this[ input.whatChange ]();
      /*else
        this[ input.whatChange ] = input.value;*/
      
      // delete this.history[ this.currentReplay ];
      this.currentReplay++;
    }
    
    this.startReplay = function()
    {
      this.currentReplay = 0;
      this.disable    = false;
      this.isReplay   = true;
      this.position.x = this.startedX;
      this.position.y = this.startedY;
      this.life       = datas.mob.life;
    }
    
    this.addAutomatism( "logic", { "type": "logic" } );
    this.init();
  };
  
  Character.prototype = new DE.GameObject();
  Character.prototype.constructor = Character;
  Character.prototype.supr        = DE.GameObject.prototype;
  
  return Character;
} );