# CommaFeed browser extension

Cross-browser extension for CommaFeed that supports all Chromium-based browsers as well as Firefox.

The extension will show an action next to the address bar with the count of your unread articles.
Clicking the button will either:

-   show CommaFeed in a popup
-   open CommaFeed in a new tab
-   open next unread article in a new tab

It will also allow opening tabs in the background ("b" keyboard shortcut).

## Download

-   Chrome: https://chrome.google.com/webstore/detail/commafeed/bpbfpjiciblcfeganojjkfapnllbhdga
-   Firefox: https://addons.mozilla.org/en-US/firefox/addon/commafeed/
-   Edge: https://microsoftedge.microsoft.com/addons/detail/fljkobbpjeohoiampklfcfennnfahadi

## Commands

### Development

In one terminal, run

```sh
npm run watch:firefox
or
npm run watch:chrome
```

In another terminal, run

```sh
npm run serve:firefox
or
npm run serve:chrome
```

### Production

Run

```sh
npm run build:firefox
or
npm run build:chrome
```
