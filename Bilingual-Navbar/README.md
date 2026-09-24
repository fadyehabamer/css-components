# Bilingual-Navbar

> Responsive navbar with an Arabic / English switch that flips the page direction

### [View Live Demo](https://fadyehabamer.github.io/css-components/Bilingual-Navbar/)

## Overview

The language button swaps every label, updates `lang` and `dir` on `<html>` and remembers the choice in `localStorage`. The layout only uses logical properties (`margin-inline-start`, `inset-block-start`, `padding-inline` ...), so there is no separate RTL stylesheet and no `[dir="rtl"]` overrides.

On small screens the links collapse into a menu button. The menu closes on Escape (focus goes back to the button), on an outside click, after picking a link, or when the window grows back to desktop width.

## Built With

**Languages:** HTML · CSS · JavaScript

## Techniques Demonstrated

- CSS logical properties for LTR / RTL from one set of rules
- `lang` / `dir` switching with a small string dictionary
- Disclosure button with `aria-expanded` / `aria-controls`
- CSS custom properties for theming
- `prefers-reduced-motion`

## Files

```
index.html
main.js
style.css
```

## Run Locally

```bash
git clone https://github.com/fadyehabamer/css-components.git
cd css-components/Bilingual-Navbar
# then open index.html in your browser
```

**Topics:** `navbar` `rtl` `i18n` `arabic`

---
↩ Part of the [**css-components**](../) collection · [all my repos](https://github.com/fadyehabamer?tab=repositories) · [@fadyehabamer](https://github.com/fadyehabamer)
