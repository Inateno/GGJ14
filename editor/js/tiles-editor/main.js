﻿/**
* @ContributorsList
* @Inateno / http://inateno.com / http://dreamirl.com
*
***
* @constructor
* main.js
- load all customs files
add your files here but don't remove DREAM_ENGINE

-- problem with require.js ? give a look on api doc --> http://requirejs.org/docs/api.html#jsfiles
**/
require.config( {
  baseUrl: "./js/tiles-editor/"
    , paths: {
        'DREAM_ENGINE': '../engine/main'
        // core engine classes
        , 'DE.CONFIG'          : '../engine/CONFIG'
        , 'DE.COLORS'          : '../engine/COLORS'
        , 'DE.States'          : '../engine/states'
        , 'DE.Event'           : '../engine/classes/Event'
        , 'DE.Time'            : '../engine/classes/core/Time'
        , 'DE.Vector2'         : '../engine/classes/core/Vector2'
        , 'DE.Sizes'           : '../engine/classes/core/Sizes'
        , 'DE.ImageManager'    : '../engine/classes/ImageManager'
        , 'DE.AudioManager'    : '../engine/classes/AudioManager'
        , 'DE.CollisionSystem' : '../engine/classes/CollisionSystem'
        , 'DE.MainLoop'        : '../engine/classes/MainLoop'
        , 'DE.Collider'        : '../engine/classes/core/Collider'
        , 'DE.Renderer'        : '../engine/classes/core/Renderer'
        , 'DE.Render'          : '../engine/classes/core/Render'
        , 'DE.Camera'          : '../engine/classes/core/Camera'
        , 'DE.Scene'           : '../engine/classes/core/Scene'
        , 'DE.Rigidbody'       : '../engine/classes/core/Rigidbody'
        , 'DE.CanvasBuffer'    : '../engine/classes/core/CanvasBuffer'
        , 'DE.Inputs'          : '../engine/classes/Inputs'
        , 'DE.Gui'             : '../engine/classes/core/Gui'
        , 'DE.BaseGui'         : '../engine/classes/core/Gui/BaseGui' // BaseGui need extend
        , 'DE.GuiButton'       : '../engine/classes/core/Gui/Button'
        , 'DE.GuiImage'        : '../engine/classes/core/Gui/Image'
        , 'DE.GuiInput'        : '../engine/classes/core/Gui/Input'        // not ok
        , 'DE.GuiWindow'       : '../engine/classes/core/Gui/Window'  // not ok
        , 'DE.GuiLabel'        : '../engine/classes/core/Gui/Label'
    
        // GameObject
        , 'DE.GameObject'        : '../engine/classes/core/GameObject/GameObject'
        , 'DE.GameObject.render' : '../engine/classes/core/GameObject/GameObject.render'
        , 'DE.GameObject.update' : '../engine/classes/core/GameObject/GameObject.update'
    
        // colliders
        , 'DE.FixedBoxCollider'    : '../engine/classes/extended/FixedBoxCollider'
        , 'DE.OrientedBoxCollider' : '../engine/classes/extended/OrientedBoxCollider'
        , 'DE.CircleCollider'      : '../engine/classes/extended/CircleCollider'
    
        // renderers
        , 'DE.BoxRenderer'           : '../engine/classes/extended/BoxRenderer/BoxRenderer'
        , 'DE.BoxRenderer.render'    : '../engine/classes/extended/BoxRenderer/BoxRenderer.render'
        , 'DE.CircleRenderer'        : '../engine/classes/extended/CircleRenderer/CircleRenderer'
        , 'DE.CircleRenderer.render' : '../engine/classes/extended/CircleRenderer/CircleRenderer.render'
        , 'DE.SpriteRenderer'        : '../engine/classes/extended/SpriteRenderer/SpriteRenderer'
        , 'DE.SpriteRenderer.render' : '../engine/classes/extended/SpriteRenderer/SpriteRenderer.render'
        , 'DE.TextRenderer'          : '../engine/classes/extended/TextRenderer/TextRenderer'
        , 'DE.TextRenderer.render'   : '../engine/classes/extended/TextRenderer/TextRenderer.render'
        , 'DE.TileRenderer'          : '../engine/classes/extended/TileRenderer/TileRenderer'
        , 'DE.TileRenderer.render'   : '../engine/classes/extended/TileRenderer/TileRenderer.render'
    
        // DATAS
        ,'DE.imagesList'            : '../datas/imagesList'
        ,'DE.inputsList'            : '../datas/inputsList'
        ,'DE.audiosList'            : '../datas/audiosList'
    
        , 'buzz'    : '../ext_libs/buzz'
        ,'gameLoop' : 'gameLoop'
        ,'Game'     : 'Game'
        ,'gui'      : 'gui'
        ,'swap'      : 'swap'
    }
    , shim: {
        'buzz': {
            exports: 'buzz'
        }
    }
    // , urlArg: "busts=" + Date.now()
} );

// init here your game with your code by using the Engine (as DreamE)
require( [ 'DREAM_ENGINE', 'gameLoop', 'Game' ],
function( DreamE, gameLoop, Game )
{
  console.log( "My Custom loads" );
  DreamE.init({ 'customLoop': gameLoop, 'onReady': Game.init });
  window.DREAM_E = DreamE;
} );