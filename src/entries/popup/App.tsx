import { useEffect } from "react"
import { useAsync } from "react-async-hook"
import browser from "webextension-polyfill"
import { getOptions } from "~/app/options"
import "./App.css"

export function App() {
    const options = useAsync(getOptions, [])

    useEffect(() => {
        const listener = (event: MessageEvent) => {
            const { data } = event
            if (data === "open-settings-page") {
                browser.runtime.openOptionsPage()

                // close the popup
                window.close()
            } else if (data === "open-app-in-new-tab" && options.result) {
                browser.tabs.create({ url: options.result.url })

                // close the popup
                window.close()
            }
        }
        window.addEventListener("message", listener)
        return () => window.removeEventListener("message", listener)
    }, [options.result])

    if (!options.result) return null
    return (
        <main>
            <iframe title="commafeed" src={options.result?.url} />
        </main>
    )
}
