# Accessible-Tabs

> Tabs that follow the WAI-ARIA pattern, with automatic or manual activation

### [View Live Demo](https://fadyehabamer.github.io/css-components/Accessible-Tabs/)

## Overview

The markup starts as a list of in-page links and sections, so without JavaScript you get a working page with every section visible. The script adds the `tablist` / `tab` / `tabpanel` roles and hides the inactive panels.

Keyboard support follows the [ARIA Authoring Practices tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/):

- Only the current tab is in the tab order (roving `tabindex`), so `Tab` goes straight from the tabs into the open panel
- `ArrowLeft` / `ArrowRight` move between tabs and wrap around (flipped automatically in RTL pages)
- `Home` / `End` jump to the first and last tab
- **Automatic** mode opens a panel as soon as its tab gets focus, **Manual** mode only moves focus and waits for `Enter` or `Space`

Opening the page with a hash like `#panel-specs` selects that tab.

## Built With

**Languages:** HTML · CSS · JavaScript

## Techniques Demonstrated

- WAI-ARIA tabs with roving tabindex
- Progressive enhancement from plain links
- CSS logical properties and custom properties
- Horizontally scrolling tab list on small screens
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
cd css-components/Accessible-Tabs
# then open index.html in your browser
```

**Topics:** `tabs` `a11y` `wai-aria` `keyboard`

---
↩ Part of the [**css-components**](../) collection · [all my repos](https://github.com/fadyehabamer?tab=repositories) · [@fadyehabamer](https://github.com/fadyehabamer)
