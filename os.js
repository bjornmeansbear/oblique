
$.getJSON('oblique.json', function(data) { 
    
  var strategy = data.strategies[Math.floor(Math.random()*data.strategies.length)];
  $("#oblique_strategies p").text(strategy);
    
});

