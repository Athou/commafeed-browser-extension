import browser from "webextension-polyfill"

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
