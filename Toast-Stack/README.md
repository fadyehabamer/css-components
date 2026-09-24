# Toast-Stack

> Stacking toast notifications with auto-dismiss that pauses on hover and focus

### [View Live Demo](https://fadyehabamer.github.io/css-components/Toast-Stack/)

## Overview

Three toast types (success, error, info) stack in the bottom corner. Each one closes after 5 seconds with a small countdown bar. Hovering a toast or tabbing into it pauses its timer, and it picks up where it left off when you move away. `Esc` on a focused toast dismisses it, and focus moves to the next toast instead of getting lost.

The list is an `aria-live="polite"` region so new toasts are announced; errors use `role="alert"` so they interrupt. Only four toasts are shown at once, the oldest one leaves first.

Call `showToast(type, { title, message, duration })` from the console to try your own.

## Built With

**Languages:** HTML · CSS · JavaScript

## Techniques Demonstrated

- `aria-live` region and `role="alert"`
- Pausable timers (remaining time is kept on pause)
- CSS custom properties for per-type colours
- `animation-play-state` for the countdown bar
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
cd css-components/Toast-Stack
# then open index.html in your browser
```

**Topics:** `toast` `notifications` `a11y` `javascript`

---
↩ Part of the [**css-components**](../) collection · [all my repos](https://github.com/fadyehabamer?tab=repositories) · [@fadyehabamer](https://github.com/fadyehabamer)
