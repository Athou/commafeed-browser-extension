import browser from "webextension-polyfill"
import { refreshBadgeUnreadCount } from "~/app/badge"
import { handleEvent } from "~/app/events"

// open options when the extension is installed the first time
browser.runtime.onInstalled.addListener(e => {
    if (e.reason === "install") {
        browser.runtime.openOptionsPage()
    }
})

// refresh every minute
browser.alarms.onAlarm.addListener(refreshBadgeUnreadCount)
browser.alarms.create("badge-refresh-timer", { periodInMinutes: 1 })

// refresh at chrome startup
browser.runtime.onStartup.addListener(refreshBadgeUnreadCount)

// refresh at firefox startup
refreshBadgeUnreadCount()

// listen for messages sent from contentScript
browser.runtime.onMessage.addListener((data: string) => handleEvent(data))
