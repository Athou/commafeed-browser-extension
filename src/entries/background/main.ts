import browser from "webextension-polyfill"
import { handleEvent } from "~/app/events"
import { buildUrl, getOptions } from "~/app/options"

interface UnreadCountEntry {
    unreadCount: number
}

const unreadCount = (entries: UnreadCountEntry[]) => {
    const count = entries.map(e => e.unreadCount).reduce((a, b) => a + b, 0)
    return count === 0 ? "" : `${count}`
}

const refreshBadge = async () => {
    const options = await getOptions()
    const url = buildUrl(options.url, "rest/category/unreadCount")
    const response = await fetch(url, {
        credentials: "include",
    })

    let label = "?"
    if (response.status === 200) {
        const body: UnreadCountEntry[] = await response.json()
        label = unreadCount(body)
    }

    // browser.browserAction in manifest v2
    // browser.action in manifest v3
    const button = browser.action ?? browser.browserAction
    button.setBadgeText({ text: label })
}

// refresh every minute
browser.alarms.onAlarm.addListener(refreshBadge)
browser.alarms.create("badge-refresh-timer", { periodInMinutes: 1 })

// refresh at chrome startup
browser.runtime.onStartup.addListener(refreshBadge)

// refresh at firefox startup
refreshBadge()

// listen for messages sent from contentScript
browser.runtime.onMessage.addListener((data: string) => handleEvent(data))
