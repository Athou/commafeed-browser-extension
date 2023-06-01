# CommaFeed browser extension

Cross-browser extension for CommaFeed that supports all Chromium-based browsers as well as Firefox.

The extension will show an action next to the address bar with the count of your unread articles.
Clicking the button will either show CommaFeed in a popup or open CommaFeed in a new tab.

## Download

-   Chrome: Pending review by Google
-   Firefox: https://addons.mozilla.org/en-US/firefox/addon/commafeed/

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
