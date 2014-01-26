define( [],
function()
{
  var datas = {
    coefAirReductor     : 0.99
    , coefFloorReductor : 0.7
    , coefAirFriction   : 0.9
    , maxAttractionForce: 100
    , attractionForce   : 0.1
    , player: {
      mass: 10
      ,jumpForce: -2.5
      ,jumpIncrease: -0.2
      ,moveSpeed: 12
    }
    , mob: {
      mass: 10
      ,jumpForce: -2.5
      ,moveSpeed: 5
      ,life: 5
    }
    
    , components: {
      "road":{"name":"road","tag":"none","sprite":"back","isTile":1,"sx":0,"sy":0,"tw":280,"th":880,"w":280,"h":880,"collider":{"type":"box","w":280,"h":120,"r":50,"l":0,"t":200},"zindex":0}
      ,"big_house":{"name":"big_house","tag":"none","sprite":"back","isTile":1,"sx":280,"sy":0,"tw":700,"th":900,"w":700,"h":900,"collider":false,"zindex":1}
      ,"fat_house":{"name":"fat_house","tag":"none","sprite":"back1","isTile":1,"sx":0,"sy":0,"tw":900,"th":720,"w":900,"h":720,"collider":false,"zindex":1}
      ,"endroad":{"name":"endroad","tag":"none","sprite":"back2","isTile":1,"sx":0,"sy":0,"tw":544,"th":295,"w":544,"h":295,"collider":{"type":"box","w":390,"h":200,"r":50,"l":-80,"t":100},"zindex":0}
      ,"grass":{"name":"grass","tag":"none","sprite":"back2","isTile":1,"sx":0,"sy":296,"tw":781,"th":295,"w":781,"h":295,"collider":{"type":"box","w":410,"h":200,"r":50,"l":130,"t":100},"zindex":0}
      ,"no-coll-grass":{"name":"grass","tag":"none","sprite":"back2","isTile":1,"sx":0,"sy":296,"tw":781,"th":295,"w":781,"h":295,"collider":false,"zindex":1}
      ,"smallcol":{"name":"smallcol","tag":"none","sprite":"back2","isTile":1,"sx":545,"sy":0,"tw":455,"th":224,"w":455,"h":224,"collider":false,"zindex":0},"bigcol":{"name":"bigcol","tag":"none","sprite":"back2","isTile":1,"sx":0,"sy":591,"tw":696,"th":323,"w":696,"h":323,"collider":false,"zindex":0},"cliff1":{"name":"cliff1","tag":"none","sprite":"back3","isTile":1,"sx":0,"sy":0,"tw":663,"th":299,"w":663,"h":299,"collider":false,"zindex":0},"cliff2":{"name":"cliff2","tag":"none","sprite":"back3","isTile":1,"sx":0,"sy":300,"tw":474,"th":134,"w":474,"h":134,"collider":false,"zindex":0},"mirror":{"name":"mirror","tag":"none","sprite":"back3","isTile":1,"sx":664,"sy":0,"tw":134,"th":299,"w":134,"h":299,"collider":false,"zindex":0},"sun":{"name":"sun","tag":"none","sprite":"back3","isTile":1,"sx":0,"sy":434,"tw":970,"th":430,"w":970,"h":430,"collider":false,"zindex":0}
    }
    , levels: {
      1: {
        components: [{"x":6050,"y":270,"name":"cliff1","zindex":0,"rotation":0},{"x":8370,"y":260,"name":"cliff2","zindex":0,"rotation":0},{"x":8610,"y":962,"name":"grass","zindex":0,"rotation":0},{"x":5140,"y":824,"name":"road","zindex":0,"rotation":0},{"x":5740,"y":962,"name":"grass","zindex":0,"rotation":0},{"x":2620,"y":824,"name":"road","zindex":0,"rotation":0},{"x":3740,"y":824,"name":"road","zindex":0,"rotation":0},{"x":380,"y":824,"name":"road","zindex":0,"rotation":0},{"x":2340,"y":824,"name":"road","zindex":0,"rotation":0},{"x":7380,"y":962,"name":"grass","zindex":0,"rotation":0},{"x":100,"y":824,"name":"road","zindex":0,"rotation":0},{"x":1780,"y":824,"name":"road","zindex":0,"rotation":0},{"x":2060,"y":824,"name":"road","zindex":0,"rotation":0},{"x":9430,"y":962,"name":"grass","zindex":0,"rotation":0},{"x":4300,"y":824,"name":"road","zindex":0,"rotation":0},{"x":660,"y":824,"name":"road","zindex":0,"rotation":0},{"x":4020,"y":824,"name":"road","zindex":0,"rotation":0},{"x":1220,"y":824,"name":"road","zindex":0,"rotation":0},{"x":9840,"y":962,"name":"grass","zindex":0,"rotation":0},{"x":3180,"y":824,"name":"road","zindex":0,"rotation":0},{"x":3460,"y":824,"name":"road","zindex":0,"rotation":0},{"x":4580,"y":824,"name":"road","zindex":0,"rotation":0},{"x":1500,"y":824,"name":"road","zindex":0,"rotation":0},{"x":7010,"y":410,"name":"cliff2","zindex":0,"rotation":0},{"x":6560,"y":962,"name":"grass","zindex":0,"rotation":0},{"x":6150,"y":962,"name":"grass","zindex":0,"rotation":0},{"x":2900,"y":824,"name":"road","zindex":0,"rotation":0},{"x":4860,"y":824,"name":"road","zindex":0,"rotation":0},{"x":7790,"y":962,"name":"grass","zindex":0,"rotation":0},{"x":9020,"y":962,"name":"grass","zindex":0,"rotation":0},{"x":8200,"y":962,"name":"grass","zindex":0,"rotation":0},{"x":6970,"y":962,"name":"grass","zindex":0,"rotation":0},{"x":940,"y":824,"name":"road","zindex":0,"rotation":0},{"x":9040,"y":80,"name":"sun","zindex":0,"rotation":0},{"x":6550,"y":540,"name":"no-coll-grass","zindex":1,"rotation":0},{"x":8510,"y":670,"name":"no-coll-grass","zindex":1,"rotation":0},{"x":7300,"y":590,"name":"no-coll-grass","zindex":1,"rotation":0},{"x":8720,"y":160,"name":"cliff1","zindex":1,"rotation":0},{"x":1040,"y":390,"name":"fat_house","zindex":1,"rotation":0},{"x":5430,"y":530,"name":"no-coll-grass","zindex":1,"rotation":0},{"x":5720,"y":670,"name":"no-coll-grass","zindex":1,"rotation":0},{"x":6210,"y":530,"name":"no-coll-grass","zindex":1,"rotation":0},{"x":6110,"y":670,"name":"no-coll-grass","zindex":1,"rotation":0},{"x":7020,"y":590,"name":"no-coll-grass","zindex":1,"rotation":0},{"x":9310,"y":670,"name":"no-coll-grass","zindex":1,"rotation":0},{"x":3700,"y":230,"name":"fat_house","zindex":1,"rotation":0},{"x":5800,"y":530,"name":"no-coll-grass","zindex":1,"rotation":0},{"x":9710,"y":670,"name":"no-coll-grass","zindex":1,"rotation":0},{"x":6920,"y":670,"name":"no-coll-grass","zindex":1,"rotation":0},{"x":7870,"y":540,"name":"no-coll-grass","zindex":1,"rotation":0},{"x":8280,"y":540,"name":"no-coll-grass","zindex":1,"rotation":0},{"x":8100,"y":670,"name":"no-coll-grass","zindex":1,"rotation":0},{"x":7710,"y":670,"name":"no-coll-grass","zindex":1,"rotation":0},{"x":8910,"y":670,"name":"no-coll-grass","zindex":1,"rotation":0},{"x":6520,"y":670,"name":"no-coll-grass","zindex":1,"rotation":0},{"x":5550,"y":962,"name":"endroad","zindex":1,"rotation":0},{"x":7310,"y":670,"name":"no-coll-grass","zindex":1,"rotation":0},{"x":2760,"y":160,"name":"big_house","zindex":1,"rotation":0},{"x":5310,"y":670,"name":"no-coll-grass","zindex":1,"rotation":0},{"x":4590,"y":190,"name":"big_house","zindex":1,"rotation":0},{"x":2220,"y":320,"name":"fat_house","zindex":2,"rotation":0},{"x":3250,"y":300,"name":"big_house","zindex":2,"rotation":0},{"x":4780,"y":410,"name":"fat_house","zindex":2,"rotation":0},{"x":330,"y":400,"name":"big_house","zindex":2,"rotation":0},{"x":6570,"y":430,"name":"smallcol","zindex":2,"rotation":0},{"x":9190,"y":260,"name":"cliff2","zindex":2,"rotation":0},{"x":8890,"y":450,"name":"no-coll-grass","zindex":3,"rotation":0},{"x":8510,"y":450,"name":"no-coll-grass","zindex":3,"rotation":0},{"x":6130,"y":480,"name":"bigcol","zindex":3,"rotation":0},{"x":1920,"y":270,"name":"big_house","zindex":3,"rotation":0},{"x":9670,"y":450,"name":"no-coll-grass","zindex":4,"rotation":0},{"x":9280,"y":450,"name":"no-coll-grass","zindex":4,"rotation":0},{"x":8150,"y":430,"name":"bigcol","zindex":4,"rotation":0},{"x":7500,"y":440,"name":"smallcol","zindex":4,"rotation":0},{"x":5750,"y":540,"name":"smallcol","zindex":4,"rotation":0},{"x":9460,"y":360,"name":"bigcol","zindex":6,"rotation":0},{"x":9590,"y":840,"name":"mirror","zindex":9,"rotation":0}]
        , mobs: [
          { "x": 2000, "y": 550, "radius": 1500, "mobs": [ "boy", "boy", "boy", "boy","boy" ] }
          ,{ "x": 2200, "y": 550, "radius": 1500, "mobs": [ "boy", "boy", "boy", "boy","boy" ] }
          ,{ "x": 2500, "y": 550, "radius": 1500, "mobs": [ "boy", "boy", "boy", "boy","boy" ] }
          ,{ "x": 2800, "y": 550, "radius": 1500, "mobs": [ "boy", "boy", "boy", "boy","boy" ] }
          ,{ "x": 3000, "y": 550, "radius": 1500, "mobs": [ "boy", "boy", "boy", "boy", "boy" ] }
          ,{ "x": 3200, "y": 550, "radius": 1500, "mobs": [ "boy", "boy", "boy", "boy", "boy" ] }
          ,{ "x": 3500, "y": 550, "radius": 1500, "mobs": [ "boy", "boy", "boy", "boy", "boy", "boy", "boy" ] }
          ,{ "x": 3700, "y": 550, "radius": 1500, "mobs": [ "boy", "boy", "boy", "boy", "boy", "boy", "boy" ] }
          ,{ "x": 4200, "y": 550, "radius": 1500, "mobs": [ "boy", "boy", "boy", "boy", "boy", "boy", "boy" ] }
          ,{ "x": 5500, "y": 550, "radius": 1500, "mobs": [ "boy", "boy", "boy", "boy", "boy", "boy", "boy", "boy", "boy" ] }
          ,{ "x": 6000, "y": 550, "radius": 1500, "mobs": [ "boy", "boy", "boy", "boy", "boy", "boy", "boy", "boy", "boy" ] }
          ,{ "x": 6500, "y": 550, "radius": 1500, "mobs": [ "boy", "boy", "boy", "boy", "boy", "boy", "boy", "boy", "boy" ] }
          ,{ "x": 7000, "y": 550, "radius": 1500, "mobs": [ "boy", "boy", "boy", "boy", "boy", "boy", "boy", "boy", "boy" ] }
          ,{ "x": 7300, "y": 550, "radius": 1500, "mobs": [ "boy", "boy", "boy", "boy", "boy", "boy", "boy", "boy", "boy" ] }
          ,{ "x": 7600, "y": 550, "radius": 1500, "mobs": [ "boy", "boy", "boy", "boy", "boy", "boy", "boy", "boy", "boy" ] }
          ,{ "x": 8000, "y": 550, "radius": 1500, "mobs": [ "boy", "boy", "boy", "boy", "boy", "boy", "boy", "boy" ] }
          ,{ "x": 8200, "y": 550, "radius": 1500, "mobs": [ "boy", "boy", "boy", "boy", "boy", "boy", "boy", "boy" ] }
          ,{ "x": 8500, "y": 550, "radius": 1500, "mobs": [ "boy", "boy", "boy", "boy", "boy", "boy", "boy", "boy", "boy", "boy" ] }
        ]
      }
    }
    
    , cinematic: {
      "drama": {
        components: [
          { "type": "object", "text": "Look at you", "x": 0.5, "y": 0.5, "size": 90, "delay": 200, "fadeIn": true, "fadeOut": true }
          ,{ "type": "object", "text": "Look..", "x": 0.5, "y": 0.8, "size": 80, "delay": 2000, "fadeIn": true, "fadeOut": true }
          ,{ "type": "object", "text": "..what you did", "x": 0.5, "y": 0.9, "size": 80, "delay": 4000, "fadeIn": true, "fadeOut": true }
          ,{ "type": "object", "text": "Just because you look at you", "x": 0.5, "y": 0.8, "size": 80, "delay": 7000, "fadeIn": true, "fadeOut": true }
          ,{ "type": "object", "text": "and nothing else", "x": 0.5, "y": 0.8, "size": 80, "delay": 9000, "fadeIn": true, "fadeOut": true }
          ,{ "type": "object", "text": "every day, every things..", "x": 0.5, "y": 0.9, "size": 80, "delay": 11000, "fadeIn": true, "fadeOut": true }
          ,{ "type": "object", "text": "..are left", "x": 0.5, "y": 0.8, "size": 80, "delay": 12500, "fadeIn": true, "fadeOut": true }
          ,{ "type": "object", "text": "You forget the simple thing ever..", "x": 0.5, "y": 0.9, "size": 80, "delay": 17000, "fadeIn": true, "fadeOut": true }
          ,{ "type": "object", "text": "Look things as they are", "x": 0.5, "y": 0.8, "size": 80, "delay": 20000, "fadeIn": true, "fadeOut": true }
          ,{ "type": "object", "text": " ", "x": 0.5, "y": 0.8, "size": 80, "delay": 22000, "fadeIn": true, "fadeOut": true }
          ,{ "type": "object", "text": "Who knows ?", "x": 0.5, "y": 0.6, "size": 120, "delay": 24000, "fadeIn": true, "fadeOut": true }
          ,{ "type": "object", "text": "It could be different", "x": 0.5, "y": 0.6, "size": 120, "delay": 28000, "fadeIn": true, "fadeOut": true }
        ]
      }
      ,"happy": {
        components: [
          { "type": "object", "text": "You finally open your eyes", "x": 0.5, "y": 0.5, "size": 90, "delay": 200, "fadeIn": true, "fadeOut": true }
          ,{ "type": "object", "text": "Look..", "x": 0.5, "y": 0.8, "size": 80, "delay": 2000, "fadeIn": true, "fadeOut": true }
          ,{ "type": "action", "target": "player", "what": "axes", "val": { "x": 0.5, "y": 0 }, "delay": 2200 }
          ,{ "type": "object", "text": "..this is your world", "x": 0.5, "y": 0.9, "size": 80, "delay": 4000, "fadeIn": true, "fadeOut": true }
          ,{ "type": "object", "text": "But you just ignore it", "x": 0.5, "y": 0.8, "size": 80, "delay": 9000, "fadeIn": true, "fadeOut": true }
          ,{ "type": "object", "text": "every day", "x": 0.5, "y": 0.9, "size": 80, "delay": 11000, "fadeIn": true, "fadeOut": true }
          ,{ "type": "object", "text": "get bored by your life, and your work", "x": 0.5, "y": 0.8, "size": 80, "delay": 14000, "fadeIn": true, "fadeOut": true }
          ,{ "type": "object", "text": "You forget the simple thing ever..", "x": 0.5, "y": 0.9, "size": 80, "delay": 18000, "fadeIn": true, "fadeOut": true }
          ,{ "type": "object", "text": "Look things as they are", "x": 0.5, "y": 0.6, "size": 120, "delay": 22000, "fadeIn": true, "fadeOut": true }
        ]
      }
      , "game_over": {
        components: [
          { "type": "object", "text": "Game Over", "x": 0.5, "y": 0.5, "size": 140, "delay": 200, "fadeIn": true, "fadeOut": true }
        ]
      }
    }
  };
  
  return datas;
} );