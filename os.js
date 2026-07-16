// Wrapping everything in a function like this (an "IIFE" - immediately
// invoked function expression) keeps `strategies`, `text`, etc. out of the
// global scope, so they can't collide with anything else on the page.
(function () {

  // This one file runs on both index.html and list.html. It fetches the
  // data once, then does whichever of the two jobs below applies,
  // depending on which elements it finds on the current page.
  fetch('oblique.json')
    .then(function (response) { return response.json(); })
    .then(function (data) {
      // oblique.json looks like { strategies: [{ strategy: "..." }, ...] }
      // — flatten it down to a plain array of strings, since that's all we
      // actually need.
      var strategies = data.strategies.map(function (s) { return s.strategy; });

      // --- index.html: the big clickable "give me a random strategy" button ---
      var randomButton = document.getElementById('oblique_strategies');
      if (randomButton) {
        var text = randomButton.querySelector('span');
        var last = null;

        var showRandom = function () {
          var strategy;
          // Re-roll if we land on the same strategy twice in a row, so
          // clicking always feels like it did something (unless there's
          // only one strategy in the list, in which case just show it).
          do {
            strategy = strategies[Math.floor(Math.random() * strategies.length)];
          } while (strategy === last && strategies.length > 1);
          last = strategy;
          text.textContent = strategy;
        };

        showRandom(); // show one immediately on page load
        randomButton.addEventListener('click', showRandom); // and again on every click
      }

      // --- list.html: the full numbered list of every strategy ---
      var fullList = document.getElementById('fulllist');
      if (fullList) {
        // Building everything in a DocumentFragment first, then appending
        // it once, means the page only reflows once instead of 211 times.
        var fragment = document.createDocumentFragment();
        strategies.forEach(function (strategy) {
          var li = document.createElement('li');
          li.className = 'strategy';
          var p = document.createElement('p');
          p.textContent = strategy; // textContent (not innerHTML) so nothing in
          li.appendChild(p);        // the strategy text is ever parsed as markup
          fragment.appendChild(li);
        });
        fullList.appendChild(fragment);
      }
    })
    .catch(function () {
      // Most likely cause: the page was opened directly as a file:// URL
      // instead of through a local server, and the browser blocked the
      // fetch for CORS reasons. Also covers genuine network failures.
      var text = document.querySelector('#oblique_strategies span');
      if (text) text.textContent = "Couldn't load strategies. Refresh to try again.";
    });
})();
