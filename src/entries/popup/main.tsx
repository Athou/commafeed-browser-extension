import React from "react"
import ReactDOM from "react-dom/client"
import browser from "webextension-polyfill"
import { getOptions } from "~/app/options"
import "../enableDevHmr"
import { App } from "./App"

getOptions().then(options => {
    if (options.mode === "open_tab") {
        browser.tabs.create({ url: options.url })

        // close the popup
        window.close()
    } else {
        ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
            <React.StrictMode>
                <App />
            </React.StrictMode>
        )
    }
})
