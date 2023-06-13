import browser from "webextension-polyfill"
import { buildUrl, getOptions } from "./options"

interface UnreadCountEntry {
    unreadCount: number
}

export const refreshBadgeUnreadCount = async () => {
    const options = await getOptions()
    const url = buildUrl(options.url, "rest/category/unreadCount")
    const response = await fetch(url, {
        credentials: "include",
    })

    let unreadCount: number | undefined
    if (response.status === 200) {
        const body: UnreadCountEntry[] = await response.json()
        unreadCount = body.map(e => e.unreadCount).reduce((a, b) => a + b, 0)
    }
    setBadgeUnreadCount(unreadCount)
}

export const setBadgeUnreadCount = (count: number | undefined) => {
    let label
    if (count === undefined) label = "?"
    else if (count === 0) label = ""
    else label = `${count}`

    // browser.browserAction in manifest v2
    // browser.action in manifest v3
    const button = browser.action ?? browser.browserAction
    button.setBadgeText({ text: label })
}
