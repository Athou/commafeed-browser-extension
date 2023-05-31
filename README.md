# CommaFeed browser extension

This is a cross-browser extension that supports all Chromium-based browsers as well as Firefox.

## Commands

To switch between Manifest v2 and Manifest v3 builds, use the MANIFEST_VERSION environment variable defined in `.env`

### Development

In one terminal,

```sh
npm run watch
```

In another terminal,

```sh
npm run serve:chrome
or
npm run serve:firefox
```

### Production

```sh
npm run build
```
