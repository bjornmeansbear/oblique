
$.getJSON('oblique.json', function(data) { 
    
  var randomStrategy = data.strategies[Math.floor(Math.random()*data.strategies.length)];
  console.log(randomStrategy.strategy);
  $("#oblique_strategies p").text(randomStrategy.strategy);

  $.each(data.strategies, function(data) {
    $('ul#fulllist').append('<li class="col-xs-6 col-sm-4 col-md-3 strategy">' + this["strategy"] + '</li>');
  });
    
});

$('#oblique_strategies').click(function() {
  document.location.reload(true);
});
