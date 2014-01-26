define( [ 'DREAM_ENGINE', 'swap' ],
function( DreamE, swap )
{
  var _textarea;
  function createGUI( updateObject )
  {
    // LOADER
      _textarea = document.getElementById( "t_textarea" );
      
      document.getElementById( "t_loadjson" ).onclick = function( e ){ loadLevel(); e.preventDefault(); e.stopPropagation(); }
      document.getElementById( "t_ok" ).onclick = function( e ){ hideOut(); e.preventDefault(); e.stopPropagation(); }
      _textarea.area = document.getElementById( "load_textarea" );
    
    //
    // TOOLS
    //
      document.getElementById( "getjson" ).onclick = function(){ getJson(); }
      document.getElementById( "loadjson" ).onclick = function( e ){ displayOut(); e.preventDefault(); }
    /////////////////////////
    
    //
    // ELGUI
    // quand un élément est selectionné
        swap.elGui = document.getElementById( "elGui" );
        swap.elGui.zindex = document.getElementById( "el_zindex" );
        swap.elGui.zindex.onkeyup = function( e )
        {
          if ( !checkInputAndVal(e) ){ return false; }
          swap.f.zIndex = parseInt( swap.elGui.zindex.value );
        }
        
        swap.elGui.otag = document.getElementById( "el_tag" );
        swap.elGui.otag.onkeyup = function( e )
        {
          if ( !checkInputAndVal(e, true) ){ return false; }
          swap.f.tag    = swap.elGui.otag.value;
        }
        
        swap.elGui.oname = document.getElementById( "el_name" );
        swap.elGui.oname.onkeyup = function( e )
        {
          if ( !checkInputAndVal(e, true) ){ return false; }
          swap.f.name = swap.elGui.oname.value;
        }
        
        swap.elGui.sx = document.getElementById( "el_sx" );
        swap.elGui.sx.onkeyup = function( e )
        {
          if ( !checkInputAndVal(e) ){ return false; }
          swap.f.sx = parseInt( swap.elGui.sx.value );
          var tRenderer = swap.sceneEdit.tileRender.renderers[ 0 ];
          var tRender = swap.sceneEdit.tileRender;
          swap.f.shape.x = swap.f.sx * 0.5 + tRender.position.x - tRenderer.sizes.width * 0.5;
          updateObject( swap.f );
        }
        swap.elGui.sy = document.getElementById( "el_sy" );
        swap.elGui.sy.onkeyup = function( e )
        {
          if ( !checkInputAndVal(e) ){ return false; }
          swap.f.sy = parseInt( swap.elGui.sy.value );
          var tRenderer = swap.sceneEdit.tileRender.renderers[ 0 ];
          var tRender = swap.sceneEdit.tileRender;
          swap.f.shape.y = swap.f.sy * 0.5 + tRender.position.y - tRenderer.sizes.height * 0.5;
          updateObject( swap.f );
        }
        swap.elGui.tw = document.getElementById( "el_tw" );
        swap.elGui.tw.onkeyup = function( e )
        {
          if ( !checkInputAndVal(e) ){ return false; }
          swap.f.sw = parseInt( swap.elGui.tw.value );
          swap.f.shape.w = swap.f.sw * 0.5;
          swap.elGui.w.value = swap.f.sw;
          updateObject( swap.f );
        }
        swap.elGui.th = document.getElementById( "el_th" );
        swap.elGui.th.onkeyup = function( e )
        {
          if ( !checkInputAndVal(e) ){ return false; }
          swap.f.sh = parseInt( swap.elGui.th.value );
          swap.f.shape.h = swap.f.sh * 0.5;
          swap.elGui.h.value = swap.f.sh;
          updateObject( swap.f );
        }
        swap.elGui.w = document.getElementById( "el_w" );
        swap.elGui.w.onkeyup = function( e )
        {
          if ( !checkInputAndVal(e) ){ return false; }
          swap.f.customw = parseInt( swap.elGui.w.value );
          updateObject( swap.f );
        }
        swap.elGui.h = document.getElementById( "el_h" );
        swap.elGui.h.onkeyup = function( e )
        {
          if ( !checkInputAndVal(e) ){ return false; }
          swap.f.customh = parseInt( swap.elGui.h.value );
          updateObject( swap.f );
        }
        swap.elGui.haveCollider = document.getElementById( "collider" );
        swap.elGui.haveCollider.onclick = function( e )
        {
          var checked = e.target.checked;
          var box = document.getElementById( "collider_box" );
          box.style.display = ( checked ) ? "block" : "none";
          if ( !checked )
            swap.col = false;
          else
          {
            createCollider();
            swap.elGui.select_collider.onchange( { target: {} } );
          }
        }
        swap.elGui.boxCollider     = document.getElementById( "box_collider_box" );
        swap.elGui.circleCollider  = document.getElementById( "circle_collider_box" );
        swap.elGui.select_collider = document.getElementById( "select_collider" );
        swap.elGui.select_collider.onchange = function( e )
        {
          if ( e.target.value == "circle" )
          {
            swap.elGui.circleCollider.style.display = "block";
            swap.elGui.boxCollider.style.display = "none";
            swap.col.type = "circle";
            swap.elGui.col_r.value = swap.col.r;
          }
          else
          {
            swap.elGui.boxCollider.style.display = "block";
            swap.elGui.circleCollider.style.display = "none";
            swap.col.type = "box";
            swap.elGui.col_w.value = swap.col.w;
            swap.elGui.col_h.value = swap.col.h;
          }
          swap.elGui.col_l.value = swap.col.offsetLeft;
          swap.elGui.col_t.value = swap.col.offsetTop;
          createCollider();
        }
        swap.elGui.col_w = document.getElementById( "col_w" );
        swap.elGui.col_w.onkeyup = function( e )
        {
          if ( !checkInputAndVal(e) ){ return false; }
          swap.col.w = parseInt( swap.elGui.col_w.value );
          createCollider();
        }
        swap.elGui.col_h = document.getElementById( "col_h" );
        swap.elGui.col_h.onkeyup = function( e )
        {
          if ( !checkInputAndVal(e) ){ return false; }
          swap.col.h = parseInt( swap.elGui.col_h.value );
          createCollider();
        }
        swap.elGui.col_r = document.getElementById( "col_radius" );
        swap.elGui.col_r.onkeyup = function( e )
        {
          if ( !checkInputAndVal(e) ){ return false; }
          swap.col.r = parseInt( swap.elGui.col_r.value );
          createCollider();
        }
        swap.elGui.col_l = document.getElementById( "col_l" );
        swap.elGui.col_l.onkeyup = function( e )
        {
          if ( !checkInputAndVal(e) ){ return false; }
          swap.col.offsetLeft = parseInt( swap.elGui.col_l.value );
          createCollider();
        }
        swap.elGui.col_t = document.getElementById( "col_t" );
        swap.elGui.col_t.onkeyup = function( e )
        {
          if ( !checkInputAndVal(e) ){ return false; }
          swap.col.offsetTop = parseInt( swap.elGui.col_t.value );
          createCollider();
        }
        swap.elGui.buttonOk = document.getElementById( "el_ok" );
        swap.elGui.buttonOk.onclick = function( e )
        {
          if ( saveCurrentObject() )
          {
            updateObject( null );
          }
        }
        swap.elGui.buttonCancel = document.getElementById( "el_cancel" );
        swap.elGui.buttonCancel.onclick = function( e )
        {
          updateObject( null );
        }
        
        for ( var i in swap.elGui )
        {
          if ( !swap.elGui[ i ] || !swap.elGui[ i ].tagName )
            continue;
          swap.elGui[ i ].onfocus = function( e ){ DreamE.Inputs.kbLostFocus = true; }
          swap.elGui[ i ].onblur = function( e ){ DreamE.Inputs.kbLostFocus = false; }
        }
    ////////////////
    
    var tilesets = document.getElementById( "tilesets" );
    var images = DreamE.ImageManager.images;
    for ( var i in images )
    {
      var tiles = images[ i ];
      
      // create buffer for this components
      var buffer = document.createElement( "canvas" );
      buffer.ctx = buffer.getContext( '2d' );
      buffer.width = tiles.width;
      buffer.height = tiles.height;
      buffer.style.width = "100%";
      buffer.setAttribute( "id", i );
      buffer.style.position = "relative";
      buffer.style.bottom = 0;buffer.style.left = 0;
      buffer.style.marginBottom = "-5px";
      buffer.ctx.drawImage( tiles, 0, 0, tiles.width, tiles.height );
      
      var button = document.createElement( "div" );
      button.setAttribute( "id", i ); button.style.textAlign = "center"; button.style.width = "100%";
      
      var def = document.createElement( "div" );
        def.innerHTML = i;def.setAttribute( "id", i );
        def.style.backgroundColor = "rgba(0,0,0,0.8)"; def.style.position = "relative"; def.style.zIndex = 10;
      button.appendChild( buffer );
      button.appendChild( def );
      button.style.marginBottom = "5px";
      tilesets.appendChild( button );
      button.onclick = chooseMe;
    }
    
    return binder;
  }
  
  var fobiddenInputs = [ 8, 9, 16, 37, 39, 40, 38, 32, 17, 16, 13, 20 ];
  function checkInputAndVal( e, ignoreInt )
  {
    if ( fobiddenInputs.indexOf( e.keyCode ) != -1 )
    {
      e.preventDefault();
      return false;
    }
    if ( e.target.value == "" || e.target.value == "-" )
      return false;
    if ( !ignoreInt && isNaN( e.target.value * 2 ) )
    {
      alert( "Rentrez un nombre entier" );
      return false;
    }
    return true;
  }
  
  function saveCurrentObject()
  {
    var object = {
      "name": swap.f.name
      ,"tag": swap.f.tag
      ,"sprite": swap.f.sprite
      ,"isTile":1
      , "sx": swap.f.sx
      , "sy": swap.f.sy
      , "tw": swap.f.sw
      , "th": swap.f.sh
      , "w" : swap.f.w >> 0
      , "h" : swap.f.h >> 0
      ,"collider": ( swap.col ) ? {
        "type": swap.col.type
        ,"w": swap.col.w >> 0
        ,"h": swap.col.h >> 0
        ,"r": swap.col.r >> 0
        ,"l": swap.col.offsetLeft >> 0
        ,"t": swap.col.offsetTop >> 0
      } : false
      ,"zindex": swap.f.zIndex
    };
    if ( swap.currentObject )
    {
      swap.objects[ swap.currentObject ] = object;
      return true;
    }
    if ( swap.objects[ object.name ] )
    {
      var r = confirm( "Il existe déjà un élément nommé " + object.name + " dans la DB. L'écraser ?" );
      if ( !r )
        return false;
    }
    swap.objects[ object.name ] = object;
    return true;
  }
  
  function createCollider()
  {
    var col = null;
    if ( !swap.col || !swap.col.w || !swap.col.h )
      swap.col = {
        "w": 200 ,"h":200,"r": 50,"offsetLeft":0,"offsetTop":0, "type": ( swap.col ) ? swap.col.type || "box" : "box"
      };
    if ( swap.col.type == "box" )
    {
      col = new DreamE.FixedBoxCollider( { "w": swap.col.w, "h": swap.col.h, "offsetLeft": swap.col.offsetLeft, "offsetTop": swap.col.offsetTop } );
      col.gameObject = swap.sceneSee.object;
      swap.sceneSee.object.collider = col;
      return;
    }
    
    col = new DreamE.CircleCollider( { "radius": swap.col.r, "offsetLeft": swap.col.offsetLeft, "offsetTop": swap.col.offsetTop } );
    col.gameObject = swap.sceneSee.object;
    swap.sceneSee.object.collider = col;
  }
  
  function binder( f )
  {
    swap.elGui.sx.value = f.sx;
    swap.elGui.sy.value = f.sy;
    swap.elGui.tw.value = f.sw;
    swap.elGui.th.value = f.sh;
    swap.elGui.w.value = f.w;
    swap.elGui.h.value = f.h;
    swap.elGui.zindex.value = f.zIndex || 0;
    swap.elGui.oname.value = f.name;
    swap.elGui.otag.value = f.tag;
  }
  /*****************************
  *  TOOLS
  */
  
  function chooseMe( e )
  {
    var el = DreamE.ImageManager.images[ e.target.getAttribute( "id" ) ];
    var sprite = new DreamE.TileRenderer( { "imageName": e.target.getAttribute( "id" ), "w": el.width*0.5, "h": el.height*0.5
                                       , "tilesizes": { "w": el.width, "h": el.height }
                                       , "tileposition":{ "x": 0, "y": 0 } } );
    swap.sceneEdit.tileRender.renderers = new Array();
    swap.sceneEdit.tileRender.addRenderer( sprite );
  }
  
  /*********************************************
  *     LOADER
  */
    function displayOut( string )
    {
      _textarea.style.display = "block";
      _textarea.area.value = string;
    }
    function hideOut( e )
    {
      _textarea.style.display = "none";
    }
    function loadLevel()
    {
      var string = _textarea.area.value;
      var json = JSON.parse( string );
      if ( !json )
        throw new Error( "Fail durant le loading du niveau" );
      
      resources.scene.gameObjects = new Array();
      for ( var i = 0, g; g = json[ i ]; ++i )
        createComponent( g.x, g.y, g.name, g.zindex );
    }
    function getJson()
    {
      var string = JSON.stringify( swap.objects );
      displayOut( string );
    }
  
  /***************************************
  *  TOOLS ElGui
  */
    // elGui - Block de GUI de la gestion des components
    function displayElGui( el )
    {
      resources.elGui.style.display = "block";
      resources.elGui.zindex.value = el.zindex;
      resources.elGui.x.value = el.position.x;
      resources.elGui.y.value = el.position.y;
      if ( el.isLocked )
        resources.elGui.lock.innerHTML = "Unlock";
      else
        resources.elGui.lock.innerHTML = "Lock";
    }
    
    function changeZIndex( e )
    {
      if ( e.target.className == "plus" )
        resources.currentEl.zindex++;
      else
        resources.currentEl.zindex--;
      resources.elGui.zindex.value = resources.currentEl.zindex;
      resources.scene.sortGameObjects();
    }

  return createGUI;
} );