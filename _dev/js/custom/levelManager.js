define( [ 'DREAM_ENGINE', 'datas', 'MobSpawner', 'Filter' ],
function( DE, datas, MobSpawner, Filter )
{
  var levelManager = new function()
  {
    this.generateEnvironment = function( scene, camera )
    {
      var ldatas = datas.levels[ 1 ].components;
      for ( var i = 0; i < ldatas.length; ++i )
      {
        var el = ldatas[ i ];
        var component = datas.components[ el.name ];
        
        var sprite = null;
        if ( component.sx != undefined )
          sprite = new DE.TileRenderer( { "imageName": component.sprite
                                           , "w": component.w, "h": component.h
                                           , "tilesizes": { "w": component.tw || component.w, "h": component.th || component.h }
                                           , "tileposition":{ "x": component.sx, "y": component.sy } } );
        else
          sprite = new DE.SpriteRenderer( { "spriteName": component.sprite, "w": component.w, "h": component.h } );
        
        if ( el.zindex < 0 )
          sprite.imageName = "s" + component.sprite;
        // sprite = new DE.BoxRenderer( { "fillColor": "green" }, component.w, component.h );
        var collider = undefined;
        if ( component.collider && el.zindex >= 0 && el.zindex <= 9 )
        {
          if ( component.collider.type == "circle" )
            collider = new DE.CircleCollider( component.collider.r,
                { "offsetLeft": component.collider.l, "offsetTop": component.collider.t } );
          else
            collider = new DE.FixedBoxCollider( component.collider.w, component.collider.h,
                { "offsetLeft": component.collider.l, "offsetTop": component.collider.t } );
        }
        if ( el.name == "mirror" )
          collider = new DE.CircleCollider( 500 );
        var o = new DE.GameObject( { "name": el.name, "tag": component.tag
                                             , "x": el.x,"y": el.y, "zindex": el.zindex || component.zindex
                                             ,"renderer": sprite, "collider": collider } );
        scene.add( o );
        
        o.filter = new Filter( component.sprite + "_evil", { "isTile": true, "component": component } );
        o.add( o.filter );
        scene.on( "POWER_UP", o.filter.onPowerChange, o.filter );
        
        if ( o.collider )
          scene.collideObjects.push( o );
        
      }
      
      var mdatas = datas.levels[ 1 ].mobs;
      for ( i = 0; i < mdatas.length; ++i )
      {
        var spawn = new MobSpawner( mdatas[ i ] );
        scene.spawners.push( spawn );
        scene.add( spawn );
      }
      
      camera.limits.minX = 0;
      camera.limits.maxX = 9800;
    }
  }
  
  return levelManager;
} );