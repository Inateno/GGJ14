/**
* @ContributorsList
* @Inateno / http://inateno.com / http://dreamirl.com
*
***
*
* @singleton
* audioList
this is the audioList will be available in the project.
Please declare in the same way than this example.
To load audio as default just set "preload" to true.
**/
define( [ 'DE.CONFIG' ],
function( CONFIG )
{
  var audioList = [
    [ "psycho", "sd/musics/Danger", [ 'ogg', 'mp3' ], { "preload": true, "loop": true, "isMusic": true } ]
    ,[ "drama", "sd/musics/DancingCheekToCheek", [ 'mp3' ], { "preload": true, "loop": true, "isMusic": true } ]
    ,[ "happy", "sd/musics/Lullaby", [ 'ogg', 'mp3' ], { "preload": true, "loop": true, "isMusic": true } ]
    
    // FX
    ,[ "empty_hit", "sd/fxs/empty_hit", [ 'ogg', 'mp3' ], { "preload": true, "loop": false, "isMusic": false } ]
    ,[ "hit", "sd/fxs/hit", [ 'ogg', 'mp3' ], { "preload": true, "loop": false, "isMusic": false } ]
    ,[ "fatal_heart", "sd/fxs/heart_fast", [ 'ogg', 'mp3' ], { "preload": true, "loop": false, "isMusic": false } ]
  ];
  CONFIG.debug.log( "audioList loaded", 3 );
  return audioList;
} );