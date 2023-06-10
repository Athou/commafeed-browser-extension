import browser from "webextension-polyfill"
import { getOptions } from "./options"

export const handleEvent = async (data: string) => {
    const options = await getOptions()

    if (data === "open-settings-page") {
        browser.runtime.openOptionsPage()
    } else if (data === "open-app-in-new-tab") {
        browser.tabs.create({ url: options.url })
    } else if (data.startsWith("open-link-in-background-tab:")) {
        const url = data.substring("open-link-in-background-tab:".length)
        browser.tabs.create({ url, active: false })
    }
}
