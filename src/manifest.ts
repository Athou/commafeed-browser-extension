import pkg from "../package.json"

const icons = {
    16: "icons/16.png",
    19: "icons/19.png",
    48: "icons/48.png",
    64: "icons/64.png",
    128: "icons/128.png",
}

const sharedManifest = {
    icons,
    options_ui: {
        page: "src/entries/options/index.html",
        open_in_tab: true,
    },
}

const browserAction = {
    default_icon: icons,
    default_popup: "src/entries/popup/index.html",
}

const permissions: chrome.runtime.ManifestPermissions[] = ["storage", "alarms"]

const ManifestV2: Partial<chrome.runtime.ManifestV2> = {
    ...sharedManifest,
    background: {
        scripts: ["src/entries/background/script.ts"],
        persistent: true,
    },
    browser_action: browserAction,
    options_ui: {
        ...sharedManifest.options_ui,
        chrome_style: false,
    },
    permissions: [...permissions, "*://*/*"],
}

const ManifestV3: Partial<chrome.runtime.ManifestV3> = {
    ...sharedManifest,
    action: browserAction,
    background: {
        service_worker: "src/entries/background/serviceWorker.ts",
    },
    permissions,
    host_permissions: ["*://*/*"],
}

export function getManifest(manifestVersion: number): chrome.runtime.ManifestV2 | chrome.runtime.ManifestV3 {
    const manifest = {
        author: pkg.author,
        description: pkg.description,
        name: pkg.displayName ?? pkg.name,
        version: pkg.version,
    }

    if (manifestVersion === 2) {
        return {
            ...manifest,
            ...ManifestV2,
            manifest_version: manifestVersion,
        }
    }

    if (manifestVersion === 3) {
        return {
            ...manifest,
            ...ManifestV3,
            manifest_version: manifestVersion,
        }
    }

    throw new Error(`Missing manifest definition for manifestVersion ${manifestVersion}`)
}
