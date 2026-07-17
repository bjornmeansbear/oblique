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
      // oblique.json looks like:
      //   { strategies: [{ strategy: "...", explanation: "(...)" }, ...] }
      // explanation is optional — only a handful of entries have one — so
      // keep the whole object around instead of flattening to just the
      // strategy string, the way this used to work.
      var strategies = data.strategies;

      // --- index.html: the big clickable "give me a random strategy" button ---
      var randomButton = document.getElementById('oblique_strategies');
      if (randomButton) {
        var text = randomButton.querySelector('span');
        var explanation = randomButton.querySelector('.explanation');
        var last = null;

        var showRandom = function () {
          var entry;
          // Re-roll if we land on the same strategy twice in a row, so
          // clicking always feels like it did something (unless there's
          // only one strategy in the list, in which case just show it).
          do {
            entry = strategies[Math.floor(Math.random() * strategies.length)];
          } while (entry === last && strategies.length > 1);
          last = entry;
          text.textContent = entry.strategy;

          if (explanation) {
            explanation.textContent = entry.explanation || '';
            explanation.hidden = !entry.explanation;
          }

          // A fresh random tilt each time too, like a card tossed onto a
          // table — CSS reads this custom property to rotate the button.
          var angle = (Math.random() * 14 - 7).toFixed(2); // -7deg to +7deg
          randomButton.style.setProperty('--card-rotation', angle + 'deg');
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
        strategies.forEach(function (entry) {
          var li = document.createElement('li');
          li.className = 'strategy';
          var p = document.createElement('p');
          p.textContent = entry.strategy; // textContent (not innerHTML) so nothing
          li.appendChild(p);               // in the strategy text is parsed as markup
          if (entry.explanation) {
            // Nested inside the <p> (not a sibling of it) so it stacks in
            // the same flex column as the strategy text, instead of
            // fighting the counter number for room on the row.
            var small = document.createElement('small');
            small.className = 'explanation';
            small.textContent = entry.explanation;
            p.appendChild(small);
          }
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
