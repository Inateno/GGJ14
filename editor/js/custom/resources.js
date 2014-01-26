define( [],
function()
{
  // tag : steps = escalier, bounce = fait rebondir (sur l'axe y )
  var resources = {
    components: {
      "road":{"name":"road","tag":"none","sprite":"back","isTile":1,"sx":0,"sy":0,"tw":280,"th":880,"w":280,"h":880,"collider":{"type":"box","w":280,"h":120,"r":50,"l":0,"t":200},"zindex":0}
      ,"big_house":{"name":"big_house","tag":"none","sprite":"back","isTile":1,"sx":280,"sy":0,"tw":700,"th":900,"w":700,"h":900,"collider":false,"zindex":1}
      ,"fat_house":{"name":"fat_house","tag":"none","sprite":"back1","isTile":1,"sx":0,"sy":0,"tw":900,"th":720,"w":900,"h":720,"collider":false,"zindex":1}
      ,"endroad":{"name":"endroad","tag":"none","sprite":"back2","isTile":1,"sx":0,"sy":0,"tw":544,"th":295,"w":544,"h":295,"collider":{"type":"box","w":390,"h":200,"r":50,"l":-80,"t":100},"zindex":0}
      ,"grass":{"name":"grass","tag":"none","sprite":"back2","isTile":1,"sx":0,"sy":296,"tw":781,"th":295,"w":781,"h":295,"collider":{"type":"box","w":410,"h":200,"r":50,"l":130,"t":100},"zindex":0}
      ,"no-coll-grass":{"name":"grass","tag":"none","sprite":"back2","isTile":1,"sx":0,"sy":296,"tw":781,"th":295,"w":781,"h":295,"collider":false,"zindex":1}
      ,"smallcol":{"name":"smallcol","tag":"none","sprite":"back2","isTile":1,"sx":545,"sy":0,"tw":455,"th":224,"w":455,"h":224,"collider":false,"zindex":0},"bigcol":{"name":"bigcol","tag":"none","sprite":"back2","isTile":1,"sx":0,"sy":591,"tw":696,"th":323,"w":696,"h":323,"collider":false,"zindex":0},"cliff1":{"name":"cliff1","tag":"none","sprite":"back3","isTile":1,"sx":0,"sy":0,"tw":663,"th":299,"w":663,"h":299,"collider":false,"zindex":0},"cliff2":{"name":"cliff2","tag":"none","sprite":"back3","isTile":1,"sx":0,"sy":300,"tw":474,"th":134,"w":474,"h":134,"collider":false,"zindex":0},"mirror":{"name":"mirror","tag":"none","sprite":"back3","isTile":1,"sx":664,"sy":0,"tw":134,"th":299,"w":134,"h":299,"collider":false,"zindex":0},"sun":{"name":"sun","tag":"none","sprite":"back3","isTile":1,"sx":0,"sy":434,"tw":970,"th":430,"w":970,"h":430,"collider":false,"zindex":0}
    }
    
    , gridsize: 10 // taille de la grille d'émentation
    , scene: null
    , currentEl: null
    , elGui: null
  };
  window.resources = resources;
  return resources;
} );