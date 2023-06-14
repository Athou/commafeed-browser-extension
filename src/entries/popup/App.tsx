import { useEffect } from "react"
import { useAsync } from "react-async-hook"
import { handleEvent } from "~/app/events"
import { getOptions } from "~/app/options"
import "./App.css"

const listener = async (event: MessageEvent) => {
    await handleEvent(event.data)

    if (event.data === "open-settings-page" || event.data === "open-app-in-new-tab") {
        // close the popup
        window.close()
    }
}

export function App() {
    const options = useAsync(getOptions, [])

    useEffect(() => {
        window.addEventListener("message", listener)
        return () => window.removeEventListener("message", listener)
    }, [])

    if (!options.result) return null
    return (
        <main>
            <iframe title="commafeed" src={options.result?.url} onLoad={e => e.currentTarget.focus()} />
        </main>
    )
}
