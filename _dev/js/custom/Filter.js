define( [ 'DREAM_ENGINE' ],
function( DE )
{
  // args are written with a _ because they become private (and we use args later in methods)
  function Filter( spriteName, params )
  {
    params = params || {};
    
    var renderer = null;
    if ( params.isTile )
      renderer = new DE.TileRenderer( { "imageName": spriteName
                                       , "w": params.component.w, "h": params.component.h
                                       , "tilesizes": { "w": params.component.tw || params.component.w, "h": params.component.th || params.component.h }
                                       , "tileposition":{ "x": params.component.sx, "y": params.component.sy } } );
    else
      renderer = new DE.SpriteRenderer( { "spriteName": spriteName, "scale": params.scale || 1 } )
    
    DE.GameObject.call( this, {
      "x": params.offsetX || 0, "y": params.offsetY || 0
      , "renderer": renderer
      // "renderer": new DE.BoxRenderer( { "fillColor": "black" }, 70, 100 )
    } );
    
    this.opacityStep   = 0.01;
    this.lowerOpacity  = 0.10;
    this.higherOpacity = 0.30;
    this.fadeDir       = 1;
    this.fade = function()
    {
      // for ( var i = 0, r; i < this.renderers.length; ++i )
      // {
        var r = this.renderers[ 0 ];
        r.alpha += this.opacityStep * this.fadeDir;
        if ( r.alpha < this.lowerOpacity )
        {
          r.alpha = this.lowerOpacity;
          this.fadeDir = 1;
        }
        else if ( r.alpha > this.higherOpacity )
        {
          r.alpha = this.higherOpacity;
          this.fadeDir = -1;
        }
      // }
    }
    this.addAutomatism( "fade", { "type": "fade", "interval": 135 } );

    this.onPowerChange = function( nVal, pVal )
    {
      this.higherOpacity = nVal * 0.01;
      this.lowerOpacity = nVal * 0.01 - 0.2;
      // this.opacityStep += nVal * 0.0001;
      if ( nVal == 0 )
        this.disable = true;
      else
        this.disable = false;
    }
  };
  
  Filter.prototype = new DE.GameObject();
  Filter.prototype.constructor = Filter;
  Filter.prototype.supr        = DE.GameObject.prototype;
  
  return Filter;
} );