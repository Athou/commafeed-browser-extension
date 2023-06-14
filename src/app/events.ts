import browser from "webextension-polyfill"
import { setBadgeUnreadCount } from "./badge"
import { getOptions } from "./options"

export const handleEvent = async (data: string) => {
    if (typeof data !== "string") return

    const options = await getOptions()

    if (data === "open-settings-page") {
        browser.runtime.openOptionsPage()
    } else if (data === "open-app-in-new-tab") {
        browser.tabs.create({ url: options.url })
    } else if (data.startsWith("open-link-in-background-tab:")) {
        const url = data.substring("open-link-in-background-tab:".length)
        browser.tabs.create({ url, active: false })
    } else if (data.startsWith("set-badge-unread-count:")) {
        const unreadCount = data.substring("set-badge-unread-count:".length)
        setBadgeUnreadCount(+unreadCount)
    }
}
