# Brand assets

Everything here is generated from the same tokens the site uses, so the
newsletter and the website cannot drift apart by eye.

    wordmark.png   1200x300   wide lockup, for email headers and page banners
    wordmark.svg              editable source
    icon.png        512x512   square, for avatars and social cards
    icon.svg                  editable source
    ../favicon.svg   64x64    browser tab

The PNGs were rendered through headless Chrome with the real webfonts loaded,
so they carry the actual Playfair Display and Geist. The SVGs reference those
fonts by name and will fall back to Georgia and Helvetica on a machine that
does not have them. Upload the PNGs. Keep the SVGs to edit.

To re-render after editing an SVG:

    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
      --headless=new --disable-gpu --screenshot=out.png \
      --window-size=1200,300 --hide-scrollbars --virtual-time-budget=4000 wrapper.html

where wrapper.html is the SVG inside an HTML page that links the Google Fonts
stylesheet. Rendering the SVG directly will silently use fallback fonts.

## Colours

    #0b0b10   ink         page and email background
    #101017   panel       inset panels, form fields
    #15140f   selected    highlighted rows, bordered call-to-action boxes
    #c9a961   gold        accent, links, buttons, the one accent colour
    #9c8450   gold dim    borders and small caps labels
    #f4f2ee   white       headings and body on dark
    #8d8d99   mute        secondary text
    #6a6a78   edge        borders of real controls only

Ratios against #0b0b10: white 17.6, gold 8.7, mute 6.0, gold dim 5.5, edge 3.7.
Do not introduce a second accent. There is gold and there is nothing else.

## Type

    Headings   Playfair Display, 900 weight, uppercase
    Body       Geist, 400 and 600
    Labels     Geist, uppercase, letter-spacing 0.32em, 11px

If beehiiv does not offer Geist, any clean grotesque works. If it does not
offer Playfair Display, use Georgia rather than a different display face.

## Setting up the beehiiv publication

Wherever beehiiv asks for each of these:

    Logo                wordmark.png
    Icon or avatar      icon.png
    Accent or primary   #c9a961
    Background          #0b0b10
    Body text           #f4f2ee on dark, or #0b0b10 if beehiiv forces a light page
    Heading font        Playfair Display
    Body font           Geist

Two things to watch. Many email clients ignore a dark background and force
their own, so check a real send in Gmail before assuming the dark ground
survives. And gold on white fails contrast, so if beehiiv locks the page to a
light background, use #6b5220 for links rather than #c9a961.
