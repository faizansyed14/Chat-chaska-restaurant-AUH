# Images

Drop your image files in this folder. Filenames must match exactly.

## Brand images (used in the header, footer & hero)

- **logo.jpg** — your Chaat Chaska logo. Shows in the navbar, footer, mobile
  menu and the menu-book cover. On dark backgrounds it's placed on a small white
  rounded chip automatically.
- **bg.jpg** — the large hero showcase image (the colourful illustration you
  shared). It fills the framed, floating card on the right of the hero. Best as
  a tall/portrait image (about 3:4, e.g. 960×1280).

Until `logo.jpg` and `bg.jpg` exist, the site shows tasteful fallbacks (a drawn
logo mark and a dish grid) so nothing ever looks broken.

## Dish photos (optional — for the "Famous for our chaat" cards)

Use these filenames (referenced in `src/lib/menuData.js`):

- pani-puri.jpg
- bhel-puri.jpg
- sev-puri.jpg
- samosa.jpg
- pav-bhaji.jpg
- dosa.jpg
- dahi-puri.jpg
- falooda.jpg

Recommended: square-ish, ~800x600px+, JPG/WEBP, under ~300KB each. Missing dish
photos automatically fall back to branded gradient tiles with an emoji.
