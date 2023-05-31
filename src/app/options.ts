import { storage } from "webextension-polyfill"

export type Mode = "popup" | "open_tab"

export interface Options {
    url: string
    mode: Mode
}

export async function getOptions(): Promise<Options> {
    const options = await storage.local.get(["url", "mode"])
    return { url: options.url ?? "https://www.commafeed.com", mode: options.mode ?? "popup" }
}

export async function saveOptions(options: Options) {
    return storage.local.set(options)
}
