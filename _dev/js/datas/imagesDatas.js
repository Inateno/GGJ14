/**
* @ContributorsList
* @Inateno / http://inateno.com / http://dreamirl.com
*
***
*
* @singleton
* imagesList
this is the imagesList will be available in the project.
Please declare in the same way than this example.
To load image as default just set "load" to true.
Otherwhise you can load/add images when you want, load images by calling the DREAM_ENGINE.ImageManager.pushImage function

- [ name, url, extension, 
parameters: load:Bool, totalFrame:Int, totalLine:Int, eachAnim:Int (ms), isAnimated:Bool, isReversed:Bool
] -

All parameters are optionnal but at least an empty object need to be set
**/
define( [ 'DE.CONFIG' ],
function( CONFIG )
{
  var datas = {
    // avalaible images sizes (engine will load optimisest images depends on user resolution)
    screenSizes: [
      { "w": 1920, "h": 1080, "path": "" }
    ]
    
    // index of the used screen size during game conception
    , conceptionSizeIndex: 0
    
    // images folder name 
    , folderName: "img"
    
    // usage name, real name (can contain subpath), extension, parameters
    , imagesList: [
      [ "player", "player", "png", { "load": true, "totalFrame": 8, "totalLine": 4, "eachAnim": 70, "isAnimated": false  } ]
      ,[ "player-w", "player-w", "png", { "load": true, "totalFrame": 8, "totalLine": 6, "eachAnim": 70, "isAnimated": true  } ]
      ,[ "boy", "boy", "png", { "load": true, "totalFrame": 8, "totalLine": 4, "eachAnim": 105, "isAnimated": false  } ]
      ,[ "monster", "monster", "png", { "load": true, "totalFrame": 8, "totalLine": 4, "eachAnim": 105, "isAnimated": false  } ]
      ,[ "hellboy", "hellboy", "png", { "load": true, "totalFrame": 1, "totalLine": 1, "isAnimated": false  } ]
      ,[ "back", "back", "png", { "load": true, "totalFrame": 1, "totalLine": 1, "isAnimated": false  } ]
      ,[ "back_evil", "back_evil", "png", { "load": true, "totalFrame": 1, "totalLine": 1, "isAnimated": false  } ]
      ,[ "back1", "back1", "png", { "load": true, "totalFrame": 1, "totalLine": 1, "isAnimated": false  } ]
      ,[ "back1_evil", "back1_evil", "png", { "load": true, "totalFrame": 1, "totalLine": 1, "isAnimated": false  } ]
      ,[ "back2", "back2", "png", { "load": true, "totalFrame": 1, "totalLine": 1, "isAnimated": false  } ]
      ,[ "back2_evil", "back2_evil", "png", { "load": true, "totalFrame": 1, "totalLine": 1, "isAnimated": false  } ]
      ,[ "back3", "back3", "png", { "load": true, "totalFrame": 1, "totalLine": 1, "isAnimated": false  } ]
      ,[ "back3_evil", "back3_evil", "png", { "load": true, "totalFrame": 1, "totalLine": 1, "isAnimated": false  } ]
      ,[ "katana", "katana", "png", { "load": true, "totalFrame": 1, "totalLine": 1, "isAnimated": false  } ]
    ]
  };
  CONFIG.debug.log( "imagesDatas loaded", 3 );
  return datas;
} );