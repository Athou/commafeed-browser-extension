import browser from "webextension-polyfill"
import { setBadgeUnreadCount } from "~/app/badge"
import { handleEvent } from "~/app/events"
import { buildUrl, getOptions } from "~/app/options"

// open options when the extension is installed the first time
browser.runtime.onInstalled.addListener(e => {
    if (e.reason === "install") {
        browser.runtime.openOptionsPage()
    }
})

interface UnreadCountEntry {
    unreadCount: number
}

const refreshBadge = async () => {
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

// refresh every minute
browser.alarms.onAlarm.addListener(refreshBadge)
browser.alarms.create("badge-refresh-timer", { periodInMinutes: 1 })

// refresh at chrome startup
browser.runtime.onStartup.addListener(refreshBadge)

// refresh at firefox startup
refreshBadge()

// listen for messages sent from contentScript
browser.runtime.onMessage.addListener((data: string) => handleEvent(data))
