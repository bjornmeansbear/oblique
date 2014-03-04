
$.getJSON('oblique.json', function(data) { 
    
  var strategy = data[Math.floor(Math.random()*data.length)];
  consoleLog(strategy);
  
});

