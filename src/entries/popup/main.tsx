import React from "react"
import ReactDOM from "react-dom/client"
import browser from "webextension-polyfill"
import { decrementUnreadCount } from "~/app/badge"
import { buildUrl, getOptions } from "~/app/options"
import "../enableDevHmr"
import { App } from "./App"

getOptions().then(async options => {
    if (options.mode === "open_tab") {
        createTab(options.url)
    } else if (options.mode === "open_tab_next_unread") {
        await decrementUnreadCount()
        createTab(buildUrl(options.url, "next"))
    } else if (options.mode === "popup") {
        ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
            <React.StrictMode>
                <App />
            </React.StrictMode>
        )
    }
})

const createTab = (url: string) => {
    browser.tabs.create({ url })

    // close the popup
    window.close()
}
