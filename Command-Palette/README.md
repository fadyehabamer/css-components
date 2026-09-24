# Command-Palette

> Ctrl/Cmd + K command palette with fuzzy search and keyboard navigation

### [View Live Demo](https://fadyehabamer.github.io/css-components/Command-Palette/)

## Overview

Press `Ctrl + K` (or `Cmd + K` on a Mac) anywhere on the page, or click the search button. Typing filters the commands with a small fuzzy matcher: letters have to appear in order, and matches at word starts or in a row rank higher. Matched letters are highlighted.

- `ArrowUp` / `ArrowDown` move through results (wrapping around), `Ctrl + Home` / `Ctrl + End` jump to the ends
- `Enter` runs the selected command, `Escape` closes
- Focus stays inside the palette while it is open and goes back to where it was when it closes

A few commands actually do something (dark theme, font size), the rest just report that they ran.

## Built With

**Languages:** HTML · CSS · JavaScript

## Techniques Demonstrated

- Combobox + listbox with `aria-activedescendant`
- Fuzzy matching with highlighted results
- Focus trap and `inert` background
- CSS custom properties for light / dark themes
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
cd css-components/Command-Palette
# then open index.html in your browser
```

**Topics:** `command-palette` `javascript` `a11y` `keyboard`

---
↩ Part of the [**css-components**](../) collection · [all my repos](https://github.com/fadyehabamer?tab=repositories) · [@fadyehabamer](https://github.com/fadyehabamer)
