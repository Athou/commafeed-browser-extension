import browser from "webextension-polyfill"
import { getOptions } from "~/app/options"
import pkg from "../../../package.json"
import "../enableDevHmr"

getOptions().then(options => {
    if (!document.location.href.startsWith(options.url)) return

    // indicate to the webapp that the browser extension is installed
    document.documentElement.setAttribute("browser-extension-installed", pkg.version)

    window.addEventListener("message", (event: MessageEvent<string>) => {
        // forward the event to the background page because it has more permissions
        browser.runtime.sendMessage(event.data)
    })
})
