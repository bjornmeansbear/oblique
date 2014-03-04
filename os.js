
$.getJSON('oblique.json', function(data) { 
    
  var randomStrategy = data.strategies[Math.floor(Math.random()*data.strategies.length)];
  console.log(randomStrategy.strategy);
//  $("#oblique_strategies p").text(strategy);
    
});

