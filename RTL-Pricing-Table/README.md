# RTL-Pricing-Table

> Arabic-first pricing cards with a monthly / yearly switch and SAR / EGP prices

### [View Live Demo](https://fadyehabamer.github.io/css-components/RTL-Pricing-Table/)

## Overview

The page is written in Arabic from the start (`lang="ar" dir="rtl"`) rather than being an English layout flipped at the end. All spacing and positioning use logical properties, so the same CSS would work for an LTR page too.

Two segmented controls change the prices:

- **Billing:** monthly, or yearly with two months free. The yearly view also shows what it comes to per month.
- **Currency:** Saudi riyal or Egyptian pound. Prices are formatted with `Intl.NumberFormat('ar-EG', { style: 'currency' })` and split with `formatToParts()` so the number and the currency symbol can be styled separately.

The controls are plain radio buttons, so they work with the keyboard out of the box, and a hidden live region tells screen reader users when the prices change. The middle plan is highlighted as the most popular.

## Built With

**Languages:** HTML · CSS · JavaScript

## Techniques Demonstrated

- RTL-first layout with CSS logical properties
- `Intl.NumberFormat` currency formatting with Arabic-Indic digits
- Radio-button segmented controls
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
cd css-components/RTL-Pricing-Table
# then open index.html in your browser
```

**Topics:** `pricing` `rtl` `arabic` `intl`

---
↩ Part of the [**css-components**](../) collection · [all my repos](https://github.com/fadyehabamer?tab=repositories) · [@fadyehabamer](https://github.com/fadyehabamer)
