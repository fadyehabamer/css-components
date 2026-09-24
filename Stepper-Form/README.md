# Stepper-Form

> Multi-step sign-up form with a progress indicator, per-step validation and a review step

### [View Live Demo](https://fadyehabamer.github.io/css-components/Stepper-Form/)

## Overview

A four step form: account, company, preferences and review. You can't move forward until the current step is valid. Errors are written next to each field, linked with `aria-describedby`, and focus jumps to the first field that needs fixing. Errors clear as you type.

The review step lists everything you entered. Each section has an Edit button that takes you back to that step, and the Next button turns into "Back to review" so you don't have to click through the rest again.

Without JavaScript the form still shows all fields and falls back to the browser's own validation.

## Built With

**Languages:** HTML · CSS · JavaScript

## Techniques Demonstrated

- Progress indicator with `aria-current="step"`
- Per-step validation with custom messages
- Focus management between steps
- CSS logical properties and custom properties
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
cd css-components/Stepper-Form
# then open index.html in your browser
```

**Topics:** `form` `stepper` `validation` `a11y`

---
↩ Part of the [**css-components**](../) collection · [all my repos](https://github.com/fadyehabamer?tab=repositories) · [@fadyehabamer](https://github.com/fadyehabamer)
