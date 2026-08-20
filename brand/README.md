# Brand assets

Everything here is generated from the same tokens the site uses, so the
newsletter and the website cannot drift apart by eye.

    wordmark.png        1200x300   wide lockup on black
    wordmark-light.png  1200x260   the same lockup on paper, for email
    logo-800.png         800x800   square, beehiiv logo, favicon and app icon
    og-card.png         1200x630   social preview
    icon.png             512x512   square, smaller
    email-template.html            paste-able email, light palette
    *.svg                          editable sources
    ../favicon.svg        64x64    browser tab

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

## The light palette, for email and print

The site is white on black. An email is not, for two reasons that have nothing
to do with taste: printing the dark version floods a page with ink, and a good
share of email clients override a dark background anyway, which would leave the
brand carried by a colour that got thrown away.

So the email keeps the parts that survive the flip. The Didone headline, the
letterspaced caps, the gold hairline. Gold reads on both grounds. Black does
not.

    #fbfaf8   paper       background
    #14141a   ink         headings                     17.6:1
    #3a3a44   body        body copy                    10.8:1
    #5a5a66   quiet       footer and secondary          6.5:1
    #7a5e25   gold text   links, eyebrows, buttons      5.8:1
    #9c8450   gold rule   hairlines and quote bars      3.5:1
    #ddd6c8   hairline    footer divider, decorative

Ratios are against the paper. Note that #c9a961, the site's gold, scores 2.16
here and fails. Do not carry it over. Use #7a5e25 for anything that has to be
read.

Two more print rules the template follows. Links are underlined as well as
coloured, so they survive greyscale. Buttons are outlined rather than filled,
because a solid gold block prints as a grey slab and costs ink for nothing.

**Georgia, not Playfair Display.** Gmail strips webfonts, so a Playfair stack
would silently fall back to whatever each client picks and the email would look
right for a lucky few. Georgia is a real Didone-adjacent serif that exists
everywhere. Use it in email. Playfair stays on the website.

## beehiiv theme tokens

Everything below is set by hand in the beehiiv dashboard. The MCP tools that
would write these are gated behind a paid plan, so the reads work and every
write returns an upgrade prompt.

    Email background            #fbfaf8
    Heading font                Georgia
    Heading colour              #14141a
    Body font                   Helvetica or Arial
    Body colour                 #3a3a44
    Link colour                 #7a5e25   underlined
    Button                      outlined, border #9c8450, text #7a5e25
    Divider                     #ddd6c8
    Email header image          wordmark-light.png

    Website accent              #c9a961
    Website background          #0b0b10
    Website heading font        Playfair Display
    Website body font           Geist

The website side can stay dark, because a browser will not override it and
nobody prints it.

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
