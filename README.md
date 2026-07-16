# oblique

a little site that gives you a random Oblique Strategy — one of those cards Brian Eno and Peter Schmidt made back in the 70s to help you get unstuck when you're making something and you're stuck. click the big text (or tap it, or hit enter/space if you're tabbing around with a keyboard) and you get a new one.

live at oblique.ookb.co

I made this way way back in maybe 2008 or 2009 as a drupal site, remade it in 2015 with some simpler stuff, and I'm revisiting it here in 2026 since Brian Eno is still a thing, and I'm sort of remaking a lot of stuff to remind me of the basic web and dev skills I used to have! ha!

## how it works

no build step, no framework, just plain html/css/js:

- `index.html` — the random strategy page, the main event
- `list.html` — every strategy, all 211 of them, in one long list
- `oblique.json` — the actual list of strategies, the thing the site reads from
- `oblique.xml` / `oblique.yml` — the same list in a couple other formats, in case something else wants to consume it
- `os.js` — fetches `oblique.json`, shows one at random, and swaps in a new one on click without reloading the page
- `os.css` / `structure.css` / `reset.css` — styling, layout grid, and a base reset
- `fonts/` — the self-hosted typefaces (see Colophon below) and their OFL license files

open `index.html` in a browser, or just go to the live site. that's the whole app.

## adding a strategy

open `oblique.json` and add an entry:

```json
{ "strategy": "Your new strategy here." }
```

save it, refresh the page, done. that's the only file the site actually reads, so it's the only one you have to touch. the `.xml` and `.yml` files are the same list in other formats — update those too if you want everything to stay in sync, but the site itself won't notice if you don't.

## thanks

thank you Brian Eno & Peter Schmidt.

## Colophon

Type is [Basteleur](https://velvetyne.fr/fonts/basteleur/) (Bold, for the strategy text — a tarot-card-inspired display face, which felt right for a deck of cards) and [Sligoil](https://velvetyne.fr/fonts/sligoil/) (Micro, for everything else — a monospace face with big ink traps), both free and open source from [Velvetyne Type Foundry](https://velvetyne.fr/). Self-hosted from `/fonts` under OFL-1.1, license text included there.