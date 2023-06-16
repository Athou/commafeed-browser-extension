import browser from "webextension-polyfill"
import { buildUrl, getOptions } from "./options"

interface UnreadCountEntry {
    unreadCount: number
}

// browser.browserAction in manifest v2
// browser.action in manifest v3
const button = browser.action ?? browser.browserAction

export const refreshBadgeUnreadCount = async () => {
    const options = await getOptions()
    const url = buildUrl(options.url, "rest/category/unreadCount")

    let unreadCount: number | undefined
    try {
        const response = await fetch(url, { credentials: "include" })
        if (response.status === 200) {
            const body: UnreadCountEntry[] = await response.json()
            unreadCount = body.map(e => e.unreadCount).reduce((a, b) => a + b, 0)
        }
    } catch (e) {
        // do nothing
    }
    setBadgeUnreadCount(unreadCount)
}

export const setBadgeUnreadCount = (count: number | undefined) => {
    let label
    if (count === undefined) label = "?"
    else if (count <= 0) label = ""
    else label = `${count}`

    button.setBadgeText({ text: label })
}

export const getBadgeUnreadCount = async () => {
    const text = await button.getBadgeText({})
    if (text === "?" || text === "") return 0
    return +text
}

export const decrementUnreadCount = async () => {
    const count = await getBadgeUnreadCount()
    if (count > 0) setBadgeUnreadCount(count - 1)
}
