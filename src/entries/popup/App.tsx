import { useAsync } from "react-async-hook"
import { getOptions } from "~/app/options"
import "./App.css"

export function App() {
    const options = useAsync(getOptions, [])

    if (!options.result) return null
    return (
        <main>
            <iframe title="commafeed" src={options.result?.url} />
        </main>
    )
}
