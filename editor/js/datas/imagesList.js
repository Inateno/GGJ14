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
  var imagesList = [
    [ "back", "img/back", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ]
    ,[ "back1", "img/back1", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ]
    ,[ "back2", "img/back2", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ]
    ,[ "back3", "img/back3", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ]
];
  
  if ( CONFIG.DEBUG && CONFIG.DEBUG_LEVEL >= 3 )
  {
    console.log( "imagesList loaded" );
  }
  return imagesList;
} );