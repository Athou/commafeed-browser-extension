import browser from "webextension-polyfill"
import { getOptions } from "~/app/options"

const INTERVAL = 60000

interface UnreadCountEntry {
    unreadCount: number
}

const unreadCount = (entries: UnreadCountEntry[]) => {
    const count = entries.map(e => e.unreadCount).reduce((a, b) => a + b, 0)
    return count === 0 ? "" : `${count}`
}

const buildUrl = (baseUrl: string) => {
    let url = baseUrl
    if (url.lastIndexOf("/") !== url.length - 1) {
        url += "/"
    }
    url += "rest/category/unreadCount"
    return url
}

export const refreshBadge = async () => {
    const options = await getOptions()
    const url = buildUrl(options.url)
    const response = await fetch(url, {
        credentials: "include",
    })

    let label = "?"
    if (response.status === 200) {
        const body: UnreadCountEntry[] = await response.json()
        label = unreadCount(body)
    }
    browser.action.setBadgeText({ text: label })
}

refreshBadge()
setInterval(() => refreshBadge(), INTERVAL)
