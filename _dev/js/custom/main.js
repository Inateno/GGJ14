﻿/**
* Author
 @Inateno / http://inateno.com / http://dreamirl.com

* ContributorsList
 @Inateno

***
* @constructor
* main.js
- load all customs files
add your files here but don't remove DREAM_ENGINE

-- problem with require.js ? give a look on api doc --> http://requirejs.org/docs/api.html#jsfiles
**/
require.config( {
  baseUrl: "./js/"
  , paths: {
    'files-engine'    : 'files-engine'
    
    // DATAS
    ,'DE.imagesDatas' : 'datas/imagesDatas'
    ,'DE.inputsList'  : 'datas/inputsList'
    ,'DE.audiosList'  : 'datas/audiosList'
    ,'DE.dictionary'  : 'datas/dictionary'
    
    ,'gameLoop'       : 'custom/gameLoop'
    ,'Game'           : 'custom/Game'
    ,'Player'         : 'custom/Player'
    ,'Character'      : 'custom/Character'
    ,'Enemy'          : 'custom/Enemy'
    ,'levelManager'   : 'custom/levelManager'
    ,'MobSpawner'     : 'custom/MobSpawner'
    ,'Filter'         : 'custom/Filter'
    ,'datas'          : 'custom/datas'
    ,'main'           : 'main'
  }
  , urlArgs: 'bust=' + Date.now()
} );

// init here your game with your code by using the Engine (as DreamE)
require( [ 'files-engine', 'gameLoop', 'Game', 'DE.imagesDatas', 'DE.audiosList', 'DE.inputsList', 'DE.dictionary' ],
function( files, gameLoop, Game, images, audios, inputs, dictionary )
{
  console.log( "My Custom loads - stress test" );
  var DreamE = DreamEngine;
  DreamE.init(
  {
    'customLoop': gameLoop, 'onReady': Game.init
    , 'onStart': Game.start, 'loader': { "scale": 2 }
    , 'images': images, 'audios': audios
    , 'inputs': inputs, 'dictionary': dictionary
    , 'about': { 'gameName': "StressTest", 'author': "Dreamirl", 'gameVersion': "0.1" }
    , 'saveModel': {}, 'saveIgnoreVersion': true
  } );
  window.DREAM_E = DreamE;
} );